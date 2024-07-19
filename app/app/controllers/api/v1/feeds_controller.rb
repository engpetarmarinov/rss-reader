class Api::V1::FeedsController < ApplicationController
  before_action :set_feed, only: %i[show destroy]

  def index
    feed = Feed.all.order(created_at: :desc, id: :desc)
    render json: feed
  end

  def create
    feed = Feed.create!(feed_params)
    if feed
      FeedsParserJob.perform_later
      render json: feed
    else
      render json: feed.errors
    end
  end

  def show
    render json: @feed
  end

  def destroy
    @feed&.destroy
    FeedsParserJob.perform_later
    render json: { message: "Feed deleted!" }
  end

  private

  def feed_params
    params.permit(:name, :url, :image)
  end

  def set_feed
    @feed = Feed.find(params[:id])
  end

end
