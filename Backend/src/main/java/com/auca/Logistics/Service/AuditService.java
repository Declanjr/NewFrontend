package com.auca.Logistics.Service;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import com.auca.Logistics.Model.AuditLog;
import com.auca.Logistics.Model.AuditLogRepository;

public class AuditService {
    

        @Autowired
    private AuditLogRepository auditLogRepository;

    public void logAuditEvent(String entityName, String entityId, String action, 
                            String oldValue, String newValue) {
        AuditLog auditLog = new AuditLog();
        auditLog.setEntityName(entityName);
        auditLog.setEntityId(entityId);
        auditLog.setAction(action);
        auditLog.setModifiedBy(getCurrentUser());
        auditLog.setModifiedDate(LocalDateTime.now());
        auditLog.setOldValue(oldValue);
        auditLog.setNewValue(newValue);
        
        auditLogRepository.save(auditLog);
    }

    private String getCurrentUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        return auth != null ? auth.getName() : "system";
    }
}
