package com.scalora.api.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Table;

@Entity
@Table(name = "leads")
public class Lead extends BaseEntity {
  @Column(nullable = false)
  private String name;
  @Column(nullable = false)
  private String email;
  private String phone;
  private String company;
  @Column(nullable = false)
  private String projectType;
  @Column(nullable = false, length = 3000)
  private String message;
  @Enumerated(EnumType.STRING)
  @Column(nullable = false)
  private LeadStatus status = LeadStatus.NEW;

  public String getName() { return name; }
  public void setName(String name) { this.name = name; }
  public String getEmail() { return email; }
  public void setEmail(String email) { this.email = email; }
  public String getPhone() { return phone; }
  public void setPhone(String phone) { this.phone = phone; }
  public String getCompany() { return company; }
  public void setCompany(String company) { this.company = company; }
  public String getProjectType() { return projectType; }
  public void setProjectType(String projectType) { this.projectType = projectType; }
  public String getMessage() { return message; }
  public void setMessage(String message) { this.message = message; }
  public LeadStatus getStatus() { return status; }
  public void setStatus(LeadStatus status) { this.status = status; }
}
