class Feed < ApplicationRecord
  validates :name, presence: true
  validates :url, presence: true
  before_save :sanitize_attributes

  def sanitize_attributes
    self.name = ActionController::Base.helpers.sanitize(self.name, tags: [])
    self.url = ActionController::Base.helpers.sanitize(self.url, tags: [])
    self.image = ActionController::Base.helpers.sanitize(self.image, tags: [])
  end
end
