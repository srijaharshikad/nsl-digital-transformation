import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Thermometer, Activity, Zap, Gauge, AlertTriangle, CheckCircle, Play } from 'lucide-react';
import { useSensorStream } from '../lib/useSensorStream.js';

// Safe Chart Wrapper Component
function SafeChart({ children, data = [], fallback = null }) {
  // If no data, show a simple fallback
  if (!data || data.length === 0) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '300px',
        color: 'rgba(255, 255, 255, 0.7)',
        fontSize: '0.875rem',
        gap: '1rem'
      }}>
        <Activity className="animate-pulse" size={32} color="#3b82f6" />
        <div>Loading chart data...</div>
      </div>
    );
  }

  try {
    return children;
  } catch (error) {
    console.error('Chart rendering error:', error);
    return fallback || (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '300px',
        color: 'rgba(255, 255, 255, 0.7)',
        fontSize: '0.875rem',
        gap: '1rem'
      }}>
        <AlertTriangle size={32} color="#f59e0b" />
        <div>Chart temporarily unavailable</div>
      </div>
    );
  }
}

// Metric tile component
function MetricTile({ title, value, unit, icon: Icon, status, trend }) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'normal': return '#10b981'; // green
      case 'warning': return '#f59e0b'; // yellow
      case 'critical': return '#ef4444'; // red
      default: return '#6b7280'; // gray
    }
  };

  const getGlowClass = (status) => {
    switch (status) {
      case 'normal': return 'glow-green';
      case 'warning': return 'glow-yellow';
      case 'critical': return 'glow-red';
      default: return '';
    }
  };

  const getTrendIcon = (trend) => {
    if (trend > 0) return '↗';
    if (trend < 0) return '↘';
    return '→';
  };

  return (
    <div 
      className={`metric-tile glass-card ${getGlowClass(status)} animate-fade-in`} 
      style={{
        background: `linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)`,
        border: `1px solid ${status === 'critical' ? 'rgba(239, 68, 68, 0.3)' : 'rgba(255, 255, 255, 0.1)'}`,
        borderRadius: '16px',
        padding: '1.5rem',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px) scale(1.02)';
        e.currentTarget.style.boxShadow = `0 12px 40px rgba(0, 0, 0, 0.4), 0 0 30px ${getStatusColor(status)}40`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0) scale(1)';
        e.currentTarget.style.boxShadow = `0 8px 32px rgba(0, 0, 0, 0.3)`;
      }}
    >
      {/* Animated background gradient */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '100%',
        background: `linear-gradient(45deg, ${getStatusColor(status)}10, transparent, ${getStatusColor(status)}05)`,
        opacity: 0.5
      }} />
      
      {/* Status indicator bar */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '3px',
        background: `linear-gradient(90deg, ${getStatusColor(status)}, ${getStatusColor(status)}80)`,
        borderRadius: '16px 16px 0 0'
      }} />
      
      <div style={{ 
        position: 'relative',
        zIndex: 1,
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        marginBottom: '0.75rem' 
      }}>
        <div style={{
          background: `${getStatusColor(status)}20`,
          padding: '0.5rem',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Icon size={24} color={getStatusColor(status)} />
        </div>
        <span style={{ 
          fontSize: '0.75rem', 
          color: 'rgba(255, 255, 255, 0.6)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.25rem',
          background: 'rgba(255, 255, 255, 0.05)',
          padding: '0.25rem 0.5rem',
          borderRadius: '8px',
          fontWeight: '500'
        }}>
          {getTrendIcon(trend)} {Math.abs(trend).toFixed(1)}%
        </span>
      </div>
      
      <div style={{ marginBottom: '0.5rem', position: 'relative', zIndex: 1 }}>
        <div style={{ 
          fontSize: '2.5rem', 
          fontWeight: 'bold', 
          color: '#ffffff',
          lineHeight: 1,
          textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
        }}>
          {typeof value === 'number' ? value.toFixed(1) : value}
          <span style={{ 
            fontSize: '1rem', 
            fontWeight: 'normal', 
            color: 'rgba(255, 255, 255, 0.7)',
            marginLeft: '0.25rem'
          }}>
            {unit}
          </span>
        </div>
      </div>
      
      <div style={{ 
        fontSize: '0.875rem', 
        color: 'rgba(255, 255, 255, 0.8)',
        fontWeight: '500',
        position: 'relative',
        zIndex: 1
      }}>
        {title}
      </div>
    </div>
  );
}

// Alert component
function AlertItem({ alert, onAcknowledge }) {
  const getAlertColor = (type) => {
    switch (type) {
      case 'critical': return '#ef4444';
      case 'warning': return '#f59e0b';
      case 'info': return '#3b82f6';
      default: return '#6b7280';
    }
  };

  return (
    <div style={{
      background: alert.acknowledged ? '#f9fafb' : '#fef2f2',
      border: `1px solid ${alert.acknowledged ? '#e5e7eb' : '#fecaca'}`,
      borderRadius: '8px',
      padding: '1rem',
      marginBottom: '0.5rem',
      transition: 'all 0.3s ease'
    }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
          <AlertTriangle size={20} color={getAlertColor(alert.type)} />
          <div>
            <div style={{ 
              fontSize: '0.875rem', 
              fontWeight: '500', 
              color: '#1f2937',
              marginBottom: '0.25rem'
            }}>
              {alert.message}
            </div>
            <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
              {alert.timestamp.toLocaleString()}
            </div>
          </div>
        </div>
        
        {!alert.acknowledged && (
          <button
            onClick={() => onAcknowledge(alert.id)}
            style={{
              background: '#10b981',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              padding: '0.5rem 1rem',
              fontSize: '0.75rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem'
            }}
          >
            <CheckCircle size={14} />
            Ack
          </button>
        )}
      </div>
    </div>
  );
}

// Main Digital Twin Panel component
export default function DigitalTwinPanel() {
  const { sensorData, dataHistory, alerts, simulateAnomaly, acknowledgeAlert } = useSensorStream();

  if (!sensorData) {
    return (
      <div style={{ 
        padding: '1.5rem', 
        background: 'transparent',
        position: 'relative'
      }}>
        <div className="glass-card" style={{
          padding: '4rem 2rem',
          textAlign: 'center'
        }}>
          <Activity className="animate-pulse" size={48} color="#3b82f6" style={{ marginBottom: '1rem' }} />
          <h3 style={{ color: 'white', marginBottom: '0.5rem' }}>Initializing Digital Twin</h3>
          <p style={{ color: 'rgba(255, 255, 255, 0.7)', margin: 0 }}>
            Connecting to sensor stream and loading real-time data...
          </p>
        </div>
      </div>
    );
  }

  // Calculate status based on sensor values
  const getTemperatureStatus = (temp) => {
    if (temp > 90) return 'critical';
    if (temp > 80) return 'warning';
    return 'normal';
  };

  const getVibrationStatus = (vib) => {
    if (vib > 2.0) return 'critical';
    if (vib > 1.5) return 'warning';
    return 'normal';
  };

  const getEnergyStatus = (energy) => {
    if (energy < 60) return 'critical';
    if (energy < 75) return 'warning';
    return 'normal';
  };

  const getLoadStatus = (load) => {
    if (load > 90) return 'critical';
    if (load > 80) return 'warning';
    return 'normal';
  };

  return (
    <div style={{ 
      padding: '1.5rem', 
      background: 'transparent',
      position: 'relative'
    }}>
      {/* Animated background particles */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: -1
      }}>
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: '2px',
              height: '2px',
              background: 'rgba(59, 130, 246, 0.3)',
              borderRadius: '50%',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `pulse ${2 + Math.random() * 3}s infinite`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Header */}
      <div className="glass-card" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2rem',
        padding: '2rem',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Header background glow */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '100%',
          background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(147, 51, 234, 0.1) 100%)',
          opacity: 0.5
        }} />
        
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h2 style={{ 
            fontSize: '2.5rem', 
            fontWeight: 'bold', 
            color: '#ffffff',
            margin: 0,
            marginBottom: '0.5rem',
            textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
            background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            🏭 Plant Digital Twin
          </h2>
          <p style={{ 
            color: 'rgba(255, 255, 255, 0.7)', 
            margin: 0,
            fontSize: '1.1rem',
            fontWeight: '400'
          }}>
            Real-time monitoring and anomaly detection
          </p>
        </div>
        
        <button
          onClick={simulateAnomaly}
          style={{
            background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
            color: 'white',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            borderRadius: '12px',
            padding: '1rem 2rem',
            fontSize: '0.875rem',
            fontWeight: '600',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            boxShadow: '0 8px 20px rgba(239, 68, 68, 0.3)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            position: 'relative',
            zIndex: 1,
            overflow: 'hidden'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-3px) scale(1.05)';
            e.target.style.boxShadow = '0 12px 30px rgba(239, 68, 68, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0) scale(1)';
            e.target.style.boxShadow = '0 8px 20px rgba(239, 68, 68, 0.3)';
          }}
        >
          <Play size={18} />
          Simulate Anomaly
        </button>
      </div>

      {/* Metrics Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1.5rem',
        marginBottom: '2rem'
      }}>
        <MetricTile
          title="Temperature"
          value={sensorData.temperature}
          unit="°C"
          icon={Thermometer}
          status={getTemperatureStatus(sensorData.temperature)}
          trend={Math.random() * 4 - 2} // Random trend for demo
        />
        <MetricTile
          title="Vibration"
          value={sensorData.vibration}
          unit="g"
          icon={Activity}
          status={getVibrationStatus(sensorData.vibration)}
          trend={Math.random() * 4 - 2}
        />
        <MetricTile
          title="Energy Efficiency"
          value={sensorData.energy}
          unit="%"
          icon={Zap}
          status={getEnergyStatus(sensorData.energy)}
          trend={Math.random() * 4 - 2}
        />
        <MetricTile
          title="Load"
          value={sensorData.load}
          unit="%"
          icon={Gauge}
          status={getLoadStatus(sensorData.load)}
          trend={Math.random() * 4 - 2}
        />
      </div>

      {/* Charts Section */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '2fr 1fr',
        gap: '1.5rem',
        marginBottom: '2rem'
      }}>
        {/* Live Data Chart */}
        <div className="glass-card glow-blue" style={{
          padding: '2rem',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Chart background glow */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '100%',
            background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(16, 185, 129, 0.05) 100%)',
            opacity: 0.5
          }} />
          
          <h3 style={{ 
            fontSize: '1.5rem', 
            fontWeight: '600', 
            color: '#ffffff',
            margin: 0,
            marginBottom: '1.5rem',
            position: 'relative',
            zIndex: 1,
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            📈 Live Sensor Data
          </h3>
          
          <div style={{ position: 'relative', zIndex: 1 }}>
            <SafeChart data={dataHistory}>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart 
                  data={dataHistory || []}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
                  <XAxis 
                    dataKey="time" 
                    stroke="rgba(255, 255, 255, 0.6)"
                    fontSize={12}
                    tick={{ fill: 'rgba(255, 255, 255, 0.6)' }}
                  />
                  <YAxis 
                    stroke="rgba(255, 255, 255, 0.6)" 
                    fontSize={12}
                    tick={{ fill: 'rgba(255, 255, 255, 0.6)' }}
                  />
                  <Tooltip 
                    contentStyle={{
                      background: 'rgba(0, 0, 0, 0.8)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: '12px',
                      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
                      backdropFilter: 'blur(20px)',
                      color: 'white'
                    }}
                  />
                  {dataHistory && dataHistory.length > 0 && (
                    <>
                      <Line 
                        type="monotone" 
                        dataKey="temperature" 
                        stroke="#ef4444" 
                        strokeWidth={3}
                        dot={false}
                        name="Temperature (°C)"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="vibration" 
                        stroke="#3b82f6" 
                        strokeWidth={3}
                        dot={false}
                        name="Vibration (g)"
                      />
                    </>
                  )}
                </LineChart>
              </ResponsiveContainer>
            </SafeChart>
          </div>
        </div>

        {/* Energy Efficiency Chart */}
        <div className="glass-card glow-green" style={{
          padding: '2rem',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Chart background glow */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '100%',
            background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.05) 0%, rgba(245, 158, 11, 0.05) 100%)',
            opacity: 0.5
          }} />
          
          <h3 style={{ 
            fontSize: '1.5rem', 
            fontWeight: '600', 
            color: '#ffffff',
            margin: 0,
            marginBottom: '1.5rem',
            position: 'relative',
            zIndex: 1,
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            ⚡ Energy & Load
          </h3>
          
          <div style={{ position: 'relative', zIndex: 1 }}>
            <SafeChart data={dataHistory}>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart 
                  data={dataHistory || []}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
                  <XAxis 
                    dataKey="time" 
                    stroke="rgba(255, 255, 255, 0.6)"
                    fontSize={12}
                    tick={{ fill: 'rgba(255, 255, 255, 0.6)' }}
                  />
                  <YAxis 
                    stroke="rgba(255, 255, 255, 0.6)" 
                    fontSize={12}
                    tick={{ fill: 'rgba(255, 255, 255, 0.6)' }}
                  />
                  <Tooltip 
                    contentStyle={{
                      background: 'rgba(0, 0, 0, 0.8)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: '12px',
                      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
                      backdropFilter: 'blur(20px)',
                      color: 'white'
                    }}
                  />
                  {dataHistory && dataHistory.length > 0 && (
                    <>
                      <Area 
                        type="monotone" 
                        dataKey="energy" 
                        stroke="#10b981" 
                        fill="#10b981"
                        fillOpacity={0.3}
                        name="Energy (%)"
                      />
                      <Area 
                        type="monotone" 
                        dataKey="load" 
                        stroke="#f59e0b" 
                        fill="#f59e0b"
                        fillOpacity={0.3}
                        name="Load (%)"
                      />
                    </>
                  )}
                </AreaChart>
              </ResponsiveContainer>
            </SafeChart>
          </div>
        </div>
      </div>

      {/* Alerts Section */}
      {alerts && alerts.length > 0 && (
        <div className="glass-card" style={{
          padding: '1.5rem'
        }}>
          <h3 style={{ 
            fontSize: '1.25rem', 
            fontWeight: '600', 
            color: 'white',
            margin: 0,
            marginBottom: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <AlertTriangle size={20} color="#ef4444" />
            Recent Alerts ({alerts.filter(a => !a.acknowledged).length} unacknowledged)
          </h3>
          
          <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
            {alerts.map(alert => (
              <AlertItem
                key={alert.id}
                alert={alert}
                onAcknowledge={acknowledgeAlert}
              />
            ))}
          </div>
        </div>
      )}

      {/* Status Indicator */}
      <div style={{
        position: 'absolute',
        bottom: '20px',
        right: '20px',
        background: sensorData.anomaly ? '#ef4444' : '#10b981',
        color: 'white',
        borderRadius: '50px',
        padding: '0.75rem 1rem',
        fontSize: '0.875rem',
        fontWeight: '500',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        zIndex: 1000
      }}>
        <div style={{
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          background: 'white',
          animation: 'pulse 2s infinite'
        }} />
        {sensorData.anomaly ? 'Anomaly Detected' : 'System Normal'}
      </div>

    </div>
  );
}
