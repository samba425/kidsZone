import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './ThemeSwitcher.css'
import { getTotalStars } from '../utils/rewards'

const THEMES = [
  {
    id: 'default',
    name: '🌈 Rainbow',
    unlockStars: 0,
    colors: {
      primary: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      secondary: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      background: '#f5f7fa'
    }
  },
  {
    id: 'ocean',
    name: '🌊 Ocean',
    unlockStars: 10,
    colors: {
      primary: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      secondary: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      background: '#e0f7fa'
    }
  },
  {
    id: 'sunset',
    name: '🌅 Sunset',
    unlockStars: 25,
    colors: {
      primary: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      secondary: 'linear-gradient(135deg, #ff9a56 0%, #ff6a88 100%)',
      background: '#fff3e0'
    }
  },
  {
    id: 'forest',
    name: '🌲 Forest',
    unlockStars: 50,
    colors: {
      primary: 'linear-gradient(135deg, #56ab2f 0%, #a8e063 100%)',
      secondary: 'linear-gradient(135deg, #38ef7d 0%, #11998e 100%)',
      background: '#e8f5e9'
    }
  },
  {
    id: 'space',
    name: '🚀 Space',
    unlockStars: 100,
    colors: {
      primary: 'linear-gradient(135deg, #4a00e0 0%, #8e2de2 100%)',
      secondary: 'linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)',
      background: '#e8eaf6'
    }
  },
  {
    id: 'candy',
    name: '🍭 Candy',
    unlockStars: 150,
    colors: {
      primary: 'linear-gradient(135deg, #f857a6 0%, #ff5858 100%)',
      secondary: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
      background: '#fce4ec'
    }
  }
]

const ThemeSwitcher = () => {
  const [currentTheme, setCurrentTheme] = useState('default')
  const [showThemes, setShowThemes] = useState(false)
  const [totalStars, setTotalStars] = useState(0)

  useEffect(() => {
    const savedTheme = localStorage.getItem('appTheme') || 'default'
    setCurrentTheme(savedTheme)
    applyTheme(THEMES.find(t => t.id === savedTheme) || THEMES[0])
    setTotalStars(getTotalStars())
  }, [])

  const applyTheme = (theme) => {
    document.documentElement.style.setProperty('--theme-primary', theme.colors.primary)
    document.documentElement.style.setProperty('--theme-secondary', theme.colors.secondary)
    document.documentElement.style.setProperty('--theme-background', theme.colors.background)
  }

  const handleThemeChange = (theme) => {
    if (totalStars >= theme.unlockStars) {
      setCurrentTheme(theme.id)
      localStorage.setItem('appTheme', theme.id)
      applyTheme(theme)
      setShowThemes(false)
    }
  }

  const currentThemeData = THEMES.find(t => t.id === currentTheme) || THEMES[0]

  return (
    <div className="theme-switcher">
      <motion.button
        className="theme-toggle-btn"
        onClick={() => setShowThemes(!showThemes)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        🎨 Themes
      </motion.button>

      <AnimatePresence>
        {showThemes && (
          <motion.div
            className="theme-panel"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="theme-panel-header">
              <h3>Choose Your Theme</h3>
              <button
                className="close-btn"
                onClick={() => setShowThemes(false)}
              >
                ✕
              </button>
            </div>
            
            <div className="themes-grid">
              {THEMES.map(theme => {
                const isUnlocked = totalStars >= theme.unlockStars
                const isActive = currentTheme === theme.id
                
                return (
                  <motion.div
                    key={theme.id}
                    className={`theme-card ${isActive ? 'active' : ''} ${!isUnlocked ? 'locked' : ''}`}
                    onClick={() => handleThemeChange(theme)}
                    whileHover={isUnlocked ? { scale: 1.05 } : {}}
                    whileTap={isUnlocked ? { scale: 0.95 } : {}}
                  >
                    <div
                      className="theme-preview"
                      style={{ background: theme.colors.primary }}
                    />
                    <div className="theme-info">
                      <div className="theme-name">{theme.name}</div>
                      {!isUnlocked && (
                        <div className="unlock-requirement">
                          🔒 {theme.unlockStars} ⭐
                        </div>
                      )}
                      {isActive && (
                        <div className="active-badge">✓ Active</div>
                      )}
                    </div>
                  </motion.div>
                )
              })}
            </div>

            <div className="theme-stats">
              <span>Your Stars: {totalStars} ⭐</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ThemeSwitcher
