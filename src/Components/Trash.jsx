import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { IconButton, Tooltip } from '@mui/material';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import RestoreFromTrashOutlinedIcon from '@mui/icons-material/RestoreFromTrashOutlined';
import { useDrawer } from './Side-Bar-Context';
import Api from '../services/Api';

export default function Trash() {

  const { open } = useDrawer();

  const [notes, setNotes] = useState([]);

  const user = localStorage.getItem('user');
  const userId = user ? JSON.parse(user).userId : null;

  useEffect(() => {

    const fetchTrashNotes = async () => {

      if (!userId) return;

      try {

        const res = await Api.get(`/note/trash/${userId}`);

        const data = Array.isArray(res.data)
          ? res.data.filter(n => n.trashed)
          : [];

        setNotes(data);

      }
      catch (err) {
        console.log(err);
      }

    };

    fetchTrashNotes();

  }, [userId]);


  const handleRestore = async (note) => {


    try {

      await Api.put(`/note/trash/${note.noteId}`);

      setNotes(prev =>
        prev.filter(n => n.noteId !== note.noteId)
      );

    }
    catch (err) {
      console.log('Error restoring note:', err);
    }

  };


  const handlePermanentDelete = async (note) => {

    try {

      await Api.delete(`/note/delete/${note.noteId}`);

      setNotes(prev =>
        prev.filter(n => n.noteId !== note.noteId)
      );

    }
    catch (err) {
      console.log('Error deleting note permanently:', err);
    }

  };


  return (
    <>
      {notes.map((note, index) => (

        <Paper
          key={note.noteId || index}
          elevation={2}
          sx={{
            p: 1,
            boxSizing: "border-box",
            backgroundColor: note.color || "#fff",
            mt: 5,
            ml: open ? 60 : 38,
            width: '48%',
          }}
        >

          <Box sx={{ display: 'flex', flexDirection: 'column' }}>

            <div style={{ fontWeight: 'bold', fontSize: '1.2rem', marginBottom: 5 }}>
              {note.title || 'No Title'}
            </div>

            <div style={{ marginBottom: 10 }}>
              {note.description || 'No Description'}
            </div>

            <div style={{ display: 'flex', gap: 10 }}>

              <Tooltip title="Restore">
                <IconButton onClick={() => handleRestore(note)}>
                  <RestoreFromTrashOutlinedIcon />
                </IconButton>
              </Tooltip>

              <Tooltip title="Delete Permanently">
                <IconButton onClick={() => handlePermanentDelete(note)}>
                  <DeleteOutlineOutlinedIcon />
                </IconButton>
              </Tooltip>

            </div>

          </Box>

        </Paper>

      ))}
    </>
  );
}