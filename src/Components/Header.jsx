import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MoreIcon from '@mui/icons-material/MoreVert';

import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import RefreshOutlinedIcon from '@mui/icons-material/RefreshOutlined';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import AppsOutlinedIcon from '@mui/icons-material/AppsOutlined';
import Tooltip from '@mui/material/Tooltip';
import ViewStreamOutlinedIcon from '@mui/icons-material/ViewStreamOutlined';

import Poper from './Poper';
import { useLocation } from 'react-router-dom';


import { useDrawer } from './Side-Bar-Context';
import FunDoo from '../Dashboard/FunDoo';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: 9,
  backgroundColor: alpha(theme.palette.grey[300], 0.6),
  '&:hover': {
    backgroundColor: alpha(theme.palette.grey[400], 0.8),
  },
  marginLeft: theme.spacing(8),
  width: '100%',
  maxWidth: 750,
  height: '45px',
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
  },
}));

export default function App() {
  const { toggleDrawer,handlePattern,click } = useDrawer();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const location = useLocation();
  const title = location.pathname==='/'? 'FunDoo' : location.pathname.slice(1).charAt(0).toUpperCase() + location.pathname.slice(2);

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        sx={{ backgroundColor: '#fff', color: '#000', top: 0, left: 0, zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >

        <Toolbar>
          <Tooltip title="Main Menu">
            <IconButton size="large" edge="start" color="inherit" onClick={toggleDrawer}>
              <MenuIcon />
            </IconButton></Tooltip>

          <img
            src="https://www.gstatic.com/images/branding/product/2x/keep_2020q4_48dp.png"
            alt="Keep"
            style={{ width: 40, height: 40, display:title === 'FunDoo'?'block':'none'}}
          />

          <Tooltip title="FunDoo">
            <Typography variant="h6" sx={{ ml: 1, mr: 3 }}>
              {title}
            </Typography></Tooltip>

          <Search sx={{backgroundColor:'#edf2fa'}}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase placeholder="Search…" />
          </Search>

          <Box sx={{ flexGrow: 1 }} />

          <Tooltip title="Refresh">
            <IconButton size="large" color="inherit" style={{opacity:'0.5'}}>
              <RefreshOutlinedIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Grid View">
            <IconButton size="large" color="inherit" style={{opacity:'0.5'}} onClick={handlePattern}>
              {click?<GridViewOutlinedIcon />:<ViewStreamOutlinedIcon/>} 
            </IconButton></Tooltip>

          <Tooltip title="Settings">
            <IconButton size="large" color="inherit" style={{opacity:'0.5'}}>
              <SettingsOutlinedIcon />
            </IconButton></Tooltip>

          <Tooltip title="Google Apps">
            <IconButton size="large" color="inherit" style={{opacity:'0.5'}}>
              <AppsOutlinedIcon />
            </IconButton></Tooltip>
          <IconButton
            size="large"
            edge="end"
            color="inherit"
            onClick={handleProfileClick}
            style={{opacity:'0.5'}}
          >
            <AccountCircle />
          </IconButton>
        </Toolbar>

      </AppBar>
      <Toolbar>
        <Tooltip title="profile">
          <IconButton color='inherit'
          onClick={handleProfileClick}
          >
            <AccountCircle/>
          </IconButton>
        </Tooltip>
      </Toolbar>
      <Poper anchorEl={anchorEl} onclose={handleClose}/>
    </Box>
  );
}