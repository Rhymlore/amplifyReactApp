import React, { useState, useEffect } from 'react';
import { API } from 'aws-amplify';
import './App.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button  from '@mui/material/Button';
import Box  from '@mui/material/Box';

function CryptoCoins() {
    const [coins, updateCoins] = useState([])
    const [input, updateInput] = useState({ limit: 5, start: 0 })
    const [loading, setLoading] = useState(false);

    // Create a new function to allow users to update the input values
    function updateInputValues(type, value) {
        updateInput({ ...input, [type]: value })
    }
    // Update fetchCoins function to use limit and start properties
    async function fetchCoins() {
        setLoading(true);
        const { limit, start } = input;
        try {
            const data = await API.get('cryptoapi', `/coins?limit=${limit}&start=${start}`);
            updateCoins(data.coins);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching the coins:", error);
            setLoading(false);
        }
    }
    function formatMarketCap(cap) {
      if (cap >= 1e12) {
          return `$${(cap / 1e12).toFixed(1)}T`; // Trillions
      } else if (cap >= 1e9) {
          return `$${(cap / 1e9).toFixed(0)}B`; // Billions
      } else if (cap >= 1e6) {
          return `$${(cap / 1e6).toFixed(0)}M`; // Millions
      } else if (cap >= 1e3) {
          return `$${(cap / 1e3).toFixed(0)}K`; // Thousands
      } else {
          return `$${cap.toFixed(0)}`; // Less than a thousand
      }
    }
    // Call fetchCoins function when component loads
    useEffect(() => {
      fetchCoins()
    }, [])

    return(
        <>
        <Box 
          display="flex"
          alignItems="center"
          justifyContent="center"
          mt={2}  // Add top margin to move the Box down a bit
        >
          <TextField
              variant="outlined"
              label="Limit"
              onChange={e => updateInputValues('limit', e.target.value)}
              margin="normal"
              style={{ marginRight: '16px' }} // Add right margin for spacing
          />

          <TextField
              variant="outlined"
              label="Start"
              onChange={e => updateInputValues('start', e.target.value)}
              margin="normal"
              style={{ marginRight: '16px' }} // Add right margin for spacing
          />

          <Button
              variant="contained"
              color="primary"
              onClick={fetchCoins}
          >
              Fetch Coins
          </Button>
        </Box>
        {loading ? (
          <h2>Coins are loading...</h2>
        ) : (
          <Box 
          display="flex"
          alignItems="center"
          justifyContent="center"
          p={2}  // Add padding around the Box for spacing
      >
          <TableContainer component={Paper} style={{ maxWidth: "90%" }}>
              <Table sx={{ minWidth: 500 }} aria-label="simple table">
                  <TableHead>
                      <TableRow>
                          <TableCell>Coin</TableCell>
                          <TableCell align="right">Name</TableCell>
                          <TableCell align="right">Price&nbsp;($)</TableCell>
                          <TableCell align="right">Market Cap&nbsp;($)</TableCell>
                          <TableCell align="right">Price Change&nbsp;(Last 24h)</TableCell>
                      </TableRow>
                  </TableHead>
                  <TableBody>
                      {coins.map((coin, index) => (
                          <TableRow
                              key={index}
                              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                              <TableCell component="th" scope="row">
                                  {coin.symbol}
                              </TableCell>
                              <TableCell align="right">{coin.name}</TableCell>
                              <TableCell align="right">${Number(coin.price_usd).toFixed(2)}</TableCell>
                              <TableCell align="right">{formatMarketCap(Number(coin.market_cap_usd))}</TableCell>
                              <TableCell align="right">{coin.percent_change_24h}%</TableCell>
                          </TableRow>
                      ))}
                  </TableBody>
              </Table>
          </TableContainer>
      </Box>
        )}
        </>
    );
}

export default CryptoCoins;