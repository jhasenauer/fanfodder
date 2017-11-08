package com.fanfodder.aggregator.data.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.fanfodder.aggregator.data.model.FeedItem;

public interface FeedItemRepository extends MongoRepository<FeedItem, String> {

  FeedItem findByLink(String link);
}
