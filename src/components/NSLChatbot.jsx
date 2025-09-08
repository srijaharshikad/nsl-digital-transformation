import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageCircle, 
  X, 
  Send, 
  Bot, 
  User, 
  Sparkles, 
  ArrowRight,
  Play,
  BookOpen,
  TrendingUp,
  Users,
  Factory,
  Globe,
  Leaf
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext.jsx';

// NSL Knowledge Base
const nslKnowledgeBase = {
  company: {
    name: "NSL Sugars",
    description: "A diversified sugarcane manufacturer leading digital transformation in agriculture",
    challenges: [
      "Operational inefficiencies with frequent downtime and energy waste",
      "Fragmented supply chain with smallholder farmer base",
      "Market volatility in sugar/ethanol demand and pricing",
      "Regulatory pressures for ethanol blending and ESG reporting",
      "Sustainability concerns with high resource usage"
    ],
    opportunities: [
      "AI-powered precision agriculture and yield prediction",
      "Digital twins for plant optimization and predictive maintenance",
      "Blockchain-enabled supply chain traceability",
      "Automated ESG reporting and carbon credit monetization",
      "Farmer/B2B engagement platforms as new value streams"
    ]
  },
  solutions: {
    "farmer-platform": {
      name: "Smart Farmer Engagement & Procurement Platform",
      investment: "₹2 Cr",
      roi: "+20% supply reliability, improved loyalty, premium pricing",
      features: [
        "Multilingual mobile app for farmers",
        "Real-time payment processing",
        "AI-powered yield prediction",
        "Weather advisory and alerts",
        "Market price information",
        "Expert agricultural advisory"
      ],
      benefits: [
        "Fair and transparent payments",
        "Improved crop yields through expert guidance",
        "Better market access for farmers",
        "Reduced procurement delays",
        "Enhanced farmer loyalty"
      ]
    },
    "digital-twin": {
      name: "Digital Twin & Predictive Plant Automation",
      investment: "₹3 Cr",
      roi: "+10% uptime, -25% maintenance cost, -7% energy usage",
      features: [
        "IoT sensors for real-time monitoring",
        "AI-powered predictive maintenance",
        "Digital twin visualization",
        "Automated alert system",
        "Energy optimization algorithms",
        "Equipment performance analytics"
      ],
      benefits: [
        "Reduced unexpected downtime",
        "Lower maintenance costs",
        "Improved energy efficiency",
        "Better equipment lifespan",
        "Data-driven decision making"
      ]
    },
    "supply-chain": {
      name: "Integrated Supply Chain & ESG Dashboard",
      investment: "₹4 Cr",
      roi: "8% logistics savings, 10% working capital improvement, ESG branding advantage",
      features: [
        "End-to-end supply chain visibility",
        "AI demand forecasting",
        "Automated ESG compliance tracking",
        "Carbon footprint monitoring",
        "Blockchain traceability",
        "Sustainability reporting"
      ],
      benefits: [
        "Optimized logistics and reduced costs",
        "Better inventory management",
        "ESG compliance automation",
        "Enhanced brand reputation",
        "Carbon credit opportunities"
      ]
    }
  },
  roadmap: {
    "years-1-3": {
      phase: "Foundation",
      activities: [
        "Launch farmer platform pilot program",
        "Implement plant digital twin MVP",
        "Deploy basic supply chain management dashboard",
        "Establish IoT infrastructure",
        "Train staff on new technologies"
      ]
    },
    "years-4-6": {
      phase: "Scale",
      activities: [
        "Expand farmer platform into comprehensive Agri-SuperApp",
        "Roll out digital twin to all manufacturing plants",
        "Implement blockchain-enabled traceability",
        "Advanced AI analytics deployment",
        "Regional expansion of digital solutions"
      ]
    },
    "years-7-10": {
      phase: "Leadership",
      activities: [
        "Monetize carbon credits through verified tracking",
        "Launch premium 'Green Ethanol' brand",
        "Build B2B export portal with ESG credentials",
        "Become industry leader in sustainable manufacturing",
        "Expand to other agricultural commodities"
      ]
    }
  },
  totalInvestment: "₹9 Cr",
  partnershipValue: "₹3 Cr/year through platform expansion & services"
};

// Conversation starters and responses
const conversationFlow = {
  welcome: [
    "👋 Hi! I'm your NSL Digital Assistant. I know everything about our ₹9 Cr digital transformation journey!",
    "I can help you explore our 3 revolutionary solutions, explain our 10-year roadmap, or answer any questions about NSL's future.",
    "What would you like to discover first?"
  ],
  quickActions: [
    {
      id: 'solutions',
      text: '💡 Explore Solutions',
      description: 'See our 3 digital transformation solutions'
    },
    {
      id: 'demo',
      text: '🚀 Try Live Demos',
      description: 'Experience interactive prototypes'
    },
    {
      id: 'roadmap',
      text: '📅 View Roadmap',
      description: 'Our 10-year transformation plan'
    },
    {
      id: 'roi',
      text: '📊 Show ROI',
      description: 'Investment returns and benefits'
    }
  ]
};

// Smart response generator
function generateResponse(message, context = {}) {
  const msg = message.toLowerCase();
  
  // Solution-specific queries
  if (msg.includes('farmer') || msg.includes('agriculture') || msg.includes('payment')) {
    const solution = nslKnowledgeBase.solutions['farmer-platform'];
    return {
      text: `🌾 **${solution.name}**\n\n💰 Investment: ${solution.investment}\n📈 ROI: ${solution.roi}\n\n**Key Features:**\n${solution.features.map(f => `• ${f}`).join('\n')}\n\nWould you like to try the live demo?`,
      actions: [
        { id: 'demo-farmer', text: '🚀 Try Farmer Demo', action: 'navigate', target: 'demo', demo: 'farmer' },
        { id: 'learn-more-farmer', text: '📖 Learn More', action: 'explain', topic: 'farmer-benefits' }
      ]
    };
  }
  
  if (msg.includes('digital twin') || msg.includes('iot') || msg.includes('maintenance') || msg.includes('plant')) {
    const solution = nslKnowledgeBase.solutions['digital-twin'];
    return {
      text: `🤖 **${solution.name}**\n\n💰 Investment: ${solution.investment}\n📈 ROI: ${solution.roi}\n\n**Key Features:**\n${solution.features.map(f => `• ${f}`).join('\n')}\n\nThis reduces downtime by 10% and cuts maintenance costs by 25%!`,
      actions: [
        { id: 'demo-twin', text: '🚀 Try Digital Twin Demo', action: 'navigate', target: 'demo', demo: 'twin' },
        { id: 'learn-more-twin', text: '📖 Learn More', action: 'explain', topic: 'twin-benefits' }
      ]
    };
  }
  
  if (msg.includes('supply chain') || msg.includes('esg') || msg.includes('sustainability') || msg.includes('carbon')) {
    const solution = nslKnowledgeBase.solutions['supply-chain'];
    return {
      text: `🌱 **${solution.name}**\n\n💰 Investment: ${solution.investment}\n📈 ROI: ${solution.roi}\n\n**Key Features:**\n${solution.features.map(f => `• ${f}`).join('\n')}\n\nThis solution positions NSL as a sustainability leader!`,
      actions: [
        { id: 'demo-supply', text: '🚀 Try Supply Chain Demo', action: 'navigate', target: 'demo', demo: 'supply' },
        { id: 'learn-more-supply', text: '📖 Learn More', action: 'explain', topic: 'supply-benefits' }
      ]
    };
  }
  
  // Investment and ROI queries
  if (msg.includes('investment') || msg.includes('cost') || msg.includes('budget') || msg.includes('roi')) {
    return {
      text: `💰 **NSL Digital Transformation Investment**\n\n**Total Budget:** ${nslKnowledgeBase.totalInvestment}\n\n**Breakdown:**\n• Smart Farmer Platform: ₹2 Cr\n• Digital Twin & AI: ₹3 Cr\n• Supply Chain & ESG: ₹4 Cr\n\n**Expected Returns:**\n• 20% better supply reliability\n• 25% reduction in maintenance costs\n• 10% improvement in working capital\n• New revenue streams from ESG branding\n\n**Partnership Value:** ${nslKnowledgeBase.partnershipValue}`,
      actions: [
        { id: 'view-roadmap', text: '📅 View Implementation Roadmap', action: 'navigate', target: 'roadmap' },
        { id: 'demo-all', text: '🚀 Try All Demos', action: 'navigate', target: 'demo' }
      ]
    };
  }
  
  // Roadmap queries
  if (msg.includes('roadmap') || msg.includes('timeline') || msg.includes('implementation') || msg.includes('plan')) {
    return {
      text: `📅 **NSL 10-Year Digital Transformation Roadmap**\n\n**Years 1-3 (Foundation):**\n${nslKnowledgeBase.roadmap['years-1-3'].activities.map(a => `• ${a}`).join('\n')}\n\n**Years 4-6 (Scale):**\n${nslKnowledgeBase.roadmap['years-4-6'].activities.map(a => `• ${a}`).join('\n')}\n\n**Years 7-10 (Leadership):**\n${nslKnowledgeBase.roadmap['years-7-10'].activities.map(a => `• ${a}`).join('\n')}`,
      actions: [
        { id: 'view-solutions', text: '💡 Explore Solutions', action: 'navigate', target: 'solutions' },
        { id: 'try-demos', text: '🚀 Try Interactive Demos', action: 'navigate', target: 'demo' }
      ]
    };
  }
  
  // Demo-related queries
  if (msg.includes('demo') || msg.includes('try') || msg.includes('interactive') || msg.includes('prototype')) {
    return {
      text: `🚀 **Interactive Solution Demos**\n\nExperience our digital transformation solutions firsthand:\n\n🌾 **Smart Farmer Platform** - Mobile app for payments, yield prediction, and advisory\n🤖 **Digital Twin & AI** - Real-time plant monitoring with predictive maintenance\n🌱 **Supply Chain & ESG** - End-to-end visibility with sustainability tracking\n\nEach demo shows real data, interactive charts, and live simulations!`,
      actions: [
        { id: 'start-farmer-demo', text: '🌾 Farmer Platform', action: 'navigate', target: 'demo', demo: 'farmer' },
        { id: 'start-twin-demo', text: '🤖 Digital Twin', action: 'navigate', target: 'demo', demo: 'twin' },
        { id: 'start-supply-demo', text: '🌱 Supply Chain', action: 'navigate', target: 'demo', demo: 'supply' }
      ]
    };
  }
  
  // General company queries
  if (msg.includes('nsl') || msg.includes('company') || msg.includes('about') || msg.includes('challenges')) {
    return {
      text: `🌱 **About NSL Sugars**\n\n${nslKnowledgeBase.company.description}\n\n**Current Challenges:**\n${nslKnowledgeBase.company.challenges.map(c => `• ${c}`).join('\n')}\n\n**Digital Opportunities:**\n${nslKnowledgeBase.company.opportunities.map(o => `• ${o}`).join('\n')}\n\nOur ₹9 Cr digital transformation addresses all these challenges!`,
      actions: [
        { id: 'explore-solutions', text: '💡 Explore Solutions', action: 'navigate', target: 'solutions' },
        { id: 'see-demos', text: '🚀 See Live Demos', action: 'navigate', target: 'demo' }
      ]
    };
  }
  
  // Default responses for unclear queries
  const defaultResponses = [
    {
      text: `I'd love to help you explore NSL's digital transformation! Here's what I can show you:\n\n💡 **3 Revolutionary Solutions** (₹9 Cr total investment)\n🚀 **Interactive Demos** with real data\n📅 **10-Year Roadmap** for implementation\n📊 **ROI Analysis** and business benefits\n\nWhat interests you most?`,
      actions: conversationFlow.quickActions
    },
    {
      text: `🤔 I didn't quite catch that, but I'm here to help! I know everything about:\n\n• NSL's Smart Farmer Platform (₹2 Cr)\n• Digital Twin & AI Solutions (₹3 Cr)\n• Supply Chain & ESG Dashboard (₹4 Cr)\n• Implementation roadmap and ROI\n\nTry asking about any of these topics!`,
      actions: conversationFlow.quickActions
    }
  ];
  
  return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
}

// Message component
function ChatMessage({ message, isBot, timestamp }) {
  return (
    <div style={{
      display: 'flex',
      gap: '0.75rem',
      marginBottom: '1rem',
      alignItems: 'flex-start'
    }}>
      {/* Avatar */}
      <div style={{
        width: '32px',
        height: '32px',
        borderRadius: '50%',
        background: isBot 
          ? 'linear-gradient(135deg, #3b82f6, #1d4ed8)' 
          : 'linear-gradient(135deg, #10b981, #059669)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0
      }}>
        {isBot ? <Bot size={16} color="white" /> : <User size={16} color="white" />}
      </div>
      
      {/* Message content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          background: isBot 
            ? 'rgba(59, 130, 246, 0.1)' 
            : 'rgba(255, 255, 255, 0.05)',
          border: `1px solid ${isBot ? 'rgba(59, 130, 246, 0.3)' : 'rgba(255, 255, 255, 0.1)'}`,
          borderRadius: '12px',
          padding: '0.75rem 1rem',
          color: 'white',
          fontSize: '0.875rem',
          lineHeight: '1.5',
          whiteSpace: 'pre-line'
        }}>
          {message.text}
        </div>
        
        {/* Action buttons */}
        {message.actions && message.actions.length > 0 && (
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.5rem',
            marginTop: '0.75rem'
          }}>
            {message.actions.map((action, index) => (
              <button
                key={index}
                onClick={() => handleActionClick(action)}
                style={{
                  background: 'rgba(59, 130, 246, 0.2)',
                  border: '1px solid rgba(59, 130, 246, 0.4)',
                  color: '#60a5fa',
                  borderRadius: '8px',
                  padding: '0.5rem 0.75rem',
                  fontSize: '0.75rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'rgba(59, 130, 246, 0.3)';
                  e.target.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'rgba(59, 130, 246, 0.2)';
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                {action.text}
              </button>
            ))}
          </div>
        )}
        
        {/* Timestamp */}
        <div style={{
          fontSize: '0.6rem',
          color: 'rgba(255, 255, 255, 0.5)',
          marginTop: '0.5rem'
        }}>
          {timestamp.toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
}

// Handle action clicks
function handleActionClick(action) {
  if (action.action === 'navigate') {
    // Trigger navigation
    window.dispatchEvent(new CustomEvent('nsl-navigate', { 
      detail: { 
        target: action.target, 
        demo: action.demo 
      } 
    }));
  }
}

// Main NSL Chatbot Component
export default function NSLChatbot({ onNavigate }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const messagesEndRef = useRef(null);
  const { t } = useLanguage();

  // Auto-show welcome after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen) {
        setShowWelcome(true);
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, [isOpen]);

  // Initialize with welcome message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessages = t('chatbot.welcome').map((text, index) => ({
        id: Date.now() + index,
        text,
        isBot: true,
        timestamp: new Date()
      }));
      
      // Add final message with actions
      welcomeMessages.push({
        id: Date.now() + 999,
        text: "Choose what you'd like to explore:",
        isBot: true,
        timestamp: new Date(),
        actions: t('chatbot.quickActions')
      });
      
      setMessages(welcomeMessages);
    }
  }, [isOpen, messages.length, t]);

  // Listen for navigation events
  useEffect(() => {
    const handleNavigation = (event) => {
      const { target, demo } = event.detail;
      onNavigate?.(target, demo);
      
      // Add confirmation message
      const confirmationMsg = {
        id: Date.now(),
        text: `🚀 Taking you to ${demo ? `${demo} demo` : target}! Let me know if you need any help exploring.`,
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, confirmationMsg]);
    };

    window.addEventListener('nsl-navigate', handleNavigation);
    return () => window.removeEventListener('nsl-navigate', handleNavigation);
  }, [onNavigate]);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputValue,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const response = generateResponse(inputValue);
      const botMessage = {
        id: Date.now() + 1,
        ...response,
        isBot: true,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Welcome Notification */}
      {showWelcome && !isOpen && (
        <div
          style={{
            position: 'fixed',
            bottom: '100px',
            right: '20px',
            background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
            color: 'white',
            borderRadius: '16px',
            padding: '1rem 1.5rem',
            boxShadow: '0 8px 32px rgba(59, 130, 246, 0.4)',
            zIndex: 1001,
            maxWidth: '300px',
            animation: 'slideIn 0.3s ease-out',
            cursor: 'pointer'
          }}
          onClick={() => {
            setIsOpen(true);
            setShowWelcome(false);
          }}
        >
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            marginBottom: '0.5rem'
          }}>
            <Sparkles size={20} />
            <strong>NSL Digital Assistant</strong>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowWelcome(false);
              }}
              style={{
                background: 'none',
                border: 'none',
                color: 'white',
                cursor: 'pointer',
                marginLeft: 'auto',
                padding: '0.25rem'
              }}
            >
              <X size={16} />
            </button>
          </div>
          <div style={{ fontSize: '0.875rem', opacity: 0.9 }}>
            Hi! I can help you explore our ₹9 Cr digital transformation journey. Click to chat!
          </div>
        </div>
      )}

      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
          border: 'none',
          color: 'white',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 8px 32px rgba(59, 130, 246, 0.4)',
          zIndex: 1000,
          transition: 'all 0.3s ease',
          transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)'
        }}
        onMouseEnter={(e) => {
          if (!isOpen) e.target.style.transform = 'scale(1.1)';
        }}
        onMouseLeave={(e) => {
          if (!isOpen) e.target.style.transform = 'scale(1)';
        }}
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            bottom: '90px',
            right: '20px',
            width: '400px',
            maxWidth: 'calc(100vw - 40px)',
            height: '500px',
            maxHeight: 'calc(100vh - 120px)',
            background: 'rgba(0, 0, 0, 0.95)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '20px',
            display: 'flex',
            flexDirection: 'column',
            zIndex: 999,
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
            animation: 'slideIn 0.3s ease-out'
          }}
        >
          {/* Header */}
          <div style={{
            padding: '1rem 1.5rem',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem'
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Bot size={20} color="white" />
            </div>
            <div>
              <h3 style={{
                margin: 0,
                color: 'white',
                fontSize: '1rem',
                fontWeight: '600'
              }}>
                {t('chatbot.title')}
              </h3>
              <p style={{
                margin: 0,
                color: 'rgba(255, 255, 255, 0.7)',
                fontSize: '0.75rem'
              }}>
                {t('chatbot.subtitle')}
              </p>
            </div>
          </div>

          {/* Messages */}
          <div
            style={{
              flex: 1,
              padding: '1rem',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            {messages.map((message) => (
              <ChatMessage
                key={message.id}
                message={message}
                isBot={message.isBot}
                timestamp={message.timestamp}
              />
            ))}
            
            {/* Typing indicator */}
            {isTyping && (
              <div style={{
                display: 'flex',
                gap: '0.75rem',
                marginBottom: '1rem',
                alignItems: 'center'
              }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Bot size={16} color="white" />
                </div>
                <div style={{
                  background: 'rgba(59, 130, 246, 0.1)',
                  border: '1px solid rgba(59, 130, 246, 0.3)',
                  borderRadius: '12px',
                  padding: '0.75rem 1rem',
                  color: 'rgba(255, 255, 255, 0.7)',
                  fontSize: '0.875rem'
                }}>
                  <div style={{
                    display: 'flex',
                    gap: '0.25rem',
                    alignItems: 'center'
                  }}>
                    <div className="animate-pulse" style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      background: '#3b82f6'
                    }} />
                    <div className="animate-pulse" style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      background: '#3b82f6',
                      animationDelay: '0.2s'
                    }} />
                    <div className="animate-pulse" style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      background: '#3b82f6',
                      animationDelay: '0.4s'
                    }} />
                    <span style={{ marginLeft: '0.5rem' }}>Thinking...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div style={{
            padding: '1rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <div style={{
              display: 'flex',
              gap: '0.75rem',
              alignItems: 'flex-end'
            }}>
              <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={t('chatbot.placeholder')}
                style={{
                  flex: 1,
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '12px',
                  padding: '0.75rem',
                  color: 'white',
                  fontSize: '0.875rem',
                  resize: 'none',
                  minHeight: '20px',
                  maxHeight: '80px',
                  fontFamily: 'inherit'
                }}
                rows={1}
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim()}
                style={{
                  background: inputValue.trim() 
                    ? 'linear-gradient(135deg, #3b82f6, #1d4ed8)'
                    : 'rgba(255, 255, 255, 0.1)',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '0.75rem',
                  cursor: inputValue.trim() ? 'pointer' : 'not-allowed',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.2s ease'
                }}
              >
                <Send size={16} color="white" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
