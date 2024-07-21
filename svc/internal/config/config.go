package config

import (
	"log"
	"os"
)

// Config holds the configuration values
type Config struct {
	LogLevel     string
	Port         string
	JWTSecretKey string
}

// Options holds the configuration options for building a Config.
type Options struct {
	logLevel     string
	port         string
	jwtSecretKey string
}

// NewConfig creates a new Config struct and applies the provided options.
func NewConfig(opts *Options) *Config {
	return &Config{
		LogLevel:     opts.logLevel,
		Port:         opts.port,
		JWTSecretKey: opts.jwtSecretKey,
	}
}

// NewConfigOpt initializes a new Options struct with default values.
func NewConfigOpt() *Options {
	return &Options{}
}

// WithLogLevel sets the log level in the Options.
func (o *Options) WithLogLevel() *Options {
	o.logLevel = getEnv("RSS_READER_SVC_LOG_LEVEL")
	return o
}

// WithPort sets the port in the Options.
func (o *Options) WithPort() *Options {
	o.port = getEnv("RSS_READER_SVC_PORT")
	return o
}

// WithJWTSecret sets the jwtSecretKey in the Options.
func (o *Options) WithJWTSecret() *Options {
	o.jwtSecretKey = getEnv("JWT_SECRET_KEY")
	return o
}

func getEnv(key string) string {
	value, exists := os.LookupEnv(key)
	if !exists {
		log.Panicf("Environment variable %s is not set", key)
	}
	return value
}
