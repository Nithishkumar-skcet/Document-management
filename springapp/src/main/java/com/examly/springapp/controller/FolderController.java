package com.examly.springapp.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.examly.springapp.model.Folder;
import com.examly.springapp.service.FolderService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/folders")
@RequiredArgsConstructor
public class FolderController {

    private final FolderService folderService;

    @PostMapping
    public ResponseEntity<Folder> createFolder(@RequestBody Folder folder) {
        return ResponseEntity.ok(folderService.createFolder(folder));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Folder> getFolder(@PathVariable Long id) {
        return folderService.getFolderById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping
    public List<Folder> getAllFolders() {
        return folderService.getAllFolders();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Folder> updateFolder(@PathVariable Long id, @RequestBody Folder folder) {
        return ResponseEntity.ok(folderService.updateFolder(id, folder));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFolder(@PathVariable Long id) {
        folderService.deleteFolder(id);
        return ResponseEntity.noContent().build();
    }
}
