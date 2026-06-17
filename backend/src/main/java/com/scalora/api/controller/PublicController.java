package com.scalora.api.controller;

import com.scalora.api.dto.ContentDtos.PublicContentResponse;
import com.scalora.api.service.ContentService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/public")
public class PublicController {
  private final ContentService contentService;

  public PublicController(ContentService contentService) {
    this.contentService = contentService;
  }

  @GetMapping("/content")
  public PublicContentResponse content() {
    return contentService.publicContent();
  }
}
