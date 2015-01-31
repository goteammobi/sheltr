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
				request_cities = Typhoeus.get("http://sbhacks.opengovhacks.com/api/v1/cities", followlocation: true)
				response_cities = JSON.parse(request_cities.response_body)

				cityObject = {}
				cityArray = []
				for city in response_cities["cities"]
					cityObject["id"] = city["id"]
					cityObject["name"] = city["name"]
					cityArray.push(cityObject)
				end

				request = Typhoeus.get("http://sbhacks.opengovhacks.com/api/v1/cities/174/metrics", followlocation: true)
				response = JSON.parse(request.response_body)
				#responseOfCities

				render json: {
					response: response
				}
			end
		end
	end
end