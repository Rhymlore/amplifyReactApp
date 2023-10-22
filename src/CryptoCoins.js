import React, { useState, useEffect } from 'react';
import { API } from 'aws-amplify';
import './App.css';

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
    // Call fetchCoins function when component loads
    useEffect(() => {
      fetchCoins()
    }, [])

    return(
        <>
        <input
        onChange={e => updateInputValues('limit', e.target.value)}
        placeholder="limit"
        />
        <input
        placeholder="start"
        onChange={e => updateInputValues('start', e.target.value)}
        />
        <button onClick={fetchCoins}>Fetch Coins</button>

        {loading ? (
          <h2>Coins are loading...</h2>
        ) : (
          coins.map((coin, index) => (
            <div key={index}>
                <h2>{coin.name} - {coin.symbol}</h2>
                <h5>${coin.price_usd}</h5>
            </div>
          ))
        )}
        </>
    );
}

export default CryptoCoins;