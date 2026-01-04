import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { triggerConfetti, playSuccessSound, playClickSound } from '../utils/celebration'
import { addStars } from '../utils/rewards'
import './SpellingGame.css'

const SortableItem = ({ id, letter }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="letter-tile"
    >
      {letter}
    </div>
  )
}

const SpellingGame = () => {
  const words = [
    { word: 'CAT', emoji: '🐱', hint: 'Meow!' },
    { word: 'DOG', emoji: '🐕', hint: 'Woof!' },
    { word: 'SUN', emoji: '☀️', hint: 'Bright in the sky' },
    { word: 'TREE', emoji: '🌳', hint: 'Has leaves' },
    { word: 'FISH', emoji: '🐟', hint: 'Swims in water' },
    { word: 'BIRD', emoji: '🐦', hint: 'Can fly' },
    { word: 'STAR', emoji: '⭐', hint: 'Twinkles at night' }
  ]

  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [letters, setLetters] = useState([])
  const [isComplete, setIsComplete] = useState(false)
  const [showHint, setShowHint] = useState(false)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  )

  React.useEffect(() => {
    scrambleWord()
  }, [currentWordIndex])

  const scrambleWord = () => {
    const currentWord = words[currentWordIndex].word
    const letterArray = currentWord.split('').map((letter, index) => ({
      id: `${index}-${letter}`,
      letter,
      correctIndex: index
    }))
    setLetters(letterArray.sort(() => Math.random() - 0.5))
    setIsComplete(false)
    setShowHint(false)
  }

  const handleDragEnd = (event) => {
    const { active, over } = event

    if (active.id !== over.id) {
      playClickSound()
      setLetters((items) => {
        const oldIndex = items.findIndex(item => item.id === active.id)
        const newIndex = items.findIndex(item => item.id === over.id)
        return arrayMove(items, oldIndex, newIndex)
      })
    }
  }

  const checkSpelling = () => {
    const userWord = letters.map(l => l.letter).join('')
    const correctWord = words[currentWordIndex].word
    
    if (userWord === correctWord) {
      playSuccessSound()
      triggerConfetti()
      addStars(3)
      setIsComplete(true)
    } else {
      playClickSound()
    }
  }

  const nextWord = () => {
    if (currentWordIndex < words.length - 1) {
      setCurrentWordIndex(currentWordIndex + 1)
    } else {
      setCurrentWordIndex(0)
    }
  }

  const currentWord = words[currentWordIndex]

  return (
    <div className="spelling-game">
      <div className="game-header">
        <h2>🔤 Spelling Challenge</h2>
        <p>Arrange the letters to spell the word!</p>
      </div>

      <motion.div
        className="word-display"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
      >
        <div className="word-emoji">{currentWord.emoji}</div>
        {showHint && <div className="word-hint">💡 {currentWord.hint}</div>}
      </motion.div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={letters.map(item => item.id)} strategy={verticalListSortingStrategy}>
          <div className="letters-container">
            {letters.map((item) => (
              <SortableItem key={item.id} id={item.id} letter={item.letter} />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      <div className="game-controls">
        {!isComplete ? (
          <>
            <button className="hint-btn" onClick={() => setShowHint(true)}>
              💡 Show Hint
            </button>
            <button className="check-btn" onClick={checkSpelling}>
              ✓ Check Spelling
            </button>
            <button className="shuffle-btn" onClick={scrambleWord}>
              🔄 Shuffle
            </button>
          </>
        ) : (
          <motion.div
            className="success-message"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
          >
            <h3>Perfect! 🎉</h3>
            <p>You spelled {currentWord.word} correctly!</p>
            <button className="next-btn" onClick={nextWord}>
              Next Word →
            </button>
          </motion.div>
        )}
      </div>

      <div className="progress-info">
        Word {currentWordIndex + 1} of {words.length}
      </div>
    </div>
  )
}

export default SpellingGame
