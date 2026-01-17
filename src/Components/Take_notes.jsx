import React,{useState} from 'react'
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
import Icon_buttons from './Icon_buttons';
import { useDrawer } from './Side-Bar-Context';
import { use } from 'react';


function Take_notes() {

    const {open} = useDrawer();
    const [expand,setExpand] = useState(false);
    const handleClick = () => {
        setExpand(true);
    }
    const opening = open?60:40;
    const closing = open?0:-10;
  return (
    <Box  sx={{display:'flex', '& .MuiPaper-root': {transform:`translateX(${closing}px)`,width:'600px', height:'20%'},ml:opening,mt:3, flexDirection:'space-between'}}>
    <Paper elevation={3} sx={{paddingLeft:1,margin:0,boxSizing:'border-box'}}>
        {!expand ? (
        <Box sx={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
      <TextareaAutosize
      onClick={handleClick}
      aria-label='emty textarea'
      placeholder='Take a note...'
      style={{width:'70%',height:'2%',border:'none',outline:'none',fontSize:'1.0rem',resize:'none',paddingRight:'5px'}}
      />
      
      <Tooltip title="New List">
        <IconButton size='extra-small' >
        <CheckBoxOutlinedIcon sx={{}}/>
        </IconButton>
      </Tooltip>
      <Tooltip title="New note with drawing">
        <IconButton size='small' >
        <BrushOutlinedIcon sx={{}}/>
        </IconButton>
      </Tooltip>
      <Tooltip title="New note with image">
        <IconButton size='small'>
        <ImageOutlinedIcon sx={{}}/>
        </IconButton>
      </Tooltip>
      </Box>
        ):(
            
            <Icon_buttons />

        )
    }

    </Paper>
    </Box>
  )}
export default Take_notes