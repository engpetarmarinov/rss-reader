# RSS Reader Service

## Run locally:

```bash
LOG_LEVEL=DEBUG RSS_READER_SVC_PORT=8080 go run cmd/rss-reader-svc/main.go 
```

## Run tests:

```bash
go test -race ./...
```

Example parse request:

```bash
curl --location 'http://localhost:8080/api/v1/parse' \
--header 'Content-Type: application/json' \
--data '{
    "urls": [
        "https://cprss.s3.amazonaws.com/golangweekly.com.xml",
        "https://feeds.twit.tv/twit.xml"
    ]
}'
```
