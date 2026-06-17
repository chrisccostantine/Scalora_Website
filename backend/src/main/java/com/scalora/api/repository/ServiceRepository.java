package com.scalora.api.repository;

import com.scalora.api.entity.Service;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ServiceRepository extends JpaRepository<Service, Long> {
  List<Service> findByActiveTrueOrderByDisplayOrderAsc();
}
