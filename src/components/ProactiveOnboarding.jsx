import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  X, 
  Play, 
  Users, 
  Factory, 
  Globe, 
  TrendingUp,
  Target,
  Award,
  ChevronRight,
  MessageCircle
} from 'lucide-react';

// Onboarding steps
const onboardingSteps = [
  {
    id: 'welcome',
    title: '🌱 Welcome to NSL Sugars Digital Future!',
    subtitle: 'Discover how we\'re transforming agriculture with ₹9 Cr investment',
    content: 'You\'re about to explore revolutionary digital solutions that will reshape sugar manufacturing and farming. Ready to see the future?',
    actions: [
      { id: 'start-tour', text: '🚀 Start the Journey', primary: true },
      { id: 'skip', text: 'Skip for now', secondary: true }
    ]
  },
  {
    id: 'solutions-overview',
    title: '💡 Three Game-Changing Solutions',
    subtitle: 'Each solution addresses critical challenges in agriculture',
    content: 'We\'ve developed 3 comprehensive digital platforms that work together to revolutionize the entire agricultural value chain:',
    solutions: [
      {
        icon: Users,
        name: 'Smart Farmer Platform',
        investment: '₹2 Cr',
        benefit: '20% better supply reliability',
        description: 'Empowering farmers with AI-powered tools'
      },
      {
        icon: Factory,
        name: 'Digital Twin & AI',
        investment: '₹3 Cr',
        benefit: '25% lower maintenance costs',
        description: 'Real-time plant optimization and predictive maintenance'
      },
      {
        icon: Globe,
        name: 'Supply Chain & ESG',
        investment: '₹4 Cr',
        benefit: '10% working capital improvement',
        description: 'Sustainable supply chain with ESG compliance'
      }
    ],
    actions: [
      { id: 'explore-demos', text: '🎮 Try Interactive Demos', primary: true },
      { id: 'learn-more', text: '📖 Learn More First' }
    ]
  },
  {
    id: 'demo-intro',
    title: '🎮 Experience the Future Live',
    subtitle: 'Interactive demos with real data and simulations',
    content: 'Each demo is a fully functional prototype showing exactly how our solutions work. You can interact with real data, trigger simulations, and see the impact firsthand.',
    features: [
      '📊 Real-time data visualization',
      '🎯 Interactive simulations',
      '📱 Mobile-responsive design',
      '🤖 AI-powered insights',
      '💬 Smart assistant guidance'
    ],
    actions: [
      { id: 'start-demos', text: '🚀 Start with Farmer Platform', primary: true },
      { id: 'choose-demo', text: '🎯 Choose My Demo' }
    ]
  },
  {
    id: 'assistant-intro',
    title: '🤖 Meet Your Digital Assistant',
    subtitle: 'I know everything about NSL\'s transformation',
    content: 'I\'m your personal guide through this journey. I can answer questions, explain features, help you navigate, and provide detailed insights about any aspect of our digital transformation.',
    capabilities: [
      '💡 Explain any solution in detail',
      '📊 Show ROI calculations and benefits',
      '🗺️ Guide you through the roadmap',
      '🚀 Help with demo navigation',
      '❓ Answer technical questions'
    ],
    actions: [
      { id: 'chat-now', text: '💬 Chat with Assistant', primary: true },
      { id: 'continue-tour', text: '▶️ Continue Tour' }
    ]
  }
];

// Individual step component
function OnboardingStep({ step, onAction, currentStep, totalSteps }) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      maxWidth: '600px',
      margin: '0 auto',
      padding: '2rem'
    }}>
      {/* Progress indicator */}
      <div style={{
        display: 'flex',
        gap: '0.5rem',
        marginBottom: '2rem'
      }}>
        {Array.from({ length: totalSteps }, (_, i) => (
          <div
            key={i}
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              background: i <= currentStep 
                ? 'linear-gradient(135deg, #3b82f6, #1d4ed8)' 
                : 'rgba(255, 255, 255, 0.2)',
              transition: 'all 0.3s ease'
            }}
          />
        ))}
      </div>

      {/* Title */}
      <h2 style={{
        fontSize: '2.5rem',
        fontWeight: '800',
        color: 'white',
        margin: '0 0 0.5rem 0',
        lineHeight: '1.2'
      }}>
        {step.title}
      </h2>

      {/* Subtitle */}
      <p style={{
        fontSize: '1.25rem',
        color: '#3b82f6',
        margin: '0 0 1.5rem 0',
        fontWeight: '500'
      }}>
        {step.subtitle}
      </p>

      {/* Content */}
      <p style={{
        fontSize: '1.1rem',
        color: 'rgba(255, 255, 255, 0.8)',
        lineHeight: '1.6',
        margin: '0 0 2rem 0'
      }}>
        {step.content}
      </p>

      {/* Solutions grid */}
      {step.solutions && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '1rem',
          marginBottom: '2rem',
          width: '100%'
        }}>
          {step.solutions.map((solution, index) => (
            <div
              key={index}
              className="glass-card"
              style={{
                padding: '1.5rem',
                textAlign: 'center',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 12px 40px rgba(59, 130, 246, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '';
              }}
            >
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem'
              }}>
                <solution.icon size={24} color="white" />
              </div>
              <h4 style={{
                color: 'white',
                fontSize: '1rem',
                fontWeight: '600',
                margin: '0 0 0.5rem 0'
              }}>
                {solution.name}
              </h4>
              <div style={{
                color: '#3b82f6',
                fontSize: '0.875rem',
                fontWeight: '500',
                marginBottom: '0.5rem'
              }}>
                {solution.investment} • {solution.benefit}
              </div>
              <p style={{
                color: 'rgba(255, 255, 255, 0.7)',
                fontSize: '0.8rem',
                margin: 0,
                lineHeight: '1.4'
              }}>
                {solution.description}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Features list */}
      {step.features && (
        <div style={{
          background: 'rgba(59, 130, 246, 0.1)',
          border: '1px solid rgba(59, 130, 246, 0.3)',
          borderRadius: '16px',
          padding: '1.5rem',
          marginBottom: '2rem',
          width: '100%'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '0.75rem'
          }}>
            {step.features.map((feature, index) => (
              <div
                key={index}
                style={{
                  color: 'white',
                  fontSize: '0.9rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                {feature}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Capabilities list */}
      {step.capabilities && (
        <div style={{
          background: 'rgba(16, 185, 129, 0.1)',
          border: '1px solid rgba(16, 185, 129, 0.3)',
          borderRadius: '16px',
          padding: '1.5rem',
          marginBottom: '2rem',
          width: '100%'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '0.75rem'
          }}>
            {step.capabilities.map((capability, index) => (
              <div
                key={index}
                style={{
                  color: 'white',
                  fontSize: '0.9rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                {capability}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Actions */}
      <div style={{
        display: 'flex',
        gap: '1rem',
        flexWrap: 'wrap',
        justifyContent: 'center'
      }}>
        {step.actions.map((action, index) => (
          <button
            key={index}
            onClick={() => onAction(action.id)}
            style={{
              background: action.primary 
                ? 'linear-gradient(135deg, #3b82f6, #1d4ed8)'
                : action.secondary 
                ? 'transparent'
                : 'rgba(255, 255, 255, 0.1)',
              border: action.primary 
                ? 'none'
                : '1px solid rgba(255, 255, 255, 0.3)',
              color: 'white',
              borderRadius: '12px',
              padding: '1rem 2rem',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              transition: 'all 0.3s ease',
              minHeight: '48px'
            }}
            onMouseEnter={(e) => {
              if (action.primary) {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 8px 25px rgba(59, 130, 246, 0.4)';
              } else {
                e.target.style.background = 'rgba(255, 255, 255, 0.15)';
              }
            }}
            onMouseLeave={(e) => {
              if (action.primary) {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '';
              } else {
                e.target.style.background = action.secondary ? 'transparent' : 'rgba(255, 255, 255, 0.1)';
              }
            }}
          >
            {action.text}
            {action.primary && <ArrowRight size={20} />}
          </button>
        ))}
      </div>
    </div>
  );
}

// Main Proactive Onboarding Component
export default function ProactiveOnboarding({ onComplete, onNavigate, onShowChatbot }) {
  const [isVisible, setIsVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(false);

  // Check if user has seen onboarding before
  useEffect(() => {
    const seen = localStorage.getItem('nsl-onboarding-seen');
    if (!seen) {
      // Show onboarding after a short delay
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setHasSeenOnboarding(true);
    }
  }, []);

  const handleAction = (actionId) => {
    switch (actionId) {
      case 'start-tour':
        setCurrentStep(1);
        break;
      case 'skip':
        handleComplete();
        break;
      case 'explore-demos':
        setCurrentStep(2);
        break;
      case 'learn-more':
        onNavigate?.('solutions');
        handleComplete();
        break;
      case 'start-demos':
        onNavigate?.('demo', 'farmer');
        handleComplete();
        break;
      case 'choose-demo':
        onNavigate?.('demo');
        handleComplete();
        break;
      case 'chat-now':
        onShowChatbot?.();
        handleComplete();
        break;
      case 'continue-tour':
        setCurrentStep(3);
        break;
      default:
        if (currentStep < onboardingSteps.length - 1) {
          setCurrentStep(currentStep + 1);
        } else {
          handleComplete();
        }
    }
  };

  const handleComplete = () => {
    setIsVisible(false);
    localStorage.setItem('nsl-onboarding-seen', 'true');
    onComplete?.();
  };

  if (!isVisible || hasSeenOnboarding) {
    return null;
  }

  const currentStepData = onboardingSteps[currentStep];

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: 'rgba(0, 0, 0, 0.95)',
        backdropFilter: 'blur(20px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2000,
        animation: 'fadeIn 0.5s ease-out',
        overflowY: 'auto',
        padding: '2rem 1rem'
      }}
    >
      {/* Background particles */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        overflow: 'hidden'
      }}>
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: '3px',
              height: '3px',
              background: 'rgba(59, 130, 246, 0.4)',
              borderRadius: '50%',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `pulse ${2 + Math.random() * 3}s infinite`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Close button */}
      <button
        onClick={handleComplete}
        style={{
          position: 'absolute',
          top: '2rem',
          right: '2rem',
          background: 'rgba(255, 255, 255, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: '50%',
          width: '48px',
          height: '48px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          color: 'rgba(255, 255, 255, 0.7)',
          transition: 'all 0.3s ease',
          zIndex: 1
        }}
        onMouseEnter={(e) => {
          e.target.style.background = 'rgba(255, 255, 255, 0.2)';
          e.target.style.color = 'white';
        }}
        onMouseLeave={(e) => {
          e.target.style.background = 'rgba(255, 255, 255, 0.1)';
          e.target.style.color = 'rgba(255, 255, 255, 0.7)';
        }}
      >
        <X size={20} />
      </button>

      {/* Onboarding content */}
      <div style={{
        width: '100%',
        maxWidth: '800px',
        position: 'relative',
        zIndex: 1
      }}>
        <OnboardingStep
          step={currentStepData}
          onAction={handleAction}
          currentStep={currentStep}
          totalSteps={onboardingSteps.length}
        />
      </div>
    </div>
  );
}
