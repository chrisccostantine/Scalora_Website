package com.scalora.api.config;

import com.scalora.api.entity.Project;
import com.scalora.api.entity.Role;
import com.scalora.api.entity.Testimonial;
import com.scalora.api.entity.User;
import com.scalora.api.repository.ProjectRepository;
import com.scalora.api.repository.ServiceRepository;
import com.scalora.api.repository.SiteSettingsRepository;
import com.scalora.api.repository.TestimonialRepository;
import com.scalora.api.repository.UserRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DataSeeder {
  @Bean
  CommandLineRunner seed(
      UserRepository users,
      ServiceRepository services,
      ProjectRepository projects,
      TestimonialRepository testimonials,
      SiteSettingsRepository siteSettings,
      PasswordEncoder encoder,
      @Value("${ADMIN_EMAIL:admin@scalora.com}") String adminEmail,
      @Value("${ADMIN_PASSWORD:ChangeMe123!}") String adminPassword
  ) {
    return args -> {
      if (users.findByEmail(adminEmail).isEmpty()) {
        User admin = new User();
        admin.setEmail(adminEmail);
        admin.setPasswordHash(encoder.encode(adminPassword));
        admin.setRole(Role.ADMIN);
        users.save(admin);
      }

      if (services.count() == 0) {
        List.of(
            service("Shopify E-commerce", "Conversion-focused Shopify stores with collections, checkout polish, analytics, and growth foundations.", "ShoppingBag", 1),
            service("Custom Websites", "Fast, modern company websites with clean UX, SEO structure, and CMS-ready content systems.", "MonitorSmartphone", 2),
            service("Portfolio Websites", "Elegant personal and professional portfolio websites that present work with clarity and credibility.", "Palette", 3),
            service("Web Applications", "Secure dashboards, portals, booking tools, internal systems, and SaaS-style applications.", "Code2", 4),
            service("Mobile Applications", "Customer-facing and operational mobile app experiences designed around real usage flows.", "Smartphone", 5),
            service("Social Media Management", "Content calendars, branded posts, creative direction, and consistent visual systems.", "Megaphone", 6),
            service("Academic Software Projects", "University project builds, prototypes, documentation, and polished demos for student teams.", "GraduationCap", 7)
        ).forEach(services::save);
      }

      if (projects.count() == 0) {
        Project store = project("Luxury Shopify Store", "Shopify", "Premium storefront with collections, bundles, analytics, and a refined mobile checkout path.", "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80", true);
        Project portal = project("Student Project Portal", "Web App", "Academic project submission portal with roles, status tracking, and admin review tools.", "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80", false);
        projects.saveAll(List.of(store, portal));
      }

      if (testimonials.count() == 0) {
        testimonials.save(testimonial("Maya H.", "E-commerce Founder", "Scalora made the store feel premium and practical. The launch was clean, fast, and commercially focused.", 1));
        testimonials.save(testimonial("Karim A.", "Startup Operator", "They understood the product quickly and turned a messy workflow into a dashboard our team actually uses.", 2));
      }

      if (siteSettings.count() == 0) {
        com.scalora.api.entity.SiteSettings settings = new com.scalora.api.entity.SiteSettings();
        settings.setAgencyName("Scalora");
        siteSettings.save(settings);
      }
    };
  }

  private com.scalora.api.entity.Service service(String title, String description, String icon, int order) {
    com.scalora.api.entity.Service service = new com.scalora.api.entity.Service();
    service.setTitle(title);
    service.setDescription(description);
    service.setIcon(icon);
    service.setDisplayOrder(order);
    return service;
  }

  private Project project(String title, String category, String summary, String imageUrl, boolean featured) {
    Project project = new Project();
    project.setTitle(title);
    project.setCategory(category);
    project.setSummary(summary);
    project.setImageUrl(imageUrl);
    project.setFeatured(featured);
    return project;
  }

  private Testimonial testimonial(String clientName, String company, String quote, int order) {
    Testimonial testimonial = new Testimonial();
    testimonial.setClientName(clientName);
    testimonial.setCompany(company);
    testimonial.setQuote(quote);
    testimonial.setDisplayOrder(order);
    return testimonial;
  }
}
