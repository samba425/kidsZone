import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { triggerConfetti, playSuccessSound, playClickSound } from '../utils/celebration'
import { addStars } from '../utils/rewards'
import './MemoryGame.css'

const MemoryGame = ({ items, onComplete }) => {
  // Default memory game items
  const defaultItems = [
    { id: 1, emoji: '🍎', name: 'Apple' },
    { id: 2, emoji: '🍌', name: 'Banana' },
    { id: 3, emoji: '🍒', name: 'Cherry' },
    { id: 4, emoji: '🍇', name: 'Grapes' },
    { id: 5, emoji: '🍊', name: 'Orange' },
    { id: 6, emoji: '🍓', name: 'Strawberry' }
  ]

  const gameItems = items || defaultItems
  const [cards, setCards] = useState([])
  const [flipped, setFlipped] = useState([])
  const [matched, setMatched] = useState([])
  const [moves, setMoves] = useState(0)
  const [isChecking, setIsChecking] = useState(false)
  const [initialized, setInitialized] = useState(false)

  useEffect(() => {
    // Only initialize once
    if (!initialized) {
      // Create pairs of cards
      const selectedItems = gameItems.slice(0, 6) // Use 6 items = 12 cards
      const cardPairs = [...selectedItems, ...selectedItems].map((item, index) => ({
        id: index,
        content: item.emoji || item.symbol || item.icon,
        pairId: item.id || item.name
      }))
      
      // Shuffle cards
      const shuffled = cardPairs.sort(() => Math.random() - 0.5)
      setCards(shuffled)
      setInitialized(true)
    }
  }, [initialized, gameItems])

  const handleCardClick = (index) => {
    if (isChecking || flipped.includes(index) || matched.includes(index)) {
      return
    }

    playClickSound()
    const newFlipped = [...flipped, index]
    setFlipped(newFlipped)

    if (newFlipped.length === 2) {
      setIsChecking(true)
      setMoves(moves + 1)

      const [first, second] = newFlipped
      if (cards[first].pairId === cards[second].pairId) {
        // Match found!
        playSuccessSound()
        setTimeout(() => {
          setMatched([...matched, first, second])
          setFlipped([])
          setIsChecking(false)
          
          // Check if game is complete
          if (matched.length + 2 === cards.length) {
            setTimeout(() => {
              triggerConfetti()
              addStars(3)
              if (onComplete) onComplete()
            }, 500)
          }
        }, 600)
      } else {
        // No match
        setTimeout(() => {
          setFlipped([])
          setIsChecking(false)
        }, 1000)
      }
    }
  }

  const resetGame = () => {
    setFlipped([])
    setMatched([])
    setMoves(0)
    setIsChecking(false)
    const shuffled = [...cards].sort(() => Math.random() - 0.5)
    setCards(shuffled)
  }

  return (
    <div className="memory-game">
      <div className="game-header">
        <h2>🎮 Memory Match Game</h2>
        <div className="game-stats">
          <span>Moves: {moves}</span>
          <span>Matched: {matched.length / 2} / {cards.length / 2}</span>
        </div>
      </div>

      <div className="cards-grid">
        {cards.map((card, index) => (
          <motion.div
            key={index}
            className={`memory-card ${flipped.includes(index) || matched.includes(index) ? 'flipped' : ''} ${matched.includes(index) ? 'matched' : ''}`}
            onClick={() => handleCardClick(index)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="card-inner">
              <div className="card-front">
                <span className="card-question">?</span>
              </div>
              <div className="card-back">
                <span className="card-emoji">{card.content}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {matched.length === cards.length && (
        <motion.div
          className="game-complete"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
        >
          <h3>🎉 Amazing! You Won!</h3>
          <p>Completed in {moves} moves!</p>
          <p>⭐ +3 Stars Earned!</p>
          <button onClick={resetGame} className="play-again-btn">
            🔄 Play Again
          </button>
        </motion.div>
      )}
    </div>
  )
}

export default MemoryGame
