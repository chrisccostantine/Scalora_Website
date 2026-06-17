package com.scalora.api.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "services")
public class Service extends BaseEntity {
  @Column(nullable = false)
  private String title;
  @Column(nullable = false, length = 2000)
  private String description;
  private String icon;
  private Integer displayOrder = 0;
  private boolean active = true;

  public String getTitle() { return title; }
  public void setTitle(String title) { this.title = title; }
  public String getDescription() { return description; }
  public void setDescription(String description) { this.description = description; }
  public String getIcon() { return icon; }
  public void setIcon(String icon) { this.icon = icon; }
  public Integer getDisplayOrder() { return displayOrder; }
  public void setDisplayOrder(Integer displayOrder) { this.displayOrder = displayOrder; }
  public boolean isActive() { return active; }
  public void setActive(boolean active) { this.active = active; }
}
