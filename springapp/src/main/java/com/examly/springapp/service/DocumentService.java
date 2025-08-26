package com.examly.springapp.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Optional;

import static org.springframework.http.HttpStatus.FORBIDDEN;
import static org.springframework.http.HttpStatus.NOT_FOUND;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import com.examly.springapp.model.Document;
import com.examly.springapp.model.User;
import com.examly.springapp.repository.DocumentRepository;
import com.examly.springapp.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class DocumentService {

    private final DocumentRepository documentRepository;
    private final UserRepository userRepository;

    /** ✅ Create new document metadata */
    public Document createDocument(Document document, String username) {
        User owner = userRepository.findByEmail(username)
                .orElseThrow(() -> new ResponseStatusException(NOT_FOUND, "User not found"));
        document.setOwner(owner);
        return documentRepository.save(document);
    }

    /** ✅ Get documents owned by current user */
    public List<Document> getDocumentsByOwner(String username) {
        User owner = userRepository.findByEmail(username)
                .orElseThrow(() -> new ResponseStatusException(NOT_FOUND, "User not found"));
        return documentRepository.findByOwner_Id(owner.getId());
    }

    /** ✅ Upload file */
    public Document uploadDocument(MultipartFile file, String username) throws IOException {
        User owner = userRepository.findByEmail(username)
                .orElseThrow(() -> new ResponseStatusException(NOT_FOUND, "User not found"));

        // Save file locally
        String filePath = "uploads/" + file.getOriginalFilename();
        Files.copy(file.getInputStream(), Paths.get(filePath), StandardCopyOption.REPLACE_EXISTING);

        Document doc = Document.builder()
                .title(file.getOriginalFilename())
                .fileName(file.getOriginalFilename())
                .fileType(file.getContentType())
                .fileUrl(filePath)
                .size(file.getSize())
                .isPublic(false)
                .owner(owner)
                .build();

        return documentRepository.save(doc);
    }

    /** ✅ Get document by id */
    public Optional<Document> getDocumentById(Long id) {
        return documentRepository.findById(id);
    }

    /** ✅ Get all docs (admin use) */
    public List<Document> getAllDocuments() {
        return documentRepository.findAll();
    }

    /** ✅ Update doc (only owner allowed) */
    public Document updateDocument(Long id, Document updatedDoc, String username) {
        Document existing = documentRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(NOT_FOUND, "Document not found"));

        if (!existing.getOwner().getEmail().equals(username)) {
            throw new ResponseStatusException(FORBIDDEN, "Access denied: not your document");
        }

        existing.setTitle(updatedDoc.getTitle());
        existing.setIsPublic(updatedDoc.getIsPublic());

        // ✅ Skip fileName/fileType/size updates unless you want to support re-upload

        return documentRepository.save(existing);
    }

    /** ✅ Delete doc (only owner allowed) */
    public void deleteDocument(Long id, String username) {
        Document existing = documentRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(NOT_FOUND, "Document not found"));

        if (!existing.getOwner().getEmail().equals(username)) {
            throw new ResponseStatusException(FORBIDDEN, "Access denied: not your document");
        }

        documentRepository.deleteById(id);

        // Optionally, delete file from storage
        try {
            Files.deleteIfExists(Paths.get(existing.getFileUrl()));
        } catch (IOException e) {
            e.printStackTrace(); // log only
        }
    }
}
