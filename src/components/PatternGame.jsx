import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { triggerConfetti, playSuccessSound, playClickSound } from '../utils/celebration'
import { addStars } from '../utils/rewards'
import './PatternGame.css'

const PatternGame = () => {
  const emojis = ['🍎', '🍌', '🍒', '🍇', '🍊', '⭐', '🌙', '☀️', '🌈', '🎈']
  
  const [pattern, setPattern] = useState([])
  const [options, setOptions] = useState([])
  const [correctAnswer, setCorrectAnswer] = useState('')
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [isCorrect, setIsCorrect] = useState(null)
  const [score, setScore] = useState(0)
  const [level, setLevel] = useState(1)

  useEffect(() => {
    generatePattern()
  }, [level])

  const generatePattern = () => {
    const patternLength = 3 + Math.floor(level / 2)
    const repeatCount = 2 + Math.floor(level / 3)
    
    // Generate base pattern
    const basePattern = []
    for (let i = 0; i < patternLength; i++) {
      basePattern.push(emojis[Math.floor(Math.random() * emojis.length)])
    }
    
    // Repeat pattern
    const fullPattern = []
    for (let i = 0; i < repeatCount; i++) {
      fullPattern.push(...basePattern)
    }
    
    // Remove last element to create the question
    const answer = fullPattern[fullPattern.length - 1]
    fullPattern.pop()
    
    setPattern(fullPattern)
    setCorrectAnswer(answer)
    
    // Generate options (correct answer + 3 wrong answers)
    const wrongOptions = emojis
      .filter(e => e !== answer)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
    
    const allOptions = [answer, ...wrongOptions]
      .sort(() => Math.random() - 0.5)
    
    setOptions(allOptions)
    setSelectedAnswer(null)
    setIsCorrect(null)
  }

  const handleAnswerSelect = (answer) => {
    playClickSound()
    setSelectedAnswer(answer)
    
    const correct = answer === correctAnswer
    setIsCorrect(correct)
    
    if (correct) {
      playSuccessSound()
      triggerConfetti()
      setScore(score + 10 * level)
      addStars(2)
      
      setTimeout(() => {
        setLevel(level + 1)
      }, 1500)
    } else {
      setTimeout(() => {
        generatePattern()
      }, 1500)
    }
  }

  return (
    <div className="pattern-game">
      <div className="game-header">
        <h2>🧩 Pattern Detective</h2>
        <p>Find the missing piece in the pattern!</p>
      </div>

      <div className="game-info">
        <div className="score-display">Score: {score}</div>
        <div className="level-display">Level: {level}</div>
      </div>

      <motion.div
        className="pattern-container"
        key={pattern.join('')}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="pattern-sequence">
          {pattern.map((emoji, index) => (
            <motion.div
              key={index}
              className="pattern-item"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              {emoji}
            </motion.div>
          ))}
          <div className="pattern-item missing">
            <span className="question-mark">?</span>
          </div>
        </div>
      </motion.div>

      <div className="options-container">
        <p className="options-label">What comes next?</p>
        <div className="options-grid">
          {options.map((option, index) => (
            <motion.button
              key={index}
              className={`option-btn ${
                selectedAnswer === option
                  ? isCorrect
                    ? 'correct'
                    : 'wrong'
                  : ''
              }`}
              onClick={() => !selectedAnswer && handleAnswerSelect(option)}
              disabled={selectedAnswer !== null}
              whileHover={!selectedAnswer ? { scale: 1.1 } : {}}
              whileTap={!selectedAnswer ? { scale: 0.95 } : {}}
            >
              {option}
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedAnswer && (
          <motion.div
            className={`feedback ${isCorrect ? 'correct' : 'wrong'}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            {isCorrect ? (
              <>
                <span className="feedback-emoji">🎉</span>
                <span>Perfect! +{10 * level} points</span>
              </>
            ) : (
              <>
                <span className="feedback-emoji">💭</span>
                <span>The answer was {correctAnswer}</span>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default PatternGame
