require 'rails_helper'

RSpec.feature "Posts", type: :feature do
  let!(:posts) { create_list(:post, 15).sort_by { |post| [-post.updated_at.to_i, -post.id] } }

  scenario 'User views the list of posts' do
    visit '/posts'
    expect(page).to have_content('Posts')
    posts.first(10).each do |post|
      expect(page).to have_content(post.title)
    end
  end

  scenario 'User views the second page of posts' do
    visit '/posts'
    expect(page).to have_content('Posts')
    # go to page 2
    click_button '2'
    posts.last(5).each do |post|
      expect(page).to have_content(post.title)
    end
  end
end
