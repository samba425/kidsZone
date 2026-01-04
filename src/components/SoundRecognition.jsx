import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { playSuccessSound, playClickSound } from '../utils/celebration'
import { addStars } from '../utils/rewards'
import './SoundRecognition.css'

const SoundRecognition = () => {
  const sounds = [
    { id: 1, name: 'Dog', emoji: '🐕', sound: 'Woof Woof!' },
    { id: 2, name: 'Cat', emoji: '🐱', sound: 'Meow!' },
    { id: 3, name: 'Cow', emoji: '🐄', sound: 'Moo!' },
    { id: 4, name: 'Duck', emoji: '🦆', sound: 'Quack Quack!' },
    { id: 5, name: 'Lion', emoji: '🦁', sound: 'Roar!' },
    { id: 6, name: 'Bird', emoji: '🐦', sound: 'Tweet Tweet!' },
  ]

  const [currentSound, setCurrentSound] = useState(0)
  const [options, setOptions] = useState([])
  const [selected, setSelected] = useState(null)
  const [score, setScore] = useState(0)

  React.useEffect(() => {
    generateOptions()
  }, [currentSound])

  const generateOptions = () => {
    const correct = sounds[currentSound]
    const wrong = sounds
      .filter((_, i) => i !== currentSound)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
    
    setOptions([correct, ...wrong].sort(() => Math.random() - 0.5))
    setSelected(null)
  }

  const playSound = () => {
    playClickSound()
    const utterance = new SpeechSynthesisUtterance(sounds[currentSound].sound)
    utterance.pitch = 1.5
    utterance.rate = 0.8
    window.speechSynthesis.speak(utterance)
  }

  const handleSelect = (sound) => {
    setSelected(sound)
    
    if (sound.id === sounds[currentSound].id) {
      playSuccessSound()
      setScore(score + 10)
      addStars(1)
      
      setTimeout(() => {
        setCurrentSound((currentSound + 1) % sounds.length)
      }, 1500)
    } else {
      playClickSound()
      setTimeout(() => setSelected(null), 1000)
    }
  }

  return (
    <div className="sound-recognition">
      <div className="game-header">
        <h2>🔊 Sound Recognition</h2>
        <p>Listen and guess the animal!</p>
        <div className="score">Score: {score}</div>
      </div>

      <motion.button
        className="play-sound-btn"
        onClick={playSound}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <span className="sound-icon">🔊</span>
        <span>Play Sound</span>
      </motion.button>

      <div className="animals-grid">
        {options.map((sound) => (
          <motion.button
            key={sound.id}
            className={`animal-card ${selected?.id === sound.id ? (selected.id === sounds[currentSound].id ? 'correct' : 'wrong') : ''}`}
            onClick={() => !selected && handleSelect(sound)}
            disabled={selected !== null}
            whileHover={!selected ? { scale: 1.05 } : {}}
          >
            <div className="animal-emoji">{sound.emoji}</div>
            <div className="animal-name">{sound.name}</div>
          </motion.button>
        ))}
      </div>
    </div>
  )
}

export default SoundRecognition
