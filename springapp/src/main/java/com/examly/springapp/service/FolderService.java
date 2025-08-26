package com.examly.springapp.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.examly.springapp.model.Folder;
import com.examly.springapp.repository.FolderRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class FolderService {

    private final FolderRepository folderRepository;

    public Folder createFolder(Folder folder) {
        return folderRepository.save(folder);
    }

    public Optional<Folder> getFolderById(Long id) {
        return folderRepository.findById(id);
    }

    public List<Folder> getAllFolders() {
        return folderRepository.findAll();
    }

    public Folder updateFolder(Long id, Folder updatedFolder) {
        return folderRepository.findById(id).map(folder -> {
            folder.setName(updatedFolder.getName());
            folder.setOwner(updatedFolder.getOwner());
            folder.setParentFolder(updatedFolder.getParentFolder());
            return folderRepository.save(folder);
        }).orElseThrow(() -> new RuntimeException("Folder not found"));
    }

    public void deleteFolder(Long id) {
        folderRepository.deleteById(id);
    }
}
