package rsssvc

import "time"

// Response represents the response contract
// swagger:response Response
type Response struct {
	Data  any            `json:"data,omitempty"`
	Error *ResponseError `json:"error,omitempty"`
}

type ResponseError struct {
	Code    int    `json:"code"`
	Message string `json:"message"`
}

type ParseResponse struct {
	Items []RssItemResponse `json:"items"`
}

type RssItemResponse struct {
	Title       string     `json:"title"`
	Source      string     `json:"source"`
	SourceURL   string     `json:"source_url"`
	Link        string     `json:"link"`
	PublishDate *time.Time `json:"publish_date,omitempty"`
	Description string     `json:"description"`
}
