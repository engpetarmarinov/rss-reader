require "jwt"

class JwtTokenService
  SECRET_KEY = Rails.application.config.jwt_secret_key

  def self.generate_token(payload)
    JWT.encode(payload, SECRET_KEY, "HS256")
  end
end
