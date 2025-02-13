class Post < ApplicationRecord
  include PgSearch::Model
  before_save :sanitize_attributes

  def sanitize_attributes
    self.title = ActionController::Base.helpers.sanitize(self.title, tags: [])
    self.link = ActionController::Base.helpers.sanitize(self.link, tags: [])
    self.source = ActionController::Base.helpers.sanitize(self.source, tags: [])
    self.source_url = ActionController::Base.helpers.sanitize(self.source_url, tags: [])
    self.description = ActionController::Base.helpers.sanitize(self.description, tags: [])
  end

  pg_search_scope :search_by_title,
                  against: :title,
                  using: {
                    tsearch: { prefix: true }
                  }
end
