module Api
	module V1
		class OpengovController < ApplicationController
			def index
				request = Typhoeus.get("http://sbhacks.opengovhacks.com/api/v1/cities/174")
				response = JSON.parse(request.response_body)
				city = response["id"]
				# binding.pry

				render json: {
					response: response
				}
			end

			def metrices
				request = Typhoeus.get("http://sbhacks.opengovhacks.com/api/v1/cities/174/metrics" , followlocation: true)
				response = JSON.parse(request.response_body)
				city = response["id"]
				# binding.pry

				render json: {
					response: response
				}
			end

			def allcities
				request = Typhoeus.get("http://sbhacks.opengovhacks.com/api/v1/cities")
				response = JSON.parse(request.response_body)
				cityArray  = []
				testArray = []
				cityHash = {}
				for cities in response["cities"]
					cityHash = {}
					cityHash[:cid] = cities["id"] 
					cityHash[:city] = cities["name"]
					cityArray.push(cityHash)
				end

				

				 # for cityHash in cityArray

				 # 	cid = cityHash[:cid]
				 # 	testArray.push(cid);
				 # 	#binding.pry
				 # end

				cityArrayHash = []
				for cityHash in cityArray
					cid = cityHash[:cid]
					if cid != 120 && cid != 216 && cid != 138 && cid != 251 && cid != 103
						request1 = Typhoeus.get("http://sbhacks.opengovhacks.com/api/v1/cities/#{cid}/metrics" , followlocation: true)
						response1 = JSON.parse(request1.response_body)
						cityObject = {}
						cityObject["id"] = cid
						cityObject["city"] = cityHash[:city]
						for metrix in response1["metrics"]
							if metrix["name"]== "Rapes" || 
								metrix["name"]== "Murders" ||
								metrix["name"]== "Robberies" ||
								metrix["name"]== "Aggravated Assault"||
								metrix["name"]== "Burglaries" ||
								metrix["name"]== "Thefts"||
								metrix["name"]== "Vehicle Thefts"

								# cityArrayHash = metrix["years"]
								
								cityObject["name"] = metrix["name"]
								cityObject["years"] = metrix["years"]
								cityArrayHash.push(cityObject)
								# binding.pry
							end
							# end	
						end	
						# end 
					end
				end
				
				render json:{
					response1: cityArrayHash
				}
			end

		end
	end
end