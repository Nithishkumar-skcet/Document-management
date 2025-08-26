package com.examly.springapp.dto;

import com.examly.springapp.model.User;

import lombok.Value;

@Value
public class UserProfileDto {
    Long id;
    String name;
    String email;
    User.Role role;

    public static UserProfileDto from(User u) {
        return new UserProfileDto(u.getId(), u.getName(), u.getEmail(), u.getRole());
    }
}