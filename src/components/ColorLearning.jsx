import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { triggerConfetti, playSuccessSound, playClickSound } from '../utils/celebration'
import { addStars } from '../utils/rewards'
import './ColorLearning.css'

const ColorLearning = () => {
  const colors = [
    { name: 'Red', hex: '#f44336', emoji: '🍎' },
    { name: 'Blue', hex: '#2196f3', emoji: '🫐' },
    { name: 'Yellow', hex: '#ffeb3b', emoji: '🌟' },
    { name: 'Green', hex: '#4caf50', emoji: '🍏' },
    { name: 'Orange', hex: '#ff9800', emoji: '🍊' },
    { name: 'Purple', hex: '#9c27b0', emoji: '🍇' },
    { name: 'Pink', hex: '#e91e63', emoji: '🌸' },
    { name: 'Brown', hex: '#795548', emoji: '🤎' }
  ]

  const [mode, setMode] = useState('identify') // identify, mix
  const [currentColor, setCurrentColor] = useState(null)
  const [options, setOptions] = useState([])
  const [score, setScore] = useState(0)
  const [showFeedback, setShowFeedback] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)

  useEffect(() => {
    if (mode === 'identify') {
      generateIdentifyQuestion()
    }
  }, [mode])

  const generateIdentifyQuestion = () => {
    const correctColor = colors[Math.floor(Math.random() * colors.length)]
    const wrongColors = colors
      .filter(c => c.name !== correctColor.name)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
    
    const allOptions = [correctColor, ...wrongColors]
      .sort(() => Math.random() - 0.5)
    
    setCurrentColor(correctColor)
    setOptions(allOptions)
    setShowFeedback(false)
  }

  const handleAnswer = (color) => {
    playClickSound()
    if (color.name === currentColor.name) {
      setIsCorrect(true)
      setShowFeedback(true)
      setScore(score + 1)
      playSuccessSound()
      addStars(1)
      
      if ((score + 1) % 5 === 0) {
        triggerConfetti()
      }
      
      setTimeout(() => {
        generateIdentifyQuestion()
      }, 1500)
    } else {
      setIsCorrect(false)
      setShowFeedback(true)
      setTimeout(() => setShowFeedback(false), 1000)
    }
  }

  if (!currentColor) return null

  return (
    <div className="color-learning">
      <motion.div 
        className="game-header"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <h2>🌈 Color Learning</h2>
        <div className="game-stats">
          <span>Score: {score}</span>
        </div>
      </motion.div>

      <div className="color-area">
        <h3 className="question">What color is this?</h3>
        
        <motion.div 
          className="color-display"
          style={{ backgroundColor: currentColor.hex }}
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", bounce: 0.6 }}
        >
          <span className="color-emoji">{currentColor.emoji}</span>
        </motion.div>

        <div className="color-options">
          {options.map((color, index) => (
            <motion.button
              key={index}
              className="color-btn"
              onClick={() => handleAnswer(color)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="color-swatch" style={{ backgroundColor: color.hex }}></div>
              <span className="color-label">{color.name}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {showFeedback && (
        <motion.div
          className={`feedback ${isCorrect ? 'correct' : 'incorrect'}`}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
        >
          {isCorrect ? (
            <>
              <span className="feedback-emoji">🎉</span>
              <p>Excellent! That's {currentColor.name}!</p>
              <p className="stars-earned">+1 ⭐</p>
            </>
          ) : (
            <>
              <span className="feedback-emoji">🤔</span>
              <p>Try again!</p>
            </>
          )}
        </motion.div>
      )}
    </div>
  )
}

export default ColorLearning
