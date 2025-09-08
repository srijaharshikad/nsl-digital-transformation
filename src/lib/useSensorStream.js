import { useState, useEffect } from 'react';
import { sensorStream } from '../api/sensors.js';

// Custom hook for sensor data streaming
export function useSensorStream() {
  const [sensorData, setSensorData] = useState({
    temperature: 72,
    vibration: 0.8,
    energy: 85,
    load: 65,
    timestamp: Date.now(),
    anomaly: false
  });
  const [dataHistory, setDataHistory] = useState([
    {
      temperature: 72,
      vibration: 0.8,
      energy: 85,
      load: 65,
      time: new Date().toLocaleTimeString(),
      timestamp: Date.now()
    }
  ]);
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    // Subscribe to sensor data stream
    const unsubscribe = sensorStream.subscribe((data) => {
      setSensorData(data);
      
      // Add to history (keep last 20 data points for charts)
      setDataHistory(prev => {
        if (!data || typeof data !== 'object') return prev;
        
        const newDataPoint = {
          temperature: Number(data.temperature) || 0,
          vibration: Number(data.vibration) || 0,
          energy: Number(data.energy) || 0,
          load: Number(data.load) || 0,
          time: new Date(data.timestamp || Date.now()).toLocaleTimeString(),
          timestamp: Number(data.timestamp) || Date.now()
        };
        
        const newHistory = [...prev, newDataPoint];
        return newHistory.slice(-20); // Keep only last 20 points
      });

      // Check for anomalies and add alerts
      if (data.anomaly) {
        const newAlert = {
          id: Date.now(),
          timestamp: new Date(data.timestamp),
          type: 'critical',
          message: `Anomaly detected: High temperature (${data.temperature.toFixed(1)}°C) and vibration (${data.vibration.toFixed(2)}g)`,
          acknowledged: false
        };
        
        setAlerts(prev => [newAlert, ...prev].slice(0, 10)); // Keep last 10 alerts
      }
    });

    // Cleanup subscription on unmount
    return unsubscribe;
  }, []);

  // Function to simulate anomaly
  const simulateAnomaly = () => {
    sensorStream.simulateAnomaly();
  };

  // Function to acknowledge alert
  const acknowledgeAlert = (alertId) => {
    setAlerts(prev => 
      prev.map(alert => 
        alert.id === alertId 
          ? { ...alert, acknowledged: true }
          : alert
      )
    );
  };

  return {
    sensorData,
    dataHistory,
    alerts,
    simulateAnomaly,
    acknowledgeAlert
  };
}
