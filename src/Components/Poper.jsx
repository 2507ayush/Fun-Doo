import React,{useState} from 'react';
import Box from '@mui/material/Box';
import Popper from '@mui/material/Popper';
import { Avatar } from '@mui/material';
import {Typography} from '@mui/material';
import {Card} from '@mui/material';
import {Divider} from '@mui/material';
import {Button} from '@mui/material'
import { ClickAwayListener } from '@mui/material';
function Poper({anchorEl, onclose}) {

  const open = Boolean(anchorEl);

  return (
      <Popper open={open} anchorEl={anchorEl} disablePortal>
        <ClickAwayListener onClickAway={onclose}>
        
        <Card sx={{
            width: 320,
            mt: 5,
            p: 2,
            borderRadius: 3,
            boxShadow: 4
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

            <div style={{display:'flex',flexDirection:'row',gap:'8px'}}>
                <Button fullWidth variant="outlined">
                    Add Account
                </Button>
                <Button fullWidth variant="outlined">
                    Sign Out
                </Button>
            </div>
        </Card>
        </ClickAwayListener>
      </Popper>
      )
    }


export default Poper;
