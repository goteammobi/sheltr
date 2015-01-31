class Users::OmniauthCallbacksController < Devise::OmniauthCallbacksController
  # You should configure your model like this:
  # devise :omniauthable, omniauth_providers: [:twitter]

  def facebook
    @user = User.find_for_facebook_oauth(
      request.env["omniauth.auth"],
      current_user
    )

    if @user.persisted?
      sign_in(@user, store: false)

      render status: 200, json: {
        user: {
          id: @user.id,
          first_name: @user.first_name,
          last_name: @user.last_name,
          email: @user.email,
          auth_token: @user.authentication_token,
          image: @user.image
        }
      }
    else
      render status: 401, json: {
        errors: alert
      }
    end
  end

  def twitter
  end

  # GET|POST /resource/auth/twitter
  # def passthru
  #   super
  # end

  # GET|POST /users/auth/twitter/callback
  # def failure
  #   super
  # end

  # protected

  # The path used when omniauth fails
  # def after_omniauth_failure_path_for(scope)
  #   super(scope)
  # end
end
