import React, { useState } from 'react';
import { 
  Container, Box, Typography, TextField, Button, 
  FormControl, InputLabel, Select, MenuItem, 
  Paper, Grid, Chip, Divider, IconButton
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';

const UserRegistration = () => {
  const navigate = useNavigate();
  const { familyMembers, addFamilyMember } = useUser();
  
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    education: '',
    occupation: '',
    interests: [],
    language: 'Hindi',
    aadhaar: '',
    email: '',
    phone: ''
  });
  
  const [currentInterest, setCurrentInterest] = useState('');
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleAddInterest = () => {
    if (currentInterest && !formData.interests.includes(currentInterest)) {
      setFormData(prev => ({
        ...prev,
        interests: [...prev.interests, currentInterest]
      }));
      setCurrentInterest('');
    }
  };
  
  const handleRemoveInterest = (interest) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.filter(item => item !== interest)
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    addFamilyMember(formData);
    setFormData({
      name: '',
      age: '',
      education: '',
      occupation: '',
      interests: [],
      language: 'Hindi',
      aadhaar: '',
      email: '',
      phone: ''
    });
  };
  
  const languages = [
    'Hindi', 'Telugu', 'Tamil', 'Bengali', 'Marathi', 
    'Gujarati', 'Kannada', 'Malayalam', 'Punjabi', 'Odia'
  ];
  
  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Family Registration
        </Typography>
        
        <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Full Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Age"
                  name="age"
                  type="number"
                  value={formData.age}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Education"
                  name="education"
                  value={formData.education}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Occupation"
                  name="occupation"
                  value={formData.occupation}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <TextField
                    fullWidth
                    label="Add Interests"
                    value={currentInterest}
                    onChange={(e) => setCurrentInterest(e.target.value)}
                  />
                  <Button 
                    variant="contained" 
                    onClick={handleAddInterest}
                    sx={{ ml: 2, height: 56 }}
                  >
                    Add
                  </Button>
                </Box>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {formData.interests.map((interest, index) => (
                    <Chip 
                      key={index} 
                      label={interest} 
                      onDelete={() => handleRemoveInterest(interest)}
                      color="primary"
                      variant="outlined"
                    />
                  ))}
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Preferred Language</InputLabel>
                  <Select
                    name="language"
                    value={formData.language}
                    label="Preferred Language"
                    onChange={handleChange}
                  >
                    {languages.map((lang) => (
                      <MenuItem key={lang} value={lang}>{lang}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Aadhaar Number (Optional)"
                  name="aadhaar"
                  value={formData.aadhaar}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <Button 
                  type="submit" 
                  variant="contained" 
                  color="primary" 
                  fullWidth
                  size="large"
                >
                  Add Family Member
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
        
        {familyMembers.length > 0 && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h5" gutterBottom>
              Registered Family Members
            </Typography>
            <Paper elevation={2} sx={{ p: 2 }}>
              {familyMembers.map((member, index) => (
                <Box key={member.id} sx={{ mb: 2 }}>
                  <Grid container alignItems="center" spacing={2}>
                    <Grid item xs={9}>
                      <Typography variant="h6">{member.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {member.age} years • {member.occupation} • {member.language}
                      </Typography>
                    </Grid>
                  </Grid>
                  {index < familyMembers.length - 1 && <Divider sx={{ my: 2 }} />}
                </Box>
              ))}
            </Paper>
            
            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
              <Button 
                variant="outlined" 
                onClick={() => navigate('/')}
              >
                Back to Home
              </Button>
              <Button 
                variant="contained" 
                color="primary"
                onClick={() => navigate('/speaker')}
              >
                Continue to Speaker Interface
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default UserRegistration;