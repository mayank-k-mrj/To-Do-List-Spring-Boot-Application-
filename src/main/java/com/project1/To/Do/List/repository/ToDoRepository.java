package com.project1.To.Do.List.repository;


import com.project1.To.Do.List.Entity.ToDoEntry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

@Repository
public interface ToDoRepository extends JpaRepository<ToDoEntry, Long> {

}
