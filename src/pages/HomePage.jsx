import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import learningData from '../data/learningData.json'
import { getTotalStars, updateDailyStreak, getDailyStreak } from '../utils/rewards'
import './HomePage.css'

const HomePage = () => {
  const navigate = useNavigate()
  const [totalStars, setTotalStars] = useState(0)
  const [dailyStreak, setDailyStreak] = useState(0)

  useEffect(() => {
    setTotalStars(getTotalStars())
    const streak = updateDailyStreak()
    setDailyStreak(streak)
  }, [])

  const levels = [
    { id: 'preschool', ...learningData.preschool },
    { id: 'nursery', ...learningData.nursery },
    { id: 'lkg', ...learningData.lkg }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.8
    },
    show: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        bounce: 0.5,
        duration: 0.8
      }
    }
  }

  return (
    <div className="home-page">
      <div className="container">
        <motion.div 
          className="top-bar"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="stats-display"
            whileHover={{ scale: 1.05 }}
          >
            ⭐ {totalStars} Stars
          </motion.div>
          {dailyStreak > 0 && (
            <motion.div
              className="streak-display"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              whileHover={{ scale: 1.05 }}
            >
              🔥 {dailyStreak} Day{dailyStreak > 1 ? 's' : ''}
            </motion.div>
          )}
        </motion.div>

        <motion.div 
          className="page-header"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
        >
          <h1 className="page-title">🌟 Kids Learning Hub 🌟</h1>
          <p className="page-subtitle">Choose Your Learning Adventure!</p>
        </motion.div>

        <motion.div 
          className="levels-grid"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {levels.map((level, index) => (
            <motion.div
              key={level.id}
              variants={cardVariants}
              whileHover={{ 
                scale: 1.05,
                rotate: [0, -2, 2, -2, 0],
                transition: { duration: 0.5 }
              }}
              whileTap={{ scale: 0.95 }}
              className="level-card"
              style={{ backgroundColor: level.color }}
              onClick={() => navigate(`/level/${level.id}`)}
            >
              <motion.div 
                className="level-icon"
                animate={{ 
                  rotate: [0, 10, -10, 10, 0],
                  scale: [1, 1.1, 1, 1.1, 1]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 1
                }}
              >
                {level.icon}
              </motion.div>
              <h2 className="level-name">{level.name}</h2>
              <p className="level-age">{level.ageGroup}</p>
              <div className="category-count">
                {Object.keys(level.categories).length} Fun Activities
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="fun-decorations"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.div 
            className="floating-emoji"
            animate={{ 
              y: [0, -20, 0],
              rotate: [0, 10, -10, 0]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            🎈
          </motion.div>
          <motion.div 
            className="floating-emoji emoji-2"
            animate={{ 
              y: [0, -30, 0],
              rotate: [0, -10, 10, 0]
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5
            }}
          >
            🌈
          </motion.div>
          <motion.div 
            className="floating-emoji emoji-3"
            animate={{ 
              y: [0, -25, 0],
              rotate: [0, 15, -15, 0]
            }}
            transition={{ 
              duration: 3.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          >
            ⭐
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default HomePage


