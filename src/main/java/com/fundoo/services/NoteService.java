package com.fundoo.services;

import java.util.List;

import com.fundoo.dto.*;
import com.fundoo.entity.Note;

public interface NoteService {
	
	Note createNote(NoteDTO noteDTO);

    Note updateNote(Long noteId, NoteDTO noteDTO);

    String deleteNote(Long noteId);

	List<Note> getAllNotes(Long userId);	
	
	Note trashNote(Long noteId);
	Note archiveNote(Long noteId);
	
	List<Note> getTrashNotes(Long userId);

	List<Note> getArchivedNotes(Long userId);

}
