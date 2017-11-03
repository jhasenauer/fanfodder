package com.fanfodder.aggregator;

import org.springframework.context.support.ClassPathXmlApplicationContext;

public class Aggregator {

  ClassPathXmlApplicationContext ctx;
  
  public static void main(String[] args) {
    Aggregator driver = new Aggregator();
    driver.config();
  }

  private void config() {
    ctx = new ClassPathXmlApplicationContext("spring-config.xml");
  }

}
