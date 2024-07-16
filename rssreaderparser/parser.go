package rssreaderparser

import (
	"context"
	"fmt"
	"time"
)

import (
	"github.com/mmcdole/gofeed"
)

type RssItem struct {
	Title       string
	Source      string
	SourceURL   string
	Link        string
	PublishDate *time.Time
	Description string
}

func Parse(urls []string) ([]RssItem, error) {
	ctx, cancel := context.WithDeadline(context.Background(), time.Now().Add(5*time.Second))
	defer cancel()
	items := make([]RssItem, 0)
	fp := gofeed.NewParser()
	fp.UserAgent = "RssReader"
	for _, url := range urls {
		feed, _ := fp.ParseURLWithContext(url, ctx)
		fmt.Println("Feed title", feed.Title)

		for _, item := range feed.Items {
			items = append(items, RssItem{
				Title:       item.Title,
				Source:      "",
				SourceURL:   "",
				Link:        item.Link,
				PublishDate: item.PublishedParsed,
				Description: item.Description,
			})
		}

	}

	return items, nil
}
