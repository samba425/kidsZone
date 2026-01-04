import React from 'react'
import { motion } from 'framer-motion'
import { useNavigate, useParams } from 'react-router-dom'
import learningData from '../data/learningData.json'
import './LevelPage.css'

const LevelPage = () => {
  const navigate = useNavigate()
  const { levelId } = useParams()
  const levelData = learningData[levelId]

  if (!levelData) {
    return <div className="loading">Loading... 🎈</div>
  }

  const categories = Object.keys(levelData.categories).map(key => ({
    id: key,
    ...levelData.categories[key]
  }))

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  }

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0,
      rotate: -180
    },
    show: { 
      opacity: 1, 
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        bounce: 0.6,
        duration: 0.8
      }
    }
  }

  return (
    <div className="level-page" style={{ background: `linear-gradient(135deg, ${levelData.color} 0%, #764ba2 100%)` }}>
      <motion.button 
        className="back-button"
        onClick={() => navigate('/')}
        whileHover={{ scale: 1.1, rotate: -10 }}
        whileTap={{ scale: 0.9 }}
      >
        ←
      </motion.button>

      <div className="container">
        <motion.div 
          className="page-header"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", duration: 1 }}
        >
          <motion.div 
            className="level-icon-large"
            animate={{ 
              rotate: [0, 10, -10, 10, 0],
              scale: [1, 1.2, 1, 1.2, 1]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatDelay: 0.5
            }}
          >
            {levelData.icon}
          </motion.div>
          <h1 className="page-title">{levelData.name}</h1>
          <p className="page-subtitle">Age: {levelData.ageGroup}</p>
        </motion.div>

        <motion.div 
          className="categories-grid"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              variants={cardVariants}
              whileHover={{ 
                scale: 1.08,
                rotate: [0, -3, 3, -3, 0],
                boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)"
              }}
              whileTap={{ scale: 0.95 }}
              className="category-card"
              onClick={() => navigate(`/level/${levelId}/category/${category.id}`)}
            >
              <motion.div 
                className="category-icon"
                animate={{ 
                  y: [0, -10, 0]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                {category.icon}
              </motion.div>
              <h3 className="category-title">{category.title}</h3>
              <div className="items-count">
                {category.items.length} items to learn
              </div>
              <motion.div 
                className="category-arrow"
                animate={{ x: [0, 10, 0] }}
                transition={{ 
                  duration: 1,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                →
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

export default LevelPage


