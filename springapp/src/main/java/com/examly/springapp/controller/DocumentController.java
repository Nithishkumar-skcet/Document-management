package com.examly.springapp.controller;

import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import com.examly.springapp.model.Document;
import com.examly.springapp.service.DocumentService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/documents")
@RequiredArgsConstructor
public class DocumentController {

    private final DocumentService documentService;

    /** ✅ Create document (metadata only) */
    @PostMapping
    public ResponseEntity<Document> createDocument(
            @RequestBody Document document,
            @AuthenticationPrincipal UserDetails userDetails) {
        Document created = documentService.createDocument(document, userDetails.getUsername());
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    /** ✅ Get all my documents */
    @GetMapping("/my")
    public List<Document> getMyDocuments(@AuthenticationPrincipal UserDetails userDetails) {
        return documentService.getDocumentsByOwner(userDetails.getUsername());
    }

    /** ✅ Upload file */
    @PostMapping("/upload")
    public ResponseEntity<Document> uploadFile(
            @RequestParam("file") MultipartFile file,
            @AuthenticationPrincipal UserDetails userDetails) throws IOException {
        Document doc = documentService.uploadDocument(file, userDetails.getUsername());
        return ResponseEntity.status(HttpStatus.CREATED).body(doc);
    }

    /** ✅ Download file */
    @GetMapping("/download/{id}")
    public ResponseEntity<Resource> downloadFile(
            @PathVariable Long id,
            @AuthenticationPrincipal UserDetails userDetails) throws IOException {

        Document doc = documentService.getDocumentById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Document not found"));

        // ✅ Owner check: compare against email instead of name
        if (!Boolean.TRUE.equals(doc.getIsPublic()) &&
                !doc.getOwner().getEmail().equals(userDetails.getUsername())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Access denied");
        }

        Path path = Paths.get(doc.getFileUrl());
        Resource resource = new UrlResource(path.toUri());

        if (!resource.exists() || !resource.isReadable()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "File not found");
        }

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + doc.getFileName())
                .body(resource);
    }

    /** ✅ Get single document metadata */
    @GetMapping("/{id}")
    public ResponseEntity<Document> getDocument(@PathVariable Long id) {
        return documentService.getDocumentById(id)
                .map(ResponseEntity::ok)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Document not found"));
    }

    /** ✅ Update document metadata */
    @PutMapping("/{id}")
    public ResponseEntity<Document> updateDocument(
            @PathVariable Long id,
            @RequestBody Document document,
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(documentService.updateDocument(id, document, userDetails.getUsername()));
    }

    /** ✅ Delete document */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDocument(
            @PathVariable Long id,
            @AuthenticationPrincipal UserDetails userDetails) {
        documentService.deleteDocument(id, userDetails.getUsername());
        return ResponseEntity.noContent().build();
    }
}
