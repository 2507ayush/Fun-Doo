import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { TextareaAutosize, Tooltip } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Unarchive from '@mui/icons-material/UnarchiveOutlined';
import Delete from '@mui/icons-material/DeleteOutlineOutlined';
import ColorLensOutlinedIcon from '@mui/icons-material/ColorLensOutlined';
import Popover from "@mui/material/Popover";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import AddAlertOutlinedIcon from '@mui/icons-material/AddAlertOutlined';
import PersonAddAlt1OutlinedIcon from '@mui/icons-material/PersonAddAlt1Outlined';
import { useDrawer } from './Side-Bar-Context';
import Api from '../services/Api';

function Archive() {

  const { open } = useDrawer();

  const [notes,setNotes] = useState([]);
  const [anchorEl,setAnchorEl] = useState(null);
  const [activeIndex,setActiveIndex] = useState(null);

  const colors = [
    "#ffffff","#f28b82","#fbbc04","#fff475",
    "#ccff90","#a7ffeb","#cbf0f8","#aecbfa","#d7aefb"
  ];

  const user = localStorage.getItem('user');
  const userId = user ? JSON.parse(user).userId : null;

  useEffect(()=>{

    const fetchArchiveNotes = async () => {

      try{

        const res = await Api.get(`/note/archive/${userId}`);

        const data = Array.isArray(res.data)
        ? res.data.filter(n => n.archived && !n.trashed)
        : [];

        setNotes(data);

      }
      catch(err){
        console.log(err);
      }

    };

    fetchArchiveNotes();

  },[userId]);



  const handleUnarchive = async (note,index) => {

    try{

      await Api.put(`/note/archive/${note.noteId}`);

      setNotes(prev =>
        prev.filter(n => n.noteId !== note.noteId)
      );

    }
    catch(err){
      console.log(err);
    }

  };


  const handleDelete = async (note,index) => {

    try{

      await Api.put(`/note/trash/${note.noteId}`);

      setNotes(prev =>
        prev.filter(n => n.noteId !== note.noteId)
      );

    }
    catch(err){
      console.log(err);
    }

  };


  const updateNote = async (note,index,field,value) => {

    const updated = { ...note , [field]:value };

    setNotes(prev =>
      prev.map((n,i)=> i===index ? updated : n)
    );

    try{

      await Api.put(`/note/update/${note.noteId}`,updated);

    }
    catch(err){
      console.log(err);
    }

  };


  const updateColor = async (note,index,color) => {

    const updated = { ...note , color:color };

    setNotes(prev =>
      prev.map((n,i)=> i===index ? updated : n)
    );

    try{

      await Api.put(`/note/update/${note.noteId}`,updated);

    }
    catch(err){
      console.log(err);
    }

  };


  const handleColorOpen = (event,index) => {

    setAnchorEl(event.currentTarget);
    setActiveIndex(index);

  };


  const handleColorClose = () => {

    setAnchorEl(null);
    setActiveIndex(null);

  };


  return (
    <>

      {notes.map((note,index)=>(

        <Paper
          key={note.noteId || index}
          elevation={2}
          sx={{
            p:1,
            boxSizing:"border-box",
            backgroundColor: note.color || "#fff",
            position:'relative',
            mt:5,
            ml: open ? 60 : 38,
            width:'48%'
          }}
        >

          <Box sx={{display:'flex',flexDirection:'column'}}>

            <div style={{display:'flex',flexDirection:'row'}}>

              <TextareaAutosize
                placeholder="Title"
                value={note.title || ""}
                style={{
                  width:'100%',
                  border:'none',
                  outline:'none',
                  fontSize:'1.5rem',
                  marginBottom:'10px',
                  backgroundColor:"transparent"
                }}
                onChange={(e)=>updateNote(note,index,'title',e.target.value)}
              />

            </div>


            <TextareaAutosize
              placeholder="Take a note..."
              value={note.description || ""}
              style={{
                width:'100%',
                border:'none',
                outline:'none',
                fontSize:'1rem',
                resize:'none',
                backgroundColor:"transparent"
              }}
              onChange={(e)=>updateNote(note,index,'description',e.target.value)}
            />


            <div
              style={{
                display:"flex",
                alignItems:"center",
                flexWrap:"nowrap",
                marginTop:"10px"
              }}
            >

              <Tooltip title="change color">
                <IconButton onClick={(e)=>handleColorOpen(e,index)}>
                  <ColorLensOutlinedIcon/>
                </IconButton>
              </Tooltip>

              <Tooltip title="remind me">
                <IconButton>
                  <AddAlertOutlinedIcon/>
                </IconButton>
              </Tooltip>

              <Tooltip title="collaborator">
                <IconButton>
                  <PersonAddAlt1OutlinedIcon/>
                </IconButton>
              </Tooltip>

              <Tooltip title="add img">
                <IconButton>
                  <ImageOutlinedIcon/>
                </IconButton>
              </Tooltip>

              <Tooltip title="Unarchive">
                <IconButton onClick={()=>handleUnarchive(note,index)}>
                  <Unarchive/>
                </IconButton>
              </Tooltip>

              <Tooltip title="Delete">
                <IconButton onClick={()=>handleDelete(note,index)}>
                  <Delete/>
                </IconButton>
              </Tooltip>

            </div>


            <Popover
              open={Boolean(anchorEl)}
              anchorEl={anchorEl}
              onClose={handleColorClose}
              anchorOrigin={{
                vertical:"bottom",
                horizontal:"center"
              }}
              transformOrigin={{
                vertical:"top",
                horizontal:"center"
              }}
              sx={{mt:1,ml:20}}
            >

              <ClickAwayListener onClickAway={handleColorClose}>

                <Box sx={{display:"flex",p:1}}>

                  {colors.map(color=>(
                    <Box
                      key={color}
                      sx={{
                        width:24,
                        height:24,
                        borderRadius:"50%",
                        backgroundColor:color,
                        cursor:"pointer",
                        m:0.5,
                        border:"1px solid #ccc"
                      }}
                      onClick={()=>{
                        updateColor(notes[activeIndex],activeIndex,color);
                        handleColorClose();
                      }}
                    />
                  ))}

                </Box>

              </ClickAwayListener>

            </Popover>

          </Box>

        </Paper>

      ))}

    </>
  )
}

export default Archive