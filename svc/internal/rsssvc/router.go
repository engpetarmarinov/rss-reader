package rsssvc

import (
	mw "github.com/engpetarmarinov/rss-reader/rss-reader-svc/internal/middleware"
	"net/http"
)

type Router struct {
	mux *http.ServeMux
}

func NewRouter() *Router {
	return &Router{
		mux: http.NewServeMux(),
	}
}

func (r *Router) RegisterRoutes() http.Handler {
	r.mux.HandleFunc(
		"POST /api/v1/parse",
		mw.WithLogging(mw.WithCommonHeaders(mw.WithAuth(postParse()))))

	return r.mux
}
