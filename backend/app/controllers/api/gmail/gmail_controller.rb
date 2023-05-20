require 'net/http'
require 'google/apis/gmail_v1'
require 'googleauth'
require 'googleauth/stores/file_token_store'
require 'google/apis/analytics_v3'

class Api::Gmail::GmailController < ApplicationController
  def redirect
    client = Signet::OAuth2::Client.new({
      client_id: 'xxx',
      client_secret: 'xxxx',
      authorization_uri: 'https://accounts.google.com/o/oauth2/auth',
      scope: Google::Apis::GmailV1::AUTH_GMAIL_READONLY,
      redirect_uri: url_for(:action => :callback)
    })

    redirect_to client.authorization_uri.to_s, allow_other_host: true
  end

  def callback
    client = Signet::OAuth2::Client.new({
      client_id: 'xxx',
      client_secret: 'xxx'
    })
    client.token_credential_uri = 'https://www.googleapis.com/oauth2/v3/token'
    client.redirect_uri = url_for(action: :callback)
    client.code = params[:code]
    response = client.fetch_access_token!
    session[:access_token] = response['access_token']
    redirect_to url_for(action: :getmail)
  end

  def getmail
    token = 'xxx'
    uri = URI.parse(escape("https://www.googleapis.com/gmail/v1/users/me/messages"))
    request = Net::HTTP::Get.new(uri)
    request["Authorization"] = "Bearer #{token}"
    req_options = { use_ssl: uri.scheme == "https" }
    response = Net::HTTP.start(uri.hostname, uri.port, req_options) do |http|
      http.request(request)
    end

    jsonRes = JSON.parse(response.body)
    gmail = ""
    for msg in jsonRes['messages']
      gmailUri = URI.parse(escape("https://www.googleapis.com/gmail/v1/users/me/messages/#{msg['id']}"))
      gmailRequest = Net::HTTP::Get.new(gmailUri)
      gmailRequest["Authorization"] = "Bearer #{token}"
      gmail = Net::HTTP.start(gmailUri.hostname, gmailUri.port, req_options) do |http|
        http.request(gmailRequest)
      end
      gmail = JSON.parse(gmail.body)
    end
    render json: { gmail: gmail, res: jsonRes }
  end

  def escape(str)
      alpha = "a-zA-Z"
      alnum = "#{alpha}\\d"
      unreserved = "\\-_.!~*'()#{alnum}"
      reserved = ";/?:@&=+$,\\[\\]"
      unsafe = Regexp.new("[^#{unreserved}#{reserved}]")
      str.gsub(unsafe) do
          us = $&
          tmp = ''
          us.each_byte do |uc|
              tmp << sprintf('%%%02X', uc)
          end
          tmp
      end.force_encoding(Encoding::US_ASCII)
  end
end