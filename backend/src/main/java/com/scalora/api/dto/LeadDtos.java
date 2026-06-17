package com.scalora.api.dto;

import com.scalora.api.entity.LeadStatus;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.time.Instant;

public final class LeadDtos {
  private LeadDtos() {}

  public record LeadRequest(
      @NotBlank @Size(max = 120) String name,
      @Email @NotBlank @Size(max = 160) String email,
      @Size(max = 60) String phone,
      @Size(max = 160) String company,
      @NotBlank @Size(max = 120) String projectType,
      @NotBlank @Size(max = 3000) String message
  ) {}

  public record LeadResponse(Long id, String name, String email, String phone, String company, String projectType, String message, LeadStatus status, Instant createdAt) {}
  public record LeadStatusRequest(@NotNull LeadStatus status) {}
}
