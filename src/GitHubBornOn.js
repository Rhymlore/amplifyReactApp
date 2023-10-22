import React, { useState, useEffect } from 'react'
import { API } from 'aws-amplify'
import './App.css';



function GitHubBornOn() {
    const [loading, setLoading] = useState(true);
    const [bornDate, updateDate] = useState("GitHub Data Loading...");
    
    async function fetchDate() {
        setLoading(true);
        try {
            const data = await API.get('githubapi', `/githubUserCreationDate`);
            updateDate(`GitHub user Rhymlore was born on ${data.created_at}`);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching the date:", error);
            updateDate("Failed to fetch GitHub data.");
            setLoading(false);
        }
    }    

    useEffect(() => {
        fetchDate()
      }, [])
    return (
        <h2>{loading ? "GitHub Data Loading..." : bornDate}</h2>
      );
}

export default GitHubBornOn;