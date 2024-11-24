import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const styles = {
  root: {
    flexGrow: 1,
    bgcolor: '#121212',
    minHeight: '100vh',
    color: 'white'
  },
  appBar: {
    backgroundColor: '#1E1E1E',
    boxShadow: 'none',
    borderBottom: '1px solid rgba(255, 255, 255, 0.12)'
  },
  list: {
    bgcolor: 'transparent',
    padding: 0
  },
  listItem: {
    borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
    padding: '16px',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.08)'
    }
  },
  menuIcon: {
    backgroundColor: '#333',
    borderRadius: '8px',
    padding: '8px',
    marginRight: '16px'
  }
} as const;

const Map: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box sx={styles.root}>
      <AppBar position="static" sx={styles.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="back"
            sx={{ mr: 2 }}
            onClick={() => navigate('/')}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Mapa
          </Typography>
        </Toolbar>
      </AppBar>

    </Box>
  );
};

export default Map;