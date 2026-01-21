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
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

export default function Grid_view({ saved, setSaved }) {
  const { open } = useDrawer();

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

  const [anchorEl, setAnchorEl] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);

  const updateNote = async (index, field, value) => {
    setSaved(prev =>
      prev.map((note, i) =>
        i === index ? { ...note, [field]: value } : note
      )
    );

    const n = saved[index];
    if (!n) return;

    try {
      await fetch(`http://localhost:5000/notes/${n.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [field]: value }),
      });
    } catch (error) {
      console.log(error);
    }
  };

  const updateColor = async (index, color) => {
    setSaved(prev =>
      prev.map((note, i) =>
        i === index ? { ...note, bgcolor: color } : note
      )
    );

    const n = saved[index];
    if (!n) return;

    try {
      await fetch(`http://localhost:5000/notes/${n.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bgcolor: color }),
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleColorOpen = (event, index) => {
    setAnchorEl(event.currentTarget);
    setActiveIndex(index);
  };

  const handleColorClose = () => {
    setAnchorEl(null);
    setActiveIndex(null);
  };

  const handleDelete = async (index) => {
    const note = saved[index];
    if (!note) return;
  
  
    setSaved(prev => prev.filter((_, i) => i !== index));
  
    try {
      await fetch(`http://localhost:5000/notes/${note.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Trash: true }),
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleA = async (index) => {
        const note = saved[index];
        if (!note) return;

        setSaved(prev => prev.filter((_, i) => i !== index));

        try {
            await fetch(`http://localhost:5000/notes/${note.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ Archive: true }),
            });
        } catch (error) {
            console.log(error);
        }
    };

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
        {saved.map((note, index) => (
          <Paper
            key={note.id}
            elevation={2}
            sx={{
              p: 2,
              backgroundColor: note.bgcolor,
              borderRadius: 2,
            }}
          >
            <TextareaAutosize
              placeholder="Title"
              value={note.title}
              onChange={(e) =>
                updateNote(index, "title", e.target.value)
              }
              style={{
                width: "100%",
                border: "none",
                outline: "none",
                fontSize: "1.2rem",
                backgroundColor: "transparent",
                fontWeight: 500,
              }}
            />

            <TextareaAutosize
              placeholder="Take a note..."
              value={note.description}
              onChange={(e) =>
                updateNote(index, "description", e.target.value)
              }
              style={{
                width: "100%",
                border: "none",
                outline: "none",
                resize: "none",
                backgroundColor: "transparent",
                marginTop: 8,
              }}
            />

            {/* ACTION ICONS */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                mt: 1,
              }}
            >


              <Tooltip title="formatting options" sx={{ opacity: '1', cursor: 'pointer', pl: 0 }}>
                <IconButton>
                  <FormatColorTextOutlinedIcon />
                </IconButton>
              </Tooltip>

              <Tooltip title="Change color">
                <IconButton
                  onClick={(e) => handleColorOpen(e, index)}
                >
                  <ColorLensOutlinedIcon />
                </IconButton>
              </Tooltip><Tooltip title="remind me">
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
                  <ArchiveOutlinedIcon sx={{ pl: 1, pr: 1, cursor: 'pointer' }} onClick={()=>handleA(index)} />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete">
                <IconButton>
                  <DeleteOutlineOutlinedIcon onClick={() => handleDelete(index)}/>
                </IconButton>
              </Tooltip>
              <Tooltip title="more options">
                <IconButton>
                  <MoreVertOutlinedIcon sx={{ textAlign: 'center', pl: 1, pr: 1, cursor: 'pointer' }} />
                </IconButton>
              </Tooltip>

            </Box>
          </Paper>
        ))}
      </Box>

      {/* 🎨 COLOR PICKER */}
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleColorClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <ClickAwayListener onClickAway={handleColorClose}>
          <Box sx={{ display: "flex", p: 1 }}>
            {colors.map((color) => (
              <Box
                key={color}
                sx={{
                  width: 24,
                  height: 24,
                  borderRadius: "50%",
                  backgroundColor: color,
                  cursor: "pointer",
                  m: 0.5,
                  border: "1px solid #ccc",
                }}
                onClick={() => {
                  updateColor(activeIndex, color);
                  handleColorClose();
                }}
              />
            ))}
          </Box>
        </ClickAwayListener>
      </Popover>
    </>
  );
}
