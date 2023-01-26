# frozen_string_literal: true

class ApplicationController < ActionController::API
  def protect_from_forgery
    nil
  end
end
