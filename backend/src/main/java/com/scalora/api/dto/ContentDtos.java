package com.scalora.api.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import java.util.List;

public final class ContentDtos {
  private ContentDtos() {}

  public record ServiceRequest(@NotBlank String title, @NotBlank @Size(max = 2000) String description, String icon, Integer displayOrder, Boolean active) {}
  public record ServiceResponse(Long id, String title, String description, String icon, Integer displayOrder, Boolean active) {}

  public record ProjectRequest(@NotBlank String title, @NotBlank String category, @NotBlank @Size(max = 2000) String summary, String imageUrl, Boolean featured, Boolean active) {}
  public record ProjectResponse(Long id, String title, String category, String summary, String imageUrl, Boolean featured, Boolean active) {}

  public record TestimonialRequest(@NotBlank String clientName, String company, @NotBlank @Size(max = 2000) String quote, Integer displayOrder, Boolean active) {}
  public record TestimonialResponse(Long id, String clientName, String company, String quote, Integer displayOrder, Boolean active) {}

  public record PublicContentResponse(List<ServiceResponse> services, List<ProjectResponse> projects, List<TestimonialResponse> testimonials) {}
}
