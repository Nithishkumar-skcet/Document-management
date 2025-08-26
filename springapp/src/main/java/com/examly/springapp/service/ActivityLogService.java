package com.examly.springapp.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.examly.springapp.model.ActivityLog;
import com.examly.springapp.repository.ActivityLogRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class ActivityLogService {

    private final ActivityLogRepository activityLogRepository;

    public ActivityLog createLog(ActivityLog log) {
        return activityLogRepository.save(log);
    }

    public Optional<ActivityLog> getLogById(Long id) {
        return activityLogRepository.findById(id);
    }

    public List<ActivityLog> getAllLogs() {
        return activityLogRepository.findAll();
    }

    public void deleteLog(Long id) {
        activityLogRepository.deleteById(id);
    }
}
