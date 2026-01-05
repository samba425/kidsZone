import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import confetti from 'canvas-confetti'
import { getTotalStars } from '../utils/rewards'
import './Badges.css'

const Badges = () => {
  const navigate = useNavigate()
  const [totalStars, setTotalStars] = useState(0)
  const [unlockedBadges, setUnlockedBadges] = useState([])
  const [showNewBadge, setShowNewBadge] = useState(null)

  const allBadges = [
    { id: 'first_star', name: 'First Star', icon: '⭐', requirement: 1, description: 'Earned your first star!' },
    { id: 'beginner', name: 'Beginner Learner', icon: '🌱', requirement: 10, description: 'Earned 10 stars' },
    { id: 'explorer', name: 'Explorer', icon: '🔍', requirement: 25, description: 'Earned 25 stars' },
    { id: 'dedicated', name: 'Dedicated Student', icon: '📚', requirement: 50, description: 'Earned 50 stars' },
    { id: 'champion', name: 'Learning Champion', icon: '🏆', requirement: 100, description: 'Earned 100 stars!' },
    { id: 'master', name: 'Master Learner', icon: '👑', requirement: 200, description: 'Earned 200 stars!' },
    { id: 'genius', name: 'Super Genius', icon: '🧠', requirement: 500, description: 'Earned 500 stars!' },
    { id: 'legend', name: 'Learning Legend', icon: '💫', requirement: 1000, description: 'Earned 1000 stars!' },
    
    // Activity-based badges
    { id: 'letter_lover', name: 'Letter Lover', icon: '🔤', requirement: 'special', description: 'Completed all letters' },
    { id: 'number_ninja', name: 'Number Ninja', icon: '🔢', requirement: 'special', description: 'Counted to 20!' },
    { id: 'shape_master', name: 'Shape Master', icon: '🔷', requirement: 'special', description: 'Learned all shapes' },
    { id: 'color_expert', name: 'Color Expert', icon: '🎨', requirement: 'special', description: 'Learned all colors' },
    { id: 'storyteller', name: 'Storyteller', icon: '📖', requirement: 'special', description: 'Created 5 stories' },
    { id: 'artist', name: 'Little Artist', icon: '🖍️', requirement: 'special', description: 'Completed 10 drawings' },
    { id: 'memory_master', name: 'Memory Master', icon: '🧠', requirement: 'special', description: 'Won memory game 10 times' },
    { id: 'speed_demon', name: 'Speed Demon', icon: '⚡', requirement: 'special', description: 'Completed speed challenge' },
    
    // Streak badges
    { id: 'consistent', name: 'Consistent Learner', icon: '📅', requirement: 'special', description: '3 day streak' },
    { id: 'dedicated_week', name: 'Dedicated Week', icon: '🔥', requirement: 'special', description: '7 day streak' },
    { id: 'unstoppable', name: 'Unstoppable', icon: '💪', requirement: 'special', description: '30 day streak' },
    
    // Perfect score badges
    { id: 'perfectionist', name: 'Perfectionist', icon: '💯', requirement: 'special', description: 'Got 100% in any game' },
    { id: 'quiz_champion', name: 'Quiz Champion', icon: '❓', requirement: 'special', description: 'Aced all quizzes' }
  ]

  useEffect(() => {
    const stars = getTotalStars()
    setTotalStars(stars)
    checkUnlockedBadges(stars)
  }, [])

  const checkUnlockedBadges = (stars) => {
    const unlocked = allBadges.filter(badge => {
      if (badge.requirement === 'special') return false // Handle separately
      return stars >= badge.requirement
    })
    
    const previousUnlocked = JSON.parse(localStorage.getItem('unlockedBadges') || '[]')
    setUnlockedBadges(unlocked)
    
    // Check for new badges
    const newBadge = unlocked.find(badge => 
      !previousUnlocked.some(prev => prev.id === badge.id)
    )
    
    if (newBadge) {
      setShowNewBadge(newBadge)
      celebrateNewBadge()
      localStorage.setItem('unlockedBadges', JSON.stringify(unlocked))
    }
  }

  const celebrateNewBadge = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    })
  }

  const closeModal = () => {
    setShowNewBadge(null)
  }

  const getBadgeStyle = (badge) => {
    const isUnlocked = unlockedBadges.some(b => b.id === badge.id)
    return isUnlocked ? 'badge unlocked' : 'badge locked'
  }

  const getProgressToNext = () => {
    const starBadges = allBadges.filter(b => typeof b.requirement === 'number')
    const nextBadge = starBadges.find(b => b.requirement > totalStars)
    if (!nextBadge) return null
    
    const progress = (totalStars / nextBadge.requirement) * 100
    return { badge: nextBadge, progress: Math.min(progress, 100) }
  }

  const nextBadgeInfo = getProgressToNext()

  return (
    <div className="badges-container">
      <div className="badges-header">
        <motion.button
          className="home-button"
          onClick={() => navigate('/')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          🏠 Home
        </motion.button>
        <h1>🏅 Your Badges</h1>
        <p className="total-stars">Total Stars: ⭐ {totalStars}</p>
        <p className="badges-count">
          Unlocked: {unlockedBadges.length} / {allBadges.filter(b => typeof b.requirement === 'number').length}
        </p>
      </div>

      {nextBadgeInfo && (
        <div className="next-badge-progress">
          <h3>Next Badge: {nextBadgeInfo.badge.icon} {nextBadgeInfo.badge.name}</h3>
          <div className="progress-bar">
            <motion.div 
              className="progress-fill"
              initial={{ width: 0 }}
              animate={{ width: `${nextBadgeInfo.progress}%` }}
              transition={{ duration: 1 }}
            />
          </div>
          <p>{totalStars} / {nextBadgeInfo.badge.requirement} stars</p>
        </div>
      )}

      <div className="badges-grid">
        {allBadges.map((badge, index) => (
          <motion.div
            key={badge.id}
            className={getBadgeStyle(badge)}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.1, rotate: 5 }}
          >
            <div className="badge-icon">{badge.icon}</div>
            <h4 className="badge-name">{badge.name}</h4>
            <p className="badge-description">{badge.description}</p>
            {typeof badge.requirement === 'number' && (
              <p className="badge-requirement">
                {badge.requirement} ⭐
              </p>
            )}
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {showNewBadge && (
          <motion.div
            className="badge-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              className="badge-modal"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              transition={{ type: 'spring', duration: 0.8 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h2>🎉 New Badge Unlocked! 🎉</h2>
              <div className="new-badge-icon">{showNewBadge.icon}</div>
              <h3>{showNewBadge.name}</h3>
              <p>{showNewBadge.description}</p>
              <button onClick={closeModal} className="close-modal-btn">
                Awesome! 🌟
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Badges
