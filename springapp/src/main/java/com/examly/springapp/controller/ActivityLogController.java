package com.examly.springapp.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.examly.springapp.model.ActivityLog;
import com.examly.springapp.service.ActivityLogService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/activity-logs")
@RequiredArgsConstructor
public class ActivityLogController {

    private final ActivityLogService activityLogService;

    @PostMapping
    public ResponseEntity<ActivityLog> createLog(@RequestBody ActivityLog log) {
        return ResponseEntity.ok(activityLogService.createLog(log));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ActivityLog> getLog(@PathVariable Long id) {
        return activityLogService.getLogById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping
    public List<ActivityLog> getAllLogs() {
        return activityLogService.getAllLogs();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLog(@PathVariable Long id) {
        activityLogService.deleteLog(id);
        return ResponseEntity.noContent().build();
    }
}
