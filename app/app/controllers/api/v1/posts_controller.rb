class Api::V1::PostsController < ApplicationController
  def index
    feed = Post.all.limit(100).order(updated_at: :desc, id: :desc).pluck(:title, :link).map {
      |title, link| { title: title, link: link }
    }

    render json: feed
  end
end
