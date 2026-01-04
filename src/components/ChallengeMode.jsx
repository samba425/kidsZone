import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { triggerConfetti, playSuccessSound, playClickSound } from '../utils/celebration'
import { addStars } from '../utils/rewards'
import './ChallengeMode.css'

const ChallengeMode = ({ items, challengeType = 'speed' }) => {
  // Default challenge data
  const defaultItems = [
    { id: 1, name: 'Dog', emoji: '🐕' },
    { id: 2, name: 'Cat', emoji: '🐈' },
    { id: 3, name: 'Lion', emoji: '🦁' },
    { id: 4, name: 'Tiger', emoji: '🐅' },
    { id: 5, name: 'Bear', emoji: '🐻' },
    { id: 6, name: 'Elephant', emoji: '🐘' },
    { id: 7, name: 'Monkey', emoji: '🐵' },
    { id: 8, name: 'Panda', emoji: '🐼' }
  ]

  const challengeItems = items || defaultItems
  const [timeLeft, setTimeLeft] = useState(30)
  const [score, setScore] = useState(0)
  const [isActive, setIsActive] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(null)
  const [options, setOptions] = useState([])
  const [gameOver, setGameOver] = useState(false)

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0 && isActive) {
      endGame()
    }
  }, [timeLeft, isActive])

  const generateQuestion = () => {
    const randomItem = challengeItems[Math.floor(Math.random() * challengeItems.length)]
    const wrongItems = challengeItems
      .filter(item => item.id !== randomItem.id)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
    
    const allOptions = [randomItem, ...wrongItems]
      .sort(() => Math.random() - 0.5)
    
    setCurrentQuestion(randomItem)
    setOptions(allOptions)
  }

  const startChallenge = () => {
    setIsActive(true)
    setScore(0)
    setTimeLeft(30)
    setGameOver(false)
    generateQuestion()
  }

  const handleAnswer = (selectedItem) => {
    playClickSound()
    
    if (selectedItem.id === currentQuestion.id) {
      playSuccessSound()
      setScore(score + 1)
      generateQuestion()
    }
  }

  const endGame = () => {
    setIsActive(false)
    setGameOver(true)
    
    // Award stars based on score
    const stars = Math.max(1, Math.floor(score / 2))
    addStars(stars)
    
    if (score >= 10) {
      triggerConfetti()
    }
  }

  return (
    <div className="challenge-mode">
      {!isActive && !gameOver && (
        <motion.div
          className="challenge-intro"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
        >
          <h2>⚡ Speed Challenge!</h2>
          <p>Answer as many as you can in 30 seconds!</p>
          <motion.button
            className="start-challenge-btn"
            onClick={startChallenge}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            🚀 Start Challenge
          </motion.button>
        </motion.div>
      )}

      {isActive && currentQuestion && (
        <div className="challenge-active">
          <div className="challenge-header">
            <div className="timer">
              <motion.span
                key={timeLeft}
                initial={{ scale: 1.5 }}
                animate={{ scale: 1 }}
                className={timeLeft <= 5 ? 'timer-warning' : ''}
              >
                ⏱️ {timeLeft}s
              </motion.span>
            </div>
            <div className="score-display">
              <span>Score: {score}</span>
            </div>
          </div>

          <motion.div
            className="question-area"
            key={currentQuestion.id}
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
          >
            <div className="question-emoji">
              {currentQuestion.emoji || currentQuestion.icon || currentQuestion.symbol}
            </div>
            <h3>What is this?</h3>
          </motion.div>

          <div className="options-grid">
            {options.map((option, index) => (
              <motion.button
                key={index}
                className="option-btn"
                onClick={() => handleAnswer(option)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {option.name || option.title}
              </motion.button>
            ))}
          </div>
        </div>
      )}

      {gameOver && (
        <motion.div
          className="challenge-results"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
        >
          <div className="result-emoji">
            {score >= 15 ? '🏆' : score >= 10 ? '🌟' : score >= 5 ? '😊' : '💪'}
          </div>
          <h2>Challenge Complete!</h2>
          <div className="final-score">
            <span className="score-big">{score}</span>
            <span className="score-label">Correct Answers!</span>
          </div>
          <div className="stars-earned">
            ⭐ +{Math.max(1, Math.floor(score / 2))} Stars!
          </div>
          <motion.button
            className="retry-challenge-btn"
            onClick={startChallenge}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            🔄 Try Again
          </motion.button>
        </motion.div>
      )}
    </div>
  )
}

export default ChallengeMode
