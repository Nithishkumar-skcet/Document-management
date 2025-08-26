package com.examly.springapp.model;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "permissions")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Permission {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "document_id", nullable = false)
    @JsonBackReference("documents-permissions")
    private Document document;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    @JsonBackReference("user-permissions")
    private User user;

    @Enumerated(EnumType.STRING)
    private AccessLevel accessLevel;

    public enum AccessLevel {
        READ_ONLY, FULL_ACCESS
    }
}
