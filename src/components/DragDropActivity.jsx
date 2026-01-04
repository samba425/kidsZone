import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { triggerConfetti, playSuccessSound, playClickSound } from '../utils/celebration'
import { addStars } from '../utils/rewards'
import './DragDropActivity.css'

const SortableItem = ({ id, content }) => {
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
      className="draggable-item"
    >
      {content}
    </div>
  )
}

const DragDropActivity = ({ items, activityType = 'sort' }) => {
  // Default items if none provided
  const defaultItems = [
    { id: '1', content: '🍎 Apple', correctOrder: 1 },
    { id: '2', content: '🍌 Banana', correctOrder: 2 },
    { id: '3', content: '🍒 Cherry', correctOrder: 3 },
    { id: '4', content: '🍇 Grapes', correctOrder: 4 },
    { id: '5', content: '🍊 Orange', correctOrder: 5 }
  ]

  const activityItems = items || defaultItems
  const [currentItems, setCurrentItems] = useState([...activityItems].sort(() => Math.random() - 0.5))
  const [isComplete, setIsComplete] = useState(false)
  const [attempts, setAttempts] = useState(0)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  )

  const handleDragEnd = (event) => {
    const { active, over } = event

    if (active.id !== over.id) {
      playClickSound()
      setCurrentItems((items) => {
        const oldIndex = items.findIndex(item => item.id === active.id)
        const newIndex = items.findIndex(item => item.id === over.id)
        return arrayMove(items, oldIndex, newIndex)
      })
    }
  }

  const checkAnswer = () => {
    setAttempts(attempts + 1)
    
    // Check if items are in correct order
    const isCorrect = currentItems.every((item, index) => item.correctOrder === index + 1)
    
    if (isCorrect) {
      playSuccessSound()
      triggerConfetti()
      addStars(3)
      setIsComplete(true)
    } else {
      playClickSound()
    }
  }

  const resetActivity = () => {
    setCurrentItems([...activityItems].sort(() => Math.random() - 0.5))
    setIsComplete(false)
    setAttempts(0)
  }

  return (
    <div className="drag-drop-activity">
      <div className="activity-header">
        <h2>🎯 Drag & Drop Challenge</h2>
        <p>Arrange in the correct order!</p>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={currentItems.map(item => item.id)} strategy={verticalListSortingStrategy}>
          <div className="sortable-container">
            {currentItems.map((item) => (
              <SortableItem key={item.id} id={item.id} content={item.content} />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      <div className="activity-controls">
        {!isComplete ? (
          <>
            <motion.button
              className="check-btn"
              onClick={checkAnswer}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              ✓ Check Answer
            </motion.button>
            <motion.button
              className="reset-btn"
              onClick={resetActivity}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              🔄 Shuffle Again
            </motion.button>
          </>
        ) : (
          <motion.div
            className="completion-message"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
          >
            <h3>🎉 Perfect!</h3>
            <p>Completed in {attempts} attempt{attempts !== 1 ? 's' : ''}!</p>
            <p className="stars-reward">⭐ +3 Stars Earned!</p>
            <button onClick={resetActivity} className="play-again-btn">
              🔄 Try Again
            </button>
          </motion.div>
        )}
      </div>

      {attempts > 2 && !isComplete && (
        <motion.div
          className="hint-message"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          💡 Try looking at the numbers or letters to find the pattern!
        </motion.div>
      )}
    </div>
  )
}

export default DragDropActivity
