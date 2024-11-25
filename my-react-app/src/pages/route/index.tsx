import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
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
  TextField,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MenuIcon from '@mui/icons-material/Menu';
import MoreVertIcon from '@mui/icons-material/MoreVert';

interface Ruta {
  route_id: string;
  route_short_name: string;
  route_long_name: string;
  agency_name: string;
}

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
  },
  textField: {
    marginTop: '16px',
    width: '100%',
    backgroundColor: '#1E1E1E',
    color: 'white'
  }
} as const;

const Ruta: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const agencyId = searchParams.get('agency_id') || 'default_agency_id';
  const [agencyName, setAgencyName] = useState('Mi Transporte');
  const [agencyDescription, setAgencyDescription] = useState('');
  const [agencyDetails, setAgencyDetails] = useState({
    agency_name: '',
    agency_url: '',
    agency_timezone: '',
    agency_lang: '',
    agency_phone: ''
  });
  const [rutas, setRutas] = useState<Ruta[]>([]);

  useEffect(() => {
    const fetchAgencyDetails = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:5000/api/agency_details/${agencyId}`);
        const details = response.data;
        if (details.length > 0) {
          setAgencyName(details[0].agency_name);
          setAgencyDescription(details[0].agency_description || ''); // Assuming agency_description is part of the response
          setAgencyDetails(details[0]);
        }
      } catch (error) {
        console.error('Error fetching agency details:', error);
      }
    };

    const fetchRoutes = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:5000/api/routes_and_agency?agency_id=${agencyId}`);
        const routes = response.data;
        setRutas(routes);
      } catch (error) {
        console.error('Error fetching routes:', error);
      }
    };

    fetchAgencyDetails();
    fetchRoutes();
  }, [agencyId]);

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
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h6" component="div">
              {agencyName}
            </Typography>
            <Typography variant="body2" component="div" color="rgba(255, 255, 255, 0.7)">
              {agencyDescription}
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>
      <TextField
        sx={styles.textField}
        label="Detalles Agencia"
        multiline
        rows={4}
        variant="outlined"
        InputProps={{
          readOnly: true,
          style: { color: 'white' }
        }}
        value={`Name: ${agencyDetails.agency_name}\nURL: ${agencyDetails.agency_url}\nTimezone: ${agencyDetails.agency_timezone}\nLanguage: ${agencyDetails.agency_lang}\nPhone: ${agencyDetails.agency_phone}`}
      />
      {rutas.length > 0 ? (
        <List sx={styles.list}>
          {rutas.map((ruta) => (
            <ListItem key={ruta.route_id} sx={styles.listItem}>
              <ListItemIcon>
                <Box sx={styles.menuIcon}>
                  <MenuIcon color="inherit" />
                </Box>
              </ListItemIcon>
              <ListItemText
                primary={ruta.route_short_name}
                secondary={
                  <Typography variant="body2" color="rgba(255, 255, 255, 0.7)">
                    {ruta.route_long_name}
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
      ) : (
        <Typography variant="body2" color="rgba(255, 255, 255, 0.7)" sx={{ textAlign: 'center', marginTop: '16px' }}>
          No hay datos disponibles
        </Typography>
      )}
    </Box>
  );
};

export default Ruta;