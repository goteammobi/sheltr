module Api
	module V1
		class OpengovController < ApplicationController

			def index
				request = Typhoeus.get("http://sbhacks.opengovhacks.com/api/v1/cities/174")
				response = JSON.parse(request.response_body)
				city = response["id"]

				render json: {
					#id: id
					response: response
				}
			end

			def cityMeta
				request = Typhoeus.get("http://sbhacks.opengovhacks.com/api/v1/cities/174/metrics", followlocation: true)
				#requesting_cities = Typhoeus.get("http://sbhacks.opengovhacks.com/api/v1/cities")

				response = JSON.parse(request.response_body)
				#responseOfCities

				render json: {
					response: response
				}
			end
		end
	end
end