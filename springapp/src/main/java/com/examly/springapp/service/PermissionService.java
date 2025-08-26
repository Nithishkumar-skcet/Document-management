package com.examly.springapp.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.examly.springapp.model.Permission;
import com.examly.springapp.repository.PermissionRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class PermissionService {

    private final PermissionRepository permissionRepository;

    public Permission createPermission(Permission permission) {
        return permissionRepository.save(permission);
    }

    public Optional<Permission> getPermissionById(Long id) {
        return permissionRepository.findById(id);
    }

    public List<Permission> getAllPermissions() {
        return permissionRepository.findAll();
    }

    public Permission updatePermission(Long id, Permission updatedPermission) {
        return permissionRepository.findById(id).map(permission -> {
            permission.setAccessLevel(updatedPermission.getAccessLevel());
            permission.setUser(updatedPermission.getUser());
            permission.setDocument(updatedPermission.getDocument());
            return permissionRepository.save(permission);
        }).orElseThrow(() -> new RuntimeException("Permission not found"));
    }

    public void deletePermission(Long id) {
        permissionRepository.deleteById(id);
    }
}
