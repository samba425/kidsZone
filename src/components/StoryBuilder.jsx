// Story Builder - Simple template for now
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { addStars } from '../utils/rewards'
import './StoryBuilder.css'

const StoryBuilder = () => {
  const characters = ['🐱 Cat', '🐕 Dog', '🦁 Lion', '👧 Girl', '👦 Boy']
  const settings = ['🏠 Home', '🌳 Forest', '🏖️ Beach', '🏰 Castle', '🚀 Space']
  const actions = ['found a treasure', 'made a friend', 'went on adventure', 'learned something new', 'saved the day']
  
  const [character, setCharacter] = useState(null)
  const [setting, setSetting] = useState(null)
  const [action, setAction] = useState(null)

  const createStory = () => {
    if (character && setting && action) {
      addStars(3)
      return `Once upon a time, ${character} was at ${setting} and ${action}! The End! 🎉`
    }
    return null
  }

  const story = createStory()

  return (
    <div className="story-builder">
      <h2>📚 Story Builder</h2>
      <p>Choose character, place, and action to create your story!</p>

      <div className="choice-section">
        <h3>Choose a Character:</h3>
        <div className="options">
          {characters.map((c, i) => (
            <button key={i} className={character === c ? 'selected' : ''} onClick={() => setCharacter(c)}>{c}</button>
          ))}
        </div>
      </div>

      <div className="choice-section">
        <h3>Choose a Setting:</h3>
        <div className="options">
          {settings.map((s, i) => (
            <button key={i} className={setting === s ? 'selected' : ''} onClick={() => setSetting(s)}>{s}</button>
          ))}
        </div>
      </div>

      <div className="choice-section">
        <h3>What happened?</h3>
        <div className="options">
          {actions.map((a, i) => (
            <button key={i} className={action === a ? 'selected' : ''} onClick={() => setAction(a)}>{a}</button>
          ))}
        </div>
      </div>

      {story && (
        <motion.div className="story-result" initial={{ scale: 0 }} animate={{ scale: 1 }}>
          <h3>Your Story:</h3>
          <p>{story}</p>
          <button onClick={() => { setCharacter(null); setSetting(null); setAction(null); }}>Create Another Story</button>
        </motion.div>
      )}
    </div>
  )
}

export default StoryBuilder
