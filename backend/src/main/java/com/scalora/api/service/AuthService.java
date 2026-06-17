package com.scalora.api.service;

import com.scalora.api.dto.AuthDtos.AuthResponse;
import com.scalora.api.dto.AuthDtos.LoginRequest;
import com.scalora.api.security.JwtService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
  private final AuthenticationManager authenticationManager;
  private final JwtService jwtService;

  public AuthService(AuthenticationManager authenticationManager, JwtService jwtService) {
    this.authenticationManager = authenticationManager;
    this.jwtService = jwtService;
  }

  public AuthResponse login(LoginRequest request) {
    Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.email(), request.password()));
    UserDetails principal = (UserDetails) authentication.getPrincipal();
    String role = principal.getAuthorities().iterator().next().getAuthority().replace("ROLE_", "");
    return new AuthResponse(jwtService.generate(principal), "Bearer", principal.getUsername(), role);
  }
}
