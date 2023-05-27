require 'net/http'
require 'google/apis/gmail_v1'
require 'googleauth'
require 'googleauth/stores/file_token_store'
require 'google/apis/analytics_v3'

class Api::Gmail::GmailController < ApplicationController
  def get_google_page
    gmail_info = GmailInfo.limit(1)
    if gmail_info.blank?
      render json: { result_status: 9000 }
    end
    render json: { result_status: 0000, transition_url: gmail_info[0]['transition_url'] }
  end

  def add_request
    gmail_info = GmailInfo.limit(1)
    if gmail_info.blank?
      render json: { result_status: 9000 }
    end
    uri = URI.parse(escape("https://accounts.google.com/o/oauth2/token"))
    req = Net::HTTP::Post.new(uri)
    req.set_form_data({
      'client_id' => gmail_info[0]['client_id'],
      'client_secret' => gmail_info[0]['client_secret'],
      'redirect_uri' => 'http://localhost:8000/request/list',
      'grant_type' => 'authorization_code',
      'code' => params[:code]
    })
    req_options = { use_ssl: uri.scheme == "https" }

    response = Net::HTTP.start(uri.hostname, uri.port, req_options) do |http|
      http.request(req)
    end

    jsonRes = JSON.parse(response.body)
    session[:access_token] = jsonRes['access_token']
    render json: { result_status: 0000, access_token: session[:access_token], jsonRes: jsonRes }
  end

  def getmail
    # token = session[:access_token]
    # render json: { token: session[:access_token] }
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