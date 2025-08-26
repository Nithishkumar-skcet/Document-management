package com.examly.springapp.dto;

import lombok.Data;

@Data
public class ChangePasswordRequest {
    private String currentPassword;
    private String newPassword;
}