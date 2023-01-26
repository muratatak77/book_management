# frozen_string_literal: true

FactoryBot.define do
  factory :author do
    name { 'test title' }
    email { 'test content' }
  end
end
