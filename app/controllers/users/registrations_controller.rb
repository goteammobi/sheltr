class Users::RegistrationsController < Devise::RegistrationsController
  skip_before_filter :authenticate_user!

  respond_to :json

# before_filter :configure_sign_up_params, only: [:create]
# before_filter :configure_account_update_params, only: [:update]

  # GET /resource/sign_up
  def new
    super
  end

  # POST /resource
  def create
    respond_to do |format|
      format.html {
        super
      }
      format.json {
        if User.find_by_email(params[:email])
          render json: { success: false, message: 'Email already used' }, status: 401
        else
          build_resource({ email: params[:email], password: params[:password], password_confirmation: params[:password_confirmation] })
          resource_saved = resource.save
          if resource_saved
            sign_in(resource, store: false)
            render json: { success: true, user: { email: resource.email, :auth_token => resource.authentication_token, user_id: resource.id } }, success: true, status: :created
          else
            render json: { success: false, message: 'Error signing up' }, status: 401
          end
        end
        
      }
    end
  end

  # GET /resource/edit
  def edit
    super
  end

  # PUT /resource
  def update
    super
  end

  # DELETE /resource
  def destroy
    super
  end

  # GET /resource/cancel
  # Forces the session data which is usually expired after sign
  # in to be expired now. This is useful if the user wants to
  # cancel oauth signing in/up in the middle of the process,
  # removing all OAuth session data.
  # def cancel
  #   super
  # end

  # protected

  # You can put the params you want to permit in the empty array.
  # def configure_sign_up_params
  #   devise_parameter_sanitizer.for(:sign_up) << :attribute
  # end

  # You can put the params you want to permit in the empty array.
  # def configure_account_update_params
  #   devise_parameter_sanitizer.for(:account_update) << :attribute
  # end

  # The path used after sign up.
  # def after_sign_up_path_for(resource)
  #   super(resource)
  # end

  # The path used after sign up for inactive accounts.
  # def after_inactive_sign_up_path_for(resource)
  #   super(resource)
  # end
end
