class Api::V1::PostsController < ApplicationController
  def index
    feed = Post.all.limit(100).order(created_at: :desc)
    render json: feed
  end
end
