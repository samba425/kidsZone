import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { getTotalStars, getDailyStreak } from '../utils/rewards'
import './DailyLesson.css'

const DailyLesson = () => {
  const navigate = useNavigate()
  const [todayDate, setTodayDate] = useState('')
  const [totalStars, setTotalStars] = useState(0)
  const [streak, setStreak] = useState(0)
  
  useEffect(() => {
    const today = new Date()
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
    setTodayDate(today.toLocaleDateString('en-US', options))
    setTotalStars(getTotalStars())
    setStreak(getDailyStreak())
  }, [])

  // Get day of week to vary lessons
  const dayOfWeek = new Date().getDay()
  
  const dailyLessons = [
    {
      day: 'Sunday',
      theme: '🌈 Fun Sunday',
      activities: [
        { title: 'Learn Colors', icon: '🎨', path: '/games', game: 'colors', description: 'Identify different colors' },
        { title: 'Story Time', icon: '📚', path: '/games', game: 'story', description: 'Create your own story' },
        { title: 'Coloring Fun', icon: '🖍️', path: '/games', game: 'coloring', description: 'Draw and color freely' }
      ]
    },
    {
      day: 'Monday',
      theme: '🔤 Letter Day',
      activities: [
        { title: 'Letter Recognition', icon: '🔤', path: '/games', game: 'letters', description: 'Learn the alphabet' },
        { title: 'Letter Tracing', icon: '✏️', path: '/games', game: 'tracing', description: 'Trace letters A-Z' },
        { title: 'Spelling Game', icon: '📝', path: '/games', game: 'spelling', description: 'Spell simple words' }
      ]
    },
    {
      day: 'Tuesday',
      theme: '🔢 Number Day',
      activities: [
        { title: 'Number Counting', icon: '🔢', path: '/games', game: 'numbers', description: 'Count objects 1-20' },
        { title: 'Math Practice', icon: '➕', path: '/games', game: 'math', description: 'Simple addition' },
        { title: 'Pattern Detective', icon: '🧩', path: '/games', game: 'pattern', description: 'Find patterns' }
      ]
    },
    {
      day: 'Wednesday',
      theme: '🔷 Shape Day',
      activities: [
        { title: 'Shape Recognition', icon: '🔷', path: '/games', game: 'shapes', description: 'Learn shapes' },
        { title: 'Sorting Game', icon: '🎯', path: '/games', game: 'dragdrop', description: 'Sort by shapes' },
        { title: 'Memory Match', icon: '🧠', path: '/games', game: 'memory', description: 'Match shape pairs' }
      ]
    },
    {
      day: 'Thursday',
      theme: '🎵 Sound & Music Day',
      activities: [
        { title: 'Sound Recognition', icon: '🔊', path: '/games', game: 'sounds', description: 'Animal sounds' },
        { title: 'Rhyme Matching', icon: '🎵', path: '/games', game: 'rhyme', description: 'Match rhyming words' },
        { title: 'Speaking Practice', icon: '🎤', path: '/games', game: 'speaking', description: 'Practice speaking' }
      ]
    },
    {
      day: 'Friday',
      theme: '🎉 Fun Friday',
      activities: [
        { title: 'Quiz Time', icon: '❓', path: '/games', game: 'quiz', description: 'Fun quiz questions' },
        { title: 'Speed Challenge', icon: '⚡', path: '/games', game: 'challenge', description: 'Timed challenge' },
        { title: 'All Games', icon: '🎮', path: '/games', game: null, description: 'Play any game!' }
      ]
    },
    {
      day: 'Saturday',
      theme: '🌟 Creative Saturday',
      activities: [
        { title: 'Story Builder', icon: '📚', path: '/games', game: 'story', description: 'Create stories' },
        { title: 'Coloring Fun', icon: '🎨', path: '/games', game: 'coloring', description: 'Draw and color' },
        { title: 'Memory Match', icon: '🧠', path: '/games', game: 'memory', description: 'Brain games' }
      ]
    }
  ]

  const todayLesson = dailyLessons[dayOfWeek]

  const handleActivityClick = (activity) => {
    navigate(activity.path)
  }

  return (
    <div className="daily-lesson">
      <motion.div 
        className="lesson-header"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <h1 className="lesson-title">📚 Today's Learning Plan</h1>
        <p className="lesson-date">{todayDate}</p>
        <div className="user-stats">
          <span className="stat-item">⭐ {totalStars} Stars</span>
          <span className="stat-item">🔥 {streak} Day Streak</span>
        </div>
      </motion.div>

      <motion.div 
        className="theme-banner"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h2>{todayLesson.theme}</h2>
        <p>Let's learn together!</p>
      </motion.div>

      <div className="activities-grid">
        {todayLesson.activities.map((activity, index) => (
          <motion.div
            key={index}
            className="activity-card"
            onClick={() => handleActivityClick(activity)}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 * index }}
            whileHover={{ scale: 1.05, y: -10 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="activity-icon">{activity.icon}</div>
            <h3 className="activity-title">{activity.title}</h3>
            <p className="activity-description">{activity.description}</p>
            <button className="start-btn">Start Learning →</button>
          </motion.div>
        ))}
      </div>

      <div className="extra-section">
        <motion.button
          className="view-all-btn"
          onClick={() => navigate('/games')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          🎮 View All Games & Activities
        </motion.button>
      </div>
    </div>
  )
}

export default DailyLesson
