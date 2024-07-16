package rssreaderparser

import (
	"context"
	"fmt"
	"sync"
	"time"
)

import (
	"github.com/mmcdole/gofeed"
)

var fpParseURLWithContext = gofeed.NewParser().ParseURLWithContext

// RssItem represents an item of a RSS feed
type RssItem struct {
	Title       string
	Source      string
	SourceURL   string
	Link        string
	PublishDate *time.Time
	Description string
}

// Parse parses a slice of URL feeds asynchronously, returns a slice of RSS feed items or an error
func Parse(urls []string) ([]RssItem, error) {
	ctx, cancel := context.WithDeadline(context.Background(), time.Now().Add(10*time.Second))
	defer cancel()

	numURLs := len(urls)
	resultsChan := make(chan []RssItem, numURLs)
	errorChan := make(chan error)
	wg := &sync.WaitGroup{}
	for _, url := range urls {
		wg.Add(1)
		go parse(ctx, wg, resultsChan, errorChan, url)
	}

	go func() {
		wg.Wait()
		close(resultsChan)
		close(errorChan)
	}()

	err := <-errorChan
	if err != nil {
		return nil, err
	}

	items := make([]RssItem, 0)
	for r := range resultsChan {
		for _, item := range r {
			items = append(items, item)
		}
	}

	return items, nil
}

func parse(ctx context.Context, wg *sync.WaitGroup, resultChan chan<- []RssItem, errorChan chan<- error, url string) {
	defer wg.Done()
	feed, err := fpParseURLWithContext(url, ctx)
	if err != nil {
		select {
		case errorChan <- fmt.Errorf("error parsing url %s, err: %w", url, err):
			return
		case <-ctx.Done():
			errorChan <- fmt.Errorf("cancelled parsing url %s, err: %w", url, ctx.Err())
			return
		}
	}

	fmt.Println("Feed title", feed.Title)

	items := make([]RssItem, 0)
	for _, item := range feed.Items {
		resultItem := RssItem{
			Title: item.Title,
			//TODO: check what is source and sourceURL
			Source:      item.GUID,
			SourceURL:   item.Link,
			Link:        item.Link,
			PublishDate: item.PublishedParsed,
			Description: item.Description,
		}

		items = append(items, resultItem)
	}

	select {
	case <-ctx.Done():
		return
	case resultChan <- items:
		return
	}
}
