package com.scalora.api.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "projects")
public class Project extends BaseEntity {
  @Column(nullable = false)
  private String title;
  @Column(nullable = false)
  private String category;
  @Column(nullable = false, length = 2000)
  private String summary;
  private String imageUrl;
  private boolean featured;
  private boolean active = true;

  public String getTitle() { return title; }
  public void setTitle(String title) { this.title = title; }
  public String getCategory() { return category; }
  public void setCategory(String category) { this.category = category; }
  public String getSummary() { return summary; }
  public void setSummary(String summary) { this.summary = summary; }
  public String getImageUrl() { return imageUrl; }
  public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
  public boolean isFeatured() { return featured; }
  public void setFeatured(boolean featured) { this.featured = featured; }
  public boolean isActive() { return active; }
  public void setActive(boolean active) { this.active = active; }
}
