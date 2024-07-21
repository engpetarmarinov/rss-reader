package middleware

import (
	"fmt"
	"github.com/engpetarmarinov/rss-reader/rss-reader-svc/internal/config"
	"github.com/engpetarmarinov/rss-reader/rss-reader-svc/internal/logger"
	"github.com/golang-jwt/jwt/v4"
	"net/http"
	"strings"
	"time"
)

func WithAuth(next http.HandlerFunc, cfg *config.Config) http.HandlerFunc {
	return func(rw http.ResponseWriter, r *http.Request) {
		jwtSecret := []byte(cfg.JWTSecretKey)
		authHeader := r.Header.Get("Authorization")
		if authHeader == "" {
			http.Error(rw, "Authorization header is missing", http.StatusUnauthorized)
			return
		}

		parts := strings.Split(authHeader, " ")
		if len(parts) != 2 || parts[0] != "Bearer" {
			http.Error(rw, "Invalid Authorization header format", http.StatusUnauthorized)
			return
		}

		tokenString := parts[1]
		claims := &jwt.RegisteredClaims{}
		token, err := jwt.ParseWithClaims(tokenString, claims, func(token *jwt.Token) (interface{}, error) {
			// Validate the signing method
			if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
				return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
			}
			return jwtSecret, nil
		})

		if err != nil || !token.Valid {
			logger.Warn("Invalid token", "err", err)
			http.Error(rw, "Invalid token", http.StatusUnauthorized)
			return
		}

		if claims.ExpiresAt == nil || time.Now().After(claims.ExpiresAt.Time) {
			logger.Warn("Expired token")
			http.Error(rw, "Token is expired", http.StatusUnauthorized)
			return
		}

		next.ServeHTTP(rw, r)
	}
}
