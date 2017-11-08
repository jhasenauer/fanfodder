package com.fanfodder.aggregator.data.service;

import java.util.List;
import com.fanfodder.aggregator.data.model.FeedItem;

public interface FeedItemService {

  List<FeedItem> findAll();

  FeedItem addFeedItem(FeedItem feedItem);

  List<FeedItem> addFeedItems(List<FeedItem> feedItems);

  boolean exists(String link);
}
