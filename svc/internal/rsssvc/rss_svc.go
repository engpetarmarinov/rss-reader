package rsssvc

import (
	"context"
	"encoding/json"
	"fmt"
	"github.com/engpetarmarinov/rss-reader/rss-reader-svc/internal/config"
	"github.com/engpetarmarinov/rss-reader/rss-reader-svc/internal/logger"
	"log"
	"net/http"
)

type RSSService struct {
	config *config.Config
	server *http.Server
}

func New(cfg *config.Config) *RSSService {
	return &RSSService{
		config: cfg,
	}
}

func (r *RSSService) Run() {
	router := NewRouter().RegisterRoutes(r.config)
	go func(mux http.Handler) {
		server := http.Server{
			Addr:    fmt.Sprintf(":%s", r.config.Port),
			Handler: mux,
		}

		r.server = &server
		logger.Info("Listening on", "address", server.Addr)
		if err := server.ListenAndServe(); err != nil {
			log.Fatal(err)
		}
	}(router)

}

func (r *RSSService) Shutdown() {
	if err := r.server.Shutdown(context.Background()); err != nil {
		logger.Error(err.Error())
	}
}

func writeSuccessResponse(w http.ResponseWriter, code int, data any) {
	resp := Response{
		Data:  data,
		Error: nil,
	}

	w.WriteHeader(code)
	if err := json.NewEncoder(w).Encode(resp); err != nil {
		logger.Error("error when trying to write success base.Response", "error", err)
		writeErrorResponse(w, http.StatusInternalServerError, "error when trying to write success base.Response")
	}
}

func writeErrorResponse(w http.ResponseWriter, code int, msg string) {
	resp := Response{
		Error: &ResponseError{
			Code:    code,
			Message: msg,
		},
	}

	w.WriteHeader(code)
	if err := json.NewEncoder(w).Encode(resp); err != nil {
		logger.Error("error when trying to write error base.Response", "error", err)
	}
}
