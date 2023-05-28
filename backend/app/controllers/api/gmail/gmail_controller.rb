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

  def set_token
    gmail_info = GmailInfo.limit(1)
    if gmail_info.blank?
      render json: { result_status: 9000 }
    end
    uri = URI.parse(escape("https://accounts.google.com/o/oauth2/token"))
    req = Net::HTTP::Post.new(uri)

    # フロントで呼んでいる内容と合わせる（redirect_uriとか）
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
    session[:google_access_token] = jsonRes['access_token']
    render json: { result_status: 0000 }
  end

  def get_mail
    # 未読の件名がWF or 見積書のメールを取得
    token = session[:google_access_token]
    uri = URI.parse(escape("https://www.googleapis.com/gmail/v1/users/me/messages?q=subject:{WF 見積書} AND is:unread"))
    request = Net::HTTP::Get.new(uri)
    request["Authorization"] = "Bearer #{token}"
    req_options = { use_ssl: uri.scheme == "https" }
    response = Net::HTTP.start(uri.hostname, uri.port, req_options) do |http|
      http.request(request)
    end
    jsonRes = JSON.parse(response.body)

    # 該当するメールが無い場合は処理終了
    if jsonRes.blank?
      render json: { result_status: 1000 }
    end

    # 取得したメールをもとにDBに登録する
    gmails = []
    for msg in jsonRes['messages']
      gmailUri = URI.parse(escape("https://www.googleapis.com/gmail/v1/users/me/messages/#{msg['id']}"))
      gmailRequest = Net::HTTP::Get.new(gmailUri)
      gmailRequest["Authorization"] = "Bearer #{token}"
      gmail = Net::HTTP.start(gmailUri.hostname, gmailUri.port, req_options) do |http|
        http.request(gmailRequest)
      end
      gmail_info = JSON.parse(gmail.body)

      # mail_infosテーブルへの登録
      mail_info_table = MailInfo.new
      request_table = Request.new
      for header in gmail_info['payload']['headers']
        if header['name'] === 'Subject' then
          mail_info_table.subject = header['value']

          if header['value'].include?("WF") then
            request_table.business_type = 1
          else
            request_table.business_type = 2
          end

        elsif header['name'] === 'To' then
          mail_info_table.to = header['value']
        elsif header['name'] === 'From' then
          mail_info_table.from = header['value']
        end
      end

      # TODO 添付ファイルは別途対応
      mail_info_table.body = gmail_info['snippet']
      request_table.request_name = gmail_info['snippet']
      request_table.status = 0
      request_table.contact = 'システムユーザー'
      request_table.created_user_id = 1
      request_table.updated_user_id = 1
      mail_info_table.save
      request_table.mail_info_id = mail_info_table.id
      request_table.save
      # gmails.push(JSON.parse(gmail.body))
    end
    render json: { result_status: 0000 }
    # render json: { gmails: gmails, res: jsonRes }
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