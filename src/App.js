import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { UserProvider } from './contexts/UserContext';
import HomePage from './components/HomePage';
import UserRegistration from './components/UserRegistration';
import SpeakerInterface from './components/SpeakerInterface';
import Dashboard from './components/Dashboard';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FF6B35', // Vibrant orange for Indian context
    },
    secondary: {
      main: '#2E86AB', // Complementary blue
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <UserProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/register" element={<UserRegistration />} />
            <Route path="/speaker" element={<SpeakerInterface />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </Router>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;
