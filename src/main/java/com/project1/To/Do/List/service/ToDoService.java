package com.project1.To.Do.List.service;

import com.project1.To.Do.List.Entity.ToDoEntry;

import java.util.List;
import java.util.Optional;

public interface ToDoService {
    List<ToDoEntry> getAllTasks();
    Optional<ToDoEntry> getTaskById(Long id);
    ToDoEntry createTask(ToDoEntry task);
    void deleteTaskById(Long id);
    void deleteAllTasks();
    Optional<ToDoEntry> updateTask(Long id, ToDoEntry Entry);
}
