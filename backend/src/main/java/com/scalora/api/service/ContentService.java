package com.scalora.api.service;

import com.scalora.api.dto.ContentDtos.ProjectRequest;
import com.scalora.api.dto.ContentDtos.ProjectResponse;
import com.scalora.api.dto.ContentDtos.PublicContentResponse;
import com.scalora.api.dto.ContentDtos.ServiceRequest;
import com.scalora.api.dto.ContentDtos.ServiceResponse;
import com.scalora.api.dto.ContentDtos.BrandSettingsRequest;
import com.scalora.api.dto.ContentDtos.BrandSettingsResponse;
import com.scalora.api.dto.ContentDtos.TestimonialRequest;
import com.scalora.api.dto.ContentDtos.TestimonialResponse;
import com.scalora.api.entity.Project;
import com.scalora.api.entity.SiteSettings;
import com.scalora.api.entity.Testimonial;
import com.scalora.api.exception.ResourceNotFoundException;
import com.scalora.api.repository.ProjectRepository;
import com.scalora.api.repository.ServiceRepository;
import com.scalora.api.repository.SiteSettingsRepository;
import com.scalora.api.repository.TestimonialRepository;
import java.util.List;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ContentService {
  private final ServiceRepository serviceRepository;
  private final ProjectRepository projectRepository;
  private final TestimonialRepository testimonialRepository;
  private final SiteSettingsRepository siteSettingsRepository;

  public ContentService(ServiceRepository serviceRepository, ProjectRepository projectRepository, TestimonialRepository testimonialRepository, SiteSettingsRepository siteSettingsRepository) {
    this.serviceRepository = serviceRepository;
    this.projectRepository = projectRepository;
    this.testimonialRepository = testimonialRepository;
    this.siteSettingsRepository = siteSettingsRepository;
  }

  @Transactional(readOnly = true)
  public PublicContentResponse publicContent() {
    return new PublicContentResponse(
        serviceRepository.findByActiveTrueOrderByDisplayOrderAsc().stream().map(this::serviceResponse).toList(),
        projectRepository.findByActiveTrueOrderByFeaturedDescCreatedAtDesc().stream().map(this::projectResponse).toList(),
        testimonialRepository.findByActiveTrueOrderByDisplayOrderAsc().stream().map(this::testimonialResponse).toList(),
        brandSettingsResponse(settings())
    );
  }

  @Transactional(readOnly = true)
  public BrandSettingsResponse brandSettings() {
    return brandSettingsResponse(settings());
  }

  @Transactional
  public BrandSettingsResponse saveBrandSettings(BrandSettingsRequest request) {
    SiteSettings settings = settings();
    settings.setAgencyName(request.agencyName() == null || request.agencyName().isBlank() ? "Scalora" : request.agencyName());
    settings.setLogoUrl(request.logoUrl());
    return brandSettingsResponse(siteSettingsRepository.save(settings));
  }

  @Transactional(readOnly = true)
  public List<ServiceResponse> allServices() {
    return serviceRepository.findAll(Sort.by("displayOrder")).stream().map(this::serviceResponse).toList();
  }

  @Transactional
  public ServiceResponse saveService(Long id, ServiceRequest request) {
    com.scalora.api.entity.Service service = id == null ? new com.scalora.api.entity.Service() : serviceRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Service not found"));
    service.setTitle(request.title());
    service.setDescription(request.description());
    service.setIcon(request.icon());
    service.setDisplayOrder(request.displayOrder() == null ? 0 : request.displayOrder());
    service.setActive(request.active() == null || request.active());
    return serviceResponse(serviceRepository.save(service));
  }

  @Transactional
  public void deleteService(Long id) {
    serviceRepository.deleteById(id);
  }

  @Transactional(readOnly = true)
  public List<ProjectResponse> allProjects() {
    return projectRepository.findAll(Sort.by(Sort.Direction.DESC, "createdAt")).stream().map(this::projectResponse).toList();
  }

  @Transactional
  public ProjectResponse saveProject(Long id, ProjectRequest request) {
    Project project = id == null ? new Project() : projectRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Project not found"));
    project.setTitle(request.title());
    project.setCategory(request.category());
    project.setSummary(request.summary());
    project.setImageUrl(request.imageUrl());
    project.setFeatured(Boolean.TRUE.equals(request.featured()));
    project.setActive(request.active() == null || request.active());
    return projectResponse(projectRepository.save(project));
  }

  @Transactional
  public void deleteProject(Long id) {
    projectRepository.deleteById(id);
  }

  @Transactional(readOnly = true)
  public List<TestimonialResponse> allTestimonials() {
    return testimonialRepository.findAll(Sort.by("displayOrder")).stream().map(this::testimonialResponse).toList();
  }

  @Transactional
  public TestimonialResponse saveTestimonial(Long id, TestimonialRequest request) {
    Testimonial testimonial = id == null ? new Testimonial() : testimonialRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Testimonial not found"));
    testimonial.setClientName(request.clientName());
    testimonial.setCompany(request.company());
    testimonial.setQuote(request.quote());
    testimonial.setDisplayOrder(request.displayOrder() == null ? 0 : request.displayOrder());
    testimonial.setActive(request.active() == null || request.active());
    return testimonialResponse(testimonialRepository.save(testimonial));
  }

  @Transactional
  public void deleteTestimonial(Long id) {
    testimonialRepository.deleteById(id);
  }

  private ServiceResponse serviceResponse(com.scalora.api.entity.Service service) {
    return new ServiceResponse(service.getId(), service.getTitle(), service.getDescription(), service.getIcon(), service.getDisplayOrder(), service.isActive());
  }

  private ProjectResponse projectResponse(Project project) {
    return new ProjectResponse(project.getId(), project.getTitle(), project.getCategory(), project.getSummary(), project.getImageUrl(), project.isFeatured(), project.isActive());
  }

  private TestimonialResponse testimonialResponse(Testimonial testimonial) {
    return new TestimonialResponse(testimonial.getId(), testimonial.getClientName(), testimonial.getCompany(), testimonial.getQuote(), testimonial.getDisplayOrder(), testimonial.isActive());
  }

  private SiteSettings settings() {
    return siteSettingsRepository.findAll().stream().findFirst().orElseGet(() -> {
      SiteSettings siteSettings = new SiteSettings();
      siteSettings.setAgencyName("Scalora");
      return siteSettings;
    });
  }

  private BrandSettingsResponse brandSettingsResponse(SiteSettings settings) {
    return new BrandSettingsResponse(settings.getId(), settings.getAgencyName(), settings.getLogoUrl());
  }
}
