package com.fanfodder.aggregator.data.service.impl;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.fanfodder.aggregator.data.model.FeedItem;
import com.fanfodder.aggregator.data.repository.FeedItemRepository;
import com.fanfodder.aggregator.data.service.FeedItemService;

@Service
public class MongoDbFeedItemService implements FeedItemService {

  @Autowired
  private FeedItemRepository repo;

  @Override
  public List<FeedItem> findAll() {
    return repo.findAll();
  }

  @Override
  public FeedItem addFeedItem(FeedItem feedItem) {
    return repo.save(feedItem);
  }

  @Override
  public List<FeedItem> addFeedItems(List<FeedItem> feedItems) {
    return repo.save(feedItems);
  }

  @Override
  public boolean exists(String link) {
    FeedItem found = repo.findByLink(link);
    return found != null;
  }
}
