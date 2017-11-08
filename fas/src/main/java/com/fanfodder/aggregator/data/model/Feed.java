package com.fanfodder.aggregator.data.model;

import java.util.Date;
import java.util.List;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "feeds")
public class Feed {

  @Id
  private String url;
  private String title;
  private String description;
  private String link;
  private Date pubDate;
  private Date lastBuildDate;
  private Date dateAdded;
  private Date lastProcessedDate;
  private boolean status = true;

  @Transient
  private List<FeedItem> feedItems;

  /**
   * @return the url
   */
  public String getUrl() {
    return url;
  }

  /**
   * @param url the url to set
   */
  public void setUrl(String url) {
    this.url = url;
  }

  /**
   * @return the title
   */
  public String getTitle() {
    return title;
  }

  /**
   * @param title the title to set
   */
  public void setTitle(String title) {
    this.title = title;
  }

  /**
   * @return the description
   */
  public String getDescription() {
    return description;
  }

  /**
   * @param description the description to set
   */
  public void setDescription(String description) {
    this.description = description;
  }

  /**
   * @return the link
   */
  public String getLink() {
    return link;
  }

  /**
   * @param link the link to set
   */
  public void setLink(String link) {
    this.link = link;
  }

  /**
   * @return the pubDate
   */
  public Date getPubDate() {
    return pubDate;
  }

  /**
   * @param pubDate the pubDate to set
   */
  public void setPubDate(Date pubDate) {
    this.pubDate = pubDate;
  }

  /**
   * @return the lastBuildDate
   */
  public Date getLastBuildDate() {
    return lastBuildDate;
  }

  /**
   * @param lastBuildDate the lastBuildDate to set
   */
  public void setLastBuildDate(Date lastBuildDate) {
    this.lastBuildDate = lastBuildDate;
  }

  /**
   * @return the dateAdded
   */
  public Date getDateAdded() {
    return dateAdded;
  }

  /**
   * @param dateAdded the dateAdded to set
   */
  public void setDateAdded(Date dateAdded) {
    this.dateAdded = dateAdded;
  }

  /**
   * @return the lastProcessedDate
   */
  public Date getLastProcessedDate() {
    return lastProcessedDate;
  }

  /**
   * @param lastProcessedDate the lastProcessedDate to set
   */
  public void setLastProcessedDate(Date lastProcessedDate) {
    this.lastProcessedDate = lastProcessedDate;
  }

  /**
   * @return the status
   */
  public boolean isStatus() {
    return status;
  }

  /**
   * @param status the status to set
   */
  public void setStatus(boolean status) {
    this.status = status;
  }

  /**
   * @return the feedItems
   */
  public List<FeedItem> getFeedItems() {
    return feedItems;
  }

  /**
   * @param feedItems the feedItems to set
   */
  public void setFeedItems(List<FeedItem> feedItems) {
    this.feedItems = feedItems;
  }
}
