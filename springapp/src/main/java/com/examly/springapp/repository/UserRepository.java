package com.examly.springapp.repository;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.examly.springapp.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);

    Optional<User> findByName(String name);

     boolean existsByEmail(String email);
}
