package com.scalora.api.repository;

import com.scalora.api.entity.Project;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectRepository extends JpaRepository<Project, Long> {
  List<Project> findByActiveTrueOrderByFeaturedDescCreatedAtDesc();
}
