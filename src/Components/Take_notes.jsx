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


function Take_notes() {
    const [expand,setExpand] = useState(false);
    const handleClick = () => {
        setExpand(true);
    }
  return (
    <Box  sx={{display:'flex', '& .MuiPaper-root': {width:'80%', height:'20%'},ml:60,mt:3, flexDirection:'space-between'}}>
    <Paper elevation={3} sx={{padding:0,margin:0,boxSizing:'border-box'}}>
        {!expand ? (
        <Box sx={{display:'flex',alignItems:'center'}}>
      <TextareaAutosize
      onClick={handleClick}
      aria-label='emty textarea'
      placeholder='Take a note...'
      style={{width:'70%',height:'2%',border:'none',outline:'none',fontSize:'1.0rem',resize:'none'}}
      />
      
      <Tooltip title="New List">
        <IconButton size='extra-small' >
        <CheckBoxOutlinedIcon sx={{ml:2}}/>
        </IconButton>
      </Tooltip>
      <Tooltip title="New note with drawing">
        <IconButton size='small' >
        <BrushOutlinedIcon sx={{ml:2}}/>
        </IconButton>
      </Tooltip>
      <Tooltip title="New note with image">
        <IconButton size='small'>
        <ImageOutlinedIcon sx={{ml:2}}/>
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