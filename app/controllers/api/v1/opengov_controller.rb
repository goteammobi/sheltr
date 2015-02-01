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

				#Going through all the cities with the corresponding id and name
				cityArray = []

				count = 1;
				for city in response_cities["cities"]
					cityObject = {}
					cityObject["id"] = city["id"]
					cityObject["name"] = city["name"]
					cityObject["count"] = count
					
					cityArray.push(cityObject)
					count+=1
				end

				render json: {
					cities: cityArray
				}
			end

			#Example of URL call: http://localhost:3000/api/v1/opengov/search_city?city_id=174
			def searchCity
				request_city = Typhoeus.get("http://sbhacks.opengovhacks.com/api/v1/cities/" + params["city_id"] + "/metrics", followlocation: true)
				response_city = JSON.parse(request_city.response_body)

				#Going through all the metrics corresponding with the specific id
				metricArray = []

				for metric in response_city["metrics"]

					if 	metric["name"] == "Rapes" || 
						metric["name"] == "Murders" ||
						metric["name"] == "Robberies" ||
						metric["name"] == "Aggravated Assault" ||
						metric["name"] == "Burglaries" ||
						metric["name"] == "Thefts" ||
						metric["name"] == "Vehicle Thefts"

							metricObject = {}
							metricObject["name"] = metric["name"]
							metricObject["description"] = metric["description"]
							metricObject["source"] = metric["source"]
							#metricObject["years"] = metric["years"]

							metricArray.push(metricObject)
					end
				end

				render json: {
					metrics: metricArray
				}
			end

		end
	end
end