import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { triggerConfetti, triggerStarBurst, playSuccessSound, playClickSound } from '../utils/celebration'
import { addStars } from '../utils/rewards'
import './QuizGame.css'

const QuizGame = ({ items, category }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [questions, setQuestions] = useState([])
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [isCorrect, setIsCorrect] = useState(null)

  useEffect(() => {
    generateQuestions()
  }, [items])

  const generateQuestions = () => {
    const quizQuestions = items.slice(0, 5).map(item => {
      // Generate wrong answers
      const wrongAnswers = items
        .filter(i => i.id !== item.id)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3)
      
      const allAnswers = [item, ...wrongAnswers]
        .sort(() => Math.random() - 0.5)
      
      return {
        question: `What is ${item.emoji || item.icon}?`,
        correctAnswer: item.name || item.title,
        emoji: item.emoji || item.icon || item.symbol,
        answers: allAnswers.map(a => a.name || a.title)
      }
    })
    
    setQuestions(quizQuestions)
  }

  const handleAnswer = (answer) => {
    playClickSound()
    setSelectedAnswer(answer)
    
    const correct = answer === questions[currentQuestion].correctAnswer
    setIsCorrect(correct)
    
    if (correct) {
      playSuccessSound()
      triggerStarBurst()
      setScore(score + 1)
    }
    
    setTimeout(() => {
      if (currentQuestion + 1 < questions.length) {
        setCurrentQuestion(currentQuestion + 1)
        setSelectedAnswer(null)
        setIsCorrect(null)
      } else {
        setShowResult(true)
        if (score + (correct ? 1 : 0) >= questions.length * 0.6) {
          triggerConfetti()
          addStars(5)
        } else {
          addStars(2)
        }
      }
    }, 1500)
  }

  const restartQuiz = () => {
    setCurrentQuestion(0)
    setScore(0)
    setShowResult(false)
    setSelectedAnswer(null)
    setIsCorrect(null)
    generateQuestions()
  }

  if (questions.length === 0) {
    return <div className="quiz-loading">Loading quiz...</div>
  }

  if (showResult) {
    const percentage = (score / questions.length) * 100
    const passed = percentage >= 60
    
    return (
      <motion.div
        className="quiz-result"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
      >
        <div className="result-emoji">{passed ? '🎉' : '😊'}</div>
        <h2>{passed ? 'Excellent Work!' : 'Good Try!'}</h2>
        <div className="result-score">
          <span className="score-big">{score}</span>
          <span className="score-total">/ {questions.length}</span>
        </div>
        <div className="result-percentage">{percentage.toFixed(0)}% Correct!</div>
        <div className="result-stars">⭐ +{passed ? 5 : 2} Stars Earned!</div>
        <motion.button
          className="retry-btn"
          onClick={restartQuiz}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          🔄 Try Again
        </motion.button>
      </motion.div>
    )
  }

  const question = questions[currentQuestion]

  return (
    <div className="quiz-game">
      <div className="quiz-header">
        <h2>🧠 Quiz Time!</h2>
        <div className="quiz-progress">
          <span>Question {currentQuestion + 1} / {questions.length}</span>
          <span>Score: {score}</span>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion}
          className="quiz-question"
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -300, opacity: 0 }}
        >
          <div className="question-emoji">{question.emoji}</div>
          <h3>{question.question}</h3>
          
          <div className="quiz-answers">
            {question.answers.map((answer, index) => (
              <motion.button
                key={index}
                className={`answer-btn ${
                  selectedAnswer === answer
                    ? isCorrect
                      ? 'correct'
                      : 'wrong'
                    : ''
                } ${
                  selectedAnswer && answer === question.correctAnswer
                    ? 'show-correct'
                    : ''
                }`}
                onClick={() => !selectedAnswer && handleAnswer(answer)}
                disabled={selectedAnswer !== null}
                whileHover={!selectedAnswer ? { scale: 1.05 } : {}}
                whileTap={!selectedAnswer ? { scale: 0.95 } : {}}
              >
                {answer}
                {selectedAnswer === answer && (
                  <span className="answer-icon">
                    {isCorrect ? '✓' : '✗'}
                  </span>
                )}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default QuizGame
