package com.examly.springapp.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "documents")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Setter
@Getter
public class Document {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JsonIgnoreProperties({"documents", "folders", "permissions", "activityLogs"}) 
    @JoinColumn(name = "owner_id", nullable = false)
    @JsonBackReference("user-documents")
    private User owner;

    @NotNull(message = "Title is required")
    private String title;     

    @NotNull(message = "File name is required")
    private String fileName;  

    private String fileType;
    private String fileUrl;
    private Long size;
    private Boolean isPublic; 

    @ManyToOne
    @JsonIgnoreProperties({"documents", "subFolders", "parentFolder", "owner"}) 
    @JoinColumn(name = "parent_folder_id")
    @JsonBackReference("folders-documents")
    private Folder parentFolder;

    @OneToMany(mappedBy = "document", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnoreProperties("document") 
    @JsonManagedReference("documents-permissions")
    private List<Permission> permissions;

    @OneToMany(mappedBy = "document", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnoreProperties("document") 
    @JsonManagedReference("documents-logs")
    private List<ActivityLog> activityLogs;

    @JsonProperty("ownerId")
    public Long getOwnerId() {
        return owner != null ? owner.getId() : null;
    }
}
