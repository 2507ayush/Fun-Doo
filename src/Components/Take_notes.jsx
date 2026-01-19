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


function Take_notes() {
  const { open } = useDrawer();
  const [expand, setexpand] = useState(false);
  // when click on notes then its section appear

  const handleClick = () => {
    setexpand(true);
  }
  const opening = open ? 60 : 40;
  const close = open ? 0 : -10;

  const [noteColor, setNoteColor] = useState("#ffffff");
  const [anchorEl, setAnchorEl] = useState(null);
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


  const openColor = Boolean(anchorEl);

  return (
    <Box
      sx={{
        display: 'flex', '& .MuiPaper-root': { transform: `translateX(${close}px)`, width: '600px', height: '20%' }, ml: opening, mt: 3, flexDirection: 'space-between'
      }}

    >
      <Paper
        elevation={2}
        sx={{
          p: 2,
          boxSizing: "border-box",
          backgroundColor: noteColor
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

            <Box sx={{ display: 'flex', flexDirection: 'column', padding: 1 }}>
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
              />

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexWrap: "nowrap",
                  marginTop: "20px",
                }}
              >

                <Tooltip title="formatting options" sx={{ opacity: '0.7' }}>
                  <FormatColorTextOutlinedIcon />
                </Tooltip>
                <Tooltip title="change color">
                  <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
                    <ColorLensOutlinedIcon sx={{ opacity: "0.7" }} />
                  </IconButton>
                </Tooltip>

                <Tooltip title="remind me">
                  <AddAlertOutlinedIcon sx={{ ml: 5, opacity: '0.7' }} />
                </Tooltip>
                <Tooltip title="collaborator">
                  <PersonAddAlt1OutlinedIcon sx={{ ml: 5, opacity: '0.7' }} />
                </Tooltip>
                <Tooltip title="add img">
                  <ImageOutlinedIcon sx={{ ml: 5, opacity: '0.7' }} />
                </Tooltip>
                <Tooltip title="archive">
                  <ArchiveOutlinedIcon sx={{ ml: 5, opacity: '0.7' }} />
                </Tooltip>
                <Tooltip title="more options">
                  <MoreVertOutlinedIcon sx={{ ml: 5, opacity: '0.7' }} />
                </Tooltip>
                <Typography sx={{ marginLeft: 'auto', mr: 3, color: 'black', borderRadius: 8, cursor: 'pointer' }}>
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

  )
}

export default Take_notes;