package com.scalora.api.repository;

import com.scalora.api.entity.Testimonial;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TestimonialRepository extends JpaRepository<Testimonial, Long> {
  List<Testimonial> findByActiveTrueOrderByDisplayOrderAsc();
}
