package com.examly.springapp.security;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.examly.springapp.dto.AuthRequest;
import com.examly.springapp.dto.AuthResponse;
import com.examly.springapp.service.UserService;

import lombok.RequiredArgsConstructor;



@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;
    private final JwtUtil jwtUtil;
    private final BCryptPasswordEncoder passwordEncoder;

   @PostMapping("/login")
public ResponseEntity<AuthResponse> login(@RequestBody AuthRequest request) {
    var userOpt = userService.findByEmail(request.getEmail());

    if (userOpt.isEmpty() || 
        !passwordEncoder.matches(request.getPassword(), userOpt.get().getPasswordHash())) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    String token = jwtUtil.generateToken(userOpt.get().getEmail());
    return ResponseEntity.ok(new AuthResponse(token));
}
}
