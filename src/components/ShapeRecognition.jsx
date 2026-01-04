import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { triggerConfetti, playSuccessSound, playClickSound } from '../utils/celebration'
import { addStars } from '../utils/rewards'
import './ShapeRecognition.css'

const ShapeRecognition = () => {
  const shapes = [
    { name: 'Circle', emoji: '🔵', color: '#4285f4' },
    { name: 'Square', emoji: '🟦', color: '#ea4335' },
    { name: 'Triangle', emoji: '🔺', color: '#fbbc04' },
    { name: 'Star', emoji: '⭐', color: '#34a853' },
    { name: 'Heart', emoji: '❤️', color: '#e91e63' },
    { name: 'Diamond', emoji: '💎', color: '#9c27b0' },
    { name: 'Hexagon', emoji: '⬡', color: '#ff9800' },
    { name: 'Pentagon', emoji: '⬟', color: '#00bcd4' }
  ]

  const [currentShape, setCurrentShape] = useState(null)
  const [options, setOptions] = useState([])
  const [score, setScore] = useState(0)
  const [level, setLevel] = useState(1)
  const [showFeedback, setShowFeedback] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)

  useEffect(() => {
    generateQuestion()
  }, [level])

  const generateQuestion = () => {
    const numOptions = Math.min(3 + level, 6)
    const correctShape = shapes[Math.floor(Math.random() * shapes.length)]
    const wrongShapes = shapes
      .filter(s => s.name !== correctShape.name)
      .sort(() => Math.random() - 0.5)
      .slice(0, numOptions - 1)
    
    const allOptions = [correctShape, ...wrongShapes]
      .sort(() => Math.random() - 0.5)
    
    setCurrentShape(correctShape)
    setOptions(allOptions)
    setShowFeedback(false)
  }

  const handleAnswer = (shape) => {
    playClickSound()
    if (shape.name === currentShape.name) {
      setIsCorrect(true)
      setShowFeedback(true)
      setScore(score + 1)
      playSuccessSound()
      addStars(1)
      
      if ((score + 1) % 5 === 0) {
        triggerConfetti()
        if (level < 8) setLevel(level + 1)
      }
      
      setTimeout(() => {
        generateQuestion()
      }, 1500)
    } else {
      setIsCorrect(false)
      setShowFeedback(true)
      setTimeout(() => setShowFeedback(false), 1000)
    }
  }

  if (!currentShape) return null

  return (
    <div className="shape-recognition">
      <motion.div 
        className="game-header"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <h2>🔷 Shape Recognition</h2>
        <div className="game-stats">
          <span>Level: {level}</span>
          <span>Score: {score}</span>
        </div>
      </motion.div>

      <div className="shape-area">
        <h3 className="question">Find the {currentShape.name}!</h3>
        
        <motion.div 
          className="target-shape"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", bounce: 0.6 }}
        >
          <div className="shape-display" style={{ color: currentShape.color }}>
            {currentShape.emoji}
          </div>
          <p className="shape-name">{currentShape.name}</p>
        </motion.div>

        <div className="shape-options">
          {options.map((shape, index) => (
            <motion.button
              key={index}
              className="shape-btn"
              onClick={() => handleAnswer(shape)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <span className="shape-emoji" style={{ color: shape.color }}>
                {shape.emoji}
              </span>
              <span className="shape-label">{shape.name}</span>
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
              <p>Perfect! That's a {currentShape.name}!</p>
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

export default ShapeRecognition
