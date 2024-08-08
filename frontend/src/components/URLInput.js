import React, { useState } from 'react';
import styles from './MetricsDisplay.module.css';

const URLInput = ({ onAnalyze }) => {
    const [url, setUrl] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (url) {
            onAnalyze(url);
        }
    };

    return (
        <form className={styles.urlForm} onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Enter website URL"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className={styles.urlInput}
            />
            <button type="submit" className={styles.analyzeButton}>Analyze</button>
        </form>
    );
};

export default URLInput;
