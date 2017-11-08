package com.fanfodder.aggregator.data.repository;

import java.util.List;
import org.springframework.data.mongodb.repository.MongoRepository;
import com.fanfodder.aggregator.data.model.Feed;

public interface FeedRepository extends MongoRepository<Feed, String> {

  List<Feed> findByTitle(String title);
  Feed findByUrl(String url);
}
