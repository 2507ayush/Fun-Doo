import React, { useState, useContext } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { TextareaAutosize, Tooltip, IconButton, Popover, ClickAwayListener } from '@mui/material';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import FormatColorTextOutlinedIcon from '@mui/icons-material/FormatColorTextOutlined';
import ColorLensOutlinedIcon from '@mui/icons-material/ColorLensOutlined';
import AddAlertOutlinedIcon from '@mui/icons-material/AddAlertOutlined';
import PersonAddAlt1OutlinedIcon from '@mui/icons-material/PersonAddAlt1Outlined';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { useDrawer } from './Side-Bar-Context';
import { SearchContext } from '../Dashboard/FunDoo';
import Api from '../services/Api';

export default function List_view({ saved, setSaved }) {

    const { open } = useDrawer();
    const searchText = useContext(SearchContext);

    const [anchorEl, setAnchorEl] = useState(null);
    const [activeIndex, setActiveIndex] = useState(null);

    const colors = ["#ffffff", "#f28b82", "#fbbc04", "#fff475", "#ccff90", "#a7ffeb", "#cbf0f8", "#aecbfa", "#d7aefb"];


    const updateNote = async (note, index, field, value) => {

        const updated = { ...note, [field]: value };

        setSaved(prev => prev.map((n, i) => i === index ? updated : n));

        try {
            await Api.patch(`/note/update/${note.noteId}`, updated);
        }
        catch (err) {
            console.log(err);
        }
    };


    const updateColor = async (note, index, color) => {

        const updated = { ...note, color: color };

        setSaved(prev => prev.map((n, i) => i === index ? updated : n));

        try {
            await Api.patch(`/note/update/${note.noteId}`, updated);
        }
        catch (err) {
            console.log(err);
        }
    };


    const handleArchive = async (note, index) => {

        const updated = { ...note, archived: true };

        try {

            await Api.put(`/note/archive/${note.noteId}`, updated);

            setSaved(prev =>
                prev.map(n =>
                    n.noteId === note.noteId ? updated : n
                )
            );

        }
        catch (err) {
            console.log(err);
        }
    };


    const handleDelete = async (note, index) => {

        const updated = { ...note, trashed: true };

        try {

            await Api.put(`/note/trash/${note.noteId}`, updated);

            setSaved(prev =>
                prev.map(n =>
                    n.noteId === note.noteId ? updated : n
                )
            );

        }
        catch (err) {
            console.log(err);
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
            {notes.map((note, index) => (

                <Paper
                    key={note.noteId || index}
                    elevation={2}
                    sx={{
                        p: 1,
                        boxSizing: "border-box",
                        backgroundColor: note.color || "#fff",
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
                                value={note.title || ""}
                                onChange={(e) =>
                                    updateNote(note, index, 'title', e.target.value)
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
                            value={note.description || ""}
                            onChange={(e) =>
                                updateNote(note, index, 'description', e.target.value)
                            }
                        />


                        <div style={{ display: "flex", alignItems: "center", flexWrap: "nowrap", marginTop: "10px" }}>

                            <Tooltip title="formatting options">
                                <IconButton><FormatColorTextOutlinedIcon /></IconButton>
                            </Tooltip>

                            <Tooltip title="change color">
                                <IconButton onClick={(e) => handleColorOpen(e, index)}>
                                    <ColorLensOutlinedIcon />
                                </IconButton>
                            </Tooltip>

                            <Tooltip title="remind me">
                                <IconButton><AddAlertOutlinedIcon /></IconButton>
                            </Tooltip>

                            <Tooltip title="collaborator">
                                <IconButton><PersonAddAlt1OutlinedIcon /></IconButton>
                            </Tooltip>

                            <Tooltip title="add img">
                                <IconButton><ImageOutlinedIcon /></IconButton>
                            </Tooltip>

                            <Tooltip title="archive">
                                <IconButton onClick={() => handleArchive(note, index)}>
                                    <ArchiveOutlinedIcon />
                                </IconButton>
                            </Tooltip>

                            <Tooltip title="Delete">
                                <IconButton onClick={() => handleDelete(note, index)}>
                                    <DeleteOutlineOutlinedIcon />
                                </IconButton>
                            </Tooltip>

                            <Tooltip title="more options">
                                <IconButton><MoreVertOutlinedIcon /></IconButton>
                            </Tooltip>

                        </div>


                        <Popover
                            open={Boolean(anchorEl) && activeIndex === index}
                            anchorEl={anchorEl}
                            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                            transformOrigin={{ vertical: "top", horizontal: "center" }}
                            sx={{ mt: 1, ml: 20 }}
                        >

                            <ClickAwayListener onClickAway={handleColorClose}>

                                <Box sx={{ display: "flex", p: 1 }}>

                                    {colors.map(color => (

                                        <Box
                                            key={color}
                                            sx={{
                                                width: 24,
                                                height: 24,
                                                borderRadius: "50%",
                                                backgroundColor: color,
                                                cursor: "pointer",
                                                m: 0.5,
                                                border: "1px solid #ccc"
                                            }}
                                            onClick={() => {
                                                updateColor(note, index, color);
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
    );
}