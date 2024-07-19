package parser

import (
	"context"
	"errors"
	"testing"
	"time"

	"github.com/mmcdole/gofeed"
	"github.com/stretchr/testify/assert"
)

func TestParse(t *testing.T) {
	tests := []struct {
		name      string
		urls      []string
		parseFunc func(url string, ctx context.Context) (*gofeed.Feed, error)
		expectErr bool
	}{
		{
			name: "Valid feeds",
			urls: []string{"http://example.com/feed1", "http://example.com/feed2"},
			parseFunc: func(url string, ctx context.Context) (*gofeed.Feed, error) {
				return &gofeed.Feed{
					Title: "Test Feed",
					Items: []*gofeed.Item{
						{Title: "Test Item 1", Link: "http://example.com/item1", PublishedParsed: &time.Time{}},
						{Title: "Test Item 2", Link: "http://example.com/item2", PublishedParsed: &time.Time{}},
					},
				}, nil
			},
			expectErr: false,
		},
		{
			name: "Invalid feed URL",
			urls: []string{"http://example.com/feed1"},
			parseFunc: func(url string, ctx context.Context) (*gofeed.Feed, error) {
				return nil, errors.New("failed to parse feed")
			},
			expectErr: true,
		},
	}

	originalFunc := fpParseURLWithContext
	defer func() { fpParseURLWithContext = originalFunc }()
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			fpParseURLWithContext = tt.parseFunc
			items, err := Parse(tt.urls)

			if tt.expectErr {
				assert.Error(t, err)
			} else {
				assert.NoError(t, err)
				assert.Greater(t, len(items), 0)
			}
		})
	}
}

func TestParseTimeout(t *testing.T) {
	urls := []string{"http://example.com/feed1"}
	fpParseURLWithContext = func(url string, ctx context.Context) (*gofeed.Feed, error) {
		time.Sleep(11 * time.Second)
		return nil, errors.New("timeout")
	}

	items, err := Parse(urls)

	assert.Error(t, err)
	assert.Nil(t, items)
}
