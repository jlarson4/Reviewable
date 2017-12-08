# app.rb
require 'sinatra'
# require 'sequel'

class Reviewable < Sinatra::Base
  get '/' do
    File.read(File.join('public', 'index.html'))
  end

  # configure do
  #   DB = Sequel.connect('sqlite://Reviewable_Database.db')    
    
  #         DB.create_table? :Users do
  #           primary_key :usernameID
  #               String :username, :unique=>True
  #               String :password
  #               String :FirstName
  #               String :LastName
  #               String :Email, :unique=>True 
  #               String :HomeSchool
  #               String :Admin             
  #             end

  #             DB.create_table? :Schools do
  #               primary_key :SchoolID
  #                   String :SchoolName
  #                   String :SchoolCoordinates        
  #                 end

  #           DB.create_table? :Building do
  #                   primary_key :BuildingID
  #                       String :SchoolID
  #                       String :Name
  #                       Int :NoOfFloors       
  #                       String :Coordinates    
  #                 end

  #           DB.create_table? :Reviewables do
  #                  primary_key :ReviewablesID
  #                       Int    :CreatorUserID                      
  #                       String :password
  #                       String :ReviewableName
  #                       String :ReviewableDescription
  #                       String :Category
  #                       String :SubCategory
  #                       String :Coordinates     

  #                     end

  #         DB.create_table? :Reviews do
  #                  primary_key :ReviewID
  #                       Int :UserID
  #                       Int :ReviewablesID
  #                       Int :Review
  #                       String :ReviewText
  #                       Int :UpvotesTotal
  #                       Int :DownvotesTotal             
  #                     end
                
        
  # end 
end

