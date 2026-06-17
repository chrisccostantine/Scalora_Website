package com.scalora.api.controller;

import com.scalora.api.dto.LeadDtos.LeadRequest;
import com.scalora.api.dto.LeadDtos.LeadResponse;
import com.scalora.api.service.LeadService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/leads")
public class LeadController {
  private final LeadService leadService;

  public LeadController(LeadService leadService) {
    this.leadService = leadService;
  }

  @PostMapping
  @ResponseStatus(HttpStatus.CREATED)
  public LeadResponse create(@Valid @RequestBody LeadRequest request) {
    return leadService.create(request);
  }
}
