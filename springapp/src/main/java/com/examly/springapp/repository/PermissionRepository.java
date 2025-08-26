package com.examly.springapp.repository;
import com.examly.springapp.model.Permission;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface PermissionRepository extends JpaRepository<Permission, Long> {
    List<Permission> findByUserId(Long userId);
    List<Permission> findByDocumentId(Long documentId);
    Optional<Permission> findByUserIdAndDocumentId(Long userId, Long documentId);
}
