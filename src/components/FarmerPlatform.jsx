import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { User, Wallet, TrendingUp, Cloud, Droplets, Thermometer, DollarSign, Bell, CheckCircle, Phone, MessageCircle, Calendar, Award, BarChart3 } from 'lucide-react';

// Mock data for farmer platform
const mockWeatherData = [
  { day: 'Mon', temp: 32, humidity: 65, rainfall: 0 },
  { day: 'Tue', temp: 34, humidity: 68, rainfall: 2 },
  { day: 'Wed', temp: 31, humidity: 72, rainfall: 5 },
  { day: 'Thu', temp: 29, humidity: 75, rainfall: 12 },
  { day: 'Fri', temp: 33, humidity: 63, rainfall: 0 },
  { day: 'Sat', temp: 35, humidity: 60, rainfall: 0 },
  { day: 'Sun', temp: 36, humidity: 58, rainfall: 0 }
];

const mockYieldData = [
  { month: 'Jan', predicted: 2.1, actual: 2.0 },
  { month: 'Feb', predicted: 2.4, actual: 2.3 },
  { month: 'Mar', predicted: 2.8, actual: 2.9 },
  { month: 'Apr', predicted: 3.2, actual: 3.1 },
  { month: 'May', predicted: 3.0, actual: 2.8 },
  { month: 'Jun', predicted: 3.4, actual: 3.5 }
];

const mockMarketPrices = [
  { crop: 'Sugarcane', price: 2850, change: +2.5, trend: 'up' },
  { crop: 'Wheat', price: 2200, change: -1.2, trend: 'down' },
  { crop: 'Rice', price: 3100, change: +0.8, trend: 'up' },
  { crop: 'Cotton', price: 5400, change: +3.2, trend: 'up' }
];

function FarmerPlatform() {
  const [farmerData, setFarmerData] = useState({
    name: 'राजेश कुमार',
    farmSize: '5.2 acres',
    location: 'Muzaffarnagar, UP',
    balance: 25400,
    pendingPayment: 8500,
    yieldPrediction: 3.2,
    confidence: 87
  });

  const [activeTab, setActiveTab] = useState('dashboard');
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'payment', message: 'Payment of ₹8,500 received', time: '2 hours ago', read: false },
    { id: 2, type: 'weather', message: 'Heavy rainfall expected tomorrow', time: '5 hours ago', read: false },
    { id: 3, type: 'advisory', message: 'Optimal time for fertilizer application', time: '1 day ago', read: true },
    { id: 4, type: 'market', message: 'Sugarcane prices increased by 2.5%', time: '2 days ago', read: true }
  ]);

  const [showAdvanceModal, setShowAdvanceModal] = useState(false);
  const [advanceAmount, setAdvanceAmount] = useState(5000);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setFarmerData(prev => ({
        ...prev,
        yieldPrediction: prev.yieldPrediction + (Math.random() - 0.5) * 0.1,
        confidence: Math.max(80, Math.min(95, prev.confidence + (Math.random() - 0.5) * 2))
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleAdvanceRequest = () => {
    setFarmerData(prev => ({
      ...prev,
      balance: prev.balance + advanceAmount,
      pendingPayment: prev.pendingPayment + advanceAmount
    }));
    
    setNotifications(prev => [{
      id: Date.now(),
      type: 'payment',
      message: `Advance of ₹${advanceAmount.toLocaleString()} approved and credited`,
      time: 'Just now',
      read: false
    }, ...prev]);
    
    setShowAdvanceModal(false);
  };

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
          height: '100%',
          background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%)',
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
              🌾 Smart Farmer Platform
            </h1>
            <p style={{
              color: 'rgba(255, 255, 255, 0.8)',
              margin: 0,
              fontSize: '1.1rem'
            }}>
              Welcome back, {farmerData.name}! 🙏
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
              <User size={24} color="#10b981" />
              <p style={{ color: 'white', margin: '0.5rem 0 0', fontSize: '0.875rem' }}>
                {farmerData.farmSize}
              </p>
            </div>
            
            <div className="glass-card" style={{
              padding: '1rem',
              textAlign: 'center'
            }}>
              <Wallet size={24} color="#3b82f6" />
              <p style={{ color: 'white', margin: '0.5rem 0 0', fontSize: '0.875rem' }}>
                ₹{farmerData.balance.toLocaleString()}
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
          id="dashboard"
          label="Dashboard"
          icon={TrendingUp}
          active={activeTab === 'dashboard'}
          onClick={setActiveTab}
        />
        <TabButton
          id="payments"
          label="Payments"
          icon={DollarSign}
          active={activeTab === 'payments'}
          onClick={setActiveTab}
        />
        <TabButton
          id="weather"
          label="Weather"
          icon={Cloud}
          active={activeTab === 'weather'}
          onClick={setActiveTab}
        />
        <TabButton
          id="market"
          label="Market"
          icon={BarChart3}
          active={activeTab === 'market'}
          onClick={setActiveTab}
        />
        <TabButton
          id="advisory"
          label="Advisory"
          icon={MessageCircle}
          active={activeTab === 'advisory'}
          onClick={setActiveTab}
        />
      </div>

      {/* Dashboard Tab */}
      {activeTab === 'dashboard' && (
        <div>
          {/* Key Metrics */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1.5rem',
            marginBottom: '2rem'
          }}>
            <div className="glass-card glow-green" style={{ padding: '1.5rem', textAlign: 'center' }}>
              <TrendingUp size={32} color="#10b981" style={{ marginBottom: '1rem' }} />
              <h3 style={{ color: 'white', margin: '0 0 0.5rem' }}>Yield Prediction</h3>
              <p style={{ color: '#10b981', fontSize: '2rem', fontWeight: 'bold', margin: '0 0 0.5rem' }}>
                {farmerData.yieldPrediction.toFixed(1)}
              </p>
              <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.875rem', margin: 0 }}>
                tonnes/acre ({farmerData.confidence.toFixed(0)}% confidence)
              </p>
            </div>

            <div className="glass-card glow-blue" style={{ padding: '1.5rem', textAlign: 'center' }}>
              <Wallet size={32} color="#3b82f6" style={{ marginBottom: '1rem' }} />
              <h3 style={{ color: 'white', margin: '0 0 0.5rem' }}>Account Balance</h3>
              <p style={{ color: '#3b82f6', fontSize: '2rem', fontWeight: 'bold', margin: '0 0 0.5rem' }}>
                ₹{farmerData.balance.toLocaleString()}
              </p>
              <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.875rem', margin: 0 }}>
                Pending: ₹{farmerData.pendingPayment.toLocaleString()}
              </p>
            </div>

            <div className="glass-card glow-yellow" style={{ padding: '1.5rem', textAlign: 'center' }}>
              <Award size={32} color="#f59e0b" style={{ marginBottom: '1rem' }} />
              <h3 style={{ color: 'white', margin: '0 0 0.5rem' }}>Farm Rating</h3>
              <p style={{ color: '#f59e0b', fontSize: '2rem', fontWeight: 'bold', margin: '0 0 0.5rem' }}>
                4.8⭐
              </p>
              <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.875rem', margin: 0 }}>
                Premium Quality Grade
              </p>
            </div>
          </div>

          {/* Yield Prediction Chart */}
          <div className="glass-card" style={{ padding: '2rem', marginBottom: '2rem' }}>
            <h3 style={{ color: 'white', marginBottom: '1.5rem', fontSize: '1.5rem' }}>
              📈 Yield Prediction vs Actual
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={mockYieldData}>
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
                <Line type="monotone" dataKey="predicted" stroke="#3b82f6" strokeWidth={3} name="Predicted" />
                <Line type="monotone" dataKey="actual" stroke="#10b981" strokeWidth={3} name="Actual" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Recent Notifications */}
          <div className="glass-card" style={{ padding: '2rem' }}>
            <h3 style={{ color: 'white', marginBottom: '1.5rem', fontSize: '1.5rem' }}>
              🔔 Recent Notifications
            </h3>
            <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
              {notifications.slice(0, 4).map(notification => (
                <div key={notification.id} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '1rem',
                  background: notification.read ? 'rgba(255, 255, 255, 0.02)' : 'rgba(59, 130, 246, 0.1)',
                  borderRadius: '8px',
                  marginBottom: '0.5rem',
                  border: notification.read ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(59, 130, 246, 0.3)'
                }}>
                  <Bell size={20} color={notification.read ? '#6b7280' : '#3b82f6'} />
                  <div style={{ flex: 1 }}>
                    <p style={{ color: 'white', margin: 0, fontSize: '0.875rem' }}>
                      {notification.message}
                    </p>
                    <p style={{ color: 'rgba(255, 255, 255, 0.6)', margin: 0, fontSize: '0.75rem' }}>
                      {notification.time}
                    </p>
                  </div>
                  {!notification.read && (
                    <div style={{
                      width: '8px',
                      height: '8px',
                      background: '#3b82f6',
                      borderRadius: '50%'
                    }} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Payments Tab */}
      {activeTab === 'payments' && (
        <div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '2rem',
            marginBottom: '2rem'
          }}>
            <div className="glass-card" style={{ padding: '2rem' }}>
              <h3 style={{ color: 'white', marginBottom: '1.5rem' }}>💰 Request Advance</h3>
              <p style={{ color: 'rgba(255, 255, 255, 0.8)', marginBottom: '1rem' }}>
                Get instant advance based on your predicted yield
              </p>
              <button
                onClick={() => setShowAdvanceModal(true)}
                style={{
                  background: 'linear-gradient(135deg, #10b981, #059669)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '1rem 2rem',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  width: '100%'
                }}
              >
                Request ₹5,000 Advance
              </button>
            </div>

            <div className="glass-card" style={{ padding: '2rem' }}>
              <h3 style={{ color: 'white', marginBottom: '1.5rem' }}>📱 Quick Actions</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <button className="nav-button" style={{ justifyContent: 'flex-start' }}>
                  <Phone size={18} />
                  Call Support: 1800-NSL-HELP
                </button>
                <button className="nav-button" style={{ justifyContent: 'flex-start' }}>
                  <MessageCircle size={18} />
                  Chat with Advisor
                </button>
                <button className="nav-button" style={{ justifyContent: 'flex-start' }}>
                  <Calendar size={18} />
                  Schedule Farm Visit
                </button>
              </div>
            </div>
          </div>

          {/* Payment History */}
          <div className="glass-card" style={{ padding: '2rem' }}>
            <h3 style={{ color: 'white', marginBottom: '1.5rem' }}>💳 Recent Transactions</h3>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                    <th style={{ color: 'rgba(255, 255, 255, 0.8)', padding: '1rem', textAlign: 'left' }}>Date</th>
                    <th style={{ color: 'rgba(255, 255, 255, 0.8)', padding: '1rem', textAlign: 'left' }}>Type</th>
                    <th style={{ color: 'rgba(255, 255, 255, 0.8)', padding: '1rem', textAlign: 'left' }}>Amount</th>
                    <th style={{ color: 'rgba(255, 255, 255, 0.8)', padding: '1rem', textAlign: 'left' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                    <td style={{ color: 'white', padding: '1rem' }}>Dec 15, 2024</td>
                    <td style={{ color: 'white', padding: '1rem' }}>Crop Payment</td>
                    <td style={{ color: '#10b981', padding: '1rem' }}>+₹8,500</td>
                    <td style={{ color: '#10b981', padding: '1rem' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <CheckCircle size={16} />
                        Completed
                      </span>
                    </td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                    <td style={{ color: 'white', padding: '1rem' }}>Dec 10, 2024</td>
                    <td style={{ color: 'white', padding: '1rem' }}>Advance</td>
                    <td style={{ color: '#10b981', padding: '1rem' }}>+₹5,000</td>
                    <td style={{ color: '#10b981', padding: '1rem' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <CheckCircle size={16} />
                        Completed
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ color: 'white', padding: '1rem' }}>Dec 5, 2024</td>
                    <td style={{ color: 'white', padding: '1rem' }}>Fertilizer Purchase</td>
                    <td style={{ color: '#ef4444', padding: '1rem' }}>-₹2,200</td>
                    <td style={{ color: '#10b981', padding: '1rem' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <CheckCircle size={16} />
                        Completed
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Weather Tab */}
      {activeTab === 'weather' && (
        <div>
          <div className="glass-card" style={{ padding: '2rem', marginBottom: '2rem' }}>
            <h3 style={{ color: 'white', marginBottom: '1.5rem', fontSize: '1.5rem' }}>
              🌤️ 7-Day Weather Forecast
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={mockWeatherData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
                <XAxis dataKey="day" stroke="rgba(255, 255, 255, 0.6)" />
                <YAxis stroke="rgba(255, 255, 255, 0.6)" />
                <Tooltip
                  contentStyle={{
                    background: 'rgba(0, 0, 0, 0.8)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '8px',
                    color: 'white'
                  }}
                />
                <Bar dataKey="temp" fill="#f59e0b" name="Temperature (°C)" />
                <Bar dataKey="humidity" fill="#3b82f6" name="Humidity (%)" />
                <Bar dataKey="rainfall" fill="#10b981" name="Rainfall (mm)" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem'
          }}>
            <div className="glass-card" style={{ padding: '1.5rem', textAlign: 'center' }}>
              <Thermometer size={32} color="#f59e0b" style={{ marginBottom: '1rem' }} />
              <h4 style={{ color: 'white', margin: '0 0 0.5rem' }}>Temperature</h4>
              <p style={{ color: '#f59e0b', fontSize: '1.5rem', fontWeight: 'bold', margin: 0 }}>32°C</p>
            </div>

            <div className="glass-card" style={{ padding: '1.5rem', textAlign: 'center' }}>
              <Droplets size={32} color="#3b82f6" style={{ marginBottom: '1rem' }} />
              <h4 style={{ color: 'white', margin: '0 0 0.5rem' }}>Humidity</h4>
              <p style={{ color: '#3b82f6', fontSize: '1.5rem', fontWeight: 'bold', margin: 0 }}>65%</p>
            </div>

            <div className="glass-card" style={{ padding: '1.5rem', textAlign: 'center' }}>
              <Cloud size={32} color="#10b981" style={{ marginBottom: '1rem' }} />
              <h4 style={{ color: 'white', margin: '0 0 0.5rem' }}>Rainfall</h4>
              <p style={{ color: '#10b981', fontSize: '1.5rem', fontWeight: 'bold', margin: 0 }}>0mm</p>
            </div>
          </div>
        </div>
      )}

      {/* Market Tab */}
      {activeTab === 'market' && (
        <div className="glass-card" style={{ padding: '2rem' }}>
          <h3 style={{ color: 'white', marginBottom: '1.5rem', fontSize: '1.5rem' }}>
            📊 Market Prices (Per Quintal)
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1.5rem'
          }}>
            {mockMarketPrices.map((item, index) => (
              <div key={index} className="glass-card" style={{
                padding: '1.5rem',
                border: item.crop === 'Sugarcane' ? '2px solid #10b981' : '1px solid rgba(255, 255, 255, 0.1)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h4 style={{ color: 'white', margin: 0 }}>{item.crop}</h4>
                  <span style={{
                    color: item.trend === 'up' ? '#10b981' : '#ef4444',
                    fontSize: '0.875rem',
                    fontWeight: '600'
                  }}>
                    {item.trend === 'up' ? '↗' : '↘'} {Math.abs(item.change)}%
                  </span>
                </div>
                <p style={{
                  color: item.crop === 'Sugarcane' ? '#10b981' : 'white',
                  fontSize: '2rem',
                  fontWeight: 'bold',
                  margin: '0.5rem 0'
                }}>
                  ₹{item.price.toLocaleString()}
                </p>
                {item.crop === 'Sugarcane' && (
                  <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.875rem', margin: 0 }}>
                    🌟 Your primary crop
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Advisory Tab */}
      {activeTab === 'advisory' && (
        <div>
          <div className="glass-card" style={{ padding: '2rem', marginBottom: '2rem' }}>
            <h3 style={{ color: 'white', marginBottom: '1.5rem', fontSize: '1.5rem' }}>
              🎯 Personalized Recommendations
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '1.5rem'
            }}>
              <div style={{
                background: 'rgba(16, 185, 129, 0.1)',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                borderRadius: '12px',
                padding: '1.5rem'
              }}>
                <h4 style={{ color: '#10b981', margin: '0 0 1rem' }}>✅ Optimal Planting Time</h4>
                <p style={{ color: 'rgba(255, 255, 255, 0.8)', margin: 0 }}>
                  Based on weather patterns and soil conditions, next week is ideal for planting your next sugarcane crop.
                </p>
              </div>

              <div style={{
                background: 'rgba(59, 130, 246, 0.1)',
                border: '1px solid rgba(59, 130, 246, 0.3)',
                borderRadius: '12px',
                padding: '1.5rem'
              }}>
                <h4 style={{ color: '#3b82f6', margin: '0 0 1rem' }}>💧 Irrigation Schedule</h4>
                <p style={{ color: 'rgba(255, 255, 255, 0.8)', margin: 0 }}>
                  With current soil moisture levels, schedule irrigation for Thursday evening for optimal water efficiency.
                </p>
              </div>

              <div style={{
                background: 'rgba(245, 158, 11, 0.1)',
                border: '1px solid rgba(245, 158, 11, 0.3)',
                borderRadius: '12px',
                padding: '1.5rem'
              }}>
                <h4 style={{ color: '#f59e0b', margin: '0 0 1rem' }}>🌱 Fertilizer Application</h4>
                <p style={{ color: 'rgba(255, 255, 255, 0.8)', margin: 0 }}>
                  Apply nitrogen-rich fertilizer this weekend to maximize yield potential during the growth phase.
                </p>
              </div>
            </div>
          </div>

          <div className="glass-card" style={{ padding: '2rem' }}>
            <h3 style={{ color: 'white', marginBottom: '1.5rem' }}>📚 Educational Resources</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '1rem',
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '8px'
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  background: '#10b981',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  📹
                </div>
                <div>
                  <h4 style={{ color: 'white', margin: '0 0 0.25rem' }}>Modern Sugarcane Farming Techniques</h4>
                  <p style={{ color: 'rgba(255, 255, 255, 0.7)', margin: 0, fontSize: '0.875rem' }}>
                    15 min video • Hindi
                  </p>
                </div>
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '1rem',
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '8px'
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  background: '#3b82f6',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  📖
                </div>
                <div>
                  <h4 style={{ color: 'white', margin: '0 0 0.25rem' }}>Pest Management Guide</h4>
                  <p style={{ color: 'rgba(255, 255, 255, 0.7)', margin: 0, fontSize: '0.875rem' }}>
                    PDF Guide • Hindi & English
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Advance Request Modal */}
      {showAdvanceModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div className="glass-card" style={{
            padding: '2rem',
            maxWidth: '400px',
            width: '90%'
          }}>
            <h3 style={{ color: 'white', marginBottom: '1.5rem' }}>Request Advance Payment</h3>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ color: 'rgba(255, 255, 255, 0.8)', display: 'block', marginBottom: '0.5rem' }}>
                Amount (₹)
              </label>
              <input
                type="number"
                value={advanceAmount}
                onChange={(e) => setAdvanceAmount(Number(e.target.value))}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  borderRadius: '8px',
                  color: 'white',
                  fontSize: '1rem'
                }}
                max={10000}
                min={1000}
              />
              <p style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.875rem', margin: '0.5rem 0 0' }}>
                Maximum advance: ₹10,000 (based on predicted yield)
              </p>
            </div>
            
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button
                onClick={() => setShowAdvanceModal(false)}
                style={{
                  flex: 1,
                  padding: '0.75rem',
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  borderRadius: '8px',
                  color: 'white',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleAdvanceRequest}
                style={{
                  flex: 1,
                  padding: '0.75rem',
                  background: 'linear-gradient(135deg, #10b981, #059669)',
                  border: 'none',
                  borderRadius: '8px',
                  color: 'white',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Request Advance
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FarmerPlatform;
