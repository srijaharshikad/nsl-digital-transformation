import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import { Truck, Package, Factory, Leaf, Droplets, Zap, TrendingUp, TrendingDown, AlertCircle, CheckCircle, MapPin, Clock, DollarSign, BarChart3 } from 'lucide-react';

// Mock data for Supply Chain & ESG
const mockInventoryData = [
  { location: 'Silo A', sugarcane: 1200, ethanol: 450, molasses: 200, capacity: 2000, utilization: 85 },
  { location: 'Silo B', sugarcane: 880, ethanol: 320, molasses: 150, capacity: 1500, utilization: 87 },
  { location: 'Warehouse C', sugarcane: 450, ethanol: 180, molasses: 80, capacity: 800, utilization: 89 },
  { location: 'Storage D', sugarcane: 650, ethanol: 240, molasses: 110, capacity: 1200, utilization: 83 }
];

const mockSupplyChainData = [
  { month: 'Jan', procurement: 2400, processing: 2200, distribution: 2100, efficiency: 87.5 },
  { month: 'Feb', procurement: 2600, processing: 2450, distribution: 2380, efficiency: 91.5 },
  { month: 'Mar', procurement: 2800, processing: 2650, distribution: 2580, efficiency: 92.1 },
  { month: 'Apr', procurement: 3200, processing: 3050, distribution: 2980, efficiency: 93.1 },
  { month: 'May', procurement: 3000, processing: 2850, distribution: 2780, efficiency: 92.7 },
  { month: 'Jun', procurement: 3400, processing: 3250, distribution: 3180, efficiency: 93.5 }
];

const mockESGMetrics = [
  { category: 'Carbon Footprint', value: 1.8, unit: 'kg CO2e/kg', target: 1.5, trend: -5.2 },
  { category: 'Water Usage', value: 1200, unit: 'L/tonne', target: 1000, trend: -8.1 },
  { category: 'Energy Efficiency', value: 85, unit: '%', target: 90, trend: +3.4 },
  { category: 'Waste Reduction', value: 92, unit: '%', target: 95, trend: +2.1 }
];

const mockCarbonCredits = [
  { month: 'Jan', earned: 120, traded: 100, revenue: 150000 },
  { month: 'Feb', earned: 135, traded: 110, revenue: 165000 },
  { month: 'Mar', earned: 142, traded: 125, revenue: 187500 },
  { month: 'Apr', earned: 158, traded: 140, revenue: 210000 },
  { month: 'May', earned: 165, traded: 150, revenue: 225000 },
  { month: 'Jun', earned: 178, traded: 165, revenue: 247500 }
];

const mockDemandForecast = [
  { product: 'Sugar', current: 2400, forecast: 2650, change: +10.4, confidence: 89 },
  { product: 'Ethanol', current: 1800, forecast: 2100, change: +16.7, confidence: 92 },
  { product: 'Molasses', current: 600, forecast: 580, change: -3.3, confidence: 85 },
  { product: 'Bagasse', current: 400, forecast: 450, change: +12.5, confidence: 78 }
];

const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6'];

export default function SupplyChainESG() {
  const [activeTab, setActiveTab] = useState('overview');
  const [realTimeData, setRealTimeData] = useState({
    totalTonnage: 8450,
    inTransit: 340,
    processed: 7890,
    delivered: 7650,
    efficiency: 93.2
  });

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeData(prev => ({
        ...prev,
        inTransit: prev.inTransit + Math.floor((Math.random() - 0.5) * 20),
        efficiency: Math.max(85, Math.min(98, prev.efficiency + (Math.random() - 0.5) * 2))
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const TabButton = ({ id, label, icon: Icon, active, onClick }) => (
    <button
      onClick={() => onClick(id)}
      className={`nav-button ${active ? 'active' : ''}`}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.75rem 1rem',
        fontSize: '0.875rem'
      }}
    >
      <Icon size={18} />
      {label}
    </button>
  );

  return (
    <div style={{ 
      padding: '1.5rem',
      minHeight: '100vh',
      background: 'transparent'
    }}>
      {/* Header */}
      <div className="glass-card" style={{
        padding: '2rem',
        marginBottom: '2rem',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(16, 185, 129, 0.1) 100%)',
          opacity: 0.7
        }} />
        
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'relative',
          zIndex: 1
        }}>
          <div>
            <h1 style={{
              fontSize: '2.5rem',
              fontWeight: 'bold',
              color: 'white',
              margin: 0,
              marginBottom: '0.5rem'
            }}>
              📊 Supply Chain & ESG Dashboard
            </h1>
            <p style={{
              color: 'rgba(255, 255, 255, 0.8)',
              margin: 0,
              fontSize: '1.1rem'
            }}>
              Integrated supply chain management with ESG compliance tracking
            </p>
          </div>
          
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem'
          }}>
            <div className="glass-card" style={{
              padding: '1rem',
              textAlign: 'center'
            }}>
              <TrendingUp size={24} color="#10b981" />
              <p style={{ color: 'white', margin: '0.5rem 0 0', fontSize: '0.875rem' }}>
                {realTimeData.efficiency.toFixed(1)}% Efficiency
              </p>
            </div>
            
            <div className="glass-card" style={{
              padding: '1rem',
              textAlign: 'center'
            }}>
              <Truck size={24} color="#3b82f6" />
              <p style={{ color: 'white', margin: '0.5rem 0 0', fontSize: '0.875rem' }}>
                {realTimeData.inTransit} In Transit
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div style={{
        display: 'flex',
        gap: '0.5rem',
        marginBottom: '2rem',
        flexWrap: 'wrap'
      }}>
        <TabButton
          id="overview"
          label="Overview"
          icon={BarChart3}
          active={activeTab === 'overview'}
          onClick={setActiveTab}
        />
        <TabButton
          id="inventory"
          label="Inventory"
          icon={Package}
          active={activeTab === 'inventory'}
          onClick={setActiveTab}
        />
        <TabButton
          id="logistics"
          label="Logistics"
          icon={Truck}
          active={activeTab === 'logistics'}
          onClick={setActiveTab}
        />
        <TabButton
          id="esg"
          label="ESG Metrics"
          icon={Leaf}
          active={activeTab === 'esg'}
          onClick={setActiveTab}
        />
        <TabButton
          id="forecast"
          label="AI Forecast"
          icon={TrendingUp}
          active={activeTab === 'forecast'}
          onClick={setActiveTab}
        />
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div>
          {/* Key Metrics */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1.5rem',
            marginBottom: '2rem'
          }}>
            <div className="glass-card glow-green" style={{ padding: '1.5rem', textAlign: 'center' }}>
              <Package size={32} color="#10b981" style={{ marginBottom: '1rem' }} />
              <h3 style={{ color: 'white', margin: '0 0 0.5rem' }}>Total Inventory</h3>
              <p style={{ color: '#10b981', fontSize: '2rem', fontWeight: 'bold', margin: '0 0 0.5rem' }}>
                {realTimeData.totalTonnage.toLocaleString()}
              </p>
              <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.875rem', margin: 0 }}>
                tonnes across all locations
              </p>
            </div>

            <div className="glass-card glow-blue" style={{ padding: '1.5rem', textAlign: 'center' }}>
              <Truck size={32} color="#3b82f6" style={{ marginBottom: '1rem' }} />
              <h3 style={{ color: 'white', margin: '0 0 0.5rem' }}>In Transit</h3>
              <p style={{ color: '#3b82f6', fontSize: '2rem', fontWeight: 'bold', margin: '0 0 0.5rem' }}>
                {realTimeData.inTransit}
              </p>
              <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.875rem', margin: 0 }}>
                shipments en route
              </p>
            </div>

            <div className="glass-card glow-yellow" style={{ padding: '1.5rem', textAlign: 'center' }}>
              <TrendingUp size={32} color="#f59e0b" style={{ marginBottom: '1rem' }} />
              <h3 style={{ color: 'white', margin: '0 0 0.5rem' }}>Efficiency</h3>
              <p style={{ color: '#f59e0b', fontSize: '2rem', fontWeight: 'bold', margin: '0 0 0.5rem' }}>
                {realTimeData.efficiency.toFixed(1)}%
              </p>
              <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.875rem', margin: 0 }}>
                supply chain efficiency
              </p>
            </div>

            <div className="glass-card" style={{ padding: '1.5rem', textAlign: 'center' }}>
              <Leaf size={32} color="#10b981" style={{ marginBottom: '1rem' }} />
              <h3 style={{ color: 'white', margin: '0 0 0.5rem' }}>Carbon Credits</h3>
              <p style={{ color: '#10b981', fontSize: '2rem', fontWeight: 'bold', margin: '0 0 0.5rem' }}>
                ₹24.7L
              </p>
              <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.875rem', margin: 0 }}>
                monthly revenue
              </p>
            </div>
          </div>

          {/* Supply Chain Flow */}
          <div className="glass-card" style={{ padding: '2rem', marginBottom: '2rem' }}>
            <h3 style={{ color: 'white', marginBottom: '1.5rem', fontSize: '1.5rem' }}>
              📈 Supply Chain Performance
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={mockSupplyChainData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
                <XAxis dataKey="month" stroke="rgba(255, 255, 255, 0.6)" />
                <YAxis stroke="rgba(255, 255, 255, 0.6)" />
                <Tooltip
                  contentStyle={{
                    background: 'rgba(0, 0, 0, 0.8)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '8px',
                    color: 'white'
                  }}
                />
                <Area type="monotone" dataKey="procurement" stackId="1" stroke="#10b981" fill="#10b981" fillOpacity={0.6} />
                <Area type="monotone" dataKey="processing" stackId="1" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                <Area type="monotone" dataKey="distribution" stackId="1" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.6} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Real-time Alerts */}
          <div className="glass-card" style={{ padding: '2rem' }}>
            <h3 style={{ color: 'white', marginBottom: '1.5rem' }}>🚨 Real-time Alerts</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '1rem',
                background: 'rgba(16, 185, 129, 0.1)',
                borderRadius: '8px',
                border: '1px solid rgba(16, 185, 129, 0.3)'
              }}>
                <CheckCircle size={20} color="#10b981" />
                <div>
                  <p style={{ color: 'white', margin: 0, fontWeight: '600' }}>Shipment #SC-2024-156 delivered successfully</p>
                  <p style={{ color: 'rgba(255, 255, 255, 0.7)', margin: 0, fontSize: '0.875rem' }}>2 minutes ago</p>
                </div>
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '1rem',
                background: 'rgba(245, 158, 11, 0.1)',
                borderRadius: '8px',
                border: '1px solid rgba(245, 158, 11, 0.3)'
              }}>
                <AlertCircle size={20} color="#f59e0b" />
                <div>
                  <p style={{ color: 'white', margin: 0, fontWeight: '600' }}>Silo B approaching 90% capacity</p>
                  <p style={{ color: 'rgba(255, 255, 255, 0.7)', margin: 0, fontSize: '0.875rem' }}>15 minutes ago</p>
                </div>
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '1rem',
                background: 'rgba(59, 130, 246, 0.1)',
                borderRadius: '8px',
                border: '1px solid rgba(59, 130, 246, 0.3)'
              }}>
                <Clock size={20} color="#3b82f6" />
                <div>
                  <p style={{ color: 'white', margin: 0, fontWeight: '600' }}>Scheduled maintenance for Warehouse C tomorrow</p>
                  <p style={{ color: 'rgba(255, 255, 255, 0.7)', margin: 0, fontSize: '0.875rem' }}>1 hour ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Inventory Tab */}
      {activeTab === 'inventory' && (
        <div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.5rem',
            marginBottom: '2rem'
          }}>
            {mockInventoryData.map((location, index) => (
              <div key={index} className="glass-card" style={{
                padding: '1.5rem',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '4px',
                  background: `linear-gradient(90deg, #10b981 0%, #10b981 ${location.utilization}%, rgba(255,255,255,0.1) ${location.utilization}%)`
                }} />
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <h3 style={{ color: 'white', margin: 0 }}>{location.location}</h3>
                  <span style={{
                    background: location.utilization > 85 ? 'rgba(245, 158, 11, 0.3)' : 'rgba(16, 185, 129, 0.3)',
                    color: location.utilization > 85 ? '#f59e0b' : '#10b981',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '12px',
                    fontSize: '0.75rem',
                    fontWeight: '600'
                  }}>
                    {location.utilization}%
                  </span>
                </div>
                
                <div style={{ marginBottom: '1rem' }}>
                  <p style={{ color: 'rgba(255, 255, 255, 0.7)', margin: '0 0 0.5rem', fontSize: '0.875rem' }}>
                    Capacity: {location.capacity} tonnes
                  </p>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.5rem', textAlign: 'center' }}>
                    <div>
                      <p style={{ color: '#10b981', fontSize: '1.2rem', fontWeight: 'bold', margin: 0 }}>
                        {location.sugarcane}
                      </p>
                      <p style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.75rem', margin: 0 }}>
                        Sugarcane
                      </p>
                    </div>
                    
                    <div>
                      <p style={{ color: '#3b82f6', fontSize: '1.2rem', fontWeight: 'bold', margin: 0 }}>
                        {location.ethanol}
                      </p>
                      <p style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.75rem', margin: 0 }}>
                        Ethanol
                      </p>
                    </div>
                    
                    <div>
                      <p style={{ color: '#f59e0b', fontSize: '1.2rem', fontWeight: 'bold', margin: 0 }}>
                        {location.molasses}
                      </p>
                      <p style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.75rem', margin: 0 }}>
                        Molasses
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Inventory Distribution Chart */}
          <div className="glass-card" style={{ padding: '2rem' }}>
            <h3 style={{ color: 'white', marginBottom: '1.5rem' }}>📊 Inventory Distribution</h3>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={mockInventoryData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
                <XAxis dataKey="location" stroke="rgba(255, 255, 255, 0.6)" />
                <YAxis stroke="rgba(255, 255, 255, 0.6)" />
                <Tooltip
                  contentStyle={{
                    background: 'rgba(0, 0, 0, 0.8)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '8px',
                    color: 'white'
                  }}
                />
                <Bar dataKey="sugarcane" fill="#10b981" name="Sugarcane" />
                <Bar dataKey="ethanol" fill="#3b82f6" name="Ethanol" />
                <Bar dataKey="molasses" fill="#f59e0b" name="Molasses" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* ESG Tab */}
      {activeTab === 'esg' && (
        <div>
          {/* ESG Metrics Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.5rem',
            marginBottom: '2rem'
          }}>
            {mockESGMetrics.map((metric, index) => (
              <div key={index} className="glass-card" style={{
                padding: '1.5rem',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '4px',
                  background: metric.trend > 0 ? '#10b981' : '#ef4444'
                }} />
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <h3 style={{ color: 'white', margin: 0, fontSize: '1.1rem' }}>{metric.category}</h3>
                  <span style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                    color: metric.trend > 0 ? '#10b981' : '#ef4444',
                    fontSize: '0.875rem',
                    fontWeight: '600'
                  }}>
                    {metric.trend > 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                    {Math.abs(metric.trend)}%
                  </span>
                </div>
                
                <div style={{ marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
                    <span style={{ color: 'white', fontSize: '2rem', fontWeight: 'bold' }}>
                      {metric.value}
                    </span>
                    <span style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.875rem' }}>
                      {metric.unit}
                    </span>
                  </div>
                  <p style={{ color: 'rgba(255, 255, 255, 0.6)', margin: '0.5rem 0 0', fontSize: '0.875rem' }}>
                    Target: {metric.target} {metric.unit}
                  </p>
                </div>
                
                {/* Progress bar */}
                <div style={{
                  width: '100%',
                  height: '8px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '4px',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    width: `${Math.min(100, (metric.value / metric.target) * 100)}%`,
                    height: '100%',
                    background: metric.value >= metric.target ? '#10b981' : '#f59e0b',
                    transition: 'width 0.3s ease'
                  }} />
                </div>
              </div>
            ))}
          </div>

          {/* Carbon Credits Chart */}
          <div className="glass-card" style={{ padding: '2rem' }}>
            <h3 style={{ color: 'white', marginBottom: '1.5rem' }}>💰 Carbon Credits Revenue</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={mockCarbonCredits}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
                <XAxis dataKey="month" stroke="rgba(255, 255, 255, 0.6)" />
                <YAxis stroke="rgba(255, 255, 255, 0.6)" />
                <Tooltip
                  contentStyle={{
                    background: 'rgba(0, 0, 0, 0.8)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '8px',
                    color: 'white'
                  }}
                />
                <Line type="monotone" dataKey="earned" stroke="#10b981" strokeWidth={3} name="Credits Earned" />
                <Line type="monotone" dataKey="traded" stroke="#3b82f6" strokeWidth={3} name="Credits Traded" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* AI Forecast Tab */}
      {activeTab === 'forecast' && (
        <div>
          <div className="glass-card" style={{ padding: '2rem', marginBottom: '2rem' }}>
            <h3 style={{ color: 'white', marginBottom: '1.5rem' }}>🤖 AI-Powered Demand Forecast</h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '1.5rem'
            }}>
              {mockDemandForecast.map((item, index) => (
                <div key={index} style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '12px',
                  padding: '1.5rem'
                }}>
                  <h4 style={{ color: 'white', margin: '0 0 1rem' }}>{item.product}</h4>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Current:</span>
                    <span style={{ color: 'white', fontWeight: '600' }}>{item.current.toLocaleString()}</span>
                  </div>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Forecast:</span>
                    <span style={{ color: 'white', fontWeight: '600' }}>{item.forecast.toLocaleString()}</span>
                  </div>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Change:</span>
                    <span style={{ 
                      color: item.change > 0 ? '#10b981' : '#ef4444',
                      fontWeight: '600',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.25rem'
                    }}>
                      {item.change > 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                      {Math.abs(item.change)}%
                    </span>
                  </div>
                  
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.5rem',
                    background: 'rgba(59, 130, 246, 0.1)',
                    borderRadius: '6px'
                  }}>
                    <span style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.875rem' }}>
                      Confidence:
                    </span>
                    <span style={{ color: '#3b82f6', fontWeight: '600', fontSize: '0.875rem' }}>
                      {item.confidence}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Optimization Recommendations */}
          <div className="glass-card" style={{ padding: '2rem' }}>
            <h3 style={{ color: 'white', marginBottom: '1.5rem' }}>💡 AI Optimization Recommendations</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '1rem',
                background: 'rgba(16, 185, 129, 0.1)',
                borderRadius: '8px',
                border: '1px solid rgba(16, 185, 129, 0.3)'
              }}>
                <TrendingUp size={24} color="#10b981" />
                <div>
                  <h4 style={{ color: 'white', margin: '0 0 0.5rem' }}>Increase Ethanol Production</h4>
                  <p style={{ color: 'rgba(255, 255, 255, 0.8)', margin: 0, fontSize: '0.875rem' }}>
                    Market demand for ethanol is projected to increase by 16.7%. Consider allocating 15% more sugarcane to ethanol production.
                  </p>
                </div>
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '1rem',
                background: 'rgba(59, 130, 246, 0.1)',
                borderRadius: '8px',
                border: '1px solid rgba(59, 130, 246, 0.3)'
              }}>
                <Truck size={24} color="#3b82f6" />
                <div>
                  <h4 style={{ color: 'white', margin: '0 0 0.5rem' }}>Optimize Logistics Routes</h4>
                  <p style={{ color: 'rgba(255, 255, 255, 0.8)', margin: 0, fontSize: '0.875rem' }}>
                    AI analysis suggests route optimization could reduce transportation costs by 12% and improve delivery times.
                  </p>
                </div>
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '1rem',
                background: 'rgba(245, 158, 11, 0.1)',
                borderRadius: '8px',
                border: '1px solid rgba(245, 158, 11, 0.3)'
              }}>
                <Package size={24} color="#f59e0b" />
                <div>
                  <h4 style={{ color: 'white', margin: '0 0 0.5rem' }}>Inventory Rebalancing</h4>
                  <p style={{ color: 'rgba(255, 255, 255, 0.8)', margin: 0, fontSize: '0.875rem' }}>
                    Transfer 200 tonnes from Silo B to Warehouse C to optimize storage utilization across facilities.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Logistics Tab */}
      {activeTab === 'logistics' && (
        <div>
          {/* Live Tracking */}
          <div className="glass-card" style={{ padding: '2rem', marginBottom: '2rem' }}>
            <h3 style={{ color: 'white', marginBottom: '1.5rem' }}>🚛 Live Shipment Tracking</h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '1rem'
            }}>
              <div style={{
                background: 'rgba(16, 185, 129, 0.1)',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                borderRadius: '8px',
                padding: '1rem'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <span style={{ color: 'white', fontWeight: '600' }}>SC-2024-156</span>
                  <span style={{
                    background: '#10b981',
                    color: 'white',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '12px',
                    fontSize: '0.75rem'
                  }}>
                    Delivered
                  </span>
                </div>
                <p style={{ color: 'rgba(255, 255, 255, 0.8)', margin: '0 0 0.5rem', fontSize: '0.875rem' }}>
                  Delhi → Mumbai | 450 tonnes Sugar
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <MapPin size={14} color="#10b981" />
                  <span style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.875rem' }}>
                    Delivered 2 hours ago
                  </span>
                </div>
              </div>

              <div style={{
                background: 'rgba(59, 130, 246, 0.1)',
                border: '1px solid rgba(59, 130, 246, 0.3)',
                borderRadius: '8px',
                padding: '1rem'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <span style={{ color: 'white', fontWeight: '600' }}>SC-2024-157</span>
                  <span style={{
                    background: '#3b82f6',
                    color: 'white',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '12px',
                    fontSize: '0.75rem'
                  }}>
                    In Transit
                  </span>
                </div>
                <p style={{ color: 'rgba(255, 255, 255, 0.8)', margin: '0 0 0.5rem', fontSize: '0.875rem' }}>
                  Pune → Bangalore | 320 tonnes Ethanol
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Clock size={14} color="#3b82f6" />
                  <span style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.875rem' }}>
                    ETA: 6 hours
                  </span>
                </div>
              </div>

              <div style={{
                background: 'rgba(245, 158, 11, 0.1)',
                border: '1px solid rgba(245, 158, 11, 0.3)',
                borderRadius: '8px',
                padding: '1rem'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <span style={{ color: 'white', fontWeight: '600' }}>SC-2024-158</span>
                  <span style={{
                    background: '#f59e0b',
                    color: 'white',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '12px',
                    fontSize: '0.75rem'
                  }}>
                    Loading
                  </span>
                </div>
                <p style={{ color: 'rgba(255, 255, 255, 0.8)', margin: '0 0 0.5rem', fontSize: '0.875rem' }}>
                  Warehouse C → Chennai | 280 tonnes Sugar
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Package size={14} color="#f59e0b" />
                  <span style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.875rem' }}>
                    Loading in progress
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Route Optimization */}
          <div className="glass-card" style={{ padding: '2rem' }}>
            <h3 style={{ color: 'white', marginBottom: '1.5rem' }}>🗺️ Route Optimization Analytics</h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '2rem'
            }}>
              <div>
                <h4 style={{ color: 'white', marginBottom: '1rem' }}>Cost Savings</h4>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '1rem',
                  background: 'rgba(16, 185, 129, 0.1)',
                  borderRadius: '8px'
                }}>
                  <DollarSign size={32} color="#10b981" />
                  <div>
                    <p style={{ color: '#10b981', fontSize: '2rem', fontWeight: 'bold', margin: 0 }}>
                      ₹2.4L
                    </p>
                    <p style={{ color: 'rgba(255, 255, 255, 0.7)', margin: 0, fontSize: '0.875rem' }}>
                      Monthly savings from route optimization
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h4 style={{ color: 'white', marginBottom: '1rem' }}>Efficiency Gains</h4>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '1rem',
                  background: 'rgba(59, 130, 246, 0.1)',
                  borderRadius: '8px'
                }}>
                  <TrendingUp size={32} color="#3b82f6" />
                  <div>
                    <p style={{ color: '#3b82f6', fontSize: '2rem', fontWeight: 'bold', margin: 0 }}>
                      18%
                    </p>
                    <p style={{ color: 'rgba(255, 255, 255, 0.7)', margin: 0, fontSize: '0.875rem' }}>
                      Reduction in delivery time
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
