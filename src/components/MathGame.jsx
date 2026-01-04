import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { triggerStarBurst, playSuccessSound, playClickSound } from '../utils/celebration'
import { addStars } from '../utils/rewards'
import './MathGame.css'

const MathGame = () => {
  const [level, setLevel] = useState('easy')
  const [question, setQuestion] = useState(null)
  const [userAnswer, setUserAnswer] = useState('')
  const [score, setScore] = useState(0)
  const [streak, setStreak] = useState(0)
  const [feedback, setFeedback] = useState(null)
  const [questionsAnswered, setQuestionsAnswered] = useState(0)

  useEffect(() => {
    generateQuestion()
  }, [level])

  const generateQuestion = () => {
    let num1, num2, operation, answer

    if (level === 'easy') {
      num1 = Math.floor(Math.random() * 10) + 1
      num2 = Math.floor(Math.random() * 10) + 1
      operation = Math.random() > 0.5 ? '+' : '-'
      
      if (operation === '-' && num2 > num1) {
        [num1, num2] = [num2, num1]
      }
      
      answer = operation === '+' ? num1 + num2 : num1 - num2
    } else if (level === 'medium') {
      num1 = Math.floor(Math.random() * 20) + 1
      num2 = Math.floor(Math.random() * 20) + 1
      const ops = ['+', '-', '×']
      operation = ops[Math.floor(Math.random() * ops.length)]
      
      if (operation === '-' && num2 > num1) {
        [num1, num2] = [num2, num1]
      }
      
      answer = operation === '+' ? num1 + num2 : operation === '-' ? num1 - num2 : num1 * num2
    } else {
      num1 = Math.floor(Math.random() * 50) + 1
      num2 = Math.floor(Math.random() * 12) + 1
      const ops = ['+', '-', '×', '÷']
      operation = ops[Math.floor(Math.random() * ops.length)]
      
      if (operation === '÷') {
        answer = num2
        num1 = answer * (Math.floor(Math.random() * 12) + 1)
      } else if (operation === '-' && num2 > num1) {
        [num1, num2] = [num2, num1]
        answer = num1 - num2
      } else {
        answer = operation === '+' ? num1 + num2 : operation === '-' ? num1 - num2 : num1 * num2
      }
    }

    setQuestion({ num1, num2, operation, answer })
    setUserAnswer('')
    setFeedback(null)
  }

  const checkAnswer = () => {
    const isCorrect = parseInt(userAnswer) === question.answer

    if (isCorrect) {
      playSuccessSound()
      triggerStarBurst()
      setScore(score + 10)
      setStreak(streak + 1)
      setFeedback({ type: 'correct', message: 'Correct! 🎉' })
      addStars(1)
      
      if (streak > 0 && (streak + 1) % 5 === 0) {
        addStars(2)
        setFeedback({ type: 'bonus', message: `${streak + 1} in a row! Bonus stars! ⭐⭐` })
      }

      setTimeout(() => {
        setQuestionsAnswered(questionsAnswered + 1)
        generateQuestion()
      }, 1500)
    } else {
      playClickSound()
      setStreak(0)
      setFeedback({ type: 'wrong', message: `Try again! The answer is ${question.answer}` })
      
      setTimeout(() => {
        generateQuestion()
      }, 2000)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && userAnswer !== '') {
      checkAnswer()
    }
  }

  if (!question) return null

  return (
    <div className="math-game">
      <div className="game-header">
        <h2>🔢 Math Challenge</h2>
        <div className="level-selector">
          <button
            className={level === 'easy' ? 'active' : ''}
            onClick={() => setLevel('easy')}
          >
            Easy
          </button>
          <button
            className={level === 'medium' ? 'active' : ''}
            onClick={() => setLevel('medium')}
          >
            Medium
          </button>
          <button
            className={level === 'hard' ? 'active' : ''}
            onClick={() => setLevel('hard')}
          >
            Hard
          </button>
        </div>
      </div>

      <div className="game-stats">
        <div className="stat">Score: {score}</div>
        <div className="stat">Streak: {streak} 🔥</div>
        <div className="stat">Questions: {questionsAnswered}</div>
      </div>

      <motion.div
        className="question-card"
        key={question.num1 + question.num2}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', bounce: 0.5 }}
      >
        <div className="question">
          <span className="number">{question.num1}</span>
          <span className="operator">{question.operation}</span>
          <span className="number">{question.num2}</span>
          <span className="equals">=</span>
          <span className="question-mark">?</span>
        </div>

        <input
          type="number"
          className="answer-input"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Your answer"
          autoFocus
        />

        <button
          className="submit-btn"
          onClick={checkAnswer}
          disabled={userAnswer === ''}
        >
          Check Answer
        </button>
      </motion.div>

      <AnimatePresence>
        {feedback && (
          <motion.div
            className={`feedback ${feedback.type}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {feedback.message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default MathGame
