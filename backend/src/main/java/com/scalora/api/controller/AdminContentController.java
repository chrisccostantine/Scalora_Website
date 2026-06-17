package com.scalora.api.controller;

import com.scalora.api.dto.ContentDtos.ProjectRequest;
import com.scalora.api.dto.ContentDtos.ProjectResponse;
import com.scalora.api.dto.ContentDtos.ServiceRequest;
import com.scalora.api.dto.ContentDtos.ServiceResponse;
import com.scalora.api.dto.ContentDtos.TestimonialRequest;
import com.scalora.api.dto.ContentDtos.TestimonialResponse;
import com.scalora.api.service.ContentService;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/admin")
public class AdminContentController {
  private final ContentService contentService;

  public AdminContentController(ContentService contentService) {
    this.contentService = contentService;
  }

  @GetMapping("/services")
  public List<ServiceResponse> services() { return contentService.allServices(); }

  @PostMapping("/services")
  @ResponseStatus(HttpStatus.CREATED)
  public ServiceResponse createService(@Valid @RequestBody ServiceRequest request) { return contentService.saveService(null, request); }

  @PutMapping("/services/{id}")
  public ServiceResponse updateService(@PathVariable Long id, @Valid @RequestBody ServiceRequest request) { return contentService.saveService(id, request); }

  @DeleteMapping("/services/{id}")
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public void deleteService(@PathVariable Long id) { contentService.deleteService(id); }

  @GetMapping("/projects")
  public List<ProjectResponse> projects() { return contentService.allProjects(); }

  @PostMapping("/projects")
  @ResponseStatus(HttpStatus.CREATED)
  public ProjectResponse createProject(@Valid @RequestBody ProjectRequest request) { return contentService.saveProject(null, request); }

  @PutMapping("/projects/{id}")
  public ProjectResponse updateProject(@PathVariable Long id, @Valid @RequestBody ProjectRequest request) { return contentService.saveProject(id, request); }

  @DeleteMapping("/projects/{id}")
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public void deleteProject(@PathVariable Long id) { contentService.deleteProject(id); }

  @GetMapping("/testimonials")
  public List<TestimonialResponse> testimonials() { return contentService.allTestimonials(); }

  @PostMapping("/testimonials")
  @ResponseStatus(HttpStatus.CREATED)
  public TestimonialResponse createTestimonial(@Valid @RequestBody TestimonialRequest request) { return contentService.saveTestimonial(null, request); }

  @PutMapping("/testimonials/{id}")
  public TestimonialResponse updateTestimonial(@PathVariable Long id, @Valid @RequestBody TestimonialRequest request) { return contentService.saveTestimonial(id, request); }

  @DeleteMapping("/testimonials/{id}")
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public void deleteTestimonial(@PathVariable Long id) { contentService.deleteTestimonial(id); }
}
