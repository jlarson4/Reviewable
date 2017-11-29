# app.rb
require 'sinatra'

class Reviewable < Sinatra::Base
  get '/' do
    "Hello, world!"
  end
end