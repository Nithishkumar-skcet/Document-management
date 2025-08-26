package com.examly.springapp.service;

import java.util.List;
import java.util.Optional;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.examly.springapp.model.User;
import com.examly.springapp.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    public User createUser(User user) {
        // Hash the password before saving
        user.setPasswordHash(passwordEncoder.encode(user.getPasswordHash()));
        return userRepository.save(user);
    }

    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User updateUser(Long id, User updatedUser) {
        return userRepository.findById(id).map(user -> {
            user.setName(updatedUser.getName());
            user.setEmail(updatedUser.getEmail());
            if (updatedUser.getPasswordHash() != null) {
                user.setPasswordHash(passwordEncoder.encode(updatedUser.getPasswordHash()));
            }
            user.setRole(updatedUser.getRole());
            return userRepository.save(user);
        }).orElseThrow(() -> new RuntimeException("User not found"));
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    public User updateMyProfile(Long userId, String newName) {
    var u = userRepository.findById(userId).orElseThrow();
    if (newName != null && !newName.isBlank()) u.setName(newName.trim());
    return userRepository.save(u);
    }

    public void changeMyPassword(Long userId, String currentRaw, String newRaw, BCryptPasswordEncoder encoder) {
    var u = userRepository.findById(userId).orElseThrow();
    if (!encoder.matches(currentRaw, u.getPasswordHash())) {
        throw new IllegalArgumentException("Current password is incorrect");
    }
    u.setPasswordHash(encoder.encode(newRaw));
    userRepository.save(u);
    }
}
