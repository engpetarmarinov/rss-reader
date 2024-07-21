require 'rails_helper'

RSpec.describe Api::V1::PostsController, type: :controller do
  let!(:posts) { create_list(:post, 15) }

  describe 'GET #index' do
    context 'without query' do
      it 'returns paginated posts' do
        get :index, params: { page: 1 }
        expect(response).to have_http_status(:success)
        json_response = JSON.parse(response.body)
        expect(json_response['posts'].size).to eq(10)
        expect(json_response['page']).to eq(1)
        expect(json_response['per_page']).to eq(10)
        expect(json_response['total_pages']).to eq(2)
      end
    end

    context 'with query' do
      # get a word from the first post
      let(:query) { posts.first.title.split.first }
      it 'returns filtered posts based on the query' do
        get :index, params: { query: query, page: 1 }
        expect(response).to have_http_status(:success)
        json_response = JSON.parse(response.body)
        expect(json_response['posts']).not_to be_empty
        expect(json_response['posts'].all? { |post| post['title'].include?(query) }).to be_truthy
      end
    end

    context 'pagination' do
      it 'returns the correct page of posts' do
        get :index, params: { page: 2 }
        expect(response).to have_http_status(:success)
        json_response = JSON.parse(response.body)
        expect(json_response['posts'].size).to eq(5)
        expect(json_response['page']).to eq(2)
        expect(json_response['per_page']).to eq(10)
        expect(json_response['total_pages']).to eq(2)
      end
    end
  end
end
