import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { TextareaAutosize, Tooltip } from '@mui/material';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import BrushOutlinedIcon from '@mui/icons-material/BrushOutlined';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import FormatColorTextOutlinedIcon from '@mui/icons-material/FormatColorTextOutlined';
import ColorLensOutlinedIcon from '@mui/icons-material/ColorLensOutlined';
import AddAlertOutlinedIcon from '@mui/icons-material/AddAlertOutlined';
import PersonAddAlt1OutlinedIcon from '@mui/icons-material/PersonAddAlt1Outlined';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import IconButton from '@mui/material/IconButton';
import { useDrawer } from './Side-Bar-Context';
import Popover from "@mui/material/Popover";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import List_view from './List_view';  
import Grid_view from './Grid_view';


function Take_notes() {

  const navigate = useNavigate();
  const [noteColor, setNoteColor] = useState("#ffffff");
  const [anchorEl, setAnchorEl] = useState(null);
  const { open,click } = useDrawer();
  const [expand, setexpand] = useState(false);
  const [saved,setSaved] = useState([]);
  const [note, setNote] = useState({
    title: '',
    description: '',
    bgcolor: '#fff',
  });

  const handleClick = () => {
    setexpand(true);
  }

  const handleClose = async() => {
    if(!note.title.trim() && !note.description.trim()){
      setexpand(false);
      return;
    }
    const payload={
      title:note.title,
      description:note.description,
      bgcolor:note.bgcolor,
      archive:false,
      Trash:true,
    }
    try{
      const res=await fetch('http://localhost:5000/notes',{
        method:"POST",
        headers: {"Content-type":"application/json"},
        body: JSON.stringify(payload)
      })
      const data=await res.json();
      setSaved(prev => {
        if(!prev.some(n => n.id === data.id)) return [...prev, data];
        return prev;
      });

      setNote({
        title:'',
        description:'',
        bgcolor:'#fff'
      });
      setNoteColor('#fff');
      setexpand(false);
      setAnchorEl(null);
    }
    catch(error){
      console.log(error)
    }
  };

  // const Anchor = (event) => {
  //   setAnchorEl(anchorEl ? null : event.currentTarget)
  // }

  const opening = open ? 60 : 40;
  const close = open ? 0 : -10;

  const currentid = JSON.parse(localStorage.getItem('userData'));
  useEffect(() => {
    // if(!currentid){
    //   navigate('/signin');
    //   return;      
    // }
    let valid=true;
    const fetchNotes = async () => {
      try{
        const res = await fetch(`http://localhost:5000/notes?userId=$(currentid.id)&Archive=false&Trash=false`);
        const data = await res.json();

        if(valid){
          setSaved(Array.isArray(data)?data:[]);
        }
      }
      catch(error){
        console.log(error);
      }
    };

    fetchNotes();

    return () => {
      valid = false;
    };
    
  },[currentid, navigate]);

  const colors = [
    "#ffffff",
    "#f28b82",
    "#fbbc04",
    "#fff475",
    "#ccff90",
    "#a7ffeb",
    "#cbf0f8",
    "#aecbfa",
    "#d7aefb"
  ];

console.log(note);

  const openColor = Boolean(anchorEl);

  return (
    <>
    <Box
      sx={{
        display: 'flex', '& .MuiPaper-root': { transform: `translateX(${close}px)`, width: '600px', height: '10%', borderRadius: 2 }, ml: opening, mt: 3, flexDirection: 'space-between'
      }}

    >
      <Paper
        elevation={2}
        sx={{
          p: 1,
          boxSizing: "border-box",
          backgroundColor: noteColor,
          position:'relative'
        }}
      >

        {!expand ? (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>


            <TextareaAutosize
              onClick={handleClick}
              aria-label='emty textarea'
              placeholder='Take a note...'
              style={{ width: '80%', border: 'none', outline: 'none', fontSize: '1rem', resize: 'none' }}
            />
            <Tooltip title="New list">
              <CheckBoxOutlinedIcon sx={{ opacity: 0.7 }} />
            </Tooltip>
            <Tooltip title="New note with drawing">
              <BrushOutlinedIcon sx={{ pl: 4, opacity: 0.7 }} />
            </Tooltip>
            <Tooltip title="New note with image">
              <ImageOutlinedIcon sx={{ pl: 4, opacity: 0.7 }} />
            </Tooltip>
          </Box>
        )
          : (

            <Box sx={{ display: 'flex', flexDirection: 'column'}}>
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
                  onChange={(e) =>
                    setNote(prev => ({...prev,title:e.target.value}))
                  }
                />

                <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
                  <PushPinOutlinedIcon />
                </div>
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
                  onChange={(e) =>
                    setNote(prev => ({...prev,description:e.target.value}))
                  }
              />

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexWrap: "nowrap",
                  marginTop: "10px",
                }}
              >

                <Tooltip title="formatting options" sx={{ opacity: '1', cursor: 'pointer', pl: 0 }}>
                  <IconButton>
                    <FormatColorTextOutlinedIcon />
                  </IconButton>
                </Tooltip>

                <Tooltip title="change color">
                  <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
                    <ColorLensOutlinedIcon sx={{ cursor: 'pointer', pl: 1, pr: 1 }} />
                  </IconButton>
                </Tooltip>

                <Tooltip title="remind me">
                  <IconButton>
                    <AddAlertOutlinedIcon sx={{ pl: 1, pr: 1, cursor: 'pointer' }} />
                  </IconButton>
                </Tooltip>
                <Tooltip title="collaborator">
                  <IconButton>
                    <PersonAddAlt1OutlinedIcon sx={{ pl: 1, pr: 1, cursor: 'pointer' }} />
                  </IconButton>
                </Tooltip>
                <Tooltip title="add img">
                  <IconButton>
                    <ImageOutlinedIcon sx={{ pl: 1, pr: 1, cursor: 'pointer' }} />
                  </IconButton>
                </Tooltip>
                <Tooltip title="archive">
                  <IconButton>
                    <ArchiveOutlinedIcon sx={{ pl: 1, pr: 1, cursor: 'pointer' }} />
                  </IconButton>
                </Tooltip>
                <Tooltip title="more options">
                  <IconButton>
                    <MoreVertOutlinedIcon sx={{ textAlign: 'center', pl: 1, pr: 1, cursor: 'pointer' }} />
                  </IconButton>
                </Tooltip>
                <Typography sx={{ opacity: 0.8, marginLeft: 'auto', mr: 2, color: 'black', borderRadius: 8, cursor: 'pointer' }} onClick={handleClose}>
                  Close
                </Typography>
              </div>

              <Popover
                open={openColor}
                anchorEl={anchorEl}
                onClose={() => setAnchorEl(null)}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
                sx={{
                  mt: 1,
                  ml: 20,
                }}
              >


                <Box sx={{ display: "flex", p: 1 }}>
                  {colors.map((color) => (
                    <Box
                      key={color}
                      onClick={() => {
                        setNoteColor(color);
                        setNote(prev => ({...prev,bgcolor:color}));
                      }}

                      sx={{
                        width: 24,
                        height: 24,
                        borderRadius: "50%",
                        backgroundColor: color,
                        cursor: "pointer",
                        m: 0.5,
                        // mr:10,
                        border: "1px solid #ccc",
                      }}
                    />
                  ))}
                </Box>
              </Popover>

            </Box>

          )
        }
      </Paper>
    </Box>
    {
    click?<List_view saved={saved} setSaved={setSaved}/>:
    <Grid_view saved={saved} setSaved={setSaved}/>
    }
    </>
  )
}

export default Take_notes