package main

import (
	"github.com/engpetarmarinov/rss-reader/rss-reader-svc/internal/config"
	"github.com/engpetarmarinov/rss-reader/rss-reader-svc/internal/logger"
	"github.com/engpetarmarinov/rss-reader/rss-reader-svc/internal/rsssvc"
	"os"
	"os/signal"
	"syscall"
)

func main() {
	opts := config.NewConfigOpt().WithPort().WithLogLevel()
	cfg := config.NewConfig(opts)
	logger.Init(logger.NewConfigOpt().WithLevel(cfg.LogLevel))
	svc := rsssvc.New(cfg)
	svc.Run()

	shutdown := make(chan os.Signal, 1)
	signal.Notify(shutdown, syscall.SIGTERM, syscall.SIGINT)

	<-shutdown
	logger.Info("graceful shutdown...")
	svc.Shutdown()
}
