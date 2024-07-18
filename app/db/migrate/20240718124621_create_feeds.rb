class CreateFeeds < ActiveRecord::Migration[7.2]
  def change
    create_table :feeds do |t|
      t.string :name, null: false
      t.string :url, null: false
      t.string :image, default: 'https://upload.wikimedia.org/wikipedia/en/4/43/Feed-icon.svg'

      t.timestamps
    end
  end
end
