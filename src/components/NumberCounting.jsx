import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { triggerConfetti, playSuccessSound, playClickSound } from '../utils/celebration'
import { addStars } from '../utils/rewards'
import './NumberCounting.css'

const NumberCounting = () => {
  const [level, setLevel] = useState(1)
  const [targetNumber, setTargetNumber] = useState(3)
  const [selectedCount, setSelectedCount] = useState(0)
  const [score, setScore] = useState(0)
  const [showFeedback, setShowFeedback] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)

  const emojis = ['🍎', '🍌', '🍊', '🍇', '🍓', '🍒', '🍉', '🥝']

  useEffect(() => {
    generateNewQuestion()
  }, [level])

  const generateNewQuestion = () => {
    const max = Math.min(5 + level * 2, 20)
    const min = Math.max(1, level)
    setTargetNumber(Math.floor(Math.random() * (max - min + 1)) + min)
    setSelectedCount(0)
    setShowFeedback(false)
  }

  const handleAnswer = (answer) => {
    playClickSound()
    if (answer === targetNumber) {
      setIsCorrect(true)
      setShowFeedback(true)
      setScore(score + 1)
      playSuccessSound()
      addStars(1)
      
      if (score > 0 && score % 5 === 0) {
        triggerConfetti()
        if (level < 10) setLevel(level + 1)
      }
      
      setTimeout(() => {
        generateNewQuestion()
      }, 1500)
    } else {
      setIsCorrect(false)
      setShowFeedback(true)
      setTimeout(() => setShowFeedback(false), 1000)
    }
  }

  const renderObjects = () => {
    const emoji = emojis[Math.floor(Math.random() * emojis.length)]
    return Array.from({ length: targetNumber }, (_, i) => (
      <motion.div
        key={i}
        className="counting-object"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: i * 0.1 }}
      >
        {emoji}
      </motion.div>
    ))
  }

  const numberOptions = [
    targetNumber - 2,
    targetNumber - 1,
    targetNumber,
    targetNumber + 1,
    targetNumber + 2
  ].filter(n => n > 0 && n <= 20)

  // Shuffle options
  const shuffledOptions = [...numberOptions].sort(() => Math.random() - 0.5)

  return (
    <div className="number-counting">
      <motion.div 
        className="game-header"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <h2>🔢 Count the Objects!</h2>
        <div className="game-stats">
          <span>Level: {level}</span>
          <span>Score: {score}</span>
        </div>
      </motion.div>

      <div className="counting-area">
        <h3 className="question">How many do you see?</h3>
        
        <div className="objects-container">
          {renderObjects()}
        </div>

        <div className="number-options">
          {shuffledOptions.map((num) => (
            <motion.button
              key={num}
              className="number-btn"
              onClick={() => handleAnswer(num)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {num}
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
              <p>Correct! Great counting!</p>
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

export default NumberCounting
