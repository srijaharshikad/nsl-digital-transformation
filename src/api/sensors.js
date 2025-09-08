// Sensor data streaming simulation
class SensorDataStream {
  constructor() {
    this.listeners = new Set();
    this.isStreaming = false;
    this.intervalId = null;
    this.currentData = {
      temperature: 72,
      vibration: 0.8,
      energy: 85,
      load: 65,
      timestamp: Date.now()
    };
    this.anomalyMode = false;
  }

  // Generate realistic sensor data with some variation
  generateSensorData() {
    const now = Date.now();
    
    if (this.anomalyMode) {
      // Generate anomalous data
      this.currentData = {
        temperature: 95 + Math.random() * 10, // High temperature
        vibration: 2.5 + Math.random() * 1.5, // High vibration
        energy: 45 + Math.random() * 15, // Low energy efficiency
        load: 95 + Math.random() * 5, // High load
        timestamp: now,
        anomaly: true
      };
      this.anomalyMode = false; // Reset after one cycle
    } else {
      // Generate normal data with small variations
      this.currentData = {
        temperature: 72 + (Math.random() - 0.5) * 8,
        vibration: 0.8 + (Math.random() - 0.5) * 0.4,
        energy: 85 + (Math.random() - 0.5) * 10,
        load: 65 + (Math.random() - 0.5) * 20,
        timestamp: now,
        anomaly: false
      };
    }

    // Notify all listeners
    this.listeners.forEach(callback => {
      callback(this.currentData);
    });
  }

  // Start streaming data
  startStream() {
    if (this.isStreaming) return;
    
    this.isStreaming = true;
    this.intervalId = setInterval(() => {
      this.generateSensorData();
    }, 2000); // Update every 2 seconds
  }

  // Stop streaming
  stopStream() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.isStreaming = false;
  }

  // Subscribe to data updates
  subscribe(callback) {
    this.listeners.add(callback);
    
    // Send current data immediately
    callback(this.currentData);
    
    // Start streaming if not already started
    if (!this.isStreaming) {
      this.startStream();
    }

    // Return unsubscribe function
    return () => {
      this.listeners.delete(callback);
      
      // Stop streaming if no listeners
      if (this.listeners.size === 0) {
        this.stopStream();
      }
    };
  }

  // Trigger anomaly simulation
  simulateAnomaly() {
    this.anomalyMode = true;
  }

  // Get current data
  getCurrentData() {
    return this.currentData;
  }
}

// Export singleton instance
export const sensorStream = new SensorDataStream();
