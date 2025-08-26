package com.examly.springapp.security;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtil jwtUtil;
   private final CustomUserDetailsService userDetailsService;

    public JwtFilter(JwtUtil jwtUtil, CustomUserDetailsService userDetailsService) {
    this.jwtUtil = jwtUtil;
    this.userDetailsService = userDetailsService;
}

    @Override
protected void doFilterInternal(HttpServletRequest request,
                                HttpServletResponse response,
                                FilterChain filterChain) throws ServletException, IOException {

    String path = request.getServletPath();
    if (path.startsWith("/auth") || (path.equals("/users") && request.getMethod().equals("POST"))) {
        filterChain.doFilter(request, response); // skip JWT check for public endpoints
        return;
    }

    final String authHeader = request.getHeader("Authorization");
    String token = null;
    String username = null;

    if (authHeader != null && authHeader.startsWith("Bearer ")) {
        token = authHeader.substring(7);
        try {
            username = jwtUtil.extractUsername(token);
        } catch (Exception e) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return;
        }
    }

    if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
    var userDetails = userDetailsService.loadUserByUsername(username); // use CustomUserDetailsService
    if (jwtUtil.validateToken(token, username)) {
        var authToken = new UsernamePasswordAuthenticationToken(
                userDetails, null, userDetails.getAuthorities());
        authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
        SecurityContextHolder.getContext().setAuthentication(authToken);
    }
}
    filterChain.doFilter(request, response);
}
}
