package com.scalora.api.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "site_settings")
public class SiteSettings extends BaseEntity {
  @Column(nullable = false)
  private String agencyName = "Scalora";
  @Column(columnDefinition = "TEXT")
  private String logoUrl;

  public String getAgencyName() { return agencyName; }
  public void setAgencyName(String agencyName) { this.agencyName = agencyName; }
  public String getLogoUrl() { return logoUrl; }
  public void setLogoUrl(String logoUrl) { this.logoUrl = logoUrl; }
}
