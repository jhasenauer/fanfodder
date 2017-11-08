package com.fanfodder.aggregator.data.service.impl;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.fanfodder.aggregator.data.model.Feed;
import com.fanfodder.aggregator.data.repository.FeedRepository;
import com.fanfodder.aggregator.data.service.FeedService;

@Service
public class MongoDbFeedService implements FeedService {

  @Autowired
  private FeedRepository repo;

  @Override
  public List<Feed> findAll() {
    return repo.findAll();
  }

  @Override
  public Feed findByUrl(String url) {
    return repo.findByUrl(url);
  }

  @Override
  public Feed saveFeed(Feed feed) {
    return repo.save(feed);
  }

  @Override
  public void deleteFeed(Feed feed) {
    repo.delete(feed);
  }

  @Override
  public boolean exists(String url) {
    Feed found = repo.findByUrl(url);
    return found != null;
  }
}
