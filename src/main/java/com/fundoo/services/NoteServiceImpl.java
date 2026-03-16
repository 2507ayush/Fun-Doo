package com.fundoo.services;

import java.util.Optional;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fundoo.dto.NoteDTO;
import com.fundoo.entity.*;
import com.fundoo.repository.*;

@Service
public class NoteServiceImpl implements NoteService{
	
	@Autowired
	private UserRepository urepo;
	
	@Autowired
	private NoteRepository nrepo;
	
	

	@Override
	public Note createNote(NoteDTO noteDTO) {
		Optional<User> user = urepo.findById(noteDTO.getUserId());
		
		if(user.isEmpty()) {
			return null;
		}
		
		Note note = new Note();
		
		note.setTitle(noteDTO.getTitle());
		note.setDescription(noteDTO.getDescription());
		note.setUser(user.get());
		note.setColor(noteDTO.getColor());
		
		return nrepo.save(note);
		
	}
	
	@Override
	public Note trashNote(Long noteId) {

	    Note note = nrepo.findById(noteId)
	            .orElseThrow(() -> new RuntimeException("Note not found"));

	    note.setTrashed(!note.isTrashed());

	    return nrepo.save(note);
	}
	
	@Override
	public Note archiveNote(Long noteId) {

	    Note note = nrepo.findById(noteId)
	            .orElseThrow(() -> new RuntimeException("Note not found"));

	    note.setArchived(!note.isArchived());

	    return nrepo.save(note);

	}
	@Override
	public Note updateNote(Long noteId, NoteDTO noteDTO) {
		Optional<Note> note = nrepo.findById(noteId);
		
		if(note.isEmpty()) {
			return null;
		}
		
		Note existingN = note.get();
		existingN.setTitle(noteDTO.getTitle());
		existingN.setDescription(noteDTO.getDescription());
		existingN.setTrashed(noteDTO.getIsTrash());
		existingN.setArchived(noteDTO.getIsArchive());
		existingN.setColor(noteDTO.getColor());
		return nrepo.save(existingN);
	}
	
	@Override
	public List<Note> getAllNotes(Long userId) {
	    return nrepo.findByUserUserId(userId);
	}
	
	@Override
	public String deleteNote(Long noteId) {

	    Note note = nrepo.findById(noteId)
	            .orElseThrow(() -> new RuntimeException("Note not found"));

	    nrepo.delete(note);

	    return "Note deleted permanently";
	}	

	@Override
	public List<Note> getArchivedNotes(Long userId) {
		return nrepo.findByUserUserIdAndArchivedTrueAndTrashedFalse(userId);
	}

	@Override
	public List<Note> getTrashNotes(Long userId) {
		
		return nrepo.findByUserUserIdAndArchivedFalseAndTrashedTrue(userId);
	}

}
