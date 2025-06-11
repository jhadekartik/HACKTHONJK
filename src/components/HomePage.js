import React from 'react';
import { Box, Typography, Button, Container, Grid, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';

const HomePage = () => {
  const navigate = useNavigate();
  const { familyMembers } = useUser();

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4, textAlign: 'center' }}>
        <Typography variant="h2" component="h1" gutterBottom>
          भारत वॉइस सहायक
        </Typography>
        <Typography variant="h4" component="h2" gutterBottom>
          Bharat Voice Sahayak
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          India's First AI-Powered Home Voice Assistant for Opportunities, Jobs, and Government Schemes
        </Typography>

        <Box sx={{ mt: 6, mb: 4 }}>
          <Paper elevation={3} sx={{ p: 4, backgroundColor: '#f8f8f8' }}>
            <Typography variant="h5" gutterBottom>
              Never Miss Life-Changing Opportunities Again
            </Typography>
            <Typography variant="body1" paragraph>
              Our AI-powered assistant notifies each family member about relevant opportunities in their mother tongue.
              From scholarships to job openings to government schemes - all delivered through a simple voice interface.
            </Typography>
          </Paper>
        </Box>

        <Grid container spacing={4} justifyContent="center" sx={{ mt: 2 }}>
          {familyMembers.length > 0 ? (
            <Grid item>
              <Button 
                variant="contained" 
                color="primary" 
                size="large"
                onClick={() => navigate('/speaker')}
              >
                Go to Speaker Interface
              </Button>
            </Grid>
          ) : (
            <Grid item>
              <Button 
                variant="contained" 
                color="primary" 
                size="large"
                onClick={() => navigate('/register')}
              >
                Register Your Family
              </Button>
            </Grid>
          )}
          
          {familyMembers.length > 0 && (
            <Grid item>
              <Button 
                variant="outlined" 
                color="secondary" 
                size="large"
                onClick={() => navigate('/dashboard')}
              >
                View Dashboard
              </Button>
            </Grid>
          )}
        </Grid>
      </Box>
    </Container>
  );
};

export default HomePage;