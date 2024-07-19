class CreatePosts < ActiveRecord::Migration[7.2]
  def change
    create_table :posts do |t|
      t.string :title
      t.string :source
      t.string :source_url
      t.string :link
      t.timestamp :publish_date
      t.string :description

      t.timestamps
    end
  end
end
