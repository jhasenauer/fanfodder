package com.fanfodder.aggregator.task;

import java.io.IOException;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;
import org.jsoup.Jsoup;
import org.jsoup.safety.Whitelist;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import com.fanfodder.aggregator.data.model.Feed;
import com.fanfodder.aggregator.data.model.FeedItem;
import com.fanfodder.aggregator.data.repository.FeedItemRepository;
import com.fanfodder.aggregator.data.repository.FeedRepository;
import com.fanfodder.aggregator.util.StringUtils;
import com.rometools.rome.feed.synd.SyndCategory;
import com.rometools.rome.feed.synd.SyndContent;
import com.rometools.rome.feed.synd.SyndEntry;
import com.rometools.rome.feed.synd.SyndFeed;
import com.rometools.rome.feed.synd.SyndPerson;
import com.rometools.rome.io.FeedException;
import com.rometools.rome.io.SyndFeedInput;
import com.rometools.rome.io.XmlReader;

@Component
public class Poller {

  private static final Logger LOGGER = LoggerFactory.getLogger(Poller.class);

  @Autowired
  private FeedRepository feedRepository;
  
  @Autowired
  private FeedItemRepository feedItemRepository;
  
  @Scheduled(fixedDelay = 360000)
  public void pollFeeds() {    
    List<String> feedUrls = new ArrayList<>();    
    feedUrls.add("http://feeds.feedburner.com/Razzball?format=xml");
    feedUrls.add("http://feeds.feedburner.com/RotoAuthorityFantasyBaseball?format=xml");
    feedUrls.add("http://feeds.feedburner.com/BaseballProfessor?format=xml");
    feedUrls.add("http://feeds.feedburner.com/rotofeed?format=xml");
    
    List<Feed> feeds = new ArrayList<>();
    for (String feedUrl : feedUrls) {
      Feed feedObj = new Feed();
      feedObj.setUrl(feedUrl);
      feeds.add(feedObj);
    }

    for (Feed feed : feeds) {
      SyndFeed syndFeed = getSyndFeed(feed.getUrl());
      if (syndFeed != null) {
        feed.setTitle(syndFeed.getTitle());
        feed.setLink(syndFeed.getLink());
        feed.setDescription(syndFeed.getDescription());
        feed.setPubDate(syndFeed.getPublishedDate());
        List<FeedItem> feedItems = new ArrayList<>();
        for (SyndEntry entry : syndFeed.getEntries()) {
          FeedItem feedItem = getFeedItem(entry);
          feedItem.setFeed(feed);
          feedItems.add(feedItem);
        }
        feedRepository.save(feed);
        LOGGER.info("Saved/updated feed " + feed.getUrl());
        feedItemRepository.save(feedItems);
        LOGGER.info("Saved/updated " + feedItems.size() + " feed items");
      }
    }
  }

  private FeedItem getFeedItem(SyndEntry entry) {
    FeedItem feedItem = new FeedItem();
    feedItem.setLink(entry.getLink());
    feedItem.setTitle(entry.getTitle());
    SyndContent description = entry.getDescription();
    String unsafe =
        StringUtils.cleanSmartQuotes(StringUtils.getNonNullValue(description.getValue()));
    String safe = unsafe;
    boolean containsMarkup = Jsoup.isValid(unsafe, Whitelist.simpleText());
    if (containsMarkup) {
      safe = Jsoup.clean(unsafe, Whitelist.relaxed());
    }
    if (safe != null) {
      feedItem.setDescription(safe);
    }
    List<SyndCategory> categories = entry.getCategories();
    List<String> categoryList = new ArrayList<>();
    for (SyndCategory category : categories) {
      categoryList.add(category.getName());
    }
    if (!categoryList.isEmpty()) {
      feedItem.setCategories(categoryList);
    }
    List<SyndPerson> authors = entry.getAuthors();
    List<String> authorList = new ArrayList<>();
    for (SyndPerson author : authors) {
      authorList.add(author.getName());
    }
    if (!authorList.isEmpty()) {
      feedItem.setAuthors(authorList);
    }

    return feedItem;
  }

  private SyndFeed getSyndFeed(String url) {
    SyndFeed feed = null;
    try {
      feed = new SyndFeedInput().build(new XmlReader(new URL(url)));
    } catch (IllegalArgumentException | FeedException | IOException e) {
      LOGGER.error(e.getMessage());
    }
    return feed;
  }
}
