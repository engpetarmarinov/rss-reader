require 'rails_helper'

RSpec.describe Api::V1::FeedsController, type: :controller do
  let(:valid_attributes) { { name: 'Sample Feed', url: 'http://example.com/feed', image: 'http://example.com/image.png' } }
  let(:invalid_attributes) { { name: '', url: '', image: 'invalid_url' } }
  let!(:feed) { create(:feed) }

  describe 'GET #index' do
    it 'returns a successful response' do
      get :index
      expect(response).to have_http_status(:success)
      expect(JSON.parse(response.body)).not_to be_empty
    end
  end

  describe 'POST #create' do
    context 'with valid parameters' do
      it 'creates a new Feed' do
        expect {
          post :create, params: valid_attributes
        }.to change(Feed, :count).by(1)
      end

      it 'renders a JSON response with the new feed' do
        post :create, params: valid_attributes
        expect(response).to have_http_status(:created)
        expect(JSON.parse(response.body)['name']).to eq('Sample Feed')
      end
    end

    context 'with invalid parameters' do
      it 'does not create a new Feed' do
        expect {
          post :create, params: invalid_attributes
        }.to change(Feed, :count).by(0)
      end

      it 'renders a JSON response with errors' do
        post :create, params: invalid_attributes
        expect(response).to have_http_status(:unprocessable_entity)
        expect(JSON.parse(response.body)).to have_key('errors')
      end
    end
  end

  describe 'GET #show' do
    it 'returns a successful response' do
      get :show, params: { id: feed.id }
      expect(response).to have_http_status(:success)
      expect(JSON.parse(response.body)['id']).to eq(feed.id)
    end
  end

  describe 'DELETE #destroy' do
    it 'destroys the requested feed' do
      expect {
        delete :destroy, params: { id: feed.id }
      }.to change(Feed, :count).by(-1)
    end

    it 'renders a JSON response with a message' do
      delete :destroy, params: { id: feed.id }
      expect(response).to have_http_status(:success)
      expect(JSON.parse(response.body)['message']).to eq('Feed deleted!')
    end
  end
end
