import React from 'react';
import GitHubBornOn from './GitHubBornOn';
import CryptoCoins from './CryptoCoins';
import './App.css';
import Typography from '@mui/material/Typography';
import Box  from '@mui/material/Box';


function App() {

  return (
    <Box 
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      textAlign="center" // This ensures that text is centered within components
    >
      <Typography variant="h2">
        Crypto Market
      </Typography>
      <CryptoCoins />
      <GitHubBornOn />
    </Box>
  );
}

export default App