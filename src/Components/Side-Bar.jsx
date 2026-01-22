import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import Toolbar from '@mui/material/Toolbar';
import { useState } from 'react';
import { useDrawer } from './Side-Bar-Context'
import { useNavigate, useLocation } from 'react-router-dom';



const menuItems = [
  { text: 'Notes', icon: LightbulbOutlinedIcon, link:'/'},
  { text: 'Reminder', icon: NotificationsNoneOutlinedIcon,link:'/reminder' },
  { text: 'Edit_Labels', icon: EditOutlinedIcon, link:'/edit_labels'},
  { text: 'Archive', icon: ArchiveOutlinedIcon ,link:'/archive'},
  { text: 'Trash', icon: DeleteOutlinedIcon ,link:'/trash'},
];


export default function Sidebar() {
  const { open } = useDrawer();
  let drawerWidth = open ? 270 : 72;
  const navigate = useNavigate();
  const handleClick = (text) => {
    navigate(text === 'Notes' ? '/' : `/${text.toLowerCase()}`);
  }
  const location = useLocation();

  return (
    <>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            border: 'none',
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {menuItems.map((item, index) => {
              const isActive = location.pathname === item.link;
              return (

                <ListItem
                  key={item.text}
                  disablePadding
                  sx={{
                    backgroundColor: (isActive) ? '#feefc3' : 'transparent',
                    borderTopRightRadius: '50px',
                    borderBottomRightRadius: '50px',
                  }}
                >
                  <ListItemButton onClick={() => handleClick(item.text)}>
                    <ListItemIcon sx={{ minWidth: 48 }}> {/* Better spacing for icons */}
                      <item.icon />
                    </ListItemIcon>
                    <ListItemText primary={item.text} sx={{ display: open ? 'block' : 'none' }} />
                  </ListItemButton>
                </ListItem>
              )
            })}
          </List>
        </Box>
      </Drawer>
    </>
  );
}