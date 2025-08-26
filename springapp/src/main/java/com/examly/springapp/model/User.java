package com.examly.springapp.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(unique = true, nullable = false)
    private String email;

    private String passwordHash;

    @Enumerated(EnumType.STRING)
    private Role role;

    public enum Role {
        ADMIN, USER
    }

    public String getRoleString() {
    return "ROLE_" + this.role.name();
    }


    @OneToMany(mappedBy = "owner", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnoreProperties("owner") 
    @JsonManagedReference("user-documents")
    private List<Document> documents;

    @OneToMany(mappedBy = "owner", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnoreProperties({"owner", "documents", "subFolders", "parentFolder"}) 
    @JsonManagedReference("user-folders")
    private List<Folder> folders;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnoreProperties("user") 
    @JsonManagedReference("user-permissions")
    private List<Permission> permissions;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnoreProperties("user") 
    @JsonManagedReference("user-logs")
    private List<ActivityLog> activityLogs;
}
