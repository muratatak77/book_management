# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Comments', type: :request do
  describe '#index' do
    before do
      Comment.create(title: 'test', content: 'test')
      get '/comments'
    end

    it 'return all size' do
      expect(json.size).to eq(1)
    end

    it 'returns status code 200' do
      expect(response).to have_http_status(:success)
    end
  end

  describe 'POST /create' do
    context 'with valid paramaters' do
      let!(:my_post) {  Comment.create(title: 'test', content: 'test') }

      before do
        post '/posts', params: { post: { title: my_post.title, content: my_post.content } }
      end

      it 'should return title' do
        expect(json['title']).to eq(my_post.title)
      end

      it 'should return content' do
        expect(json['content']).to eq(my_post.content)
      end

      it 'should a created status' do
        expect(response).to have_http_status(:created)
      end
    end

    context 'with invalid paramaters' do
      before do
        post '/posts', params: { post: { title: '', content: '' } }
      end

      it 'should return unprocessable entity status' do
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end

end
