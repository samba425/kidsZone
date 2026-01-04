import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { triggerConfetti, playSuccessSound, playClickSound } from '../utils/celebration'
import { addStars } from '../utils/rewards'
import './LetterRecognition.css'

const LetterRecognition = () => {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
  const examples = {
    A: '🍎 Apple', B: '🏀 Ball', C: '🐱 Cat', D: '🐶 Dog', E: '🥚 Egg',
    F: '🐸 Frog', G: '🍇 Grapes', H: '🏠 House', I: '🍦 Ice cream', J: '🕹️ Joystick',
    K: '🔑 Key', L: '🦁 Lion', M: '🌙 Moon', N: '🥜 Nut', O: '🐙 Octopus',
    P: '🍕 Pizza', Q: '👸 Queen', R: '🌈 Rainbow', S: '☀️ Sun', T: '🌳 Tree',
    U: '☂️ Umbrella', V: '🌋 Volcano', W: '🍉 Watermelon', X: '❌ X-ray', Y: '🧶 Yarn', Z: '🦓 Zebra'
  }

  const [currentLetter, setCurrentLetter] = useState('')
  const [options, setOptions] = useState([])
  const [score, setScore] = useState(0)
  const [showFeedback, setShowFeedback] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)

  useEffect(() => {
    generateQuestion()
  }, [])

  const generateQuestion = () => {
    const letter = alphabet[Math.floor(Math.random() * alphabet.length)]
    const wrongLetters = alphabet
      .filter(l => l !== letter)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
    
    const allOptions = [letter, ...wrongLetters]
      .sort(() => Math.random() - 0.5)
    
    setCurrentLetter(letter)
    setOptions(allOptions)
    setShowFeedback(false)
  }

  const handleAnswer = (letter) => {
    playClickSound()
    if (letter === currentLetter) {
      setIsCorrect(true)
      setShowFeedback(true)
      setScore(score + 1)
      playSuccessSound()
      addStars(1)
      
      if ((score + 1) % 5 === 0) {
        triggerConfetti()
      }
      
      setTimeout(() => {
        generateQuestion()
      }, 2000)
    } else {
      setIsCorrect(false)
      setShowFeedback(true)
      setTimeout(() => setShowFeedback(false), 1000)
    }
  }

  return (
    <div className="letter-recognition">
      <motion.div 
        className="game-header"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <h2>🔤 Letter Recognition</h2>
        <div className="game-stats">
          <span>Score: {score}</span>
        </div>
      </motion.div>

      <div className="letter-area">
        <h3 className="question">Find the letter:</h3>
        
        <motion.div 
          className="letter-display"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", bounce: 0.6 }}
        >
          <div className="big-letter">{currentLetter}</div>
          <div className="letter-example">{examples[currentLetter]}</div>
        </motion.div>

        <div className="letter-options">
          {options.map((letter, index) => (
            <motion.button
              key={index}
              className="letter-btn"
              onClick={() => handleAnswer(letter)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              {letter}
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
              <p>Perfect! Letter {currentLetter}!</p>
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

export default LetterRecognition
