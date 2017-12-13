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
                String :firstName
                String :lastName
                String :email, :unique=>TRUE
                String :homeSchool
                String :admin             
              end

           DB.create_table? :schools do
             primary_key :schoolID
                 String :schoolName
                 String :schoolCoordinates        
                end

          DB.create_table? :buildings do
                    primary_key :buildingID
                        String :schoolID
                        String :name
                        Int :noOfFloors       
                        String :coordinates    
                  end

          DB.create_table? :reviewobjects do
                   primary_key :reviewablesID
                        String :username                       
                        String :reviewableName
                        String :reviewableDescription
                        String :category
                        String :subCategory
                        String :coordinates     

                      end

          DB.create_table? :reviews do
                   primary_key :reviewID
                        String :username
                        Int :reviewablesID
                        Int :rating
                        String :reviewText
                        Int :upvotesTotal
                        Int :downvotesTotal             
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

puts payload
  puts
  puts

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
puts payload
  puts
  puts

  Review.create(:reviewableID => payload['reviewableID'], :reviewText => payload['review'], :rating => payload['rating'], :username => payload['username'])


end 

post '/signUp' do
  
  puts "/signUp SUCESS"

  retVal = false

  payload = JSON.parse(request.body.read)

  if User.where(:username => payload['username']).empty? == true && User.where(:email => payload['email']).empty? == true


      User.create(:username => payload['username'], :password => payload['password'], :email => payload['email'], :firstName => payload['firstName'], :lastName => payload['lastName'])

      retVal = true
  end


  content_type :json
      { signed_up: retVal }.to_json
      
  end

post '/signIn' do

  puts "/singIn SUCESS"

  payload = JSON.parse(request.body.read)


  retVal = false
  #userTable = User.where(:username => payload['username'])

  if User.where(:username => payload['username']).empty? == false && User.where(:username => payload['username']).get(:password) == payload['password']

    retVal = true
    end

  content_type :json
      { signed_up: retVal }.to_json

end



end

