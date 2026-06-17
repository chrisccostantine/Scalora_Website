package com.scalora.api.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public final class AuthDtos {
  private AuthDtos() {}

  public record LoginRequest(@Email @NotBlank String email, @NotBlank String password) {}
  public record AuthResponse(String token, String tokenType, String email, String role) {}
}
