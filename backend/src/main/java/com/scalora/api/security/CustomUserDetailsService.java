package com.scalora.api.security;

import com.scalora.api.repository.UserRepository;
import java.util.List;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {
  private final UserRepository repository;

  public CustomUserDetailsService(UserRepository repository) {
    this.repository = repository;
  }

  @Override
  public UserDetails loadUserByUsername(String email) {
    com.scalora.api.entity.User user = repository.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException("Invalid credentials"));
    return new org.springframework.security.core.userdetails.User(
        user.getEmail(),
        user.getPasswordHash(),
        user.isEnabled(),
        true,
        true,
        true,
        List.of(new SimpleGrantedAuthority("ROLE_" + user.getRole().name()))
    );
  }
}
