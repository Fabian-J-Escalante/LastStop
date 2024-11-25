import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Box, AppBar, Toolbar, Typography, IconButton, TextField, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import './map.css';

// Define styles as a constant
const styles = {
  root: {
    flexGrow: 1,
    bgcolor: '#121212',
    minHeight: '100vh',
    color: 'white',
    position: 'relative',
  },
  appBar: {
    backgroundColor: '#1E1E1E',
    boxShadow: 'none',
    borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
  },
  inputBox: {
    position: 'absolute',
    top: '70px',
    right: '20px',
    zIndex: 1000,
    backgroundColor: 'white',
    padding: '16px',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  mapContainer: {
    height: '500px',
    width: '100%',
  },
};

const ChangeView: React.FC<{ center: [number, number] }> = ({ center }) => {
  const map = useMap();
  map.setView(center, map.getZoom());
  return null;
};

const Map: React.FC = () => {
  const navigate = useNavigate();
  const initialPosition: [number, number] = [51.505, -0.09];
  const [position, setPosition] = useState<[number, number]>(initialPosition);
  const [inputLat, setInputLat] = useState<string>(`${initialPosition[0]}`);
  const [inputLng, setInputLng] = useState<string>(`${initialPosition[1]}`);

  const handlePositionChange = () => {
    const lat = parseFloat(inputLat);
    const lng = parseFloat(inputLng);
    if (!isNaN(lat) && !isNaN(lng)) {
      setPosition([lat, lng]);
    } else {
      alert('Invalid latitude or longitude values.');
    }
  };

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

      {/* Input Box for Latitude and Longitude */}
      <Box sx={styles.inputBox}>
        <TextField
          label="Latitude"
          variant="outlined"
          size="small"
          value={inputLat}
          onChange={(e) => setInputLat(e.target.value)}
          sx={{ marginBottom: '8px', width: '100%' }}
        />
        <TextField
          label="Longitude"
          variant="outlined"
          size="small"
          value={inputLng}
          onChange={(e) => setInputLng(e.target.value)}
          sx={{ marginBottom: '8px', width: '100%' }}
        />
        <Button variant="contained" color="primary" onClick={handlePositionChange} fullWidth>
          Go to Location
        </Button>
      </Box>

      {/* Map Container */}
      <MapContainer center={position} zoom={13} scrollWheelZoom={false} className="map-container">
        <ChangeView center={position} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            You are here: <br /> {`Lat: ${position[0]}, Lng: ${position[1]}`}
          </Popup>
        </Marker>
      </MapContainer>
    </Box>
  );
};

export default Map;

