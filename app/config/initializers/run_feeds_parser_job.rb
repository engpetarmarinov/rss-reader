Rails.application.config.after_initialize do
  FeedsParserJob.perform_later
end
