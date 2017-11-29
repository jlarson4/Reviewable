# app.rb
require 'sinatra'

class Reviewable < Sinatra::Base
  get '/' do
    File.read(File.join('public', 'index.html'))
  end
end