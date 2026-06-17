package com.scalora.api.controller;

import com.scalora.api.dto.LeadDtos.LeadResponse;
import com.scalora.api.dto.LeadDtos.LeadStatusRequest;
import com.scalora.api.service.LeadService;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/admin/leads")
public class AdminLeadController {
  private final LeadService leadService;

  public AdminLeadController(LeadService leadService) {
    this.leadService = leadService;
  }

  @GetMapping
  public List<LeadResponse> all() {
    return leadService.findAll();
  }

  @PatchMapping("/{id}/status")
  public LeadResponse status(@PathVariable Long id, @Valid @RequestBody LeadStatusRequest request) {
    return leadService.updateStatus(id, request.status());
  }
}
