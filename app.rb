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

#--------------------------------------------------------------- ReviewObject
post '/addReviewable' do
  puts "/addReviewable SUCCESS"

  payload = JSON.parse(request.body.read)

  reviewable = Reviewobject.create(:reviewableName => payload['Reviewable_name'], :coordinates => payload['latLong'])

  content_type :json
  { reviewableID: reviewable.reviewablesID }.to_json
end

#--------------------------------------------------------------- Reviews
post '/getReviews' do

  puts "/getReviews SUCCESS"

  payload = JSON.parse(request.body.read)

  puts payload
  puts
  puts

  reviewList = Array.new()

  Review.where(:reviewablesID => payload['reviewableID']).each do |review|

    hash = {:username => review.username, :rating => review.rating, :up_votes => review.upvotesTotal, :down_votes => review.downvotesTotal, :review => review.reviewText, :reviewID => review.reviewID}

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

  Review.create(:reviewablesID => payload['reviewableID'], :reviewText => payload['review'], :rating => payload['rating'], :username => payload['username'])

  content_type :json
  { add_review: "" }.to_json
  
end 

post '/editReview' do
  
  puts "/editReview SUCCESS"

  payload = JSON.parse(request.body.read)  

  review = Review.where(:reviewID => payload['reviewID'])

  if review.empty? == false
    review.update(:reviewText => payload['reviewText'])
    review.update(:rating => payload['rating'])
  end

  content_type :json
  { edit_review: "" }.to_json

end

post '/deleteReview' do

  puts "/deleteReview SUCCESS"
  
  payload = JSON.parse(request.body.read)  

  if Review.where(:reviewID => payload['reviewID']).empty? == false

    Review.where(:reviewID => payload['reviewID']).delete

  end

  content_type :json
  { delete_review: "" }.to_json

end

#--------------------------------------------------------------- vote
post '/vote' do
  
    puts "/vote SUCCESS"
  
    payload = JSON.parse(request.body.read)
  
    if Review.where(:reviewID => payload['reviewID'].empty? == false)
      if payload['votetype'] > 0

        Review.where(:reviewID => payload['reviewID']).update(:upvotesTotal => :upvotesTotal + 1)

      else

        Review.where(:reviewID => payload['reviewID']).update(:downvotesTotal => :downvotesTotal + 1)   
      end
    end

    content_type :json
    { vote: "" }.to_json
  
  end

#--------------------------------------------------------------- User

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

post '/updateUser' do

  puts "/updateUser SUCCESS"
  
  payload = JSON.parse(request.body.read)

  user = User.where(:username => payload['username'])

  if user.empty? == false
    if payload['email'] != ""
      user.update(:email => payload['email'])
    end

    if payload['password'] != ""
      user.update(:password => payload['password'])
    end

  end

  content_type :json
  { update_user: "" }.to_json
end

#--------------------------------------------------------------- School
post '/addSchool' do
  puts "/addSchool SUCCESS"
  
  payload = JSON.parse(request.body.read)

  school = School.create(:schoolName => payload['schoolName'], :schoolCoordinates => payload['schoolCoordinates'])

  content_type :json
  { schoolID: school.schoolID }.to_json

end

post '/getSchools' do
  puts "/getSchools"
  
  schoolList = Array.new()

  School.order(:schoolName).each do |school|

    hash = {:school_name => school.schoolName, :school_id => school.schoolID}
    
    schoolList.push(hash)
  end

  content_type :json
  { schools: schoolList }.to_json

end

#--------------------------------------------------------------- Building
post '/addBuilding' do
  puts "/addBuilding SUCCESS"

  payload = JSON.parse(request.body.read)
  
  building = Building.create(:schoolID => payload['schoolID'], :name => payload['name'], :noOfFloors => payload['noOfFloors'], :coordinates => payload['coordinates'])

  content_type :json
  { buildingID: building.buildingID }.to_json
end

post '/getBuilding' do

  puts "/getBuilding SUCCESS"
  
  payload = JSON.parse(request.body.read)

  buildingList = Array.new()

  Building.where(:schoolID => payload['schoolID']).each do |building|
    
        hash = {:building_name => building.name, :building_id => building.buildingID, :noOfFloors => building.noOfFloors}
    
        buildingList.push(hash)
  end


  content_type :json
  { buildings: buildingList }.to_json

end

end

