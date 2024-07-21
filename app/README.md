# RSS Reader Application

## Run locally:
### Prerequisites:
* ruby
* docker and docker compose

```bash
bin/bundle install
sudo docker compose up -d db rsssvc && \
bin/dev
```

Seed the DB:
```bash
bin/rails db:seed && \
bin/rails runner "FeedsParserJob.perform_now"
```

## Run tests:

```bash
sudo docker compose up -d db && \
bin/bundle exec rspec
```
