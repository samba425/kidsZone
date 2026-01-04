import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import './ParentDashboard.css'
import { getTotalStars, getAchievements } from '../utils/rewards'

const ParentDashboard = () => {
  const navigate = useNavigate()
  const [stats, setStats] = useState({
    totalStars: 0,
    categoriesCompleted: 0,
    weeklyTime: 0,
    streak: 0,
    achievements: [],
    strengths: [],
    improvements: []
  })

  useEffect(() => {
    loadStats()
  }, [])

  const loadStats = () => {
    const totalStars = getTotalStars()
    const achievements = getAchievements()
    const completed = JSON.parse(localStorage.getItem('completedCategories') || '[]')
    const streak = parseInt(localStorage.getItem('dailyStreak') || '0')
    const sessions = JSON.parse(localStorage.getItem('learningSessions') || '[]')
    
    // Calculate weekly time (last 7 days)
    const weekAgo = Date.now() - (7 * 24 * 60 * 60 * 1000)
    const weeklyTime = sessions
      .filter(s => s.timestamp > weekAgo)
      .reduce((sum, s) => sum + (s.duration || 0), 0)

    // Analyze performance
    const categoryPerformance = JSON.parse(localStorage.getItem('categoryPerformance') || '{}')
    const strengths = Object.entries(categoryPerformance)
      .filter(([_, score]) => score >= 80)
      .map(([cat]) => cat)
      .slice(0, 3)

    const improvements = Object.entries(categoryPerformance)
      .filter(([_, score]) => score < 60)
      .map(([cat]) => cat)
      .slice(0, 3)

    setStats({
      totalStars,
      categoriesCompleted: completed.length,
      weeklyTime: Math.round(weeklyTime / 60), // Convert to minutes
      streak,
      achievements,
      strengths,
      improvements
    })
  }

  const formatTime = (minutes) => {
    if (minutes < 60) return `${minutes}m`
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours}h ${mins}m`
  }

  return (
    <div className="parent-dashboard">
      <motion.button
        className="back-to-home-btn"
        onClick={() => navigate('/')}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        ← Back to Home
      </motion.button>

      <motion.div
        className="dashboard-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2>📊 Parent Dashboard</h2>
        <p>Track your child's learning journey</p>
      </motion.div>

      <div className="dashboard-grid">
        <motion.div
          className="stat-card stars-card"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <div className="stat-icon">⭐</div>
          <div className="stat-value">{stats.totalStars}</div>
          <div className="stat-label">Total Stars</div>
        </motion.div>

        <motion.div
          className="stat-card time-card"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="stat-icon">⏱️</div>
          <div className="stat-value">{formatTime(stats.weeklyTime)}</div>
          <div className="stat-label">This Week</div>
        </motion.div>

        <motion.div
          className="stat-card streak-card"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="stat-icon">🔥</div>
          <div className="stat-value">{stats.streak}</div>
          <div className="stat-label">Day Streak</div>
        </motion.div>

        <motion.div
          className="stat-card completed-card"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="stat-icon">✅</div>
          <div className="stat-value">{stats.categoriesCompleted}</div>
          <div className="stat-label">Completed</div>
        </motion.div>
      </div>

      <motion.div
        className="achievements-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h3>🏆 Recent Achievements</h3>
        <div className="achievements-list">
          {stats.achievements.slice(-5).reverse().map((achievement, index) => (
            <div key={index} className="achievement-item">
              <span className="achievement-icon">{achievement.icon}</span>
              <span className="achievement-name">{achievement.name}</span>
              <span className="achievement-date">
                {new Date(achievement.unlockedAt).toLocaleDateString()}
              </span>
            </div>
          ))}
          {stats.achievements.length === 0 && (
            <p className="no-data">Keep learning to unlock achievements!</p>
          )}
        </div>
      </motion.div>

      <div className="insights-row">
        <motion.div
          className="insights-card strengths"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h3>💪 Strengths</h3>
          <ul>
            {stats.strengths.map((strength, index) => (
              <li key={index}>{strength}</li>
            ))}
            {stats.strengths.length === 0 && (
              <p className="no-data">Continue learning to see strengths</p>
            )}
          </ul>
        </motion.div>

        <motion.div
          className="insights-card improvements"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7 }}
        >
          <h3>📈 Areas to Practice</h3>
          <ul>
            {stats.improvements.map((area, index) => (
              <li key={index}>{area}</li>
            ))}
            {stats.improvements.length === 0 && (
              <p className="no-data">Great job! No weak areas detected</p>
            )}
          </ul>
        </motion.div>
      </div>

      <motion.div
        className="recommendations"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <h3>💡 Recommendations</h3>
        <ul>
          {stats.weeklyTime < 30 && (
            <li>Consider 5-10 minutes of daily practice for better retention</li>
          )}
          {stats.streak === 0 && (
            <li>Build a learning habit with daily practice</li>
          )}
          {stats.strengths.length > 0 && (
            <li>Great progress in {stats.strengths[0]}! Keep it up!</li>
          )}
          {stats.improvements.length > 0 && (
            <li>Focus on {stats.improvements[0]} for balanced learning</li>
          )}
          {stats.totalStars >= 50 && (
            <li>Excellent work! Consider exploring advanced topics</li>
          )}
        </ul>
      </motion.div>
    </div>
  )
}

export default ParentDashboard
