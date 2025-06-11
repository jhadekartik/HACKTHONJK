import React from 'react';
import { 
  Container, Box, Typography, Paper, Grid, 
  Card, CardContent, Divider, Button,
  Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, Chip
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import { getMockOpportunities } from '../data/mockOpportunities';

const Dashboard = () => {
  const navigate = useNavigate();
  const { familyMembers } = useUser();
  
  // Get all opportunities for all family members
  const getAllOpportunities = () => {
    let allOpps = [];
    familyMembers.forEach(member => {
      const memberOpps = getMockOpportunities(member);
      allOpps = [...allOpps, ...memberOpps.map(opp => ({
        ...opp,
        memberName: member.name,
        memberOccupation: member.occupation
      }))];
    });
    return allOpps;
  };
  
  const opportunities = getAllOpportunities();
  const appliedOpportunities = opportunities.filter(opp => opp.applied);
  
  // Redirect if no family members registered
  React.useEffect(() => {
    if (familyMembers.length === 0) {
      navigate('/register');
    }
  }, [familyMembers, navigate]);
  
  if (familyMembers.length === 0) return null;
  
  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Bharat Voice Sahayak - Dashboard
        </Typography>
        
        <Grid container spacing={4} sx={{ mt: 2 }}>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Family Profile
              </Typography>
              <Divider sx={{ mb: 2 }} />
              
              {familyMembers.map((member) => (
                <Box key={member.id} sx={{ mb: 2 }}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {member.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {member.age} years • {member.occupation}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Language: {member.language}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Interests: {member.interests.join(', ') || 'None specified'}
                  </Typography>
                  <Divider sx={{ my: 1 }} />
                </Box>
              ))}
              
              <Button 
                variant="outlined" 
                fullWidth 
                onClick={() => navigate('/register')}
                sx={{ mt: 2 }}
              >
                Add Family Member
              </Button>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={8}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Recent Applications
              </Typography>
              <Divider sx={{ mb: 2 }} />
              
              {appliedOpportunities.length > 0 ? (
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Opportunity</TableCell>
                        <TableCell>Family Member</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Applied On</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {appliedOpportunities.map((opp) => (
                        <TableRow key={opp.id}>
                          <TableCell>{opp.title}</TableCell>
                          <TableCell>{opp.memberName}</TableCell>
                          <TableCell>
                            <Chip 
                              label="Applied" 
                              size="small" 
                              color="success" 
                            />
                          </TableCell>
                          <TableCell>Today</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : (
                <Typography variant="body1">
                  No applications submitted yet.
                </Typography>
              )}
            </Paper>
            
            <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
              <Typography variant="h6" gutterBottom>
                Available Opportunities
              </Typography>
              <Divider sx={{ mb: 2 }} />
              
              <Grid container spacing={2}>
                {opportunities
                  .filter(opp => !opp.applied)
                  .slice(0, 4)
                  .map((opp) => (
                    <Grid item xs={12} sm={6} key={opp.id}>
                      <Card variant="outlined">
                        <CardContent>
                          <Typography variant="subtitle1" fontWeight="bold">
                            {opp.title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            For: {opp.memberName}
                          </Typography>
                          <Typography variant="body2" sx={{ mt: 1 }}>
                            Deadline: {opp.deadline}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))
                }
              </Grid>
              
              <Button 
                variant="contained" 
                color="primary"
                fullWidth
                onClick={() => navigate('/speaker')}
                sx={{ mt: 3 }}
              >
                Go to Speaker Interface
              </Button>
            </Paper>
          </Grid>
        </Grid>
        
        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
          <Button 
            variant="outlined" 
            onClick={() => navigate('/')}
          >
            Back to Home
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Dashboard;