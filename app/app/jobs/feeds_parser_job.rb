class FeedsParserJob < ApplicationJob
  queue_as :urgent

  def perform(*args)
    feeds_parser_url = Rails.configuration.feeds_parser["url"]
    # TODO: just parsing every urls for now
    urls = Feed.all.order(updated_at: :desc, id: :desc).limit(100).pluck(:url)
    if urls.empty?
      # No feed urls left, remove posts
      Post.delete_all
      return
    end

    response = HTTParty.post(
      feeds_parser_url + "/api/v1/parse",
      body: {
        urls: urls
      }.to_json,
      headers: { "Content-Type" => "application/json" }
    )

    if response.success?
      parsed_response = response.parsed_response
      items = parsed_response['data']['items']
      if items.present?
        populate_posts(items)
      end
    else
      Rails.logger.error "Failed to parse feed urls. Response: #{response}"
    end

  end

  private

  def populate_posts(items)
    posts = []
    items.each do |item|
      post = Post.new(
        :title => item['title'],
        :link => item['link'],
        :source => item['source'],
        :source_url => item['source_url'],
        :publish_date => item['publish_date'],
        :description => item['description'])
      posts << post
    end

    Post.transaction do
      Post.delete_all
      posts.each(&:save!)
    end
  rescue ActiveRecord::RecordInvalid => e
    Rails.logger.error "Failed to save posts: #{e.message}"
    Rails.logger.error e.backtrace.join("\n")
    raise e # Reraise the exception to ensure the job is marked as failed
  end

end
