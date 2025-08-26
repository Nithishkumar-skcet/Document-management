package com.examly.springapp.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.examly.springapp.dto.ChangePasswordRequest;
import com.examly.springapp.dto.UpdateProfileRequest;
import com.examly.springapp.dto.UserProfileDto;
import com.examly.springapp.model.User;
import com.examly.springapp.security.CustomUserDetails;
import com.examly.springapp.service.UserService;

import lombok.RequiredArgsConstructor;




@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody User user) {
        return ResponseEntity.ok(userService.createUser(user));
    }

    @PreAuthorize("hasRole('ADMIN') or #id == principal.id")
    @GetMapping("/{id}")
    public ResponseEntity<User> getUser(@PathVariable Long id) {
        return userService.getUserById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @PreAuthorize("hasRole('ADMIN') or #id == principal.id")
    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User user) {
        return ResponseEntity.ok(userService.updateUser(id, user));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }

    @PreAuthorize("isAuthenticated()")
@GetMapping("/me")
public ResponseEntity<UserProfileDto> me(@AuthenticationPrincipal CustomUserDetails principal) {
    return userService.getUserById(principal.getId())
            .map(UserProfileDto::from)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
}

@PreAuthorize("isAuthenticated()")
@PutMapping("/me")
public ResponseEntity<UserProfileDto> updateMe(
        @AuthenticationPrincipal CustomUserDetails principal,
        @RequestBody UpdateProfileRequest req) {
    var updated = userService.updateMyProfile(principal.getId(), req.getName());
    return ResponseEntity.ok(UserProfileDto.from(updated));
}

private final BCryptPasswordEncoder passwordEncoder;

@PreAuthorize("isAuthenticated()")
@PutMapping("/me/password")
public ResponseEntity<Void> changePassword(
        @AuthenticationPrincipal CustomUserDetails principal,
        @RequestBody ChangePasswordRequest req) {
    userService.changeMyPassword(principal.getId(), req.getCurrentPassword(), req.getNewPassword(), passwordEncoder);
    return ResponseEntity.noContent().build();
}
}