FROM golang:1.22.0-alpine3.19 AS builder
# Install CA certificates
RUN apk update && apk add --no-cache ca-certificates
WORKDIR /build
COPY . .
RUN go get -d -v ./...
RUN go build -ldflags="-w -s" -o /go/bin/rss-reader-svc /build/cmd/rss-reader-svc/main.go
FROM scratch
# Copy the CA certificates
COPY --from=builder /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/
COPY --from=builder /go/bin/rss-reader-svc /go/bin/rss-reader-svc
ENTRYPOINT ["/go/bin/rss-reader-svc"]
