package com.examly.springapp.repository;
import com.examly.springapp.model.Document;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface DocumentRepository extends JpaRepository<Document, Long> {
    List<Document> findByOwner_Id(Long ownerId);
    List<Document> findByParentFolder_Id(Long folderId);
}
