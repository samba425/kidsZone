import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import MemoryGame from '../components/MemoryGame'
import ColoringPage from '../components/ColoringPage'
import QuizGame from '../components/QuizGame'
import DragDropActivity from '../components/DragDropActivity'
import ChallengeMode from '../components/ChallengeMode'
import SpeakingPractice from '../components/SpeakingPractice'
import SpellingGame from '../components/SpellingGame'
import MathGame from '../components/MathGame'
import PatternGame from '../components/PatternGame'
import RhymeMatching from '../components/RhymeMatching'
import SoundRecognition from '../components/SoundRecognition'
import StoryBuilder from '../components/StoryBuilder'
import './GamesPage.css'

const GamesPage = () => {
  const navigate = useNavigate()
  const [selectedGame, setSelectedGame] = useState(null)

  const games = [
    // Existing Games
    {
      id: 'spelling',
      name: 'Spelling Challenge',
      icon: '🔤',
      description: 'Arrange letters to spell words',
      component: SpellingGame,
      category: 'Learning'
    },
    {
      id: 'math',
      name: 'Math Practice',
      icon: '🔢',
      description: 'Solve math problems',
      component: MathGame,
      category: 'Learning'
    },
    {
      id: 'pattern',
      name: 'Pattern Detective',
      icon: '🧩',
      description: 'Complete the pattern',
      component: PatternGame,
      category: 'Learning'
    },
    {
      id: 'rhyme',
      name: 'Rhyme Matching',
      icon: '🎵',
      description: 'Match rhyming words',
      component: RhymeMatching,
      category: 'Learning'
    },
    {
      id: 'sounds',
      name: 'Sound Recognition',
      icon: '🔊',
      description: 'Identify animal sounds',
      component: SoundRecognition,
      category: 'Learning'
    },
    {
      id: 'story',
      name: 'Story Builder',
      icon: '📚',
      description: 'Create your own stories',
      component: StoryBuilder,
      category: 'Creative'
    },
    {
      id: 'memory',
      name: 'Memory Match',
      icon: '🧠',
      description: 'Match pairs of cards',
      component: MemoryGame,
      category: 'Games'
    },
    {
      id: 'coloring',
      name: 'Coloring Fun',
      icon: '🎨',
      description: 'Draw and color',
      component: ColoringPage,
      category: 'Creative'
    },
    {
      id: 'quiz',
      name: 'Quiz Time',
      icon: '❓',
      description: 'Answer fun questions',
      component: QuizGame,
      category: 'Learning'
    },
    {
      id: 'dragdrop',
      name: 'Sorting Game',
      icon: '🎯',
      description: 'Arrange items in order',
      component: DragDropActivity,
      category: 'Games'
    },
    {
      id: 'challenge',
      name: 'Speed Challenge',
      icon: '⚡',
      description: '30-second quiz',
      component: ChallengeMode,
      category: 'Games'
    },
    {
      id: 'speaking',
      name: 'Speaking Practice',
      icon: '🎤',
      description: 'Record your voice',
      component: SpeakingPractice,
      category: 'Learning'
    }
  ]

  const handleGameSelect = (game) => {
    setSelectedGame(game)
  }

  const handleBack = () => {
    setSelectedGame(null)
  }

  if (selectedGame) {
    const GameComponent = selectedGame.component
    return (
      <div className="games-page">
        <motion.button
          className="back-btn"
          onClick={handleBack}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          ← Back to Games
        </motion.button>
        <GameComponent />
      </div>
    )
  }

  return (
    <div className="games-page">
      <motion.button
        className="home-btn"
        onClick={() => navigate('/')}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        ← Home
      </motion.button>

      <motion.div
        className="games-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1>🎮 Games & Activities 🎮</h1>
        <p>Choose a fun game to play!</p>
      </motion.div>

      <div className="games-grid">
        {games.map((game, index) => (
          <motion.div
            key={game.id}
            className="game-card"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleGameSelect(game)}
          >
            <div className="game-icon">{game.icon}</div>
            <h3 className="game-name">{game.name}</h3>
            <p className="game-description">{game.description}</p>
            <button className="play-btn">Play Now!</button>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default GamesPage
