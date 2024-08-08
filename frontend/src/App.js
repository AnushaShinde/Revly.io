import React, { useState } from 'react';
import axios from 'axios';
import URLInput from './components/URLInput';
import MetricsDisplay from './components/MetricsDisplay';
import styles from './App.module.css';

function App() {
    const [metrics, setMetrics] = useState(null);

    const analyzeWebsite = async (url) => {
        try {
            const response = await axios.post('http://localhost:5000/api/analyze', { url });
            setMetrics(response.data);
        } catch (error) {
            console.error('Error fetching metrics:', error);
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>SpeedX - Website Performance Analyzer</h1>
            <URLInput onAnalyze={analyzeWebsite} />
            <MetricsDisplay metrics={metrics} />
        </div>
    );
}

export default App;
