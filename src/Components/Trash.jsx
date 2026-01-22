import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { TextareaAutosize, Tooltip } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Restore from '@mui/icons-material/RestoreFromTrashOutlined';
import DltFrv from '@mui/icons-material/DeleteForeverOutlined';


function Trash() {
  const [activeIndex, setActiveIndex] = useState([]);
  const user = JSON.parse(localStorage.getItem('loggedInUser'));
  const userId = user?.id;


  useEffect(()=>{
    if(!user) return;
    const fetchnotes=async ()=>{
      try{
        const res = await fetch(`http://localhost:5000/notes?userId=${user.id}&archive=false&Trash=true`);
        const data = await res.json();
        console.log(data)
        setActiveIndex(data);
      }
      catch(error){
        console.log(error);
      }
    }
    fetchnotes();
  },[userId]);

  const handleClick = async(id) =>{
    try{
      await fetch(`http://localhost:5000/notes/${id}`,{
        "method":"PATCH",
        header:{"Content-type":"application/json"},
        body : JSON.stringify({Trash : false})
      })
      setActiveIndex(prev => prev.filter(note => note.id !== id));

      console.log('Archive note ID:',id);
    }
    catch(error){
      console.log(error);
    }
  }

  const permanentDelete = async(id) => {
    try{
      const response = await fetch(`http://localhost:5000/notes/${id}`,
        {method : "DELETE"}
      );

      if(!response.ok){
        throw new Error("Failed to delete note");
      }

      setActiveIndex(prev => prev.filter(note => note.id !==id));
      console.log("Deleted note ID:",id);
    }
    catch(error){
      console.error(error);
    }
  };


  return (
    <>
      {activeIndex.map((note, index) => (
        <Paper
          key={note.id}
          elevation={2}
          sx={{
            p: 1,
            boxSizing: "border-box",
            backgroundColor: note.bgcolor,
            position: 'relative',
            mt: 5,
            ml: open ? 60 : 38,
            width: '48%'

          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <TextareaAutosize
                aria-label="note title"
                placeholder="Title"
                style={{
                  width: '100%',
                  border: 'none',
                  outline: 'none',
                  fontSize: '1.5rem',
                  marginBottom: '10px',
                  backgroundColor: "transparent"
                }}
                value={note.title}
                
              />

        
            </div>

            <TextareaAutosize
              aria-label="note content"
              placeholder="Take a note..."
              style={{
                width: '100%',
                border: 'none',
                outline: 'none',
                fontSize: '1rem',
                resize: 'none',
                backgroundColor: "transparent"
              }}
              value={note.description}
            />

            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexWrap: "nowrap",
                marginTop: "10px",
              }}
            >
              <Tooltip title="Restore">
                <IconButton>
                  <Restore onClick={() => handleClick(note.id)} />
                </IconButton>
              </Tooltip>
              <Tooltip title="Permanent Delete">
                <IconButton onClick={() => permanentDelete(note.id)}>
                  <DltFrv/>
                </IconButton>
              </Tooltip>
            </div>
          </Box>
        </Paper>

      ))}

    </>
  )
}

export default Trash
