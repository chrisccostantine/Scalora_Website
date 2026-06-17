package com.scalora.api.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "testimonials")
public class Testimonial extends BaseEntity {
  @Column(nullable = false)
  private String clientName;
  private String company;
  @Column(nullable = false, length = 2000)
  private String quote;
  private Integer displayOrder = 0;
  private boolean active = true;

  public String getClientName() { return clientName; }
  public void setClientName(String clientName) { this.clientName = clientName; }
  public String getCompany() { return company; }
  public void setCompany(String company) { this.company = company; }
  public String getQuote() { return quote; }
  public void setQuote(String quote) { this.quote = quote; }
  public Integer getDisplayOrder() { return displayOrder; }
  public void setDisplayOrder(Integer displayOrder) { this.displayOrder = displayOrder; }
  public boolean isActive() { return active; }
  public void setActive(boolean active) { this.active = active; }
}
