package com.fanfodder.aggregator.data.service;

import java.util.List;
import com.fanfodder.aggregator.data.model.Feed;

public interface FeedService {

  List<Feed> findAll();

  Feed findByUrl(String url);

  Feed saveFeed(Feed feed);

  void deleteFeed(Feed feed);

  boolean exists(String url);
}
