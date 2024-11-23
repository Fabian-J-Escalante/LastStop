import React from 'react';
import { 
  Box,
  Card,
  CardContent,
  CardMedia,
  Container,
  Typography,
  AppBar,
  Toolbar,
  Grid
} from '@mui/material';

interface MenuCard {
  id: string;
  title: string;
  image: string;
}

const menuItems: MenuCard[] = [
  {
    id: 'agencia',
    title: 'Agencia',
    image: '/api/placeholder/400/200'
  },
  {
    id: 'rutas',
    title: 'Rutas',
    image: '/api/placeholder/400/200'
  },
  {
    id: 'paradas',
    title: 'Paradas',
    image: '/api/placeholder/400/200'
  },
  {
    id: 'horario',
    title: 'Horario',
    image: '/api/placeholder/400/200'
  },
  {
    id: 'mapa',
    title: 'Mapa',
    image: '/api/placeholder/400/200'
  }
];

const Home: React.FC = () => {
  return (
    <Box sx={{ 
      flexGrow: 1, 
      bgcolor: '#121212', 
      minHeight: '100vh',
      color: 'white'
    }}>
      <AppBar position="static" sx={{ 
        backgroundColor: '#1E1E1E', 
        boxShadow: 'none',
        borderBottom: '1px solid rgba(255, 255, 255, 0.12)'
      }}>
        <Toolbar sx={{ padding: '8px 16px' }}>
          <Typography variant="h6" component="div" sx={{ 
            fontSize: '1.5rem',
            fontWeight: 500,
            width: '100%'
          }}>
            INICIO
          </Typography>
        </Toolbar>
      </AppBar>

      <Container sx={{ py: 3 }}>
        <Grid container spacing={3}>
          {menuItems.map((item, index) => (
            <Grid 
              item
              xs={12} 
              md={index < 2 ? 6 : 4} 
              key={item.id}
            >
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: 2,
                  margin: '16px 0',
                  '&:hover': {
                    transform: 'scale(1.02)',
                    transition: 'transform 0.2s ease-in-out'
                  }
                }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={item.image}
                  alt={item.title}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    {item.title}
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

export default Home;