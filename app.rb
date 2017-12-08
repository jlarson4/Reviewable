# app.rb
require 'sinatra'
require 'sinatra/json'
require 'sequel'

class Reviewable < Sinatra::Base
  get '/' do
    File.read(File.join('public', 'index.html'))
  end

  configure do
    DB = Sequel.connect('sqlite://Reviewable_Database.db')    
    
          DB.create_table? :users do
            primary_key :usernameID
                String :username, :unique=>TRUE
                String :password
                String :FirstName
                String :LastName
                String :Email, :unique=>TRUE
                String :HomeSchool
                String :Admin             
              end

           DB.create_table? :schools do
             primary_key :SchoolID
                 String :SchoolName
                 String :SchoolCoordinates        
                end

          DB.create_table? :buildings do
                    primary_key :BuildingID
                        String :SchoolID
                        String :Name
                        Int :NoOfFloors       
                        String :Coordinates    
                  end

          DB.create_table? :reviewobjects do
                   primary_key :ReviewablesID
                        String :username                       
                        String :ReviewableName
                        String :ReviewableDescription
                        String :Category
                        String :SubCategory
                        String :Coordinates     

                      end

          DB.create_table? :reviews do
                   primary_key :reviewID
                        String :username
                        Int :ReviewablesID
                        Int :Rating
                        String :ReviewText
                        Int :UpvotesTotal
                        Int :DownvotesTotal             
                      end               
        

        require_relative 'User'
        require_relative 'Review'
        require_relative 'School'
        require_relative 'Building'
        require_relative 'Reviewobject'




  end

post '/getReviews' do

  puts "/getReviews SUCCESS"

  payload = JSON.parse(request.body.read)

  reviewList = Array.new()

  Review.where(:reviewableID => payload['reviewableID']).each do |review|

    hash = {:username => review.username, :rating => review.rating, :up_votes => review.upvotesTotal, :down_votes => review.downvotesTotal, :review => review.reviewText, :reviewID => reviewID}

    reviewList.push(hash)

    end

     content_type :json
      { reviews: reviewList }.to_json

  end


post '/addReview' do

  puts "/addReview SUCESS"

  payload = JSON.parse(request.body.read)

  Review.create(:reviewableID => payload['reviewableID'], :reviewText => payload['review'], :rating => payload['rating'], :username => payload['username'])


end 

post '/signUp' do
  
  puts "/signUp SUCESS"

  retVal = false

  payload = JSON.parse(request.body.read)

  if User.where(:username => payload['username']) == null && User.where(:email => payload['email'])

      User.create(:username => payload['username'], :password => payload['password'], :email => payload['email'], :firstName => payload['firstName'], :lastName => payload['lastName'])

      retVal = true
  end


  content_type :json
      { signed_up: retVal }.to_json
      
  end

post 'signIn' do

  puts "/singIn SUCESS"

  payload = JSON.parse(request.body.read)

  retVal = false

  if (User.where(:username => payload['username'] , :password => payload['password']) != null)
    retVal = true
    end

  content_type :json
      { signed_up: retVal }.to_json

end



end

