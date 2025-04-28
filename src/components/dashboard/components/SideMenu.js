import * as React from 'react';
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import MuiDrawer, { drawerClasses } from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import SelectContent from './SelectContent';
import MenuContent from './MenuContent';
import CardAlert from './CardAlert';
import OptionsMenu from './OptionsMenu';
import Logout from './Logout'; // Import the Logout component
import Login, { decodedJwtToken } from '../../../service/Login'; // Import the Login component

const drawerWidth = 240;

const Drawer = styled(MuiDrawer)({
  width: drawerWidth,
  flexShrink: 0,
  boxSizing: 'border-box',
  mt: 10,
  [`& .${drawerClasses.paper}`]: {
    width: drawerWidth,
    boxSizing: 'border-box',
  },
});

export default function SideMenu({ onLogout, user }) {
  const [userEmail, setUserEmail] = React.useState();
  const [userRole, setUserRole] = React.useState();
  React.useEffect(()=>{
    const decodedToken = decodedJwtToken();
    setUserEmail(decodedToken.sub)
    setUserRole(decodedToken.role)
  })
  const handleLogout = () => {
    console.log('User logged out');
    localStorage.removeItem('jwt-token'); // Clear the JWT token from local storage
    onLogout();
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        display: { xs: 'none', md: 'block' },
        [`& .${drawerClasses.paper}`]: {
          backgroundColor: 'background.paper',
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          mt: 'calc(var(--template-frame-height, 0px) + 4px)',
          p: 1.5,
        }}
      >
        <SelectContent />
      </Box>
      <Divider />
      <Box
        sx={{
          overflow: 'auto',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <MenuContent userRole={userRole}/>
      </Box>
      <Stack
        direction="row"
        sx={{
          p: 2,
          gap: 1,
          alignItems: 'center',
          borderTop: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Box sx={{ mr: 'auto' }}>
          <Typography variant="body2" sx={{ fontWeight: 500, lineHeight: '16px' }}>
            {user?.name || 'Guest User'}
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            {userEmail}
          </Typography>
        </Box>
        <OptionsMenu onLogout={onLogout} />
      </Stack>
    </Drawer>
  );
}
