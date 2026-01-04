import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { triggerConfetti, playSuccessSound, playClickSound } from '../utils/celebration'
import { addStars } from '../utils/rewards'
import './RhymeMatching.css'

const RhymeMatching = () => {
  const rhymePairs = [
    { word1: 'CAT', word2: 'HAT', emoji1: '🐱', emoji2: '🎩' },
    { word1: 'DOG', word2: 'LOG', emoji1: '🐕', emoji2: '🪵' },
    { word1: 'BEE', word2: 'TREE', emoji1: '🐝', emoji2: '🌳' },
    { word1: 'STAR', word2: 'CAR', emoji1: '⭐', emoji2: '🚗' },
    { word1: 'SUN', word2: 'FUN', emoji1: '☀️', emoji2: '🎉' },
    { word1: 'MOON', word2: 'SPOON', emoji1: '🌙', emoji2: '🥄' },
  ]

  const [currentPair, setCurrentPair] = useState(0)
  const [options, setOptions] = useState([])
  const [selected, setSelected] = useState(null)
  const [isCorrect, setIsCorrect] = useState(null)
  const [score, setScore] = useState(0)

  React.useEffect(() => {
    generateOptions()
  }, [currentPair])

  const generateOptions = () => {
    const correct = rhymePairs[currentPair].word2
    const wrongOptions = rhymePairs
      .filter((_, i) => i !== currentPair)
      .map(p => p.word2)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
    
    setOptions([correct, ...wrongOptions].sort(() => Math.random() - 0.5))
    setSelected(null)
    setIsCorrect(null)
  }

  const handleSelect = (word) => {
    playClickSound()
    setSelected(word)
    
    const correct = word === rhymePairs[currentPair].word2
    setIsCorrect(correct)
    
    if (correct) {
      playSuccessSound()
      triggerConfetti()
      setScore(score + 10)
      addStars(2)
      
      setTimeout(() => {
        if (currentPair < rhymePairs.length - 1) {
          setCurrentPair(currentPair + 1)
        } else {
          setCurrentPair(0)
        }
      }, 1500)
    }
  }

  const pair = rhymePairs[currentPair]

  return (
    <div className="rhyme-matching">
      <div className="game-header">
        <h2>🎵 Rhyme Matching</h2>
        <p>Find the word that rhymes!</p>
        <div className="score">Score: {score}</div>
      </div>

      <motion.div
        className="word-card"
        key={currentPair}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
      >
        <div className="word-emoji">{pair.emoji1}</div>
        <div className="word-text">{pair.word1}</div>
        <div className="rhyme-hint">What rhymes with this?</div>
      </motion.div>

      <div className="options-grid">
        {options.map((word, index) => (
          <motion.button
            key={index}
            className={`option-card ${selected === word ? (isCorrect ? 'correct' : 'wrong') : ''}`}
            onClick={() => !selected && handleSelect(word)}
            disabled={selected !== null}
            whileHover={!selected ? { scale: 1.05 } : {}}
            whileTap={!selected ? { scale: 0.95 } : {}}
          >
            {word}
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {isCorrect && (
          <motion.div
            className="feedback correct"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            Yes! {pair.word1} and {pair.word2} rhyme! 🎉
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default RhymeMatching
