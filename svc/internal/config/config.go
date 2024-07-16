package config

import (
	"os"

	"github.com/engpetarmarinov/rss-reader/rss-reader-svc/internal/logger"
)

func NewConfig() *Config {
	return &Config{}
}

type Config struct {
}

func (c *Config) Get(key string) string {
	return os.Getenv(key)
}

func (c *Config) GetLogLevel() logger.Level {
	logLevel := c.Get("LOG_LEVEL")
	return logger.NewLogLevel(logLevel)
}
