import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './index.css';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Container,
  Typography,
  AppBar,
  Toolbar,
  Grid,
  IconButton,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface Agency {
  agency_id: string;
  agency_name: string;
  image?: string; // Propiedad opcional para la imagen
}

const Agency: React.FC = () => {
  const navigate = useNavigate();
  const [agencies, setAgencies] = useState<Agency[]>([]);

  useEffect(() => {
    const fetchAgencies = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/api/agency');
        const agenciesWithImages = response.data.map((agency: Agency) => ({
          ...agency,
          image: `/images/agencies/${agency.agency_id}.png`, // Construye la URL de la imagen
        }));
        setAgencies(agenciesWithImages);
      } catch (error) {
        console.error('Error fetching agencies:', error);
      }
    };

    fetchAgencies();
  }, []);

  const handleCardClick = (agency_id: string) => {
    navigate(`../rutas?agency_id=${agency_id}`);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: '#1a1a1a', marginBottom: 3 }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="back"
            sx={{ mr: 2 }}
            onClick={() => navigate('/')}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" component="div">
            Agencia
          </Typography>
        </Toolbar>
      </AppBar>
      
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          {agencies.map((agency) => (
            <Grid item xs={12} sm={6} md={4} key={agency.agency_id}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: 2,
                  '&:hover': {
                    transform: 'scale(1.02)',
                    transition: 'transform 0.2s ease-in-out'
                  }
                }}
                onClick={() => handleCardClick(agency.agency_id)}
              >
                {agency.image ? (
                  <CardMedia
                    component="img"
                    height="200"
                    image={agency.image}
                    alt={agency.agency_name}
                    sx={{ objectFit: 'cover' }}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = ''; // Si la imagen no se encuentra, no muestra nada
                    }}
                  />
                ) : (
                  <Box
                    sx={{
                      height: 200,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: '#333' // Cambiado a gris oscuro
                    }}
                  >
                    <Typography variant="h6" component="div" color="white">
                      {agency.agency_name}
                    </Typography>
                  </Box>
                )}
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div" color="textSecondary">
                    {agency.agency_name}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Agency;