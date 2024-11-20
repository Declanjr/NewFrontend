package com.auca.Logistics.Model;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MenuRepo extends JpaRepository<Menu, Long> {
    List<Menu> findByParentIdOrderByLevel(Long parentId);
}