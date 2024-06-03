import React, { useState } from 'react';
import { CssBaseline, Box, Drawer, AppBar, Toolbar, List, ListItem, ListItemIcon, ListItemText, Typography, Divider } from '@mui/material';
import { Home, Dashboard, Settings, Logout, AccountCircle, CardMembership, AddBusinessRounded, SupervisedUserCircle, Warehouse } from '@mui/icons-material';
import HomeContent from './Admin Page/HomeContent';
import ServiceCenters from './Admin Page/ServiceCenters';
import CustomerProfiles from './Admin Page/CustomerProfiles';
import AdminProfile from './Admin Page/AdminProfile';
import AllBills from './Admin Page/AllBills';
import RequestedServiceCenter from './Admin Page/RequestedServiceCenter';
 
const drawerWidth = 240;
 
const Admin = () => {
  const [selectedComponent, setSelectedComponent] = useState('Home');

  const sessionId = localStorage.getItem('sessionId');

  console.log(sessionId)

  const handleLogout = () => {
    localStorage.removeItem("sessionId");
  };

 
  const renderContent = () => {
    switch (selectedComponent) {
      case 'Home':
        return <HomeContent />;
      case 'Service Centers':
        return <ServiceCenters />;
      case 'Customer Profiles':
        return <CustomerProfiles />;
      case 'Requests':
        return <RequestedServiceCenter />;
      case 'Bills':
        return <AllBills />;
      case 'Profile':
        return <AdminProfile />;
      default:
        return <Typography paragraph>Welcome to the admin dashboard. This is where you can manage your content.</Typography>;
    }
  };
 
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap>
            Admin Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: 'border-box'
          }
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            <ListItem button onClick={() => setSelectedComponent('Home')} key="Home">
              <ListItemIcon>
                <Home />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
            <ListItem button onClick={() => setSelectedComponent('Service Centers')} key="Service Centers">
              <ListItemIcon>
                <Warehouse />
              </ListItemIcon>
              <ListItemText primary="Service Centers" />
            </ListItem>
           
            <ListItem button onClick={() => setSelectedComponent('Customer Profiles')} key="Customer Profiles">
              <ListItemIcon>
                <SupervisedUserCircle />
              </ListItemIcon>
              <ListItemText primary="Customer Profiles" />
            </ListItem>
            <ListItem button onClick={() => setSelectedComponent('Requests')} key="Requests">
              <ListItemIcon>
                <AddBusinessRounded />
              </ListItemIcon>
              <ListItemText primary="Requests" />
            </ListItem>
            <ListItem button onClick={() => setSelectedComponent('Bills')} key="Bills">
              <ListItemIcon>
                <CardMembership />
              </ListItemIcon>
              <ListItemText primary="Bills" />
            </ListItem>
            <ListItem button onClick={() => setSelectedComponent('Profile')} key="Profile">
              <ListItemIcon>
                <AccountCircle />
              </ListItemIcon>
              <ListItemText primary="Admin Details" />
            </ListItem>
            <Divider />
            <a href="/">
            <ListItem button key="Logout" onClick={handleLogout}>
              <ListItemIcon>
                <Logout />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
            </a>
            
          </List>
        </Box>
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: 'background.default',
          p: 3,
        }}
      >
        <Toolbar />
        {renderContent()}
      </Box>
    </Box>
  );
};
 
export default Admin;