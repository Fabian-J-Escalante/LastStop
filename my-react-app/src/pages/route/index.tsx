import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MenuIcon from '@mui/icons-material/Menu';
import MoreVertIcon from '@mui/icons-material/MoreVert';

interface Ruta {
  id: string;
  codigo: string;
  nombre: string;
}

const rutas: Ruta[] = [
  {
    id: 'c01',
    codigo: 'C01',
    nombre: 'Troncal C01 - 39A "Poniente"'
  },
  {
    id: 'c02',
    codigo: 'C02',
    nombre: 'Troncal C02 - 45A'
  },
  {
    id: 'c03',
    codigo: 'C03',
    nombre: 'Troncal C03 - 61 "Mercado de Abastos"'
  },
  {
    id: 'c04',
    codigo: 'C04',
    nombre: 'Troncal C04 - 110'
  },
  {
    id: 'c05',
    codigo: 'C05',
    nombre: 'Troncal C05 - 136'
  }
];

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

const Ruta: React.FC = () => {
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
            Mi Transporte
          </Typography>
        </Toolbar>
      </AppBar>

      <List sx={styles.list}>
        {rutas.map((ruta) => (
          <ListItem key={ruta.id} sx={styles.listItem}>
            <ListItemIcon>
              <Box sx={styles.menuIcon}>
                <MenuIcon color="inherit" />
              </Box>
            </ListItemIcon>
            <ListItemText
              primary={ruta.codigo}
              secondary={
                <Typography variant="body2" color="rgba(255, 255, 255, 0.7)">
                  {ruta.nombre}
                </Typography>
              }
            />
            <ListItemSecondaryAction>
              <IconButton edge="end" color="inherit">
                <MoreVertIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Ruta;