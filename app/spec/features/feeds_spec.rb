require 'rails_helper'

RSpec.feature "Feeds", type: :feature do
  let!(:feeds) { create_list(:feed, 5) }

  scenario 'User views the list of feeds' do
    visit '/feeds'
    expect(page).to have_content('Feeds')
    feeds.each do |feed|
      expect(page).to have_content(feed.name)
    end
  end

  scenario 'User creates a new feed' do
    visit '/feeds/new'
    fill_in 'name', with: 'Test My Feed'
    fill_in 'url', with: 'http://example.com'
    fill_in 'image', with: 'http://example.com/image.jpg'
    click_button 'Create Feed'
    expect(page).to have_content('Test My Feed')
  end

  scenario 'User views a single feed' do
    feed = feeds.first
    visit "/feeds/#{feed.id}"
    expect(page).to have_content(feed.name)
    expect(page).to have_content(feed.url)
  end
end
