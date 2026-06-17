package com.scalora.api.service;

import com.scalora.api.dto.LeadDtos.LeadRequest;
import com.scalora.api.dto.LeadDtos.LeadResponse;
import com.scalora.api.entity.Lead;
import com.scalora.api.entity.LeadStatus;
import com.scalora.api.exception.ResourceNotFoundException;
import com.scalora.api.repository.LeadRepository;
import java.util.List;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class LeadService {
  private final LeadRepository repository;

  public LeadService(LeadRepository repository) {
    this.repository = repository;
  }

  @Transactional
  public LeadResponse create(LeadRequest request) {
    Lead lead = new Lead();
    lead.setName(request.name());
    lead.setEmail(request.email());
    lead.setPhone(request.phone());
    lead.setCompany(request.company());
    lead.setProjectType(request.projectType());
    lead.setMessage(request.message());
    return toResponse(repository.save(lead));
  }

  @Transactional(readOnly = true)
  public List<LeadResponse> findAll() {
    return repository.findAll(Sort.by(Sort.Direction.DESC, "createdAt")).stream().map(this::toResponse).toList();
  }

  @Transactional
  public LeadResponse updateStatus(Long id, LeadStatus status) {
    Lead lead = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Lead not found"));
    lead.setStatus(status);
    return toResponse(lead);
  }

  private LeadResponse toResponse(Lead lead) {
    return new LeadResponse(lead.getId(), lead.getName(), lead.getEmail(), lead.getPhone(), lead.getCompany(), lead.getProjectType(), lead.getMessage(), lead.getStatus(), lead.getCreatedAt());
  }
}
