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
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import List_view from './List_view';
import Grid_view from './Grid_view';
import Api from '../services/Api';

function Take_notes() {

  const navigate = useNavigate();
  const { open, click } = useDrawer();

  const [note, setNote] = useState({
    title: '',
    description: '',
    color: '#ffffff'
  });

  const [noteColor, setNoteColor] = useState('#ffffff');
  const [expand, setExpand] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [saved, setSaved] = useState([]);

  const colors = ["#ffffff","#f28b82","#fbbc04","#fff475","#ccff90","#a7ffeb","#cbf0f8","#aecbfa","#d7aefb"];

  const openColor = Boolean(anchorEl);

  useEffect(() => {

    const fetchNotes = async () => {

      const currentUser = JSON.parse(localStorage.getItem('user'));

      if (!currentUser) {
        navigate('/signin');
        return;
      }

      try {

        const res = await Api.get(`/note/all/${currentUser.userId}`);

        setSaved(Array.isArray(res.data) ? res.data : []);

      } catch (err) {

        console.log(err);

      }

    };

    fetchNotes();

  }, [navigate]);

  const handleClick = () => setExpand(true);

  const handleClose = async () => {

    if (!note.title.trim() && !note.description.trim()) {
      setExpand(false);
      return;
    }

    const currentUser = JSON.parse(localStorage.getItem('user'));

    if (!currentUser) {
      navigate('/signin');
      return;
    }

    const detail = {
      title: note.title.trim(),
      description: note.description.trim(),
      color: note.color || noteColor || '#ffffff',
      userId: currentUser.userId
    };

    try {

      const res = await Api.post('/note/create', detail);

      setSaved(prev => [...prev, res.data]);

      setNote({
        title: '',
        description: '',
        color: '#ffffff'
      });

      setNoteColor('#ffffff');
      setExpand(false);
      setAnchorEl(null);

    } catch (err) {

      console.log('Error creating note:', err);

    }

  };

  const handleColorSelect = (color) => {

    setNoteColor(color);

    setNote(prev => ({
      ...prev,
      color: color
    }));

    setAnchorEl(null);

  };

  const opening = open ? 60 : 40;
  const close = open ? 0 : -10;

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
            position: 'relative'
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

          ) : (

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
                  onChange={(e) =>
                    setNote(prev => ({ ...prev, title: e.target.value }))
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
                  setNote(prev => ({ ...prev, description: e.target.value }))
                }
              />

              <div style={{ display: "flex", alignItems: "center", flexWrap: "nowrap", marginTop: "10px" }}>

                <Tooltip title="formatting options">
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
                    <MoreVertOutlinedIcon sx={{ pl: 1, pr: 1, cursor: 'pointer' }} />
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
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                transformOrigin={{ vertical: "top", horizontal: "center" }}
                sx={{ mt: 1, ml: 20 }}
              >

                <Box sx={{ display: "flex", p: 1 }}>

                  {colors.map((color) => (

                    <Box
                      key={color}
                      onClick={() => handleColorSelect(color)}
                      sx={{
                        width: 24,
                        height: 24,
                        borderRadius: "50%",
                        backgroundColor: color,
                        cursor: "pointer",
                        m: 0.5,
                        border: "1px solid #ccc",
                      }}
                    />

                  ))}

                </Box>

              </Popover>

            </Box>

          )}

        </Paper>

      </Box>

      {
        click ? <List_view saved={saved} setSaved={setSaved} /> :
          <Grid_view saved={saved} setSaved={setSaved} />
      }

    </>
  )

}

export default Take_notes