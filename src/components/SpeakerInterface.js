
import Chip from '@mui/material/Chip';
import React, { useState, useEffect } from 'react';
import { 
  Container, Box, Typography, Paper, Button, 
  Grid, Avatar, Card, CardContent, CardActions,
  Dialog, DialogTitle, DialogContent, DialogActions,
  FormControl, InputLabel, Select, MenuItem
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import { getMockOpportunities } from '../data/mockOpportunities';
import { summarizeOpportunity } from '../services/gptService';
import { textToSpeech } from '../services/ttsService';

const SpeakerInterface = () => {
  const navigate = useNavigate();
  const { familyMembers, currentUser, selectUser } = useUser();
  const [opportunities, setOpportunities] = useState([]);
  const [currentOpportunity, setCurrentOpportunity] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [applicationStatus, setApplicationStatus] = useState('');
  
  // Redirect if no family members registered
  useEffect(() => {
    if (familyMembers.length === 0) {
      navigate('/register');
    } else if (!currentUser) {
      selectUser(familyMembers[0].id);
    }
  }, [familyMembers, navigate, currentUser, selectUser]);
  
  // Load opportunities based on current user
  useEffect(() => {
    if (currentUser) {
      const userOpportunities = getMockOpportunities(currentUser);
      setOpportunities(userOpportunities);
      
      // Auto-select first opportunity if none selected
      if (userOpportunities.length > 0 && !currentOpportunity) {
        setCurrentOpportunity(userOpportunities[0]);
      }
    }
  }, [currentUser]);
  
  const handleUserChange = (event) => {
    const userId = event.target.value;
    selectUser(userId);
    setCurrentOpportunity(null);
  };
  
  // Add these state variables
  const [summary, setSummary] = useState('');
  const [audioUrl, setAudioUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  // Modify the handlePlayNotification function
  const handlePlayNotification = async () => {
    if (!currentOpportunity) return;
    
    setIsLoading(true);
    setIsPlaying(true);
    
    try {
      // Get AI-generated summary
      const aiSummary = await summarizeOpportunity(
        currentOpportunity, 
        currentUser,
        currentUser.language
      );
      setSummary(aiSummary);
      
      // Convert to speech
      const speechUrl = await textToSpeech(aiSummary, currentUser.language);
      setAudioUrl(speechUrl);
      
      // Play the audio
      if (speechUrl) {
        const audio = new Audio(speechUrl);
        audio.onended = () => {
          setIsPlaying(false);
        };
        audio.play();
      } else {
        setIsPlaying(false);
      }
    } catch (error) {
      console.error('Error in notification process:', error);
      setIsPlaying(false);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleApply = () => {
    setShowDialog(true);
  };
  
  const handleConfirmApply = () => {
    setApplicationStatus('Application submitted successfully!');
    setTimeout(() => {
      setShowDialog(false);
      // Mark as applied in opportunities list
      setOpportunities(opportunities.map(opp => 
        opp.id === currentOpportunity.id ? {...opp, applied: true} : opp
      ));
    }, 2000);
  };
  
  if (!currentUser) return null;
  
  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Bharat Voice Sahayak - Speaker Interface
        </Typography>
        
        <Paper 
          elevation={3} 
          sx={{ 
            p: 4, 
            mt: 4, 
            borderRadius: '16px',
            background: 'linear-gradient(145deg, #FF6B35 0%, #f8f8f8 100%)'
          }}
        >
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Box sx={{ textAlign: 'center' }}>
                <Paper 
                  elevation={6} 
                  sx={{ 
                    p: 3, 
                    borderRadius: '50%', 
                    width: 200, 
                    height: 200, 
                    margin: '0 auto',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: isPlaying ? '#2E86AB' : '#f8f8f8',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <Typography 
                    variant="h5" 
                    sx={{ 
                      color: isPlaying ? 'white' : 'text.primary',
                      animation: isPlaying ? 'pulse 1.5s infinite' : 'none',
                      '@keyframes pulse': {
                        '0%': { opacity: 1 },
                        '50%': { opacity: 0.6 },
                        '100%': { opacity: 1 },
                      }
                    }}
                  >
                    {isPlaying ? 'Speaking...' : 'AI Speaker'}
                  </Typography>
                </Paper>
                
                <Box sx={{ mt: 3 }}>
                  <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
                    <InputLabel>Family Member</InputLabel>
                    <Select
                      value={currentUser.id}
                      onChange={handleUserChange}
                      label="Family Member"
                    >
                      {familyMembers.map((member) => (
                        <MenuItem key={member.id} value={member.id}>
                          {member.name} ({member.occupation})
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    Language: {currentUser.language}
                  </Typography>
                  
                  <Button 
                    variant="contained" 
                    color="primary" 
                    fullWidth
                    size="large"
                    disabled={isPlaying || !currentOpportunity}
                    onClick={handlePlayNotification}
                    sx={{ mb: 2 }}
                  >
                    Play Notification
                  </Button>
                  
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Button 
                        variant="contained" 
                        color="success" 
                        fullWidth
                        disabled={isPlaying || !currentOpportunity || (currentOpportunity && currentOpportunity.applied)}
                        onClick={handleApply}
                      >
                        Apply
                      </Button>
                    </Grid>
                    <Grid item xs={6}>
                      <Button 
                        variant="outlined" 
                        color="error" 
                        fullWidth
                        disabled={isPlaying || !currentOpportunity}
                      >
                        Reject
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Grid>
            
            <Grid item xs={12} md={8}>
              <Typography variant="h6" gutterBottom>
                Available Opportunities for {currentUser.name}
              </Typography>
              
              <Box sx={{ mt: 2 }}>
                {opportunities.length > 0 ? (
                  opportunities.map((opportunity) => (
                    <Card 
                      key={opportunity.id} 
                      sx={{ 
                        mb: 2, 
                        border: currentOpportunity?.id === opportunity.id ? '2px solid #FF6B35' : 'none',
                        opacity: opportunity.applied ? 0.7 : 1
                      }}
                      onClick={() => setCurrentOpportunity(opportunity)}
                    >
                      <CardContent>
                        <Typography variant="h6" gutterBottom>
                          {opportunity.title}
                          {opportunity.applied && (
                            <Chip 
                              label="Applied" 
                              size="small" 
                              color="success" 
                              sx={{ ml: 2 }}
                            />
                          )}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" paragraph>
                          {opportunity.description}
                        </Typography>
                        <Typography variant="body2">
                          <strong>Deadline:</strong> {opportunity.deadline}
                        </Typography>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <Typography variant="body1">
                    No opportunities available at the moment.
                  </Typography>
                )}
              </Box>
              
              {/* Add the summary box here */}
              <Box sx={{ mt: 3, p: 2, bgcolor: '#f5f5f5', borderRadius: 2 }}>
                <Typography variant="subtitle1" gutterBottom>
                  {/* eslint-disable-next-line no-undef */}
                  {isLoading ? 'Generating summary...' : 'Opportunity Summary:'}
                </Typography>
                <Typography variant="body1">
                  {/* eslint-disable-next-line no-undef */}
                  {summary || 'Press "Play Notification" to hear about this opportunity'}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Paper>
        
        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
          <Button 
            variant="outlined" 
            onClick={() => navigate('/')}
          >
            Back to Home
          </Button>
          <Button 
            variant="outlined" 
            color="secondary"
            onClick={() => navigate('/dashboard')}
          >
            View Dashboard
          </Button>
        </Box>
      </Box>
      
      {/* Application Dialog */}
      <Dialog open={showDialog} onClose={() => setShowDialog(false)}>
        <DialogTitle>Confirm Application</DialogTitle>
        <DialogContent>
          <Typography variant="body1" paragraph>
            You are applying for: <strong>{currentOpportunity?.title}</strong>
          </Typography>
          <Typography variant="body2" paragraph>
            Your application will be auto-filled with your profile information and submitted.
          </Typography>
          {applicationStatus && (
            <Typography variant="body2" color="success.main">
              {applicationStatus}
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowDialog(false)} color="error">
            Cancel
          </Button>
          <Button onClick={handleConfirmApply} color="primary" variant="contained">
            Confirm & Apply
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default SpeakerInterface;