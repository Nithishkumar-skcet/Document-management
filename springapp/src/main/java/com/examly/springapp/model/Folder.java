package com.examly.springapp.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "folders")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Folder {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "owner_id", nullable = false)
    @JsonBackReference("user-folders")
    private User owner;

    private String name;

    @ManyToOne
    @JoinColumn(name = "parent_folder_id")
    @JsonBackReference("folders-folders")
    private Folder parentFolder;

    @OneToMany(mappedBy = "parentFolder", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference("folders-documents")
    private List<Document> documents;

    @OneToMany(mappedBy = "parentFolder", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference("folders-folders")
    private List<Folder> subFolders;
}
