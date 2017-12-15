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
                int    :schoolID
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
                        String :school_id

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

post 'getpins' do
  
  puts "/getpins SUCESS"

  payload = JSON.parse(request.body.read)

  returnVal = Array.new
  #default no school DONE NOT TESTED
    if (payload[catagory] == nil && payload[sub_catagory] == nil && payload[title] == nil && payload[school_id] == nil) 
        
        Reviewableobject.where(:reviewablesID != nil).each do |row|
         hash = {:reviewablesID => row.reviewableID, :reviewableName =>row.reviewablesName, :coordinates => row.coordinates}
         returnVal.push(hash)
        end

      end

      
      #all pins for a specified school specified DONE, NOT TESTED
       if (payload[catagory] == nil && payload[sub_catagory] == nil && payload[title] == nil && payload[school_id] != nil) 
        
        Reviewableobject.where(:school_id => payload[school_id]).each do |row|
         hash = {:reviewablesID => row.reviewableID, :reviewableName =>row.reviewablesName, :coordinates => row.coordinates}
         returnVal.push(hash)
        end
      end 
     
    #if just catagory is checked and a catagory is chosen no school
    if (payload[catagory] != nil && payload[sub_catagory] == nil && payload[title] == nil && payload[school_id] == nil) 
      
      Reviewableobject.where(:catagory == payload[catagory]).each do |row|
        hash = {:reviewblesID => row.reviewableID, :reviewableName =>row.reviewableName, :coordinates => row.coordinates}
        returnVal.push(hash)
      end
    end
   
    #if just catagory is selected and school is specified 
    if (payload[catagory] =! nil && payload[sub_catagory] == nil && payload[title] == nil && payload[school_id] != nil) 
  
      Reviewableobject.where(:school_id == payload[school_id]).each do |row|
       if(payload[catagory] == row.catagory)  
         hash = {:reviewablesID => row.reviewableID, :reviewableName =>row.reviewableName, :coordinates => row.coordinates}
         returnVal.push(hash)
        end
      end
    end
   
    #if catagory and sub_catagory are selected and no school NOT TESTED
    if (payload[catagory] =! nil && payload[sub_catagory] =! nil && payload[title] == nil && payload[school_id] == nil) 
      
      Reviewableobject.where(:catagory== payload[catagory]).each do |row|
       if(payload[sub_catagory] == row.sub_catagory)  
         hash = {:reviewablesID => row.reviewableID, :reviewableName =>row.reviewableName, :coordinates => row.coordinates}

         returnVal.push(hash)
        end
      end
    end

    #if catagory and sub_catagory is selected and school is specified DONE, NOT TEST
    if (payload[catagory] =! nil && payload[sub_catagory] =! nil && payload[title] == nil && payload[school_id] != nil) 
      Reviewableobject.where(:school_id == payload[school_id]).each do |row|
       if(payload[catagory] == row.catagory)  
        if(payload[sub_catagory] == row.sub_catagory)
         hash = {:reviewablesID => row.reviewableID, :reviewableName =>row.reviewableName, :coordinates => row.coordinates}
         returnVal.push(hash)
        end
       end
      end
    end
     
    #if catagory and sub_catagory is selected and a school isnt selected 
    if (payload[catagory] =! nil && payload[sub_catagory] =! nil && payload[title] == nil && payload[school_id] == nil) 
      Reviewableobject.where(:catagory== payload[catagory]).each do |row|
        if(payload[sub_catagory] == row.sub_catagory)  
          hash = {:reviewablesID => row.reviewableID, :reviewableName =>row.reviewableName, :coordinates => row.coordinates}

          returnVal.push(hash)
        end
      end
    end
    #if catagory and title is selected and a school isnt selected 

    if (payload[catagory] =! nil && payload[sub_catagory] == nil && payload[title] =! nil && payload[school_id] == nil) 
      
      Reviewableobject.where(:reviewName == (payload[title]) ).each do |row|
       if(payload[catagory] == row.catagory)  
         hash = {:reviewablesID => row.reviewableID, :reviewableName =>row.reviewableName, :coordinates => row.coordinates}
 
         returnVal.push(hash)
        end
      end
    end

      #if catagory and title is selected and school is specified DONE, NOT TEST
    if (payload[catagory] =! nil && payload[sub_catagory] =! nil && payload[title] == nil && payload[school_id] != nil) 
        Reviewableobject.where(:school_id == payload[school_id]).each do |row|
         if(payload[title] == row.reviewableName)  
          if(payload[catagory] == row.catagory)
           hash = {:reviewablesID => row.reviewableID, :reviewableName =>row.reviewableName, :coordinates => row.coordinates}
  
           returnVal.push(hash)
          end
         end
       end
      end
      

        #if catagory, sub catagory, and title is selected and school is specified
        if (payload[catagory] =! nil && payload[sub_catagory] =! nil && payload[title] == nil && payload[school_id] != nil) 
          Reviewableobject.where(:school_id == payload[school_id]).each do |row|
           if(payload[title] == row.reviewableName)  
            if(payload[catagory] == row.catagory)
              if(payload[sub_catagory] == row.sub_catagory)
               hash = {:reviewablesID => row.reviewableID, :reviewableName =>row.reviewableName, :coordinates => row.coordinates}
    
               returnVal.push(hash)
              end
            end
           end
          end
        end
        
   #all pins for a title DONE, NOT TESTED
   if (payload[catagory] == nil && payload[sub_catagory] == nil && payload[title] == nil && payload[school_id] != nil) 
    
      Reviewableobject.where(:reviewableName => payload[title]).each do |row|
        hash = {:reviewablesID => row.reviewableID, :reviewableName =>row.reviewablesName, :coordinates => row.coordinates}
        returnVal.push(hash)
      end
  
    end
   
    
 #if title and school NOT TESTED
 if (payload[catagory] =! nil && payload[sub_catagory] =! nil && payload[title] == nil && payload[school_id] == nil)  
  Reviewableobject.where(:reviewableName == payload[catagory]).each do |row|
   if(payload[sub_catagory] == row.sub_catagory)  
      hash = {:reviewablesID => row.reviewableID, :reviewableName =>row.reviewableName, :coordinates => row.coordinates}

       returnVal.push(hash)
      end
    end
  end
    
  content_type :json
    { pins: returnVal }.to_json

end

end



