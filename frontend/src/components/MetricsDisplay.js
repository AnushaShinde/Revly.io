import React from 'react';
import styles from './MetricsDisplay.module.css';

const MetricsDisplay = ({ metrics }) => {
    if (!metrics) return null;

    return (
        <div className={styles.metricsContainer}>
            <h3>Performance Metrics</h3>
            <div className={styles.metric}>
                <span className={styles.metricName}>Page Load Time:</span>
                <span>{metrics.loadTime} ms</span>
            </div>
            <div className={styles.metric}>
                <span className={styles.metricName}>Total Request Size:</span>
                <span>{metrics.totalRequestSize} bytes</span>
            </div>
            <div className={styles.metric}>
                <span className={styles.metricName}>Number of Requests:</span>
                <span>{metrics.numberOfRequests}</span>
            </div>
        </div>
    );
};

export default MetricsDisplay;
