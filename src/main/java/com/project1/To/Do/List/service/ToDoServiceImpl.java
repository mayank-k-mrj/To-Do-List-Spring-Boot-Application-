package com.project1.To.Do.List.service;

import com.project1.To.Do.List.Entity.ToDoEntry;
import com.project1.To.Do.List.repository.ToDoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ToDoServiceImpl implements ToDoService{

    private ToDoRepository toDoRepository;

    @Autowired
    public ToDoServiceImpl(ToDoRepository toDoRepository){
        this.toDoRepository = toDoRepository;
    }

    @Override
    public List<ToDoEntry> getAllTasks(){
        return new ArrayList<>(toDoRepository.findAll());
    }

    @Override
    public Optional<ToDoEntry> getTaskById(Long id){
        return toDoRepository.findById(id);
    }

    @Override
    public ToDoEntry createTask(ToDoEntry taskEntry){
        return toDoRepository.save(taskEntry);
    }

    @Override
    public void deleteTaskById(Long id){
        toDoRepository.deleteById(id);
    }

    @Override
    public void deleteAllTasks(){
        toDoRepository.deleteAll();
    }

    @Override
    public Optional<ToDoEntry> updateTask(Long id, ToDoEntry Entry){
        return Optional.ofNullable(toDoRepository.findById(id).map(existing -> {
            existing.setTitle(Entry.getTitle());
            existing.setDescription(Entry.getDescription());
            existing.setStatus(Entry.getStatus());
            return toDoRepository.save(existing);
        }).orElseThrow(() -> new RuntimeException("Task not found with id : " + id)));
    }
}
