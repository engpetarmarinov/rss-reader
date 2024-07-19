class Api::V1::PostsController < ApplicationController
  def index
    page = params[:page].to_i || 1
    per_page = 10
    query = params[:query]
    posts = Post.order(updated_at: :desc, id: :desc)
    posts = posts.search_by_title(query) if query.present?
    total_pages = (posts.count.to_f / per_page).ceil
    paginated_posts = posts.page(page).per(per_page).pluck(:title, :link).map { |title, link| { title: title, link: link } }

    render json: {
      posts: paginated_posts,
      page: page,
      per_page: per_page,
      total_pages: total_pages
    }
  end
end
