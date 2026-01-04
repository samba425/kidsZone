import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { getTotalStars, getAchievements, getDailyStreak, updateDailyStreak, ACHIEVEMENTS } from '../utils/rewards'
import './ProgressDashboard.css'

const ProgressDashboard = () => {
  const [totalStars, setTotalStars] = useState(0)
  const [achievements, setAchievements] = useState([])
  const [dailyStreak, setDailyStreak] = useState(0)

  useEffect(() => {
    setTotalStars(getTotalStars())
    setAchievements(getAchievements())
    setDailyStreak(updateDailyStreak())
  }, [])

  const getLevel = (stars) => {
    if (stars < 10) return { level: 1, title: 'Beginner', emoji: '🌱' }
    if (stars < 50) return { level: 2, title: 'Explorer', emoji: '🌟' }
    if (stars < 100) return { level: 3, title: 'Champion', emoji: '🏆' }
    if (stars < 200) return { level: 4, title: 'Master', emoji: '👑' }
    return { level: 5, title: 'Legend', emoji: '🌠' }
  }

  const currentLevel = getLevel(totalStars)
  const nextLevel = getLevel(totalStars + 1)
  const starsToNext = nextLevel.level > currentLevel.level 
    ? [10, 50, 100, 200][currentLevel.level - 1] - totalStars
    : 0

  return (
    <div className="progress-dashboard">
      <h2>🏆 Your Progress</h2>

      <motion.div 
        className="stats-grid"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <motion.div 
          className="stat-card stars-card"
          whileHover={{ scale: 1.05 }}
        >
          <div className="stat-icon">⭐</div>
          <div className="stat-value">{totalStars}</div>
          <div className="stat-label">Total Stars</div>
        </motion.div>

        <motion.div 
          className="stat-card level-card"
          whileHover={{ scale: 1.05 }}
        >
          <div className="stat-icon">{currentLevel.emoji}</div>
          <div className="stat-value">Level {currentLevel.level}</div>
          <div className="stat-label">{currentLevel.title}</div>
          {starsToNext > 0 && (
            <div className="next-level">
              {starsToNext} stars to {nextLevel.title}
            </div>
          )}
        </motion.div>

        <motion.div 
          className="stat-card streak-card"
          whileHover={{ scale: 1.05 }}
        >
          <div className="stat-icon">🔥</div>
          <div className="stat-value">{dailyStreak}</div>
          <div className="stat-label">Day Streak</div>
        </motion.div>

        <motion.div 
          className="stat-card achievements-card"
          whileHover={{ scale: 1.05 }}
        >
          <div className="stat-icon">🎖️</div>
          <div className="stat-value">{achievements.length}</div>
          <div className="stat-label">Achievements</div>
        </motion.div>
      </motion.div>

      <div className="achievements-section">
        <h3>🎖️ Achievements</h3>
        <div className="achievements-grid">
          {Object.entries(ACHIEVEMENTS).map(([key, achievement]) => {
            const unlocked = achievements.includes(key)
            return (
              <motion.div
                key={key}
                className={`achievement-badge ${unlocked ? 'unlocked' : 'locked'}`}
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="achievement-emoji">
                  {unlocked ? achievement.emoji : '🔒'}
                </div>
                <div className="achievement-title">{achievement.title}</div>
                <div className="achievement-description">
                  {achievement.description}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      <div className="motivational-message">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {totalStars < 10 && "🌟 Great start! Keep learning!"}
          {totalStars >= 10 && totalStars < 50 && "✨ You're doing amazing!"}
          {totalStars >= 50 && totalStars < 100 && "🎉 Fantastic progress!"}
          {totalStars >= 100 && "🏆 You're a superstar learner!"}
        </motion.p>
      </div>
    </div>
  )
}

export default ProgressDashboard
