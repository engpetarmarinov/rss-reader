class Api::V1::PostsController < ApplicationController
  def index
    page = params[:page].to_i || 1
    per_page = 6
    posts = Post.order(updated_at: :desc, id: :desc)
                .page(page)
                .per(per_page)
                .pluck(:title, :link)
                .map { |title, link| { title: title, link: link } }
    total_pages = (Post.count.to_f / per_page).ceil

    render json: {
      posts: posts,
      page: page,
      per_page: per_page,
      total_pages: total_pages
    }
  end
end
