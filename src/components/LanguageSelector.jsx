import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './LanguageSelector.css'

const LANGUAGES = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'hi', name: 'हिन्दी (Hindi)', flag: '🇮🇳' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' }
]

const TRANSLATIONS = {
  en: {
    title: 'Kids Learning Hub',
    subtitle: 'Choose Your Learning Adventure!',
    stars: 'Stars',
    day: 'Day',
    days: 'Days',
    parent: 'Parent',
    level: 'Level'
  },
  hi: {
    title: 'बच्चों का सीखने का केंद्र',
    subtitle: 'अपनी सीखने की यात्रा चुनें!',
    stars: 'तारे',
    day: 'दिन',
    days: 'दिन',
    parent: 'अभिभावक',
    level: 'स्तर'
  },
  es: {
    title: 'Centro de Aprendizaje para Niños',
    subtitle: '¡Elige tu aventura de aprendizaje!',
    stars: 'Estrellas',
    day: 'Día',
    days: 'Días',
    parent: 'Padres',
    level: 'Nivel'
  },
  fr: {
    title: 'Centre d\'Apprentissage pour Enfants',
    subtitle: 'Choisissez votre aventure d\'apprentissage!',
    stars: 'Étoiles',
    day: 'Jour',
    days: 'Jours',
    parent: 'Parents',
    level: 'Niveau'
  }
}

const LanguageSelector = () => {
  const [currentLang, setCurrentLang] = useState('en')
  const [showOptions, setShowOptions] = useState(false)

  useEffect(() => {
    const savedLang = localStorage.getItem('appLanguage') || 'en'
    setCurrentLang(savedLang)
  }, [])

  const changeLanguage = (langCode) => {
    setCurrentLang(langCode)
    localStorage.setItem('appLanguage', langCode)
    setShowOptions(false)
    
    // Dispatch custom event for other components to react to language change
    window.dispatchEvent(new CustomEvent('languageChange', { detail: langCode }))
  }

  const currentLanguage = LANGUAGES.find(l => l.code === currentLang) || LANGUAGES[0]

  return (
    <div className="language-selector">
      <motion.button
        className="language-toggle"
        onClick={() => setShowOptions(!showOptions)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {currentLanguage.flag} {currentLanguage.name.split(' ')[0]}
      </motion.button>

      <AnimatePresence>
        {showOptions && (
          <motion.div
            className="language-options"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            {LANGUAGES.map(lang => (
              <motion.button
                key={lang.code}
                className={`language-option ${lang.code === currentLang ? 'active' : ''}`}
                onClick={() => changeLanguage(lang.code)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {lang.flag} {lang.name}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export const useTranslation = () => {
  const [lang, setLang] = useState(localStorage.getItem('appLanguage') || 'en')

  useEffect(() => {
    const handleLanguageChange = (e) => {
      setLang(e.detail)
    }
    window.addEventListener('languageChange', handleLanguageChange)
    return () => window.removeEventListener('languageChange', handleLanguageChange)
  }, [])

  return (key) => TRANSLATIONS[lang]?.[key] || TRANSLATIONS.en[key] || key
}

export default LanguageSelector
