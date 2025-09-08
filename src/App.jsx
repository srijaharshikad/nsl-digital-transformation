// src/App.jsx
import React, {useState} from 'react';
import {LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar} from 'recharts';
import {Truck, Activity, Database, ChevronRight, Target, TrendingUp, Shield, Leaf, Users, Factory, BarChart3, Calendar, CheckCircle, ArrowRight, Zap, Globe, Award} from 'lucide-react';
import DigitalTwinPanel from './components/DigitalTwinPanel.jsx';
import FarmerPlatform from './components/FarmerPlatform.jsx';
import SupplyChainESG from './components/SupplyChainESG.jsx';
import NSLChatbot from './components/NSLChatbot.jsx';
import ProactiveOnboarding from './components/ProactiveOnboarding.jsx';

// --- Mock Data ---
const mockYield = [
  {month: 'Jan', yield: 2.1}, {month: 'Feb', yield: 2.4}, {month: 'Mar', yield: 2.8},
  {month: 'Apr', yield: 3.2}, {month: 'May', yield: 3.0}, {month: 'Jun', yield: 3.4}
];

const mockUptime = [
  {hour: '00', uptime: 98}, {hour: '04', uptime: 97}, {hour: '08', uptime: 96},
  {hour: '12', uptime: 99}, {hour: '16', uptime: 95}, {hour: '20', uptime: 97}
];

const mockInventory = [
  {location: 'Silo A', tonnes: 1200},
  {location: 'Silo B', tonnes: 880},
  {location: 'Warehouse', tonnes: 450}
];

// --- Components ---
function TopNav({active, setActive}){
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <div style={{
        display:"flex",
        justifyContent:"space-between",
        alignItems:"center",
        padding:"1rem",
        background:"rgba(0, 0, 0, 0.2)",
        backdropFilter:"blur(20px)",
        borderBottom:"1px solid rgba(255, 255, 255, 0.1)",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000
      }}>
        <div style={{ flex: 1 }}>
          <h2 style={{
            margin:0,
            color:"white",
            fontSize:"1.125rem",
            fontWeight:"700",
            letterSpacing:"-0.025em"
          }}>
            🌱 NSL Sugars
          </h2>
          <p style={{
            margin:0,
            marginTop:"0.125rem",
            color:"rgba(255, 255, 255, 0.8)",
            fontSize:"0.75rem",
            display: window.innerWidth < 640 ? 'none' : 'block'
          }}>
            Digital Transformation
          </p>
        </div>

        {/* Desktop Navigation */}
        <div style={{
          display:"flex",
          gap:"0.5rem",
          '@media (max-width: 767px)': {
            display: 'none'
          }
        }} className="hidden-mobile">
          <button 
            className={`nav-button ${active === 'overview' ? 'active' : ''}`}
            onClick={()=>setActive('overview')}
          >
            🏠 <span className="hidden-mobile">Overview</span>
          </button>
          <button 
            className={`nav-button ${active === 'solutions' ? 'active' : ''}`}
            onClick={()=>setActive('solutions')}
          >
            💡 <span className="hidden-mobile">Solutions</span>
          </button>
          <button 
            className={`nav-button ${active === 'demo' ? 'active' : ''}`}
            onClick={()=>setActive('demo')}
          >
            🚀 <span className="hidden-mobile">Live Demo</span>
          </button>
          <button 
            className={`nav-button ${active === 'roadmap' ? 'active' : ''}`}
            onClick={()=>setActive('roadmap')}
          >
            📅 <span className="hidden-mobile">Roadmap</span>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="mobile-only nav-button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{
            padding: '0.5rem',
            minWidth: '44px'
          }}
        >
          {mobileMenuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div 
          style={{
            position: 'fixed',
            top: '70px',
            left: 0,
            right: 0,
            background: 'rgba(0, 0, 0, 0.95)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderTop: 'none',
            padding: '1rem',
            zIndex: 999
          }}
          className="mobile-only"
        >
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem'
          }}>
            <button 
              className={`nav-button ${active === 'overview' ? 'active' : ''}`}
              onClick={()=>{setActive('overview'); setMobileMenuOpen(false);}}
              style={{ justifyContent: 'flex-start' }}
            >
              🏠 Overview
            </button>
            <button 
              className={`nav-button ${active === 'solutions' ? 'active' : ''}`}
              onClick={()=>{setActive('solutions'); setMobileMenuOpen(false);}}
              style={{ justifyContent: 'flex-start' }}
            >
              💡 Solutions
            </button>
            <button 
              className={`nav-button ${active === 'demo' ? 'active' : ''}`}
              onClick={()=>{setActive('demo'); setMobileMenuOpen(false);}}
              style={{ justifyContent: 'flex-start' }}
            >
              🚀 Live Demo
            </button>
            <button 
              className={`nav-button ${active === 'roadmap' ? 'active' : ''}`}
              onClick={()=>{setActive('roadmap'); setMobileMenuOpen(false);}}
              style={{ justifyContent: 'flex-start' }}
            >
              📅 Roadmap
            </button>
          </div>
        </div>
      )}
    </>
  );
}

// Hero Section Component
function HeroSection() {
  return (
    <div className="container" style={{
      padding: "5rem 1rem 3rem",
      textAlign: "center",
      position: "relative",
      overflow: "hidden"
    }}>
      {/* Background effects */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.1) 0%, transparent 70%)",
        zIndex: -1
      }} />
      
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <h1 className="text-3xl" style={{
          fontWeight: "bold",
          color: "white",
          marginBottom: "1.5rem",
          textShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
          background: "linear-gradient(135deg, #10b981, #3b82f6)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent"
        }}>
          🌱 NSL Sugars Digital Future
        </h1>
        
        <p className="text-lg" style={{
          color: "rgba(255, 255, 255, 0.8)",
          marginBottom: "2rem",
          maxWidth: "800px",
          margin: "0 auto 2rem",
          lineHeight: 1.6
        }}>
          Transforming agriculture through AI-powered solutions, digital twins, and sustainable innovation. 
          From farm to factory, we're building the future of sugar production.
        </p>
        
        <div className="grid grid-cols-1 grid-cols-md-3" style={{
          gap: "1rem",
          marginTop: "2rem"
        }}>
          <div className="glass-card" style={{ padding: "2rem", textAlign: "center" }}>
            <div style={{
              background: "linear-gradient(135deg, #10b981, #059669)",
              width: "60px",
              height: "60px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 1rem"
            }}>
              <TrendingUp size={30} color="white" />
            </div>
            <h3 style={{ color: "white", marginBottom: "0.5rem" }}>₹9 Cr Investment</h3>
            <p style={{ color: "rgba(255, 255, 255, 0.7)" }}>Total digital transformation budget</p>
          </div>
          
          <div className="glass-card" style={{ padding: "2rem", textAlign: "center" }}>
            <div style={{
              background: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
              width: "60px",
              height: "60px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 1rem"
            }}>
              <Target size={30} color="white" />
            </div>
            <h3 style={{ color: "white", marginBottom: "0.5rem" }}>38% ROI Increase</h3>
            <p style={{ color: "rgba(255, 255, 255, 0.7)" }}>Expected operational efficiency gains</p>
          </div>
          
          <div className="glass-card" style={{ padding: "2rem", textAlign: "center" }}>
            <div style={{
              background: "linear-gradient(135deg, #f59e0b, #d97706)",
              width: "60px",
              height: "60px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 1rem"
            }}>
              <Leaf size={30} color="white" />
            </div>
            <h3 style={{ color: "white", marginBottom: "0.5rem" }}>Carbon Neutral</h3>
            <p style={{ color: "rgba(255, 255, 255, 0.7)" }}>Sustainable operations by 2030</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Challenges Section
function ChallengesSection() {
  const challenges = [
    {
      icon: Factory,
      title: "Operational Inefficiencies",
      description: "Frequent downtime, energy waste, and manual monitoring processes",
      color: "#ef4444"
    },
    {
      icon: Truck,
      title: "Fragmented Supply Chain",
      description: "Smallholder farmer base with procurement delays and poor visibility",
      color: "#f59e0b"
    },
    {
      icon: BarChart3,
      title: "Market Volatility",
      description: "Unpredictable sugar/ethanol demand and pricing fluctuations",
      color: "#8b5cf6"
    },
    {
      icon: Shield,
      title: "Regulatory Pressures",
      description: "Ethanol blending mandates, ESG reporting, and carbon compliance",
      color: "#06b6d4"
    }
  ];

  return (
    <div style={{ padding: "4rem 2rem", maxWidth: "1200px", margin: "0 auto" }}>
      <h2 style={{
        fontSize: "3rem",
        fontWeight: "bold",
        color: "white",
        textAlign: "center",
        marginBottom: "3rem"
      }}>
        Current Challenges
      </h2>
      
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: "2rem"
      }}>
        {challenges.map((challenge, index) => (
          <div key={index} className="glass-card animate-fade-in" style={{
            padding: "2rem",
            position: "relative",
            overflow: "hidden",
            cursor: "pointer",
            transition: "all 0.3s ease"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-8px)";
            e.currentTarget.style.boxShadow = `0 20px 40px rgba(0, 0, 0, 0.4), 0 0 30px ${challenge.color}40`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 8px 32px rgba(0, 0, 0, 0.3)";
          }}
          >
            <div style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "4px",
              background: challenge.color
            }} />
            
            <div style={{
              background: `${challenge.color}20`,
              width: "60px",
              height: "60px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "1.5rem"
            }}>
              <challenge.icon size={30} color={challenge.color} />
            </div>
            
            <h3 style={{
              color: "white",
              fontSize: "1.5rem",
              fontWeight: "600",
              marginBottom: "1rem"
            }}>
              {challenge.title}
            </h3>
            
            <p style={{
              color: "rgba(255, 255, 255, 0.7)",
              lineHeight: 1.6
            }}>
              {challenge.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

// Digital Solutions Section
function SolutionsSection() {
  const solutions = [
    {
      title: "Smart Farmer Engagement Platform",
      description: "Multilingual app for payments, yield prediction, and advisory services",
      icon: Users,
      cost: "₹2 Cr",
      roi: "+20% supply reliability",
      features: ["Real-time payments", "AI yield prediction", "Weather advisory", "Market prices"],
      color: "#10b981"
    },
    {
      title: "Digital Twin & Predictive Automation",
      description: "IoT sensors + AI dashboards for real-time monitoring and predictive maintenance",
      icon: Factory,
      cost: "₹3 Cr",
      roi: "+10% uptime, -25% maintenance cost",
      features: ["Real-time monitoring", "Predictive maintenance", "Energy optimization", "Anomaly detection"],
      color: "#3b82f6"
    },
    {
      title: "Integrated Supply Chain & ESG",
      description: "Cloud SCM with AI demand forecasting + automated ESG compliance tracking",
      icon: Globe,
      cost: "₹4 Cr",
      roi: "8% logistics savings, 10% working capital improvement",
      features: ["AI demand forecasting", "ESG compliance", "Blockchain traceability", "Carbon credits"],
      color: "#8b5cf6"
    }
  ];

  return (
    <div style={{ padding: "4rem 2rem", maxWidth: "1400px", margin: "0 auto" }}>
      <h2 style={{
        fontSize: "3rem",
        fontWeight: "bold",
        color: "white",
        textAlign: "center",
        marginBottom: "3rem"
      }}>
        Top 3 Digital Solutions
      </h2>
      
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
        gap: "2rem"
      }}>
        {solutions.map((solution, index) => (
          <div key={index} className="glass-card" style={{
            padding: "2.5rem",
            position: "relative",
            overflow: "hidden",
            cursor: "pointer",
            transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-12px) scale(1.02)";
            e.currentTarget.style.boxShadow = `0 25px 50px rgba(0, 0, 0, 0.5), 0 0 40px ${solution.color}30`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0) scale(1)";
            e.currentTarget.style.boxShadow = "0 8px 32px rgba(0, 0, 0, 0.3)";
          }}
          >
            {/* Gradient background */}
            <div style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: `linear-gradient(135deg, ${solution.color}10, transparent)`,
              opacity: 0.7
            }} />
            
            {/* Header */}
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              marginBottom: "1.5rem",
              position: "relative",
              zIndex: 1
            }}>
              <div style={{
                background: `${solution.color}20`,
                padding: "1rem",
                borderRadius: "16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}>
                <solution.icon size={32} color={solution.color} />
              </div>
              
      <div>
                <h3 style={{
                  color: "white",
                  fontSize: "1.5rem",
                  fontWeight: "700",
                  margin: 0,
                  marginBottom: "0.5rem"
                }}>
                  {solution.title}
                </h3>
                <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                  <span style={{
                    background: `${solution.color}30`,
                    color: solution.color,
                    padding: "0.25rem 0.75rem",
                    borderRadius: "12px",
                    fontSize: "0.875rem",
                    fontWeight: "600"
                  }}>
                    {solution.cost}
                  </span>
                  <span style={{
                    color: "rgba(255, 255, 255, 0.7)",
                    fontSize: "0.875rem"
                  }}>
                    {solution.roi}
                  </span>
                </div>
              </div>
            </div>
            
            {/* Description */}
            <p style={{
              color: "rgba(255, 255, 255, 0.8)",
              lineHeight: 1.6,
              marginBottom: "2rem",
              position: "relative",
              zIndex: 1
            }}>
              {solution.description}
            </p>
            
            {/* Features */}
            <div style={{ position: "relative", zIndex: 1 }}>
              <h4 style={{
                color: "white",
                fontSize: "1.1rem",
                fontWeight: "600",
                marginBottom: "1rem"
              }}>
                Key Features:
              </h4>
              
              <div style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "0.75rem"
              }}>
                {solution.features.map((feature, idx) => (
                  <div key={idx} style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem"
                  }}>
                    <CheckCircle size={16} color={solution.color} />
                    <span style={{
                      color: "rgba(255, 255, 255, 0.8)",
                      fontSize: "0.875rem"
                    }}>
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Strategic Roadmap Section
function RoadmapSection() {
  const phases = [
    {
      phase: "Years 1-3",
      title: "Foundation",
      description: "Launch farmer platform pilot, implement plant digital twin MVP, deploy basic SCM dashboard",
      milestones: ["Farmer platform pilot", "Digital twin MVP", "Basic SCM dashboard", "IoT sensor deployment"],
      color: "#10b981"
    },
    {
      phase: "Years 4-6", 
      title: "Scale",
      description: "Expand farmer platform into Agri-SuperApp, roll out digital twin to all plants, blockchain-enabled traceability",
      milestones: ["Agri-SuperApp launch", "Multi-plant digital twins", "Blockchain traceability", "AI optimization"],
      color: "#3b82f6"
    },
    {
      phase: "Years 7-10",
      title: "Leadership",
      description: "Monetize carbon credits, launch 'Green Ethanol' brand, build B2B export portal with ESG credentials",
      milestones: ["Carbon credit monetization", "Green Ethanol brand", "B2B export portal", "Industry leadership"],
      color: "#8b5cf6"
    }
  ];

  return (
    <div style={{ padding: "4rem 2rem", maxWidth: "1200px", margin: "0 auto" }}>
      <h2 style={{
        fontSize: "3rem",
        fontWeight: "bold",
        color: "white",
        textAlign: "center",
        marginBottom: "4rem"
      }}>
        Strategic Roadmap
      </h2>
      
      <div style={{ position: "relative" }}>
        {/* Timeline line */}
        <div style={{
          position: "absolute",
          left: "50%",
          top: 0,
          bottom: 0,
          width: "4px",
          background: "linear-gradient(180deg, #10b981, #3b82f6, #8b5cf6)",
          transform: "translateX(-50%)",
          zIndex: 1
        }} />
        
        {phases.map((phase, index) => (
          <div key={index} style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "4rem",
            position: "relative"
          }}>
            {/* Timeline dot */}
            <div style={{
              position: "absolute",
              left: "50%",
              width: "20px",
              height: "20px",
              background: phase.color,
              borderRadius: "50%",
              transform: "translateX(-50%)",
              zIndex: 2,
              boxShadow: `0 0 20px ${phase.color}60`
            }} />
            
            {/* Content */}
            <div className="glass-card" style={{
              width: "45%",
              padding: "2rem",
              marginLeft: index % 2 === 0 ? 0 : "55%",
              position: "relative",
              overflow: "hidden"
            }}>
              <div style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "4px",
                background: phase.color
              }} />
              
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                marginBottom: "1rem"
              }}>
                <Calendar size={24} color={phase.color} />
                <div>
                  <h3 style={{
                    color: "white",
                    fontSize: "1.5rem",
                    fontWeight: "700",
                    margin: 0
                  }}>
                    {phase.title}
                  </h3>
                  <p style={{
                    color: phase.color,
                    fontSize: "0.875rem",
                    fontWeight: "600",
                    margin: 0
                  }}>
                    {phase.phase}
                  </p>
                </div>
              </div>
              
              <p style={{
                color: "rgba(255, 255, 255, 0.8)",
                lineHeight: 1.6,
                marginBottom: "1.5rem"
              }}>
                {phase.description}
              </p>
              
      <div>
                <h4 style={{
                  color: "white",
                  fontSize: "1rem",
                  fontWeight: "600",
                  marginBottom: "1rem"
                }}>
                  Key Milestones:
                </h4>
                
                {phase.milestones.map((milestone, idx) => (
                  <div key={idx} style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    marginBottom: "0.5rem"
                  }}>
                    <ArrowRight size={14} color={phase.color} />
                    <span style={{
                      color: "rgba(255, 255, 255, 0.8)",
                      fontSize: "0.875rem"
                    }}>
                      {milestone}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Divami Partnership Section
function PartnershipSection() {
  return (
    <div className="glass-card" style={{
      margin: "4rem 2rem",
      padding: "3rem",
      maxWidth: "1200px",
      marginLeft: "auto",
      marginRight: "auto",
      position: "relative",
      overflow: "hidden"
    }}>
      {/* Background gradient */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)",
        opacity: 0.7
      }} />
      
      <div style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "1rem",
          marginBottom: "2rem"
        }}>
          <Award size={40} color="#3b82f6" />
          <h2 style={{
            fontSize: "2.5rem",
            fontWeight: "bold",
            color: "white",
            margin: 0
          }}>
            Divami as Strategic Partner
          </h2>
        </div>
        
        <p style={{
          fontSize: "1.2rem",
          color: "rgba(255, 255, 255, 0.8)",
          marginBottom: "3rem",
          maxWidth: "800px",
          margin: "0 auto 3rem"
        }}>
          Partnering with Divami for end-to-end digital transformation with sustained innovation and growth.
        </p>
        
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "2rem",
          marginBottom: "3rem"
        }}>
          <div style={{ textAlign: "center" }}>
            <Zap size={32} color="#10b981" style={{ marginBottom: "1rem" }} />
            <h3 style={{ color: "white", marginBottom: "0.5rem" }}>Design Thinking</h3>
            <p style={{ color: "rgba(255, 255, 255, 0.7)" }}>
              Farmer/operator persona mapping and UX-first product design
            </p>
          </div>
          
          <div style={{ textAlign: "center" }}>
            <Factory size={32} color="#3b82f6" style={{ marginBottom: "1rem" }} />
            <h3 style={{ color: "white", marginBottom: "0.5rem" }}>Innovation Pods</h3>
            <p style={{ color: "rgba(255, 255, 255, 0.7)" }}>
              Embedded Divami team delivering continuous solutioning
            </p>
          </div>
          
          <div style={{ textAlign: "center" }}>
            <Shield size={32} color="#8b5cf6" style={{ marginBottom: "1rem" }} />
            <h3 style={{ color: "white", marginBottom: "0.5rem" }}>Managed Services</h3>
            <p style={{ color: "rgba(255, 255, 255, 0.7)" }}>
              Ongoing product scaling, UX audits, and AI/tech upgrades
            </p>
          </div>
        </div>
        
        <div style={{
          background: "linear-gradient(135deg, #10b981, #059669)",
          padding: "1.5rem 3rem",
          borderRadius: "16px",
          display: "inline-block"
        }}>
          <h3 style={{
            color: "white",
            fontSize: "1.5rem",
            fontWeight: "700",
            margin: 0,
            marginBottom: "0.5rem"
          }}>
            Engagement Value: ~₹3 Cr/year
          </h3>
          <p style={{
            color: "rgba(255, 255, 255, 0.9)",
            margin: 0,
            fontSize: "1rem"
          }}>
            Through platform expansion & managed services
          </p>
        </div>
      </div>
    </div>
  );
}

// Overview Page Component
function OverviewPage() {
  return (
    <div style={{ paddingTop: "100px" }}>
      <HeroSection />
      <ChallengesSection />
    </div>
  );
}

// Solutions Page Component  
function SolutionsPage() {
  return (
    <div style={{ paddingTop: "120px" }}>
      <SolutionsSection />
      <PartnershipSection />
    </div>
  );
}

// Demo Page Component
function DemoPage() {
  const [activeDemo, setActiveDemo] = useState('farmer');

  return (
    <div style={{ paddingTop: '100px' }}>
      {/* Demo Navigation */}
      <div className="glass-card container" style={{
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
          background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(59, 130, 246, 0.1) 50%, rgba(139, 92, 246, 0.1) 100%)',
          opacity: 0.7
        }} />
        
        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', marginBottom: '2rem' }}>
          <h1 className="text-3xl" style={{
            fontWeight: 'bold',
            color: 'white',
            margin: 0,
            marginBottom: '0.5rem'
          }}>
            🚀 Interactive Solution Demos
          </h1>
          <p className="text-lg" style={{
            color: 'rgba(255, 255, 255, 0.8)',
            margin: 0
          }}>
            Experience our digital transformation solutions in action
          </p>
        </div>

        <div className="grid grid-cols-1 grid-cols-md-3" style={{
          gap: '1rem',
          position: 'relative',
          zIndex: 1,
          maxWidth: '900px',
          margin: '0 auto'
        }}>
          <button
            onClick={() => setActiveDemo('farmer')}
            className={`nav-button ${activeDemo === 'farmer' ? 'active' : ''}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '1rem 2rem',
              fontSize: '1rem',
              fontWeight: '600'
            }}
          >
            <Users size={24} />
            <div style={{ textAlign: 'left' }}>
              <div>Smart Farmer Platform</div>
              <div style={{ fontSize: '0.75rem', opacity: 0.8 }}>₹2 Cr Investment</div>
            </div>
          </button>

          <button
            onClick={() => setActiveDemo('twin')}
            className={`nav-button ${activeDemo === 'twin' ? 'active' : ''}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '1rem 2rem',
              fontSize: '1rem',
              fontWeight: '600'
            }}
          >
            <Factory size={24} />
            <div style={{ textAlign: 'left' }}>
              <div>Digital Twin & AI</div>
              <div style={{ fontSize: '0.75rem', opacity: 0.8 }}>₹3 Cr Investment</div>
            </div>
          </button>

          <button
            onClick={() => setActiveDemo('supply')}
            className={`nav-button ${activeDemo === 'supply' ? 'active' : ''}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '1rem 2rem',
              fontSize: '1rem',
              fontWeight: '600'
            }}
          >
            <Globe size={24} />
            <div style={{ textAlign: 'left' }}>
              <div>Supply Chain & ESG</div>
              <div style={{ fontSize: '0.75rem', opacity: 0.8 }}>₹4 Cr Investment</div>
            </div>
          </button>
        </div>
      </div>

      {/* Demo Content */}
      <div className="container">
        {activeDemo === 'farmer' && <FarmerPlatform />}
        {activeDemo === 'twin' && <DigitalTwinPanel />}
        {activeDemo === 'supply' && <SupplyChainESG />}
      </div>
    </div>
  );
}

// Roadmap Page Component
function RoadmapPage() {
  return (
    <div style={{ paddingTop: "120px" }}>
      <RoadmapSection />
    </div>
  );
}

// --- Main App ---
export default function App(){
  const [active, setActive] = useState('overview');
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showChatbot, setShowChatbot] = useState(false);

  const handleNavigation = (target, demo = null) => {
    setActive(target);
    if (demo && target === 'demo') {
      // We'll need to pass the demo selection to DemoPage
      // For now, just navigate to demo page
    }
  };
  
  return (
    <div style={{ minHeight: "100vh" }}>
      <TopNav active={active} setActive={setActive} />
      
      {active === 'overview' && <OverviewPage />}
      {active === 'solutions' && <SolutionsPage />}
      {active === 'demo' && <DemoPage />}
      {active === 'roadmap' && <RoadmapPage />}

      {/* Proactive Onboarding */}
      <ProactiveOnboarding
        onComplete={() => setShowOnboarding(false)}
        onNavigate={handleNavigation}
        onShowChatbot={() => setShowChatbot(true)}
      />

      {/* NSL Chatbot */}
      <NSLChatbot
        onNavigate={handleNavigation}
      />
      
      <footer style={{
        padding: "3rem 2rem 2rem",
        textAlign: "center",
        background: "rgba(0, 0, 0, 0.2)",
        borderTop: "1px solid rgba(255, 255, 255, 0.1)",
        marginTop: "4rem"
      }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "2rem"
          }}>
            <div style={{ textAlign: "left" }}>
              <h3 style={{
                color: "white",
                fontSize: "1.25rem",
                fontWeight: "700",
                margin: 0,
                marginBottom: "0.5rem"
              }}>
                🌱 NSL Sugars Digital Transformation
              </h3>
              <p style={{
                color: "rgba(255, 255, 255, 0.7)",
                margin: 0,
                fontSize: "0.875rem"
              }}>
                Revolutionizing Agriculture Through Technology
              </p>
            </div>
            
            <div style={{ textAlign: "right" }}>
              <p style={{
                color: "rgba(255, 255, 255, 0.6)",
                margin: 0,
                fontSize: "0.875rem",
                marginBottom: "0.5rem"
              }}>
                Digital Prototype by Srija Harshika
              </p>
              <p style={{
                color: "rgba(255, 255, 255, 0.5)",
                margin: 0,
                fontSize: "0.75rem"
              }}>
                For interview demonstration purposes
              </p>
            </div>
          </div>
          
          <div style={{
            marginTop: "2rem",
            paddingTop: "2rem",
            borderTop: "1px solid rgba(255, 255, 255, 0.1)",
            color: "rgba(255, 255, 255, 0.5)",
            fontSize: "0.75rem"
          }}>
            © 2024 NSL Sugars Digital Transformation Initiative. Built with React, Recharts, and modern web technologies.
          </div>
        </div>
      </footer>
    </div>
  );
}
