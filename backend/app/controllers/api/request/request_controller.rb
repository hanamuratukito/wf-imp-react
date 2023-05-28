
class Api::Request::RequestController < ApplicationController
  def get
    search_condition = params[:search_condition]
    requests = Request
    where_str = ''
    if !search_condition['business_type'].blank?
      where_str = where_str << 'business_type = ' << search_condition['business_type']
    end

    if !search_condition['request_name'].blank?
      where_str = where_str << 'request_name = ' << search_condition['request_name']
    end

    if !search_condition['status'].blank?
      where_str = where_str << 'status = ' << search_condition['status']
    end

    if !search_condition['contact'].blank?
      where_str = where_str << 'contact = ' << search_condition['contact']
    end
    requests = Request.joins("
      LEFT OUTER JOIN users AS created_users ON requests.created_user_id = created_users.id
      LEFT OUTER JOIN users AS updated_users ON requests.updated_user_id = updated_users.id
    ").select("
      requests.id AS id,
      requests.business_type AS business_type,
      requests.request_name AS request_name,
      requests.status AS status,
      requests.contact AS contact,
      updated_users.name AS updated_user_name,
      created_users.name AS created_user_name
    ").order('requests.id')
    render json: { result_status: 0000, requests: requests }
  end
end
