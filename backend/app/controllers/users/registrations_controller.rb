# frozen_string_literal: true

class Users::RegistrationsController < Devise::RegistrationsController
  private

    def sign_up_params
      params.permit(:email, :password, :password_confirmation, :name)
    end
end
