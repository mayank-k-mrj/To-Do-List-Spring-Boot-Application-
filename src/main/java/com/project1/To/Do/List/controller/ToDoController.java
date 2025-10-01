package com.project1.To.Do.List.controller;

import com.project1.To.Do.List.Entity.ToDoEntry;
import com.project1.To.Do.List.service.ToDoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping()
@CrossOrigin(origins = "http://localhost:63342")  // allow frontend origin
public class ToDoController {

    @Autowired
    private ToDoService toDoService;

    public ToDoController(ToDoService toDoService) {
        this.toDoService = toDoService;
    }

    @GetMapping("/tasks")
    public List<ToDoEntry> getAllTasks(){
        return toDoService.getAllTasks();
    }

    @GetMapping("/tasks{id}")
    public Optional<ToDoEntry> getTaskById(@PathVariable Long id){
        return toDoService.getTaskById(id);
    }

    @PostMapping("/tasks")
    public ToDoEntry createTask(@RequestBody ToDoEntry toDoEntry){
        return toDoService.createTask(toDoEntry);
    }

    @PutMapping("/tasks{id}")
    public Optional<ToDoEntry> updateTasks(@PathVariable Long id, @RequestBody ToDoEntry toDoEntry){
        return toDoService.updateTask(id, toDoEntry);
    }

    @DeleteMapping("/tasks")
    public void deleteAll(){
        toDoService.deleteAllTasks();
    }

    @DeleteMapping("/tasks{id}")
    public void deleteTasksById(@PathVariable Long id){
        toDoService.deleteTaskById(id);
    }
}
