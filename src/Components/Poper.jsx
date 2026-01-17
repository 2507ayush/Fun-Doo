import React,{useState} from 'react';
import Box from '@mui/material/Box';
import Popper from '@mui/material/Popper';
import { Avatar } from '@mui/material';
import {Typography} from '@mui/material';
import {Card} from '@mui/material';
import {Divider} from '@mui/material';
import {Button} from '@mui/material'
import { ClickAwayListener } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import SignIn from '../Pages/SignIn/SignIn';
import { Link,useNavigate } from 'react-router-dom';
function Poper({anchorEl, onclose}) {

  const open = Boolean(anchorEl);

  return (
      <Popper open={open} anchorEl={anchorEl} disablePortal sx={{zIndex:1300}}>
        <ClickAwayListener onClickAway={onclose}>
        
        <Box sx={{
            width: 320,
            mt: 5,
            p: 2,
            borderRadius: 3,
            boxShadow: 4,
            backgroundColor:'#edf2fa',
            textTransform:'none',
        }}>        

                <Box sx={{display:"flex",justifyContent:'center'}}>
                    <Avatar sx={{backgroundColor:"orange"}}>
                        A
                    </Avatar>
                </Box>                
            <Typography align="center" varient="h3">
                Hii, Aushman!
            </Typography> 
            <Typography align="center" varient="h5"> 
                vermamaan55@gmail.com                
            </Typography>

            <Divider sx={{my: 2}}/>

            <div style={{display:'flex',flexDirection:'row',gap:'1px'}}>
                <Button fullWidth variant="outlined" component={Link} to="/SignIn" sx={{borderBottomLeftRadius:25,borderTopLeftRadius:25,color:'black',backgroundColor:'white',fontSize:'12px'}}>
                    <AddIcon/>
                    Add Account
                </Button>
                <Button fullWidth variant="outlined" sx={{borderBottomRightRadius:25,borderTopRightRadius:25,color:'black',backgroundColor:'white',fontSize:'12px'}}>
                    <LogoutOutlinedIcon/>
                    Sign Out
                </Button>
            </div>
        </Box>
        </ClickAwayListener>
      </Popper>
      )
    }


export default Poper;
