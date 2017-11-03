package com.fanfodder.aggregator.data.model;

import java.util.Date;
import java.util.List;

public class FeedItem {

  private Feed feed;

  private String link;
  private String title;
  private String description;
  private Date pubDate;
  private String encodedContent;
  private Date updatedDate;
  private List<String> authors;
  private List<String> categories;

  /**
   * @return the feed
   */
  public Feed getFeed() {
    return feed;
  }

  /**
   * @param feed the feed to set
   */
  public void setFeed(Feed feed) {
    this.feed = feed;
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
   * @return the encodedContent
   */
  public String getEncodedContent() {
    return encodedContent;
  }

  /**
   * @param encodedContent the encodedContent to set
   */
  public void setEncodedContent(String encodedContent) {
    this.encodedContent = encodedContent;
  }

  /**
   * @return the updatedDate
   */
  public Date getUpdatedDate() {
    return updatedDate;
  }

  /**
   * @param updatedDate the updatedDate to set
   */
  public void setUpdatedDate(Date updatedDate) {
    this.updatedDate = updatedDate;
  }

  /**
   * @return the authors
   */
  public List getAuthors() {
    return authors;
  }

  /**
   * @param authors the authors to set
   */
  public void setAuthors(List authors) {
    this.authors = authors;
  }

  /**
   * @return the categories
   */
  public List getCategories() {
    return categories;
  }

  /**
   * @param categories the categories to set
   */
  public void setCategories(List categories) {
    this.categories = categories;
  }
}
