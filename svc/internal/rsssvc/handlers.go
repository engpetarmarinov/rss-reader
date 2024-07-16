package rsssvc

import (
	"encoding/json"
	"github.com/engpetarmarinov/rss-reader/rss-reader-svc/internal/logger"
	"github.com/engpetarmarinov/rss-reader/rssreaderparser"
	"io"
	"net/http"
)

type PostParseRequest struct {
	Urls []string `json:"urls"`
}

func postParse() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		body, err := io.ReadAll(r.Body)
		if err != nil {
			logger.Warn(err.Error())
			writeErrorResponse(w, http.StatusBadRequest, "error reading body")
			return
		}

		var postParseReq PostParseRequest
		err = json.Unmarshal(body, &postParseReq)
		if err != nil {
			logger.Warn(err.Error())
			writeErrorResponse(w, http.StatusBadRequest, "error unmarshalling request")
			return
		}

		if len(postParseReq.Urls) == 0 {
			writeErrorResponse(w, http.StatusBadRequest, "urls attribute is mandatory")
			return
		}

		//TODO: additional request validation

		rssItems, err := rssreaderparser.Parse(postParseReq.Urls)
		if err != nil {
			logger.Warn(err.Error())
			writeErrorResponse(w, http.StatusInternalServerError, "error parsing body")
			return
		}

		var parseResponse = ParseResponse{}
		for _, item := range rssItems {
			var rssItemResponse = RssItemResponse{
				Title:       item.Title,
				Source:      item.Source,
				SourceURL:   item.SourceURL,
				Link:        item.Link,
				PublishDate: item.PublishDate,
				Description: item.Description,
			}

			parseResponse.Items = append(parseResponse.Items, rssItemResponse)
		}

		writeSuccessResponse(w, http.StatusOK, parseResponse)
	}
}
