import React, { useState,useContext } from 'react'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { TextareaAutosize, Tooltip } from '@mui/material';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import FormatColorTextOutlinedIcon from '@mui/icons-material/FormatColorTextOutlined';
import ColorLensOutlinedIcon from '@mui/icons-material/ColorLensOutlined';
import AddAlertOutlinedIcon from '@mui/icons-material/AddAlertOutlined';
import PersonAddAlt1OutlinedIcon from '@mui/icons-material/PersonAddAlt1Outlined';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import IconButton from '@mui/material/IconButton';
import { useDrawer } from './Side-Bar-Context';
import Popover from "@mui/material/Popover";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import Api from '../services/Api';
import { SearchContext } from '../Dashboard/FunDoo';

export default function Grid_view({ saved, setSaved }) {

  const { open } = useDrawer();
  const searchText = useContext(SearchContext);

  const [anchorEl, setAnchorEl] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);

  const colors = ["#ffffff","#f28b82","#fbbc04","#fff475","#ccff90","#a7ffeb","#cbf0f8","#aecbfa","#d7aefb"];


  const updateNote = async (note, index, field, value) => {

    const updated = { ...note, [field]: value };

    setSaved(prev =>
      prev.map((n,i)=> i===index ? updated : n)
    );

    try{
      await Api.patch(`/note/update/${note.noteId}`, updated);
    }
    catch(err){
      console.log(err);
    }

  };


  const updateColor = async (note,index,color) => {

    const updated = { ...note, color: color };

    setSaved(prev =>
      prev.map((n,i)=> i===index ? updated : n)
    );

    try{
      await Api.patch(`/note/update/${note.noteId}`, updated);
    }
    catch(err){
      console.log(err);
    }

  };


  const handleArchive = async (note,index) => {

    const updated = { ...note, archived:true };

    try{

      await Api.put(`/note/archive/${note.noteId}`,updated);

      setSaved(prev =>
        prev.map(n =>
          n.noteId === note.noteId ? updated : n
        )
      );

    }
    catch(err){
      console.log(err);
    }

  };


  const handleDelete = async (note,index) => {

    const updated = { ...note, trashed:true };

    try{

      await Api.put(`/note/trash/${note.noteId}`,updated);

      setSaved(prev =>
        prev.map(n =>
          n.noteId === note.noteId ? updated : n
        )
      );

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


  // const notes = Array.isArray(saved)
  // ? saved.filter(n => !n.archived && !n.trashed)
  // : [];

  const notes = Array.isArray(saved)
        ? saved.filter(n =>
            !n.archived &&
            !n.trashed &&
            (
                n.title?.toLowerCase().includes(searchText.toLowerCase()) ||
                n.description?.toLowerCase().includes(searchText.toLowerCase())
            )
        )
        : [];


  return (
    <>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "2fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(2, 1fr)",
          },
          gap: 2,
          mt: 5,
          ml: open ? 40 : 20,
          px: 3
        }}
      >

        {notes.map((note,index)=>(
          
          <Paper
            key={note.noteId || index}
            elevation={2}
            sx={{
              p:2,
              backgroundColor: note.color || "#fff",
              borderRadius:2
            }}
          >

            <Box sx={{display:"flex",alignItems:"center"}}>

              <TextareaAutosize
                placeholder="Title"
                value={note.title || ""}
                onChange={(e)=>updateNote(note,index,"title",e.target.value)}
                style={{
                  width:"100%",
                  border:"none",
                  outline:"none",
                  fontSize:"1.2rem",
                  backgroundColor:"transparent",
                  fontWeight:500
                }}
              />

              <PushPinOutlinedIcon/>

            </Box>


            <TextareaAutosize
              placeholder="Take a note..."
              value={note.description || ""}
              onChange={(e)=>updateNote(note,index,"description",e.target.value)}
              style={{
                width:"100%",
                border:"none",
                outline:"none",
                resize:"none",
                backgroundColor:"transparent",
                marginTop:8
              }}
            />


            <Box
              sx={{
                display:"flex",
                alignItems:"center",
                mt:1
              }}
            >

              <Tooltip title="formatting options">
                <IconButton>
                  <FormatColorTextOutlinedIcon/>
                </IconButton>
              </Tooltip>

              <Tooltip title="Change color">
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

              <Tooltip title="archive">
                <IconButton onClick={()=>handleArchive(note,index)}>
                  <ArchiveOutlinedIcon/>
                </IconButton>
              </Tooltip>

              <Tooltip title="Delete">
                <IconButton onClick={()=>handleDelete(note,index)}>
                  <DeleteOutlineOutlinedIcon/>
                </IconButton>
              </Tooltip>

              <Tooltip title="more options">
                <IconButton>
                  <MoreVertOutlinedIcon/>
                </IconButton>
              </Tooltip>

            </Box>

          </Paper>

        ))}

      </Box>


      <Popover
        open={Boolean(anchorEl) && activeIndex !== null}
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
                  updateColor(saved[activeIndex],activeIndex,color);
                  handleColorClose();
                }}
              />

            ))}

          </Box>

        </ClickAwayListener>

      </Popover>

    </>
  )
}