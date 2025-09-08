import React, { useState } from 'react';
import { Globe, ChevronDown, Check } from 'lucide-react';
import { languages } from '../lib/translations.js';

export default function LanguageSelector({ currentLanguage, onLanguageChange }) {
  const [isOpen, setIsOpen] = useState(false);

  const currentLang = languages.find(lang => lang.code === currentLanguage) || languages[0];

  const handleLanguageSelect = (languageCode) => {
    onLanguageChange(languageCode);
    setIsOpen(false);
  };

  return (
    <div style={{ position: 'relative' }}>
      {/* Language selector button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="nav-button"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.75rem 1rem',
          minWidth: '120px',
          justifyContent: 'space-between'
        }}
      >
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <Globe size={16} />
          <span className="hidden-mobile">{currentLang.nativeName}</span>
          <span className="mobile-only">{currentLang.code.toUpperCase()}</span>
        </div>
        <ChevronDown 
          size={14} 
          style={{
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s ease'
          }}
        />
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              zIndex: 998
            }}
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div
            style={{
              position: 'absolute',
              top: 'calc(100% + 0.5rem)',
              right: 0,
              background: 'rgba(0, 0, 0, 0.95)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '12px',
              padding: '0.5rem',
              minWidth: '180px',
              zIndex: 999,
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
              animation: 'slideIn 0.2s ease-out'
            }}
          >
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => handleLanguageSelect(language.code)}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.75rem 1rem',
                  background: currentLanguage === language.code 
                    ? 'rgba(59, 130, 246, 0.2)' 
                    : 'transparent',
                  border: 'none',
                  borderRadius: '8px',
                  color: 'white',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  transition: 'all 0.2s ease',
                  textAlign: 'left'
                }}
                onMouseEnter={(e) => {
                  if (currentLanguage !== language.code) {
                    e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (currentLanguage !== language.code) {
                    e.target.style.background = 'transparent';
                  }
                }}
              >
                <div>
                  <div style={{ fontWeight: '500' }}>
                    {language.nativeName}
                  </div>
                  <div style={{ 
                    fontSize: '0.75rem', 
                    color: 'rgba(255, 255, 255, 0.7)',
                    marginTop: '0.125rem'
                  }}>
                    {language.name}
                  </div>
                </div>
                {currentLanguage === language.code && (
                  <Check size={16} color="#3b82f6" />
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
