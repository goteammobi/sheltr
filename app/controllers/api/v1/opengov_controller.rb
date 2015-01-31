module Api
	module V1
		class OpengovController < ApplicationController
			def index
				request = Typhoeus.get("http://sbhacks.opengovhacks.com/api/v1/cities/174")
				response = JSON.parse(request.response_body)

				# binding.pry

				render json: {
					response: response
				}
			end
		end
	end
end