package com.fundoo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fundoo.entity.Note;

public interface NoteRepository extends JpaRepository<Note, Long> {

    List<Note> findByUserUserId(Long userId);

    
    List<Note> findByUserUserIdAndArchivedTrueAndTrashedFalse(Long userId);
    List<Note> findByUserUserIdAndArchivedFalseAndTrashedTrue(Long userId);


}