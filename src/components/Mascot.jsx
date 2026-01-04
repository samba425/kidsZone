import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './Mascot.css'

const Mascot = ({ mood = 'happy', message = '', position = 'bottom-right' }) => {
  const [currentMood, setCurrentMood] = useState(mood)
  const [showMessage, setShowMessage] = useState(false)
  const [mascotMessage, setMascotMessage] = useState('')

  useEffect(() => {
    setCurrentMood(mood)
  }, [mood])

  useEffect(() => {
    if (message) {
      setMascotMessage(message)
      setShowMessage(true)
      const timer = setTimeout(() => setShowMessage(false), 4000)
      return () => clearTimeout(timer)
    }
  }, [message])

  const mascotFaces = {
    happy: '😊',
    excited: '🤩',
    celebrating: '🎉',
    encouraging: '💪',
    thinking: '🤔',
    love: '😍',
    cool: '😎',
    surprised: '😮'
  }

  const randomEncouragements = [
    "You're doing great!",
    "Keep it up!",
    "Awesome job!",
    "You're so smart!",
    "Amazing work!",
    "Fantastic!",
    "You're a star!",
    "Brilliant!"
  ]

  const handleMascotClick = () => {
    const encouragement = randomEncouragements[Math.floor(Math.random() * randomEncouragements.length)]
    setMascotMessage(encouragement)
    setShowMessage(true)
    setCurrentMood('excited')
    
    setTimeout(() => {
      setCurrentMood('happy')
    }, 2000)
    
    setTimeout(() => {
      setShowMessage(false)
    }, 3000)
  }

  return (
    <div className={`mascot-container ${position}`}>
      <AnimatePresence>
        {showMessage && mascotMessage && (
          <motion.div
            className="mascot-speech-bubble"
            initial={{ scale: 0, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0, y: 20 }}
            transition={{ type: "spring", bounce: 0.5 }}
          >
            {mascotMessage}
            <div className="speech-arrow" />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="mascot"
        onClick={handleMascotClick}
        animate={{
          y: [0, -10, 0],
          rotate: [0, 5, -5, 0]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <div className="mascot-face">
          {mascotFaces[currentMood]}
        </div>
        <motion.div
          className="mascot-shadow"
          animate={{
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>
    </div>
  )
}

export default Mascot
