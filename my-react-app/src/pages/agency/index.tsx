import React from 'react';
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

interface TransportCard {
  id: string;
  title: string;
  imageUrl: string;
  description?: string;
}

const transportServices: TransportCard[] = [
  {
    id: 'mi-transporte',
    title: 'Mi Transporte',
    imageUrl: '/api/placeholder/400/200',
    description: 'Conoce las nuevas rutas de Mi Transporte'
  },
  {
    id: 'mi-transporte-electrico',
    title: 'Mi Transporte Electrico',
    imageUrl: '/api/placeholder/400/200',
    description: 'Descubre los beneficios de Mi Transporte eléctrico'
  },
  {
    id: 'mi-macro',
    title: 'Mi Macro',
    imageUrl: '/api/placeholder/400/200',
    description: 'El mayor proyecto de movilidad en México'
  },
  {
    id: 'mi-tren',
    title: 'Mi Tren',
    imageUrl: '/api/placeholder/400/200',
    description: 'Arranque de la siguiente etapa de obra de la LÍNEA 4'
  },
  {
    id: 'siteur',
    title: 'SITEUR',
    imageUrl: '/api/placeholder/400/200',
  }
];

const Agency: React.FC = () => {
  const navigate = useNavigate();

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
          {transportServices.map((service) => (
            <Grid item xs={12} sm={6} md={4} key={service.id}>
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
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={service.imageUrl}
                  alt={service.title}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    {service.title}
                  </Typography>
                  {service.description && (
                    <Typography variant="body2" color="text.secondary">
                      {service.description}
                    </Typography>
                  )}
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