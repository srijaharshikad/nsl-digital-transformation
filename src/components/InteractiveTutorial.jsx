import React, { useState, useEffect } from 'react';
import { 
  Play, 
  ArrowRight, 
  ArrowLeft, 
  X, 
  Lightbulb, 
  Target, 
  CheckCircle,
  HelpCircle,
  Zap,
  Users,
  BarChart3,
  Leaf
} from 'lucide-react';

// Tutorial steps for each solution
const tutorialSteps = {
  'digital-twin': [
    {
      id: 1,
      title: "🤖 Welcome to Digital Twin",
      description: "Monitor your sugar plant in real-time with AI-powered insights",
      target: null,
      content: "This dashboard shows live sensor data from your manufacturing plant. You can track temperature, vibration, energy usage, and equipment load in real-time.",
      action: "Let's explore the key features!"
    },
    {
      id: 2,
      title: "📊 Live Metrics Dashboard",
      description: "Real-time sensor readings from your equipment",
      target: ".metric-tiles",
      content: "These tiles show current readings from sensors throughout your plant. Green indicates normal operation, yellow shows caution, and red alerts indicate issues requiring attention.",
      action: "Notice how the values update in real-time!"
    },
    {
      id: 3,
      title: "📈 Interactive Charts",
      description: "Historical trends and patterns",
      target: ".charts-section",
      content: "These charts show historical data trends. The line chart tracks temperature and vibration over time, while the area chart shows energy efficiency and load patterns.",
      action: "Watch the charts update with new data points!"
    },
    {
      id: 4,
      title: "🚨 Simulate an Anomaly",
      description: "Test the alert system",
      target: ".simulate-button",
      content: "Click the 'Simulate Anomaly' button to see how the system responds to equipment issues. This helps you understand how alerts work in real scenarios.",
      action: "Try clicking the button now!"
    },
    {
      id: 5,
      title: "🔔 Alert Management",
      description: "Stay informed about critical issues",
      target: ".alerts-section",
      content: "When anomalies occur, alerts appear here. You can acknowledge alerts to mark them as handled. This ensures no critical issues are missed.",
      action: "You're now ready to monitor your plant!"
    }
  ],
  'farmer-platform': [
    {
      id: 1,
      title: "🌾 Smart Farmer Platform",
      description: "Empower farmers with digital tools and fair payments",
      target: null,
      content: "This platform helps farmers manage their crops, receive payments, get weather updates, and access market information - all in one place.",
      action: "Let's see how it helps farmers!"
    },
    {
      id: 2,
      title: "📱 Farmer Dashboard",
      description: "Overview of farm performance and earnings",
      target: ".dashboard-tab",
      content: "The dashboard shows key metrics like total earnings, active contracts, crop health score, and recent activities. Farmers can quickly see their farm's performance.",
      action: "Click 'Dashboard' to see the overview!"
    },
    {
      id: 3,
      title: "💰 Payment System",
      description: "Fast, transparent payments for crops",
      target: ".payments-tab",
      content: "Farmers can request advances, view payment history, and track pending payments. This ensures fair and timely compensation for their produce.",
      action: "Try the 'Payments' tab!"
    },
    {
      id: 4,
      title: "🌤️ Weather & Market Info",
      description: "Real-time data for better decisions",
      target: ".weather-tab",
      content: "Access local weather forecasts and current market prices. This helps farmers make informed decisions about planting, harvesting, and selling.",
      action: "Check out 'Weather' and 'Market' tabs!"
    },
    {
      id: 5,
      title: "👨‍🌾 Expert Advisory",
      description: "Get guidance from agricultural experts",
      target: ".advisory-tab",
      content: "Connect with agricultural experts for advice on crop management, pest control, and farming techniques. This knowledge sharing improves crop yields.",
      action: "Explore the 'Advisory' section!"
    }
  ],
  'supply-chain': [
    {
      id: 1,
      title: "🚛 Supply Chain & ESG Dashboard",
      description: "Track sustainability and optimize logistics",
      target: null,
      content: "Monitor your entire supply chain from farm to consumer while tracking environmental impact and sustainability metrics.",
      action: "Let's explore sustainable supply chain management!"
    },
    {
      id: 2,
      title: "📊 Supply Chain Overview",
      description: "Real-time visibility across operations",
      target: ".overview-tab",
      content: "Get a bird's eye view of inventory levels, shipment status, supplier performance, and sustainability scores across your entire network.",
      action: "Click 'Overview' to see the big picture!"
    },
    {
      id: 3,
      title: "📦 Inventory Management",
      description: "Smart inventory optimization",
      target: ".inventory-tab",
      content: "Track stock levels, predict demand, and optimize inventory across multiple locations. AI helps prevent stockouts and reduce waste.",
      action: "Explore 'Inventory' management!"
    },
    {
      id: 4,
      title: "🌱 ESG Metrics",
      description: "Sustainability and compliance tracking",
      target: ".esg-tab",
      content: "Monitor carbon footprint, water usage, waste reduction, and social impact metrics. Generate reports for compliance and sustainability goals.",
      action: "Check out 'ESG Metrics'!"
    },
    {
      id: 5,
      title: "🔮 AI Forecasting",
      description: "Predict demand and optimize operations",
      target: ".forecasting-tab",
      content: "Use AI to predict market demand, optimize routes, and plan production. This reduces costs and improves customer satisfaction.",
      action: "Try 'AI Forecasting'!"
    }
  ]
};

// Coach Card Component
function CoachCard({ step, onNext, onPrev, onClose, onSkip, isFirst, isLast, totalSteps }) {
  return (
    <div style={{
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      background: 'rgba(0, 0, 0, 0.95)',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      borderRadius: '16px',
      padding: '1.5rem',
      maxWidth: '500px',
      width: '90vw',
      maxHeight: '80vh',
      overflowY: 'auto',
      zIndex: 1000,
      boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
      animation: 'slideIn 0.3s ease-out'
    }}>
      {/* Close button */}
      <button
        onClick={onClose}
        style={{
          position: 'absolute',
          top: '1rem',
          right: '1rem',
          background: 'transparent',
          border: 'none',
          color: 'rgba(255, 255, 255, 0.7)',
          cursor: 'pointer',
          padding: '0.5rem'
        }}
      >
        <X size={20} />
      </button>

      {/* Progress indicator */}
      <div style={{
        display: 'flex',
        gap: '0.5rem',
        marginBottom: '1.5rem'
      }}>
        {Array.from({ length: totalSteps }, (_, i) => (
          <div
            key={i}
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: i < step.id ? '#10b981' : 'rgba(255, 255, 255, 0.3)',
              transition: 'background 0.3s ease'
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div style={{ marginBottom: '2rem' }}>
        <h3 style={{
          fontSize: '1.5rem',
          fontWeight: '600',
          color: 'white',
          margin: '0 0 0.5rem 0',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <Lightbulb size={24} color="#3b82f6" />
          {step.title}
        </h3>
        
        <p style={{
          color: '#3b82f6',
          fontSize: '0.875rem',
          margin: '0 0 1rem 0',
          fontWeight: '500'
        }}>
          {step.description}
        </p>
        
        <p style={{
          color: 'rgba(255, 255, 255, 0.8)',
          fontSize: '1rem',
          lineHeight: '1.6',
          margin: '0 0 1rem 0'
        }}>
          {step.content}
        </p>
        
        <div style={{
          background: 'rgba(59, 130, 246, 0.1)',
          border: '1px solid rgba(59, 130, 246, 0.3)',
          borderRadius: '12px',
          padding: '1rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <Target size={16} color="#3b82f6" />
          <span style={{ color: '#3b82f6', fontSize: '0.875rem', fontWeight: '500' }}>
            {step.action}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div>
          {!isFirst && (
            <button
              onClick={onPrev}
              style={{
                background: 'transparent',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                color: 'white',
                borderRadius: '12px',
                padding: '0.75rem 1rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.875rem'
              }}
            >
              <ArrowLeft size={16} />
              Previous
            </button>
          )}
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button
            onClick={onSkip}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'rgba(255, 255, 255, 0.6)',
              cursor: 'pointer',
              padding: '0.75rem',
              fontSize: '0.875rem'
            }}
          >
            Skip Tutorial
          </button>
          
          <button
            onClick={isLast ? onClose : onNext}
            style={{
              background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
              border: 'none',
              color: 'white',
              borderRadius: '12px',
              padding: '0.75rem 1.5rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '0.875rem',
              fontWeight: '500'
            }}
          >
            {isLast ? (
              <>
                <CheckCircle size={16} />
                Get Started!
              </>
            ) : (
              <>
                Next
                <ArrowRight size={16} />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

// Spotlight overlay for highlighting elements
function SpotlightOverlay({ target, onNext }) {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: 'rgba(0, 0, 0, 0.7)',
        zIndex: 999,
        pointerEvents: 'auto'
      }}
      onClick={onNext}
    />
  );
}

// Welcome Modal for solution selection
function WelcomeModal({ onSelectSolution, onClose }) {
  const solutions = [
    {
      id: 'digital-twin',
      title: 'Digital Twin & Predictive Maintenance',
      description: 'Monitor plant operations in real-time with AI-powered insights',
      icon: <Zap size={32} color="#ef4444" />,
      color: '#ef4444'
    },
    {
      id: 'farmer-platform',
      title: 'Smart Farmer Engagement Platform',
      description: 'Empower farmers with digital tools and fair payments',
      icon: <Users size={32} color="#10b981" />,
      color: '#10b981'
    },
    {
      id: 'supply-chain',
      title: 'Supply Chain & ESG Dashboard',
      description: 'Track sustainability and optimize logistics',
      icon: <Leaf size={32} color="#3b82f6" />,
      color: '#3b82f6'
    }
  ];

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      background: 'rgba(0, 0, 0, 0.9)',
      backdropFilter: 'blur(20px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1001,
      animation: 'fadeIn 0.3s ease-out'
    }}>
      <div style={{
        background: 'rgba(0, 0, 0, 0.95)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        borderRadius: '20px',
        padding: '2rem',
        maxWidth: '800px',
        width: '90vw',
        maxHeight: '90vh',
        overflowY: 'auto',
        boxShadow: '0 25px 80px rgba(0, 0, 0, 0.6)'
      }}>
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1.5rem',
            right: '1.5rem',
            background: 'transparent',
            border: 'none',
            color: 'rgba(255, 255, 255, 0.7)',
            cursor: 'pointer',
            padding: '0.5rem'
          }}
        >
          <X size={24} />
        </button>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
            marginBottom: '1rem'
          }}>
            <HelpCircle size={32} color="#3b82f6" />
            <h2 style={{
              fontSize: '2rem',
              fontWeight: '700',
              color: 'white',
              margin: 0
            }}>
              Welcome to NSL Digital Solutions!
            </h2>
          </div>
          
          <p style={{
            fontSize: '1.1rem',
            color: 'rgba(255, 255, 255, 0.8)',
            margin: 0,
            lineHeight: '1.6'
          }}>
            Choose a solution to explore with our interactive guided tour
          </p>
        </div>

        {/* Solution cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem',
          marginBottom: '2rem'
        }}>
          {solutions.map((solution) => (
            <div
              key={solution.id}
              onClick={() => onSelectSolution(solution.id)}
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '12px',
                padding: '1.5rem',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                textAlign: 'center',
                minHeight: '44px'
              }}
              className="solution-card"
            >
              <div style={{ marginBottom: '1rem' }}>
                {solution.icon}
              </div>
              
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: '600',
                color: 'white',
                margin: '0 0 0.75rem 0'
              }}>
                {solution.title}
              </h3>
              
              <p style={{
                fontSize: '0.875rem',
                color: 'rgba(255, 255, 255, 0.7)',
                margin: 0,
                lineHeight: '1.5'
              }}>
                {solution.description}
              </p>
              
              <div style={{
                marginTop: '1.5rem',
                padding: '0.75rem 1.5rem',
                background: `${solution.color}20`,
                border: `1px solid ${solution.color}40`,
                borderRadius: '12px',
                color: solution.color,
                fontSize: '0.875rem',
                fontWeight: '500'
              }}>
                Start Interactive Tour →
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div style={{
          textAlign: 'center',
          paddingTop: '2rem',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <p style={{
            fontSize: '0.875rem',
            color: 'rgba(255, 255, 255, 0.6)',
            margin: 0
          }}>
            💡 Each tour takes about 2-3 minutes and shows you key features interactively
          </p>
        </div>
      </div>
    </div>
  );
}

// Main Interactive Tutorial Component
export default function InteractiveTutorial({ 
  isActive, 
  solution, 
  onComplete, 
  onClose,
  showWelcome = false 
}) {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedSolution, setSelectedSolution] = useState(solution);
  const [showWelcomeModal, setShowWelcomeModal] = useState(showWelcome);

  const steps = selectedSolution ? tutorialSteps[selectedSolution] || [] : [];
  const currentStepData = steps[currentStep];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    onComplete?.();
    onClose?.();
  };

  const handleSkip = () => {
    onClose?.();
  };

  const handleSelectSolution = (solutionId) => {
    setSelectedSolution(solutionId);
    setShowWelcomeModal(false);
    setCurrentStep(0);
  };

  const handleCloseWelcome = () => {
    setShowWelcomeModal(false);
    onClose?.();
  };

  if (!isActive && !showWelcomeModal) return null;

  if (showWelcomeModal) {
    return (
      <WelcomeModal
        onSelectSolution={handleSelectSolution}
        onClose={handleCloseWelcome}
      />
    );
  }

  if (!selectedSolution || !currentStepData) return null;

  return (
    <>
      {/* Spotlight overlay */}
      {currentStepData.target && (
        <SpotlightOverlay 
          target={currentStepData.target}
          onNext={handleNext}
        />
      )}

      {/* Coach card */}
      <CoachCard
        step={currentStepData}
        onNext={handleNext}
        onPrev={handlePrev}
        onClose={handleComplete}
        onSkip={handleSkip}
        isFirst={currentStep === 0}
        isLast={currentStep === steps.length - 1}
        totalSteps={steps.length}
      />
    </>
  );
}
