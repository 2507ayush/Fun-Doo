package com.fundoo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.fundoo.dto.NoteDTO;
import com.fundoo.services.NoteService;
import com.fundoo.entity.*;
import java.util.List;

@RestController
@RequestMapping("/note")
@CrossOrigin(origins = "http://localhost:5173")
public class NoteController {
	
	@Autowired
	private NoteService nservice;
	
	@PutMapping("/trash/{noteId}")
	public Note trashNote(@PathVariable Long noteId) {
	    return nservice.trashNote(noteId);
	}
	
	@PutMapping("/archive/{noteId}")
	public Note archiveNote(@PathVariable Long noteId) {
	    return nservice.archiveNote(noteId);
	}
	
	@GetMapping("/archive/{userId}")
	public List<Note> getArchivedNotes(@PathVariable Long userId) {
	    return nservice.getArchivedNotes(userId);
	}
	
	
	@GetMapping("/trash/{userId}")
	public List<Note> getTrashedNotes(@PathVariable Long userId){
		return nservice.getTrashNotes(userId);
	}
	
	@PostMapping("/create")
	public Note createNote(@RequestBody NoteDTO nDTO) {
		return nservice.createNote(nDTO);
	}
	
	@GetMapping("/all/{userId}")
	public List<Note> getAllNotes(@PathVariable Long userId) {
	    return nservice.getAllNotes(userId);
	}
	
	@PatchMapping("/update/{noteId}")
	public Note updateNote(@PathVariable Long noteId, @RequestBody NoteDTO nDTO) {
		return nservice.updateNote(noteId, nDTO);
	}
	
	@DeleteMapping("/delete/{noteId}")
	public String deleteNote(@PathVariable Long noteId) {
		return nservice.deleteNote(noteId);
	}
	
	
	
	
}
