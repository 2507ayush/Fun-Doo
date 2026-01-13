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



const menuItems = [
  { text: 'Notes', icon: LightbulbOutlinedIcon },
  { text: 'Reminder', icon: NotificationsNoneOutlinedIcon },
  { text: 'Edit Labels', icon: EditOutlinedIcon },
  { text: 'Archive', icon: ArchiveOutlinedIcon },
  { text: 'Trash', icon: DeleteOutlinedIcon },
];


export default function Sidebar() {
    const { open } = useDrawer();
    let drawerWidth = open?270:72;

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
            {menuItems.map((item, index) => (
              <ListItem
                key={item.text}
                disablePadding
                sx={{
                  backgroundColor: index === 0 ? '#feefc3' : 'transparent',
                  borderTopRightRadius: '50px',
                  borderBottomRightRadius: '50px',
                }}
              >
                <ListItemButton>
                  <ListItemIcon sx={{ minWidth: 48 }}> {/* Better spacing for icons */}
                    <item.icon />
                  </ListItemIcon>
                  <ListItemText primary={item.text} sx={{display:open?'block':'none'}}  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
}