class Api::Auth::RegistrationsController < DeviseTokenAuth::RegistrationsController
  private

  def sign_up_params
    params.permit(:email, :password, :password_confirmation, :name)
    # render json: { incompleteTodos: :email }
  end
end
