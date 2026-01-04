import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate, useParams } from 'react-router-dom'
import learningData from '../data/learningData.json'
import { triggerConfetti, triggerStarBurst, playSuccessSound, playClickSound } from '../utils/celebration'
import { addStars, getTotalStars, markCategoryCompleted } from '../utils/rewards'
import './CategoryPage.css'

const CategoryPage = () => {
  const navigate = useNavigate()
  const { levelId, categoryId } = useParams()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showCelebration, setShowCelebration] = useState(false)
  const [totalStars, setTotalStars] = useState(0)

  useEffect(() => {
    setTotalStars(getTotalStars())
  }, [])

  const levelData = learningData[levelId]
  const categoryData = levelData?.categories[categoryId]

  if (!categoryData) {
    return <div className="loading">Loading... 🎈</div>
  }

  const currentItem = categoryData.items[currentIndex]
  const isLastItem = currentIndex === categoryData.items.length - 1

  const handleNext = () => {
    playClickSound()
    if (isLastItem) {
      // Complete category!
      triggerConfetti()
      const stars = addStars(5)
      setTotalStars(stars)
      markCategoryCompleted(levelId, categoryId)
      setShowCelebration(true)
      setTimeout(() => {
        navigate(`/level/${levelId}`)
      }, 3000)
    } else {
      triggerStarBurst()
      const stars = addStars(1)
      setTotalStars(stars)
      setCurrentIndex(currentIndex + 1)
    }
  }

  const handlePrevious = () => {
    playClickSound()
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  const renderItem = () => {
    switch (categoryId) {
      case 'alphabets':
        return <AlphabetCard item={currentItem} />
      case 'numbers':
      case 'numbers100':
        return <NumberCard item={currentItem} />
      case 'shapes':
        return <ShapeCard item={currentItem} />
      case 'colors':
        return <ColorCard item={currentItem} />
      case 'animals':
        return <AnimalCard item={currentItem} />
      case 'fruits':
        return <FruitCard item={currentItem} />
      case 'math':
        return <MathCard item={currentItem} />
      case 'science':
        return <ScienceCard item={currentItem} />
      case 'words':
        return <WordCard item={currentItem} />
      case 'patterns':
        return <PatternCard item={currentItem} />
      case 'bodyParts':
        return <BodyPartCard item={currentItem} />
      case 'quiz':
        return <QuizCard item={currentItem} />
      case 'activities':
        return <ActivityCard item={currentItem} />
      case 'stories':
        return <StoryCard item={currentItem} />
      case 'rhymes':
        return <RhymeCard item={currentItem} />
      case 'puzzles':
        return <PuzzleCard item={currentItem} />
      case 'games':
        return <GameCard item={currentItem} />
      case 'music':
        return <MusicCard item={currentItem} />
      case 'money':
        return <MoneyCard item={currentItem} />
      case 'savings':
        return <SavingsCard item={currentItem} />
      case 'finance':
        return <FinanceCard item={currentItem} />
      case 'moneyStories':
        return <MoneyStoryCard item={currentItem} />
      case 'moneyGames':
        return <MoneyGameCard item={currentItem} />
      case 'coding':
        return <CodingCard item={currentItem} />
      case 'computer':
        return <ComputerCard item={currentItem} />
      case 'vehicles':
        return <VehicleCard item={currentItem} />
      case 'space':
        return <SpaceCard item={currentItem} />
      case 'dinosaurs':
        return <DinosaurCard item={currentItem} />
      case 'vegetables':
        return <VegetableCard item={currentItem} />
      case 'family':
        return <FamilyCard item={currentItem} />
      case 'weather':
        return <WeatherCard item={currentItem} />
      case 'timeofday':
        return <TimeOfDayCard item={currentItem} />
      case 'emotions':
        return <EmotionCard item={currentItem} />
      case 'daysofweek':
        return <DayOfWeekCard item={currentItem} />
      case 'seasons':
        return <SeasonCard item={currentItem} />
      case 'opposites':
        return <OppositeCard item={currentItem} />
      case 'clothing':
        return <ClothingCard item={currentItem} />
      case 'helpers':
        return <HelperCard item={currentItem} />
      case 'preschool_stories':
      case 'nursery_stories':
        return <StoryCard item={currentItem} />
      case 'preschool_rhymes':
      case 'nursery_rhymes':
        return <RhymeCard item={currentItem} />
      case 'letter_games':
        return <LetterGameCard item={currentItem} />
      case 'number_games':
        return <NumberGameCard item={currentItem} />
      case 'picture_quiz':
        return <PictureQuizCard item={currentItem} />
      case 'memory_games':
        return <MemoryGameCard item={currentItem} />
      case 'pattern_games':
        return <PatternGameCard item={currentItem} />
      case 'logic_games':
        return <LogicGameCard item={currentItem} />
      case 'counting_games':
        return <CountingGameCard item={currentItem} />
      case 'shape_match':
        return <ShapeMatchCard item={currentItem} />
      case 'color_mix':
        return <ColorMixCard item={currentItem} />
      case 'brain_gym':
        return <BrainGymCard item={currentItem} />
      case 'sensory_play':
        return <SensoryPlayCard item={currentItem} />
      case 'movement_games':
        return <MovementGameCard item={currentItem} />
      case 'coordination_games':
        return <CoordinationCard item={currentItem} />
      case 'brain_boosters':
        return <BrainBoosterCard item={currentItem} />
      case 'calm_activities':
        return <CalmActivityCard item={currentItem} />
      case 'vedic_maths':
        return <VedicMathCard item={currentItem} />
      default:
        return <div>Unknown category</div>
    }
  }

  return (
    <div className="category-page" style={{ background: `linear-gradient(135deg, ${levelData.color} 0%, #764ba2 100%)` }}>
      <motion.button 
        className="back-button"
        onClick={() => {
          playClickSound()
          navigate(`/level/${levelId}`)
        }}
        whileHover={{ scale: 1.1, rotate: -10 }}
        whileTap={{ scale: 0.9 }}
      >
        ←
      </motion.button>

      <motion.div 
        className="stars-counter"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <motion.span
          key={totalStars}
          initial={{ scale: 1.5, rotate: 360 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring" }}
        >
          ⭐ {totalStars}
        </motion.span>
      </motion.div>

      <div className="container">
        <motion.div 
          className="category-header"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <h1 className="category-title-main">
            {categoryData.icon} {categoryData.title}
          </h1>
          <div className="progress-bar">
            <motion.div 
              className="progress-fill"
              initial={{ width: 0 }}
              animate={{ width: `${((currentIndex + 1) / categoryData.items.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <p className="progress-text">
            {currentIndex + 1} of {categoryData.items.length}
          </p>
        </motion.div>

        <div className="learning-area">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ x: 100, opacity: 0, scale: 0.8, rotate: 10 }}
              animate={{ x: 0, opacity: 1, scale: 1, rotate: 0 }}
              exit={{ x: -100, opacity: 0, scale: 0.8, rotate: -10 }}
              transition={{ type: "spring", duration: 0.6 }}
              className="item-card"
            >
              {renderItem()}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="navigation-buttons">
          <motion.button
            className="nav-button prev-button"
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            ← Previous
          </motion.button>
          <motion.button
            className="nav-button next-button"
            onClick={handleNext}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isLastItem ? '🎉 Finish!' : 'Next →'}
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {showCelebration && (
          <motion.div
            className="celebration-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="celebration-content"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", bounce: 0.6 }}
            >
              <motion.div
                className="celebration-icon"
                animate={{ 
                  scale: [1, 1.3, 1],
                  rotate: [0, 15, -15, 0]
                }}
                transition={{ duration: 0.5, repeat: Infinity }}
              >
                🎉
              </motion.div>
              <h2>Awesome Job!</h2>
              <p>You completed {categoryData.title}! 🌟</p>
              <motion.div
                className="stars-earned"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring" }}
              >
                <span className="stars-big">⭐ +5 Stars!</span>
              </motion.div>
              <motion.div
                className="celebration-emojis"
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                🎈 🎊 🌈 ⭐ 🏆
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Helper function to get child-friendly female voice
const getFemaleVoice = () => {
  const voices = window.speechSynthesis.getVoices()
  
  // Log all voices to help debug
  console.log('Available voices:', voices.map(v => `${v.name} (${v.lang})`))
  
  // Priority 1: Specific high-quality female voices for kids
  let voice = voices.find(v => 
    v.name.includes('Samantha') || // iOS - sounds young and pleasant
    v.name.includes('Karen') || // macOS - clear and friendly
    v.name.includes('Tessa') || // South African - clear
    v.name.includes('Veena') || // Indian English - soft and clear
    v.name.includes('Moira') || // Irish English - warm and friendly
    v.name.includes('Fiona') || // Scottish - friendly
    v.name.includes('Kate') || // UK English
    v.name.includes('Victoria') || // Windows female voice
    v.name.includes('Zira') // Windows female voice
  )
  
  // Priority 2: Look for any voice with 'female' in the name
  if (!voice) {
    voice = voices.find(v => 
      v.name.toLowerCase().includes('female') ||
      v.name.toLowerCase().includes('woman')
    )
  }
  
  // Priority 3: Filter by language code (prefer en-US, en-GB female voices)
  if (!voice) {
    voice = voices.find(v => 
      (v.lang.startsWith('en-') || v.lang.startsWith('en_')) &&
      !v.name.toLowerCase().includes('male') &&
      !v.name.toLowerCase().includes('man')
    )
  }
  
  // Log selected voice
  if (voice) {
    console.log('Selected voice:', voice.name, voice.lang)
  } else {
    console.log('No specific female voice found, using default')
  }
  
  return voice
}

// Helper function to speak with child girl voice
const speakWithVoice = (text, customRate = 0.85) => {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel()
    
    // Wait for voices to load
    const speak = () => {
      const utterance = new SpeechSynthesisUtterance(text)
      
      const femaleVoice = getFemaleVoice()
      if (femaleVoice) {
        utterance.voice = femaleVoice
      }
      
      utterance.rate = customRate // Slightly slower for clarity
      utterance.pitch = 1.6 // VERY HIGH pitch for little girl voice
      utterance.volume = 1
      window.speechSynthesis.speak(utterance)
    }
    
    // Ensure voices are loaded
    if (window.speechSynthesis.getVoices().length > 0) {
      speak()
    } else {
      window.speechSynthesis.onvoiceschanged = speak
    }
  }
}

// Component for Alphabet items
const AlphabetCard = ({ item }) => {
  const speakWord = (text) => {
    speakWithVoice(text, 0.8) // Normal good speed
  }

  return (
    <motion.div 
      className="alphabet-card content-card"
      whileHover={{ scale: 1.02 }}
    >
      <motion.div 
        className="main-letter"
        animate={{ 
          scale: [1, 1.1, 1],
          rotate: [0, 5, -5, 0]
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {item.letter}
      </motion.div>
      {item.uppercase && item.lowercase && (
        <div className="letter-cases">
          <span className="uppercase">{item.uppercase}</span>
          <span className="lowercase">{item.lowercase}</span>
        </div>
      )}
      <motion.div 
        className="emoji-large"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        {item.emoji}
      </motion.div>
      <div className="word-label">{item.word}</div>
      {item.sound && <div className="sound-label">Sound: {item.sound}</div>}
      <motion.button
        className="speak-button"
        onClick={() => speakWord(`${item.letter} for ${item.word}`)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        🔊 Read Word
      </motion.button>
    </motion.div>
  )
}

// Component for Number items
const NumberCard = ({ item }) => {
  const speakNumber = (number, word) => {
    speakWithVoice(`${number}, ${word}`, 0.8) // Normal good speed
  }

  return (
    <motion.div className="number-card content-card">
      <motion.div 
        className="main-number"
        animate={{ 
          scale: [1, 1.15, 1]
        }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        {item.number}
      </motion.div>
      <div className="number-word">{item.word}</div>
      <motion.div 
        className="visual-display"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.3 }}
      >
        {item.visual}
      </motion.div>
      {item.counting && (
        <motion.div className="counting-stars">
          {[...Array(item.counting)].map((_, i) => (
            <motion.span
              key={i}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: i * 0.1, type: "spring" }}
              className="counting-star"
            >
              ⭐
            </motion.span>
          ))}
        </motion.div>
      )}
      <motion.button
        className="speak-button"
        onClick={() => speakNumber(item.number, item.word)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        🔊 Read Number
      </motion.button>
    </motion.div>
  )
}

// Component for Shape items
const ShapeCard = ({ item }) => {
  const speakShape = () => {
    const text = item.sides > 0 
      ? `${item.name}. It has ${item.sides} sides.`
      : `${item.name}.`
    speakWithVoice(text, 0.8)
  }

  return (
    <motion.div className="shape-card content-card">
      <motion.div 
        className="shape-emoji"
        animate={{ 
          rotate: [0, 360],
          scale: [1, 1.2, 1]
        }}
        transition={{ duration: 3, repeat: Infinity }}
        style={{ fontSize: '8rem' }}
      >
        {item.emoji}
      </motion.div>
      <div className="shape-name">{item.name}</div>
      {item.sides > 0 && <div className="shape-info">{item.sides} sides</div>}
      <motion.button
        className="speak-button"
        onClick={speakShape}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        🔊 Read Shape
      </motion.button>
    </motion.div>
  )
}

// Component for Color items
const ColorCard = ({ item }) => {
  const speakColor = () => {
    speakWithVoice(`${item.name}. Like ${item.example}.`, 0.8)
  }

  return (
    <motion.div 
      className="color-card content-card"
      style={{ borderColor: item.hex, borderWidth: '5px', borderStyle: 'solid' }}
    >
      <motion.div 
        className="color-swatch"
        style={{ backgroundColor: item.hex }}
        animate={{ 
          scale: [1, 1.1, 1],
          rotate: [0, 180, 360]
        }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      <div className="color-name">{item.name}</div>
      <motion.div 
        className="emoji-large"
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        {item.emoji}
      </motion.div>
      <div className="color-example">Example: {item.example}</div>
      <motion.button
        className="speak-button"
        onClick={speakColor}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        🔊 Read Color
      </motion.button>
    </motion.div>
  )
}

// Component for Animal items
const AnimalCard = ({ item }) => {
  const speakAnimal = () => {
    speakWithVoice(`${item.name}. The ${item.name} says ${item.sound}. It lives in ${item.habitat}.`, 0.8)
  }

  return (
    <motion.div className="animal-card content-card">
      <motion.div 
        className="emoji-huge"
        animate={{ 
          scale: [1, 1.15, 1],
          rotate: [0, 5, -5, 0]
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {item.emoji}
      </motion.div>
      <div className="animal-name">{item.name}</div>
      <motion.div 
        className="animal-sound"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 1, repeat: Infinity }}
      >
        🔊 {item.sound}
      </motion.div>
      <div className="animal-habitat">Lives in: {item.habitat}</div>
      <motion.button
        className="speak-button"
        onClick={speakAnimal}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        🔊 Read About Animal
      </motion.button>
    </motion.div>
  )
}

// Component for Fruit items
const FruitCard = ({ item }) => {
  const speakFruit = () => {
    speakWithVoice(`${item.name}. It is ${item.color} and tastes ${item.taste}.`, 0.8)
  }

  return (
    <motion.div className="fruit-card content-card">
      <motion.div 
        className="emoji-huge"
        animate={{ 
          y: [0, -20, 0],
          rotate: [0, 10, -10, 0]
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {item.emoji}
      </motion.div>
      <div className="fruit-name">{item.name}</div>
      <div className="fruit-info">
        <span className="info-badge">Color: {item.color}</span>
        <span className="info-badge">Taste: {item.taste}</span>
      </div>
      <motion.button
        className="speak-button"
        onClick={speakFruit}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        🔊 Read About Fruit
      </motion.button>
    </motion.div>
  )
}

// Component for Math items
const MathCard = ({ item }) => {
  const speakMath = () => {
    speakWithVoice(`${item.problem} equals ${item.answer}.`, 0.8)
  }

  return (
    <motion.div className="math-card content-card">
      <motion.div 
        className="math-problem"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        {item.problem}
      </motion.div>
      <motion.div 
        className="math-equals"
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        =
      </motion.div>
      <motion.div 
        className="math-answer"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5, type: "spring" }}
      >
        {item.answer}
      </motion.div>
      <div className="math-visual">{item.visual}</div>
      <div className="math-type-badge">{item.type}</div>
      <motion.button
        className="speak-button"
        onClick={speakMath}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        🔊 Read Math Problem
      </motion.button>
    </motion.div>
  )
}

// Component for Science items
const ScienceCard = ({ item }) => {
  const speakScience = () => {
    speakWithVoice(`${item.topic}. ${item.fact}. Category: ${item.category}.`, 0.8)
  }

  return (
    <motion.div className="science-card content-card">
      <motion.div 
        className="emoji-huge"
        animate={{ 
          scale: [1, 1.2, 1],
          rotate: [0, 10, -10, 0]
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {item.emoji}
      </motion.div>
      <div className="science-topic">{item.topic}</div>
      <div className="science-fact">💡 {item.fact}</div>
      <div className="science-category">{item.category}</div>
      <motion.button
        className="speak-button"
        onClick={speakScience}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        🔊 Read Science Fact
      </motion.button>
    </motion.div>
  )
}

// Component for Word items
const WordCard = ({ item }) => {
  const speakWord = () => {
    const letters = item.letters.join(', ')
    speakWithVoice(`${item.word}. The letters are: ${letters}.`, 0.8)
  }

  return (
    <motion.div className="word-card content-card">
      <motion.div 
        className="emoji-huge"
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        {item.emoji}
      </motion.div>
      <div className="word-display">{item.word}</div>
      <div className="letters-display">
        {item.letters.map((letter, index) => (
          <motion.span
            key={index}
            className="letter-box"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.2, type: "spring" }}
          >
            {letter}
          </motion.span>
        ))}
      </div>
      <div className="syllables-info">{item.syllables} syllable{item.syllables > 1 ? 's' : ''}</div>
      <motion.button
        className="speak-button"
        onClick={speakWord}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        🔊 Read Word
      </motion.button>
    </motion.div>
  )
}

// Component for Pattern items
const PatternCard = ({ item }) => (
  <motion.div className="pattern-card content-card">
    <div className="pattern-label">Find the pattern!</div>
    <div className="pattern-display">
      {item.pattern.map((element, index) => (
        <motion.span
          key={index}
          className="pattern-element"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: index * 0.2, type: "spring" }}
        >
          {element}
        </motion.span>
      ))}
      <motion.span 
        className="pattern-element question"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 1, repeat: Infinity }}
      >
        ?
      </motion.span>
    </div>
    <motion.div 
      className="pattern-answer"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 1, type: "spring", bounce: 0.6 }}
    >
      Answer: {item.next}
    </motion.div>
    <div className="pattern-type">Type: {item.type}</div>
  </motion.div>
)

// Component for Body Part items
const BodyPartCard = ({ item }) => (
  <motion.div className="bodypart-card content-card">
    <motion.div 
      className="emoji-huge"
      animate={{ 
        scale: [1, 1.15, 1]
      }}
      transition={{ duration: 1.5, repeat: Infinity }}
    >
      {item.emoji}
    </motion.div>
    <div className="bodypart-name">{item.name}</div>
    <div className="bodypart-function">Function: {item.function}</div>
    <div className="bodypart-count">We have {item.count}</div>
  </motion.div>
)

// Component for Quiz items
const QuizCard = ({ item }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [showResult, setShowResult] = useState(false)

  const handleAnswer = (option) => {
    setSelectedAnswer(option)
    setShowResult(true)
  }

  const speakQuestion = () => {
    speakWithVoice(item.question, 0.8)
  }

  const speakAnswer = () => {
    speakWithVoice(`The answer is ${item.answer}`, 0.8)
  }

  return (
    <motion.div className="quiz-card content-card">
      <motion.div 
        className="emoji-huge"
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {item.emoji}
      </motion.div>
      <div className="quiz-question">{item.question}</div>
      <div className="quiz-options">
        {item.options.map((option, index) => (
          <motion.button
            key={index}
            className={`quiz-option ${selectedAnswer === option ? (option === item.answer ? 'correct' : 'wrong') : ''}`}
            onClick={() => handleAnswer(option)}
            disabled={showResult}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {option}
          </motion.button>
        ))}
      </div>
      {showResult && (
        <motion.div 
          className={`quiz-result ${selectedAnswer === item.answer ? 'success' : 'try-again'}`}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
        >
          {selectedAnswer === item.answer ? '🎉 Correct! Great job!' : '💪 Try again!'}
        </motion.div>
      )}
      <div style={{ display: 'flex', gap: '10px', marginTop: '15px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <motion.button
          className="speak-button"
          onClick={speakQuestion}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          🔊 Read Question
        </motion.button>
        {showResult && (
          <motion.button
            className="speak-button"
            onClick={speakAnswer}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            🔊 Read Answer
          </motion.button>
        )}
      </div>
    </motion.div>
  )
}

// Component for Activity items
const ActivityCard = ({ item }) => (
  <motion.div className="activity-card content-card">
    <motion.div 
      className="emoji-huge"
      animate={{ 
        y: [0, -15, 0],
        rotate: [0, 5, -5, 0]
      }}
      transition={{ duration: 2, repeat: Infinity }}
    >
      {item.emoji}
    </motion.div>
    <div className="activity-name">{item.name}</div>
    <div className="activity-instruction">{item.instruction}</div>
    <div className="activity-type">{item.type}</div>
    <motion.div 
      className="activity-cta"
      animate={{ scale: [1, 1.1, 1] }}
      transition={{ duration: 1, repeat: Infinity }}
    >
      Let's Do It! 🎨
    </motion.div>
  </motion.div>
)

// Component for Vedic Math items
const VedicMathCard = ({ item }) => {
  const [showSteps, setShowSteps] = useState(false)
  const [isReading, setIsReading] = useState(false)

  const speakTrick = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      setIsReading(true)
      
      const femaleVoice = getFemaleVoice()
      let currentPart = 0
      
      // Build the parts to speak
      const parts = [
        { text: `${item.trick}!`, rate: 0.7, pitch: 1.3, pause: 1000 },
        { text: item.description, rate: 0.7, pitch: 1.25, pause: 1200 },
        { text: `Let's try an example: ${item.example}`, rate: 0.65, pitch: 1.2, pause: 1000 },
        { text: `Step 1: ${item.step1}`, rate: 0.65, pitch: 1.2, pause: 800 },
        { text: `Step 2: ${item.step2}`, rate: 0.65, pitch: 1.2, pause: 800 },
        { text: `Step 3: ${item.step3}`, rate: 0.65, pitch: 1.2, pause: 1000 },
        { text: `The answer is ${item.answer}!`, rate: 0.7, pitch: 1.35, pause: 1000 },
        { text: `Now you try: ${item.practice}`, rate: 0.7, pitch: 1.3, pause: 500 }
      ]
      
      // Add hint if exists
      if (item.hint) {
        parts.push({ text: `Here's a hint: ${item.hint}`, rate: 0.65, pitch: 1.25, pause: 500 })
      }
      
      // Add sutra if exists
      if (item.sutra) {
        parts.push({ text: `This uses the Vedic sutra: ${item.sutra}`, rate: 0.65, pitch: 1.3, pause: 0 })
      }
      
      const speakPart = () => {
        if (currentPart >= parts.length) {
          setIsReading(false)
          return
        }
        
        const part = parts[currentPart]
        const utterance = new SpeechSynthesisUtterance(part.text)
        
        if (femaleVoice) {
          utterance.voice = femaleVoice
        }
        
        utterance.rate = part.rate
        utterance.pitch = part.pitch
        utterance.volume = 1
        
        utterance.onend = () => {
          setTimeout(() => {
            currentPart++
            speakPart()
          }, part.pause)
        }
        
        window.speechSynthesis.speak(utterance)
      }
      
      speakPart()
    }
  }

  const stopReading = () => {
    window.speechSynthesis.cancel()
    setIsReading(false)
  }

  return (
    <motion.div className="vedic-card content-card">
      <motion.div 
        className="emoji-huge"
        animate={{ rotate: [0, 5, -5, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {item.emoji}
      </motion.div>
      <div className="vedic-trick-title">{item.trick}</div>
      <div className="vedic-description">{item.description}</div>
      
      <motion.button
        className="show-steps-button"
        onClick={() => setShowSteps(!showSteps)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {showSteps ? '🔼 Hide Steps' : '🔽 Show Example'}
      </motion.button>
      
      {showSteps && (
        <motion.div 
          className="vedic-steps"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
        >
          <div className="vedic-example">
            <strong>Example:</strong> {item.example}
          </div>
          <div className="vedic-step">
            <span className="step-number">1️⃣</span> {item.step1}
          </div>
          <div className="vedic-step">
            <span className="step-number">2️⃣</span> {item.step2}
          </div>
          <div className="vedic-step">
            <span className="step-number">3️⃣</span> {item.step3}
          </div>
          <div className="vedic-answer">
            <strong>✅ Answer:</strong> {item.answer}
          </div>
          <div className="vedic-practice">
            <strong>🎯 Practice:</strong> {item.practice}
          </div>
          {item.hint && (
            <div className="vedic-hint">
              <strong>💡 Hint:</strong> {item.hint}
            </div>
          )}
          {item.sutra && (
            <div className="vedic-sutra">
              <strong>📖 Sutra:</strong> {item.sutra}
            </div>
          )}
        </motion.div>
      )}
      
      <div className="voice-buttons" style={{ marginTop: '10px' }}>
        {!isReading ? (
          <motion.button
            className="speak-button"
            onClick={speakTrick}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            🎤 Explain Trick
          </motion.button>
        ) : (
          <motion.button
            className="speak-button stop-button"
            onClick={stopReading}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            ⏸️ Stop
          </motion.button>
        )}
      </div>
    </motion.div>
  )
}

// Component for Story items
const StoryCard = ({ item }) => {
  const [isReading, setIsReading] = useState(false)

  // Storytelling with a sweet little girl's voice!
  const tellStoryLikeHuman = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      setIsReading(true)
      
      // Wait for voices to load
      const startStory = () => {
        const femaleVoice = getFemaleVoice()
        let currentPart = 0
        
        // Make story parts with MUCH more expression and emotion
        const storyParts = [
          { 
            text: `${item.title}`,
            rate: 0.7,
            pitch: 1.65, // HIGHER pitch for little girl voice
            pause: 1500,
            emotion: "excited"
          },
          { 
            text: "Let me tell you a wonderful story",
            rate: 0.6,
            pitch: 1.5, // Sweet child voice
            pause: 1200,
            emotion: "warm"
          },
          { 
            text: item.story
              .replace(/\./g, '. ...................... ') // VERY long pause at periods
              .replace(/!/g, '! ........................ ') // Excitement - long pause
              .replace(/\?/g, '? ........................ ') // Question - long pause  
              .replace(/,/g, ', ........ '), // Comma - medium pause
            rate: 0.55, // Slower like a child telling a story
            pitch: 1.55, // Higher child-like pitch
            pause: 2000,
            emotion: "storytelling"
          },
          { 
            text: "Now, what did we learn from this story?",
            rate: 0.6,
            pitch: 1.5, // Gentle child voice
            pause: 1000,
            emotion: "thoughtful"
          },
          { 
            text: item.moral
              .replace(/!/g, '! .......... ')
              .replace(/\./g, '. ........ '),
            rate: 0.65,
            pitch: 1.6, // Higher excited child voice
            pause: 500,
            emotion: "uplifting"
          },
          {
            text: "Wasn't that a beautiful story?",
            rate: 0.65,
            pitch: 1.55, // Happy child voice
            pause: 0,
            emotion: "happy"
          }
        ]
        
        const speakPart = () => {
          if (currentPart >= storyParts.length) {
            setIsReading(false)
            return
          }
          
          const part = storyParts[currentPart]
          const utterance = new SpeechSynthesisUtterance(part.text)
          
          if (femaleVoice) {
            utterance.voice = femaleVoice
          }
          
          utterance.rate = part.rate
          utterance.pitch = part.pitch
          utterance.volume = 1
          
          utterance.onend = () => {
            setTimeout(() => {
              currentPart++
              speakPart()
            }, part.pause)
          }
          
          window.speechSynthesis.speak(utterance)
        }
        
        speakPart()
      }
      
      // Ensure voices are loaded
      if (window.speechSynthesis.getVoices().length > 0) {
        startStory()
      } else {
        window.speechSynthesis.onvoiceschanged = startStory
      }
    }
  }

  const stopReading = () => {
    window.speechSynthesis.cancel()
    setIsReading(false)
  }

  return (
    <motion.div className="story-card content-card">
      <motion.div 
        className="emoji-huge"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {item.emoji}
      </motion.div>
      <div className="story-title">{item.title}</div>
      <div className="story-text">{item.story}</div>
      <div className="story-moral">
        💡 {item.moral}
      </div>
      <div className="rhyme-buttons">
        {!isReading ? (
          <motion.button
            className="speak-button rhyme-speak"
            onClick={tellStoryLikeHuman}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            🎭 Tell Story
          </motion.button>
        ) : (
          <motion.button
            className="speak-button stop-button"
            onClick={stopReading}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            ⏸️ Stop
          </motion.button>
        )}
      </div>
    </motion.div>
  )
}

// Component for Rhyme items
const RhymeCard = ({ item }) => {
  const [isReading, setIsReading] = useState(false)

  // Expressive rhyme singing - just voice, no music!
  const playRichMusicalBackground = () => {
    if (!audioContext) {
      const ctx = new (window.AudioContext || window.webkitAudioContext)()
      setAudioContext(ctx)
      
      const nodes = []
      const now = ctx.currentTime
      
      // Soft bass - barely noticeable
      const bass = ctx.createOscillator()
      const bassGain = ctx.createGain()
      bass.type = 'sine'
      bass.frequency.setValueAtTime(131, now) // Low C
      bassGain.gain.setValueAtTime(0, now)
      bassGain.gain.linearRampToValueAtTime(0.01, now + 2) // Very soft
      bass.connect(bassGain)
      bassGain.connect(ctx.destination)
      bass.start()
      nodes.push({ osc: bass, gain: bassGain })
      
      // Gentle melody - C
      const melody1 = ctx.createOscillator()
      const gain1 = ctx.createGain()
      melody1.type = 'sine'
      melody1.frequency.setValueAtTime(262, now) // C
      gain1.gain.setValueAtTime(0, now)
      gain1.gain.linearRampToValueAtTime(0.008, now + 2) // Whisper soft
      melody1.connect(gain1)
      gain1.connect(ctx.destination)
      melody1.start()
      nodes.push({ osc: melody1, gain: gain1 })
      
      // Soft harmony - E
      const melody2 = ctx.createOscillator()
      const gain2 = ctx.createGain()
      melody2.type = 'sine'
      melody2.frequency.setValueAtTime(330, now) // E
      gain2.gain.setValueAtTime(0, now)
      gain2.gain.linearRampToValueAtTime(0.006, now + 2) // Very gentle
      melody2.connect(gain2)
      gain2.connect(ctx.destination)
      melody2.start()
      nodes.push({ osc: melody2, gain: gain2 })
      
      // Gentle high note - G
      const melody3 = ctx.createOscillator()
      const gain3 = ctx.createGain()
      melody3.type = 'sine'
      melody3.frequency.setValueAtTime(392, now) // G
      gain3.gain.setValueAtTime(0, now)
      gain3.gain.linearRampToValueAtTime(0.005, now + 2) // Barely there
      melody3.connect(gain3)
      melody3.connect(ctx.destination)
      melody3.start()
      nodes.push({ osc: melody3, gain: gain3 })
      
      setMusicNodes(nodes)
    }
  }

  const stopRichMusicalBackground = () => {
    const ctx = audioContext
    if (ctx && musicNodes.length > 0) {
      const now = ctx.currentTime
      musicNodes.forEach(node => {
        if (node.gain) {
          node.gain.gain.linearRampToValueAtTime(0, now + 0.5)
        }
      })
      setTimeout(() => {
        musicNodes.forEach(node => {
          try {
            if (node.osc) node.osc.stop()
          } catch (e) {}
        })
        setMusicNodes([])
        if (ctx) ctx.close()
        setAudioContext(null)
      }, 500)
    }
  }

  // MUCH MORE expressive rhyme singing - like a little girl singing!
  const singRhymeLikeSong = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      setIsReading(true)
      
      // Wait for voices to load
      const startSinging = () => {
        const femaleVoice = getFemaleVoice()
        
        // Split into lines for singing
        const lines = text.split(/[!\n]/).filter(line => line.trim())
        let currentLine = 0
        
        const singNextLine = () => {
          if (currentLine >= lines.length) {
            setIsReading(false)
            return
          }
          
          const line = lines[currentLine].trim()
          
          // Make it VERY musical with long pauses
          const musicalLine = line
            .replace(/,/g, ', ........................ ') // Very long pause
            .replace(/!/g, '! .............................. ') // Extra long
            .replace(/\?/g, '? ........................ ')
          
          const utterance = new SpeechSynthesisUtterance(musicalLine)
          
          if (femaleVoice) {
            utterance.voice = femaleVoice
          }
          
          // Make it sound like a sweet little girl singing!
          utterance.rate = 0.55 + (Math.random() * 0.1) // 0.55-0.65 - Slow and clear like a child
          utterance.pitch = 1.7 + (Math.random() * 0.15) // 1.7-1.85 - VERY HIGH pitch like a little girl
          utterance.volume = 1
          
          utterance.onend = () => {
            setTimeout(() => {
              currentLine++
              singNextLine()
            }, 800) // Longer pause between lines
          }
          
          window.speechSynthesis.speak(utterance)
        }
        
        singNextLine()
      }
      
      // Ensure voices are loaded
      if (window.speechSynthesis.getVoices().length > 0) {
        startSinging()
      } else {
        window.speechSynthesis.onvoiceschanged = startSinging
      }
    }
  }

  const speakRhyme = (text) => {
    singRhymeLikeSong(text)
  }

  const stopReading = () => {
    window.speechSynthesis.cancel()
    setIsReading(false)
  }

  return (
    <motion.div className="rhyme-card content-card">
      <motion.div 
        className="emoji-huge"
        animate={{ 
          rotate: [0, 10, -10, 0],
          scale: [1, 1.15, 1]
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {item.emoji}
      </motion.div>
      <div className="rhyme-name">{item.title || item.name}</div>
      <div className="rhyme-text">{item.lyrics || item.rhyme}</div>
      <div className="rhyme-action">
        🎭 Action: {item.action}
      </div>
      <div className="rhyme-buttons">
        {!isReading ? (
          <motion.button
            className="speak-button rhyme-speak"
            onClick={() => speakRhyme(item.lyrics || item.rhyme)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            🔊 Read Rhyme
          </motion.button>
        ) : (
          <motion.button
            className="speak-button stop-button"
            onClick={stopReading}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            ⏸️ Stop
          </motion.button>
        )}
      </div>
    </motion.div>
  )
}

// Component for Puzzle items
const PuzzleCard = ({ item }) => {
  const speakPuzzle = () => {
    speakWithVoice(`${item.name}. ${item.puzzle}. Hint: ${item.hint}`, 0.8)
  }

  const speakAnswer = () => {
    speakWithVoice(`The answer is ${item.answer}`, 0.8)
  }

  return (
    <motion.div className="puzzle-card content-card">
      <motion.div 
        className="emoji-huge"
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      >
        {item.emoji}
      </motion.div>
      <div className="puzzle-name">{item.name}</div>
      <div className="puzzle-question">{item.puzzle}</div>
      <motion.div 
        className="puzzle-answer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        Answer: {item.answer}
      </motion.div>
      <div className="puzzle-hint">💡 {item.hint}</div>
      <div style={{ display: 'flex', gap: '10px', marginTop: '15px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <motion.button
          className="speak-button"
          onClick={speakPuzzle}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          🔊 Read Puzzle
        </motion.button>
        <motion.button
          className="speak-button"
          onClick={speakAnswer}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          🔊 Read Answer
        </motion.button>
      </div>
    </motion.div>
  )
}

// Component for Game items
const GameCard = ({ item }) => {
  const speakGame = () => {
    speakWithVoice(`${item.name}. ${item.description}`, 0.8)
  }

  return (
    <motion.div className="game-card content-card">
      <motion.div 
        className="emoji-huge"
        animate={{ 
          scale: [1, 1.2, 1],
          rotate: [0, 10, -10, 0]
        }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        {item.emoji}
      </motion.div>
      <div className="game-name">{item.name}</div>
      <div className="game-description">{item.description}</div>
      <div className="game-type">{item.type}</div>
      <motion.button
        className="speak-button"
        onClick={speakGame}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        🔊 Read About Game
      </motion.button>
    </motion.div>
  )
}

// Component for Music items
const MusicCard = ({ item }) => {
  const [isReading, setIsReading] = useState(false)
  const [audioContext, setAudioContext] = useState(null)
  const [musicNodes, setMusicNodes] = useState([])

  // Create musical background with melody
  const playMusicBackground = () => {
    if (!audioContext) {
      const ctx = new (window.AudioContext || window.webkitAudioContext)()
      setAudioContext(ctx)
      
      const nodes = []
      
      // Melody line - C major chord tones
      const frequencies = [262, 330, 392, 523] // C, E, G, high C
      
      frequencies.forEach((freq, index) => {
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.type = 'sine'
        osc.frequency.setValueAtTime(freq, ctx.currentTime)
        gain.gain.setValueAtTime(0.02 - (index * 0.003), ctx.currentTime)
        
        // Add gentle vibrato
        const vibrato = ctx.createOscillator()
        const vibratoGain = ctx.createGain()
        vibrato.frequency.setValueAtTime(5, ctx.currentTime)
        vibratoGain.gain.setValueAtTime(3, ctx.currentTime)
        vibrato.connect(vibratoGain)
        vibratoGain.connect(osc.frequency)
        vibrato.start()
        
        osc.connect(gain)
        gain.connect(ctx.destination)
        osc.start()
        nodes.push(osc)
        nodes.push(vibrato)
      })
      
      setMusicNodes(nodes)
    }
  }

  const stopMusicBackground = () => {
    musicNodes.forEach(node => {
      try {
        node.stop()
      } catch (e) {
        // Already stopped
      }
    })
    setMusicNodes([])
    if (audioContext) {
      audioContext.close()
      setAudioContext(null)
    }
  }

  const speakMusic = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      setIsReading(true)
      playMusicBackground()
      
      // Add rhythm to lyrics
      const rhythmicLyrics = item.lyrics
        .replace(/,/g, ', ... ')
        .replace(/!/g, '! ... ')
        .replace(/\n/g, ' ... ')
      
      const fullText = `${item.name}. ${rhythmicLyrics}`
      const utterance = new SpeechSynthesisUtterance(fullText)
      
      const femaleVoice = getFemaleVoice()
      if (femaleVoice) {
        utterance.voice = femaleVoice
      }
      
      utterance.rate = 0.6 // Very slow, song-like
      utterance.pitch = 1.4 // Higher, musical pitch
      utterance.volume = 1
      utterance.onend = () => {
        setIsReading(false)
        stopMusicBackground()
      }
      window.speechSynthesis.speak(utterance)
    }
  }

  const stopReading = () => {
    window.speechSynthesis.cancel()
    setIsReading(false)
    stopMusicBackground()
  }

  return (
    <motion.div className="music-card content-card">
      <motion.div 
        className="emoji-huge"
        animate={{ 
          y: [0, -20, 0],
          rotate: [0, 15, -15, 0]
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {item.emoji}
      </motion.div>
      <div className="music-name">{item.name}</div>
      <div className="music-lyrics">{item.lyrics}</div>
      <div className="music-tune">Tune: {item.tune}</div>
      <motion.div 
        className="music-notes"
        animate={{ x: [0, 10, -10, 0] }}
        transition={{ duration: 1, repeat: Infinity }}
      >
        🎵 🎶 🎵
      </motion.div>
      <div className="rhyme-buttons">
        {!isReading ? (
          <motion.button
            className="speak-button rhyme-speak"
            onClick={speakMusic}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            🔊 Sing Song
          </motion.button>
        ) : (
          <motion.button
            className="speak-button stop-button"
            onClick={stopReading}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            ⏸️ Stop
          </motion.button>
        )}
      </div>
    </motion.div>
  )
}

// Component for Money items (Pre-School)
const MoneyCard = ({ item }) => {
  const speakMoney = () => {
    speakWithVoice(`${item.coin}. Value: ${item.value}. It equals ${item.count} pennies.`, 0.8)
  }

  return (
    <motion.div className="money-card content-card">
      <motion.div 
        className="emoji-huge"
        animate={{ 
          rotateY: [0, 180, 360],
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {item.emoji}
      </motion.div>
      <div className="money-name">{item.coin}</div>
      <div className="money-value">Value: {item.value}</div>
      <div className="money-color">Color: {item.color}</div>
      <motion.div 
        className="money-count"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        = {item.count} pennies
      </motion.div>
      <motion.button
        className="speak-button"
        onClick={speakMoney}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        🔊 Read About Money
      </motion.button>
    </motion.div>
  )
}

// Component for Savings goals
const FinanceCard = ({ item }) => (
  <motion.div className="finance-card content-card">
    <motion.div 
      className="emoji-huge"
      animate={{ 
        scale: [1, 1.2, 1],
        rotate: [0, 10, -10, 0]
      }}
      transition={{ duration: 2, repeat: Infinity }}
    >
      {item.emoji}
    </motion.div>
    <div className="finance-concept">{item.concept}</div>
    <div className="finance-lesson">{item.lesson}</div>
    <motion.div 
      className="finance-tip"
      animate={{ y: [0, -5, 0] }}
      transition={{ duration: 2, repeat: Infinity }}
    >
      💡 {item.tip}
    </motion.div>
    {item.inspiration && (
      <motion.div 
        className="finance-inspiration"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        ✨ {item.inspiration} ✨
      </motion.div>
    )}
  </motion.div>
)

// Component for Savings goals
const SavingsCard = ({ item }) => {
  const speakSavings = () => {
    speakWithVoice(`${item.goal}. Save ${item.amount} in ${item.days}. ${item.tip}`, 0.8)
  }

  return (
    <motion.div className="savings-card content-card">
      <motion.div 
        className="emoji-huge"
        animate={{ 
          y: [0, -15, 0],
          rotate: [0, 5, -5, 0]
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {item.emoji}
      </motion.div>
      <div className="savings-goal">Goal: {item.goal}</div>
      <div className="savings-amount">Save: {item.amount}</div>
      <div className="savings-days">Time: {item.days}</div>
      <motion.div 
        className="savings-tip"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        💡 {item.tip}
      </motion.div>
      <motion.button
        className="speak-button"
        onClick={speakSavings}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        🔊 Read Savings Goal
      </motion.button>
    </motion.div>
  )
}

// Component for Money Stories
const MoneyStoryCard = ({ item }) => (
  <motion.div className="money-story-card content-card">
    <motion.div 
      className="emoji-huge"
      animate={{ scale: [1, 1.15, 1] }}
      transition={{ duration: 2, repeat: Infinity }}
    >
      {item.emoji}
    </motion.div>
    <div className="story-title">{item.title}</div>
    <div className="story-text">{item.story}</div>
    <div className="story-moral">
      🌟 {item.moral}
    </div>
    <div className="story-lesson">
      📖 Lesson: {item.lesson}
    </div>
  </motion.div>
)

// Component for Money Games
const MoneyGameCard = ({ item }) => (
  <motion.div className="money-game-card content-card">
    <motion.div 
      className="emoji-huge"
      animate={{ 
        rotate: [0, 360]
      }}
      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
    >
      {item.emoji}
    </motion.div>
    <div className="game-name">{item.game}</div>
    <div className="game-description">{item.description}</div>
    <div className="game-skill">
      🎯 Skill: {item.skill}
    </div>
    <motion.button
      className="game-play-button"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      🎮 Play Now!
    </motion.button>
  </motion.div>
)

// Component for Coding items
const CodingCard = ({ item }) => (
  <motion.div className="coding-card content-card">
    <motion.div 
      className="emoji-huge"
      animate={{ 
        scale: [1, 1.15, 1]
      }}
      transition={{ duration: 1.5, repeat: Infinity }}
    >
      {item.emoji}
    </motion.div>
    <div className="coding-concept">{item.concept}</div>
    <div className="coding-explanation">{item.explanation}</div>
    <div className="coding-example">
      Example: {item.example}
    </div>
  </motion.div>
)

// Component for Computer items
const ComputerCard = ({ item }) => (
  <motion.div className="computer-card content-card">
    <motion.div 
      className="emoji-huge"
      animate={{ 
        y: [0, -10, 0],
        scale: [1, 1.1, 1]
      }}
      transition={{ duration: 2, repeat: Infinity }}
    >
      {item.emoji}
    </motion.div>
    <div className="computer-part">{item.part}</div>
    <div className="computer-function">{item.function}</div>
    <div className="computer-usage">
      How we use it: {item.usage}
    </div>
  </motion.div>
)

// Component for Vehicle items
const VehicleCard = ({ item }) => (
  <motion.div className="vehicle-card content-card">
    <motion.div 
      className="emoji-huge"
      animate={{ 
        x: [0, 20, 0],
        rotate: [0, 5, -5, 0]
      }}
      transition={{ duration: 2, repeat: Infinity }}
    >
      {item.emoji}
    </motion.div>
    <div className="vehicle-name">{item.name}</div>
    <div className="vehicle-type">Travels on: {item.type}</div>
    <motion.div 
      className="vehicle-sound"
      animate={{ scale: [1, 1.1, 1] }}
      transition={{ duration: 1, repeat: Infinity }}
    >
      🔊 {item.sound}
    </motion.div>
    <div className="vehicle-wheels">Wheels: {item.wheels}</div>
  </motion.div>
)

// Component for Space items
const SpaceCard = ({ item }) => (
  <motion.div className="space-card content-card">
    <motion.div 
      className="emoji-huge"
      animate={{ 
        rotate: [0, 360],
        scale: [1, 1.2, 1]
      }}
      transition={{ duration: 4, repeat: Infinity }}
    >
      {item.emoji}
    </motion.div>
    <div className="space-object">{item.object}</div>
    <div className="space-fact">{item.fact}</div>
    <div className="space-distance">
      Distance: {item.distance}
    </div>
  </motion.div>
)

// Component for Dinosaur items
const DinosaurCard = ({ item }) => (
  <motion.div className="dinosaur-card content-card">
    <motion.div 
      className="emoji-huge"
      animate={{ 
        scale: [1, 1.2, 1],
        rotate: [0, -5, 5, 0]
      }}
      transition={{ duration: 2, repeat: Infinity }}
    >
      {item.emoji}
    </motion.div>
    <div className="dinosaur-name">{item.name}</div>
    <div className="dinosaur-type">{item.type}</div>
    <div className="dinosaur-size">Size: {item.size}</div>
    <div className="dinosaur-fact">
      🦴 {item.fact}
    </div>
  </motion.div>
)

// Component for Vegetable items
const VegetableCard = ({ item }) => {
  const speakVegetable = () => {
    speakWithVoice(`${item.name}. ${item.description}. ${item.benefit}.`, 0.8)
  }

  return (
    <motion.div className="vegetable-card content-card">
      <motion.div 
        className="emoji-huge"
        animate={{ 
          scale: [1, 1.15, 1],
          rotate: [0, 10, -10, 0]
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {item.emoji}
      </motion.div>
      <div className="fruit-name">{item.name}</div>
      <div className="science-fact">{item.description}</div>
      <div className="info-badge">
        ✨ {item.benefit}
      </div>
      <motion.button
        className="speak-button"
        onClick={speakVegetable}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        🔊 Read About Vegetable
      </motion.button>
    </motion.div>
  )
}

// Component for Family items
const FamilyCard = ({ item }) => {
  const speakFamily = () => {
    speakWithVoice(`${item.name}. ${item.description}. ${item.role}.`, 0.8)
  }

  return (
    <motion.div className="family-card content-card">
      <motion.div 
        className="emoji-huge"
        animate={{ 
          scale: [1, 1.2, 1]
        }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        {item.emoji}
      </motion.div>
      <div className="animal-name">{item.name}</div>
      <div className="science-fact">{item.description}</div>
      <div className="animal-habitat">
        {item.role}
      </div>
      <motion.button
        className="speak-button"
        onClick={speakFamily}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        🔊 Read About Family
      </motion.button>
    </motion.div>
  )
}

// Component for Weather items
const WeatherCard = ({ item }) => {
  const speakWeather = () => {
    speakWithVoice(`${item.name}. ${item.description}. ${item.activity}.`, 0.8)
  }

  return (
    <motion.div className="weather-card content-card">
      <motion.div 
        className="emoji-huge"
        animate={{ 
          scale: [1, 1.2, 1],
          y: [0, -10, 0]
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {item.emoji}
      </motion.div>
      <div className="fruit-name">{item.name}</div>
      <div className="science-fact">{item.description}</div>
      <div className="info-badge">
        🎯 {item.activity}
      </div>
      <motion.button
        className="speak-button"
        onClick={speakWeather}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        🔊 Read About Weather
      </motion.button>
    </motion.div>
  )
}

// Component for Time of Day items
const TimeOfDayCard = ({ item }) => {
  const speakTimeOfDay = () => {
    speakWithVoice(`${item.name}. ${item.description}. ${item.activity}.`, 0.8)
  }

  return (
    <motion.div className="timeofday-card content-card">
      <motion.div 
        className="emoji-huge"
        animate={{ 
          scale: [1, 1.15, 1]
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {item.emoji}
      </motion.div>
      <div className="fruit-name">{item.name}</div>
      <div className="science-fact">{item.description}</div>
      <div className="info-badge">
        🎯 {item.activity}
      </div>
      <motion.button
        className="speak-button"
        onClick={speakTimeOfDay}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        🔊 Read Time of Day
      </motion.button>
    </motion.div>
  )
}

// Component for Emotion items
const EmotionCard = ({ item }) => {
  const speakEmotion = () => {
    speakWithVoice(`${item.name}. ${item.description}. ${item.when}.`, 0.8)
  }

  return (
    <motion.div className="emotion-card content-card">
      <motion.div 
        className="emoji-huge"
        animate={{ 
          scale: [1, 1.2, 1],
          rotate: [0, 5, -5, 0]
        }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        {item.emoji}
      </motion.div>
      <div className="animal-name">{item.name}</div>
      <div className="science-fact">{item.description}</div>
      <div className="animal-habitat">
        {item.when}
      </div>
      <motion.button
        className="speak-button"
        onClick={speakEmotion}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        🔊 Read About Feeling
      </motion.button>
    </motion.div>
  )
}

// Component for Day of Week items
const DayOfWeekCard = ({ item }) => {
  const speakDay = () => {
    speakWithVoice(`${item.day}. ${item.description}. ${item.activity}.`, 0.8)
  }

  return (
    <motion.div className="dayofweek-card content-card">
      <motion.div 
        className="emoji-huge"
        animate={{ 
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        {item.emoji}
      </motion.div>
      <div className="fruit-name">{item.day}</div>
      <div className="science-fact">{item.description}</div>
      <div className="info-badge">
        🎯 {item.activity}
      </div>
      <motion.button
        className="speak-button"
        onClick={speakDay}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        🔊 Read Day
      </motion.button>
    </motion.div>
  )
}

// Component for Season items
const SeasonCard = ({ item }) => {
  const speakSeason = () => {
    speakWithVoice(`${item.season}. ${item.description}. Weather: ${item.weather}. Activity: ${item.activity}.`, 0.8)
  }

  return (
    <motion.div className="season-card content-card">
      <motion.div 
        className="emoji-huge"
        animate={{ 
          scale: [1, 1.2, 1],
          rotate: [0, 360]
        }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        {item.emoji}
      </motion.div>
      <div className="fruit-name">{item.season}</div>
      <div className="science-fact">{item.description}</div>
      <div className="animal-habitat">
        Weather: {item.weather}
      </div>
      <div className="info-badge">
        🎯 {item.activity}
      </div>
      <motion.button
        className="speak-button"
        onClick={speakSeason}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        🔊 Read About Season
      </motion.button>
    </motion.div>
  )
}

// Component for Opposite items
const OppositeCard = ({ item }) => {
  const speakOpposite = () => {
    speakWithVoice(`${item.word1} and ${item.word2} are opposites. ${item.example}.`, 0.8)
  }

  return (
    <motion.div className="opposite-card content-card">
      <div className="pattern-label">Opposites</div>
      <div className="pattern-display">
        <motion.div 
          className="pattern-element"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          {item.emoji1}
          <div style={{ fontSize: '1.2rem', marginTop: '8px' }}>{item.word1}</div>
        </motion.div>
        <div style={{ fontSize: '2rem' }}>↔️</div>
        <motion.div 
          className="pattern-element"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1, repeat: Infinity, delay: 0.5 }}
        >
          {item.emoji2}
          <div style={{ fontSize: '1.2rem', marginTop: '8px' }}>{item.word2}</div>
        </motion.div>
      </div>
      <div className="science-fact">{item.example}</div>
      <motion.button
        className="speak-button"
        onClick={speakOpposite}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        🔊 Read Opposites
      </motion.button>
    </motion.div>
  )
}

// Component for Clothing items
const ClothingCard = ({ item }) => {
  const speakClothing = () => {
    speakWithVoice(`${item.name}. ${item.description}. When: ${item.when}.`, 0.8)
  }

  return (
    <motion.div className="clothing-card content-card">
      <motion.div 
        className="emoji-huge"
        animate={{ 
          y: [0, -10, 0],
          rotate: [0, 5, -5, 0]
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {item.emoji}
      </motion.div>
      <div className="fruit-name">{item.name}</div>
      <div className="science-fact">{item.description}</div>
      <div className="info-badge">
        When: {item.when}
      </div>
      <motion.button
        className="speak-button"
        onClick={speakClothing}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        🔊 Read About Clothing
      </motion.button>
    </motion.div>
  )
}

// Component for Community Helper items
const HelperCard = ({ item }) => {
  const speakHelper = () => {
    speakWithVoice(`${item.name}. ${item.description}. ${item.helps}.`, 0.8)
  }

  return (
    <motion.div className="helper-card content-card">
      <motion.div 
        className="emoji-huge"
        animate={{ 
          scale: [1, 1.15, 1]
        }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        {item.emoji}
      </motion.div>
      <div className="animal-name">{item.name}</div>
      <div className="science-fact">{item.description}</div>
      <div className="animal-habitat">
        💪 {item.helps}
      </div>
      <motion.button
        className="speak-button"
        onClick={speakHelper}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        🔊 Read About Helper
      </motion.button>
    </motion.div>
  )
}

// Component for Letter Game items
const LetterGameCard = ({ item }) => {
  const [showAnswer, setShowAnswer] = useState(false)

  const speakQuestion = () => {
    speakWithVoice(item.question, 0.8)
  }

  const speakAnswer = () => {
    speakWithVoice(`The answer is ${item.answer}`, 0.8)
  }

  return (
    <motion.div className="quiz-card content-card">
      <motion.div 
        className="emoji-huge"
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {item.emoji}
      </motion.div>
      <div className="quiz-question">{item.question}</div>
      <div className="pattern-display" style={{ fontSize: '2.5rem', margin: '20px 0' }}>
        {item.hint}
      </div>
      {!showAnswer ? (
        <motion.button
          className="quiz-option"
          onClick={() => setShowAnswer(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Show Answer
        </motion.button>
      ) : (
        <motion.div 
          className="quiz-result success"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
        >
          <div style={{ fontSize: '4rem', margin: '10px 0' }}>{item.answer}</div>
          <div>✅ The answer is: <strong>{item.answer}</strong></div>
        </motion.div>
      )}
      <div style={{ display: 'flex', gap: '10px', marginTop: '15px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <motion.button
          className="speak-button"
          onClick={speakQuestion}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          🔊 Read Question
        </motion.button>
        {showAnswer && (
          <motion.button
            className="speak-button"
            onClick={speakAnswer}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            🔊 Read Answer
          </motion.button>
        )}
      </div>
    </motion.div>
  )
}

// Component for Number Game items
const NumberGameCard = ({ item }) => {
  const [showAnswer, setShowAnswer] = useState(false)

  const speakQuestion = () => {
    speakWithVoice(item.question, 0.8)
  }

  const speakAnswer = () => {
    speakWithVoice(`The answer is ${item.answer}`, 0.8)
  }

  return (
    <motion.div className="quiz-card content-card">
      <motion.div 
        className="emoji-huge"
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {item.emoji}
      </motion.div>
      <div className="quiz-question">{item.question}</div>
      <div className="pattern-display" style={{ fontSize: '3rem', margin: '20px 0' }}>
        {item.visual}
      </div>
      <div style={{ fontSize: '1.3rem', color: '#666', margin: '10px 0' }}>
        💡 Hint: {item.hint}
      </div>
      {!showAnswer ? (
        <motion.button
          className="quiz-option"
          onClick={() => setShowAnswer(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Show Answer
        </motion.button>
      ) : (
        <motion.div 
          className="quiz-result success"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
        >
          <div style={{ fontSize: '5rem', margin: '10px 0' }}>{item.answer}</div>
          <div>✅ The answer is: <strong>{item.answer}</strong></div>
        </motion.div>
      )}
      <div style={{ display: 'flex', gap: '10px', marginTop: '15px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <motion.button
          className="speak-button"
          onClick={speakQuestion}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          🔊 Read Question
        </motion.button>
        {showAnswer && (
          <motion.button
            className="speak-button"
            onClick={speakAnswer}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            🔊 Read Answer
          </motion.button>
        )}
      </div>
    </motion.div>
  )
}

// Component for Memory Game items
const MemoryGameCard = ({ item }) => {
  const [showAnswer, setShowAnswer] = useState(false)

  const speakQuestion = () => {
    speakWithVoice(item.question, 0.8)
  }

  const speakAnswer = () => {
    speakWithVoice(`The answer is ${item.answer}`, 0.8)
  }

  return (
    <motion.div className="quiz-card content-card">
      <motion.div 
        className="emoji-huge"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 1, repeat: Infinity }}
      >
        {item.emoji}
      </motion.div>
      <div className="quiz-question">{item.question}</div>
      <div style={{ fontSize: '1.3rem', color: '#666', margin: '20px 0' }}>
        💡 {item.hint}
      </div>
      {!showAnswer ? (
        <motion.button
          className="quiz-option"
          onClick={() => setShowAnswer(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Show Answer
        </motion.button>
      ) : (
        <motion.div 
          className="quiz-result success"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
        >
          <div style={{ fontSize: '3rem', margin: '10px 0' }}>✅</div>
          <div>The answer is: <strong>{item.answer}</strong></div>
        </motion.div>
      )}
      <div style={{ display: 'flex', gap: '10px', marginTop: '15px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <motion.button
          className="speak-button"
          onClick={speakQuestion}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          🔊 Read Question
        </motion.button>
        {showAnswer && (
          <motion.button
            className="speak-button"
            onClick={speakAnswer}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            🔊 Read Answer
          </motion.button>
        )}
      </div>
    </motion.div>
  )
}

// Component for Pattern Game items
const PatternGameCard = ({ item }) => {
  const [showAnswer, setShowAnswer] = useState(false)

  const speakQuestion = () => {
    speakWithVoice(item.question, 0.8)
  }

  const speakAnswer = () => {
    speakWithVoice(`The answer is ${item.answer}`, 0.8)
  }

  return (
    <motion.div className="quiz-card content-card">
      <motion.div 
        className="emoji-huge"
        animate={{ rotate: [0, 5, -5, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {item.emoji}
      </motion.div>
      <div className="quiz-question">{item.question}</div>
      <div style={{ fontSize: '1.3rem', color: '#666', margin: '20px 0' }}>
        💡 {item.hint}
      </div>
      {!showAnswer ? (
        <motion.button
          className="quiz-option"
          onClick={() => setShowAnswer(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Show Answer
        </motion.button>
      ) : (
        <motion.div 
          className="quiz-result success"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
        >
          <div style={{ fontSize: '3rem', margin: '10px 0' }}>✅</div>
          <div>The answer is: <strong>{item.answer}</strong></div>
        </motion.div>
      )}
      <div style={{ display: 'flex', gap: '10px', marginTop: '15px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <motion.button
          className="speak-button"
          onClick={speakQuestion}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          🔊 Read Question
        </motion.button>
        {showAnswer && (
          <motion.button
            className="speak-button"
            onClick={speakAnswer}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            🔊 Read Answer
          </motion.button>
        )}
      </div>
    </motion.div>
  )
}

// Component for Logic Game items
const LogicGameCard = ({ item }) => {
  const [showAnswer, setShowAnswer] = useState(false)

  const speakQuestion = () => {
    speakWithVoice(item.question, 0.8)
  }

  const speakAnswer = () => {
    speakWithVoice(`The answer is ${item.answer}`, 0.8)
  }

  return (
    <motion.div className="quiz-card content-card">
      <motion.div 
        className="emoji-huge"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        {item.emoji}
      </motion.div>
      <div className="quiz-question">{item.question}</div>
      <div style={{ fontSize: '1.3rem', color: '#666', margin: '20px 0' }}>
        💡 {item.hint}
      </div>
      {!showAnswer ? (
        <motion.button
          className="quiz-option"
          onClick={() => setShowAnswer(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Show Answer
        </motion.button>
      ) : (
        <motion.div 
          className="quiz-result success"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
        >
          <div style={{ fontSize: '3rem', margin: '10px 0' }}>✅</div>
          <div>The answer is: <strong>{item.answer}</strong></div>
        </motion.div>
      )}
      <div style={{ display: 'flex', gap: '10px', marginTop: '15px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <motion.button
          className="speak-button"
          onClick={speakQuestion}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          🔊 Read Question
        </motion.button>
        {showAnswer && (
          <motion.button
            className="speak-button"
            onClick={speakAnswer}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            🔊 Read Answer
          </motion.button>
        )}
      </div>
    </motion.div>
  )
}

// Component for Counting Game items
const CountingGameCard = ({ item }) => {
  const [showAnswer, setShowAnswer] = useState(false)

  const speakQuestion = () => {
    speakWithVoice(item.question, 0.8)
  }

  const speakAnswer = () => {
    speakWithVoice(`The answer is ${item.answer}`, 0.8)
  }

  return (
    <motion.div className="quiz-card content-card">
      <motion.div 
        className="emoji-huge"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 1, repeat: Infinity }}
      >
        {item.emoji}
      </motion.div>
      <div className="quiz-question">{item.question}</div>
      <div style={{ fontSize: '1.3rem', color: '#666', margin: '20px 0' }}>
        💡 {item.hint}
      </div>
      {!showAnswer ? (
        <motion.button
          className="quiz-option"
          onClick={() => setShowAnswer(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Show Answer
        </motion.button>
      ) : (
        <motion.div 
          className="quiz-result success"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
        >
          <div style={{ fontSize: '5rem', margin: '10px 0' }}>{item.answer}</div>
          <div>✅ Correct! The answer is: <strong>{item.answer}</strong></div>
        </motion.div>
      )}
      <div style={{ display: 'flex', gap: '10px', marginTop: '15px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <motion.button
          className="speak-button"
          onClick={speakQuestion}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          🔊 Read Question
        </motion.button>
        {showAnswer && (
          <motion.button
            className="speak-button"
            onClick={speakAnswer}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            🔊 Read Answer
          </motion.button>
        )}
      </div>
    </motion.div>
  )
}

// Component for Shape Match items
const ShapeMatchCard = ({ item }) => {
  const [showAnswer, setShowAnswer] = useState(false)

  const speakQuestion = () => {
    speakWithVoice(item.question, 0.8)
  }

  const speakAnswer = () => {
    speakWithVoice(`The answer is ${item.answer}`, 0.8)
  }

  return (
    <motion.div className="quiz-card content-card">
      <motion.div 
        className="emoji-huge"
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      >
        {item.emoji}
      </motion.div>
      <div className="quiz-question">{item.question}</div>
      <div style={{ fontSize: '1.3rem', color: '#666', margin: '20px 0' }}>
        💡 {item.hint}
      </div>
      {!showAnswer ? (
        <motion.button
          className="quiz-option"
          onClick={() => setShowAnswer(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Show Answer
        </motion.button>
      ) : (
        <motion.div 
          className="quiz-result success"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
        >
          <div style={{ fontSize: '3rem', margin: '10px 0' }}>✅</div>
          <div>The answer is: <strong>{item.answer}</strong></div>
        </motion.div>
      )}
      <div style={{ display: 'flex', gap: '10px', marginTop: '15px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <motion.button
          className="speak-button"
          onClick={speakQuestion}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          🔊 Read Question
        </motion.button>
        {showAnswer && (
          <motion.button
            className="speak-button"
            onClick={speakAnswer}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            🔊 Read Answer
          </motion.button>
        )}
      </div>
    </motion.div>
  )
}

// Component for Color Mix items
const ColorMixCard = ({ item }) => {
  const [showAnswer, setShowAnswer] = useState(false)

  const speakQuestion = () => {
    speakWithVoice(item.question, 0.8)
  }

  const speakAnswer = () => {
    speakWithVoice(`The answer is ${item.answer}`, 0.8)
  }

  return (
    <motion.div className="quiz-card content-card">
      <motion.div 
        className="emoji-huge"
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {item.emoji}
      </motion.div>
      <div className="quiz-question">{item.question}</div>
      <div style={{ fontSize: '1.3rem', color: '#666', margin: '20px 0' }}>
        💡 {item.hint}
      </div>
      {!showAnswer ? (
        <motion.button
          className="quiz-option"
          onClick={() => setShowAnswer(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Show Answer
        </motion.button>
      ) : (
        <motion.div 
          className="quiz-result success"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
        >
          <div style={{ fontSize: '3rem', margin: '10px 0' }}>✅</div>
          <div>The answer is: <strong>{item.answer}</strong></div>
        </motion.div>
      )}
      <div style={{ display: 'flex', gap: '10px', marginTop: '15px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <motion.button
          className="speak-button"
          onClick={speakQuestion}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          🔊 Read Question
        </motion.button>
        {showAnswer && (
          <motion.button
            className="speak-button"
            onClick={speakAnswer}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            🔊 Read Answer
          </motion.button>
        )}
      </div>
    </motion.div>
  )
}

// Component for Brain Gym Activity items
const BrainGymCard = ({ item }) => {
  const speakName = () => {
    speakWithVoice(item.name, 0.8)
  }

  const speakInstruction = () => {
    speakWithVoice(item.instruction, 0.7)
  }

  const speakAll = () => {
    speakWithVoice(`${item.name}. ${item.instruction}. ${item.benefit}. ${item.duration}`, 0.7)
  }

  return (
    <motion.div className="activity-card content-card">
      <motion.div 
        className="emoji-huge"
        animate={{ scale: [1, 1.2, 1], rotate: [0, 5, -5, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {item.emoji}
      </motion.div>
      <h2 style={{ fontSize: '2rem', margin: '20px 0', color: '#2c3e50' }}>{item.name}</h2>
      
      <motion.div 
        className="activity-instruction"
        style={{ 
          backgroundColor: '#e3f2fd', 
          padding: '20px', 
          borderRadius: '15px',
          margin: '15px 0',
          fontSize: '1.3rem'
        }}
      >
        <div style={{ fontSize: '1.5rem', marginBottom: '10px' }}>📋 Instructions:</div>
        <div style={{ fontWeight: 'bold', color: '#1976d2' }}>{item.instruction}</div>
      </motion.div>

      <div style={{ 
        backgroundColor: '#f1f8e9', 
        padding: '15px', 
        borderRadius: '15px',
        margin: '15px 0',
        fontSize: '1.2rem'
      }}>
        <div style={{ fontSize: '1.3rem', marginBottom: '8px' }}>⏱️ Duration:</div>
        <div style={{ color: '#558b2f' }}>{item.duration}</div>
      </div>

      <div style={{ 
        backgroundColor: '#fff3e0', 
        padding: '15px', 
        borderRadius: '15px',
        margin: '15px 0',
        fontSize: '1.2rem'
      }}>
        <div style={{ fontSize: '1.3rem', marginBottom: '8px' }}>🎯 Benefits:</div>
        <div style={{ color: '#e65100' }}>{item.benefit}</div>
      </div>

      <div style={{ display: 'flex', gap: '10px', marginTop: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <motion.button
          className="speak-button"
          onClick={speakName}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          🔊 Activity Name
        </motion.button>
        <motion.button
          className="speak-button"
          onClick={speakInstruction}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          🔊 Instructions
        </motion.button>
        <motion.button
          className="speak-button"
          onClick={speakAll}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          🔊 Read All
        </motion.button>
      </div>
    </motion.div>
  )
}

// Component for Sensory Play items
const SensoryPlayCard = ({ item }) => {
  const speakName = () => {
    speakWithVoice(item.name, 0.8)
  }

  const speakInstruction = () => {
    speakWithVoice(item.instruction, 0.7)
  }

  const speakAll = () => {
    speakWithVoice(`${item.name}. ${item.instruction}. This develops ${item.sense} sense. ${item.benefit}`, 0.7)
  }

  return (
    <motion.div className="activity-card content-card">
      <motion.div 
        className="emoji-huge"
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        {item.emoji}
      </motion.div>
      <h2 style={{ fontSize: '2rem', margin: '20px 0', color: '#2c3e50' }}>{item.name}</h2>
      
      <motion.div 
        className="activity-instruction"
        style={{ 
          backgroundColor: '#f3e5f5', 
          padding: '20px', 
          borderRadius: '15px',
          margin: '15px 0',
          fontSize: '1.3rem'
        }}
      >
        <div style={{ fontSize: '1.5rem', marginBottom: '10px' }}>📋 Try This:</div>
        <div style={{ fontWeight: 'bold', color: '#7b1fa2' }}>{item.instruction}</div>
      </motion.div>

      <div style={{ 
        backgroundColor: '#e8f5e9', 
        padding: '15px', 
        borderRadius: '15px',
        margin: '15px 0',
        fontSize: '1.2rem'
      }}>
        <div style={{ fontSize: '1.3rem', marginBottom: '8px' }}>👁️ Sense:</div>
        <div style={{ color: '#2e7d32', fontWeight: 'bold' }}>{item.sense}</div>
      </div>

      <div style={{ 
        backgroundColor: '#fff8e1', 
        padding: '15px', 
        borderRadius: '15px',
        margin: '15px 0',
        fontSize: '1.2rem'
      }}>
        <div style={{ fontSize: '1.3rem', marginBottom: '8px' }}>🎯 Benefits:</div>
        <div style={{ color: '#f57f17' }}>{item.benefit}</div>
      </div>

      <div style={{ display: 'flex', gap: '10px', marginTop: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <motion.button
          className="speak-button"
          onClick={speakName}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          🔊 Activity Name
        </motion.button>
        <motion.button
          className="speak-button"
          onClick={speakInstruction}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          🔊 Instructions
        </motion.button>
        <motion.button
          className="speak-button"
          onClick={speakAll}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          🔊 Read All
        </motion.button>
      </div>
    </motion.div>
  )
}

// Component for Movement Game items
const MovementGameCard = ({ item }) => {
  const speakName = () => {
    speakWithVoice(item.name, 0.8)
  }

  const speakInstruction = () => {
    speakWithVoice(item.instruction, 0.7)
  }

  const speakAll = () => {
    speakWithVoice(`${item.name}. ${item.instruction}. ${item.benefit}. ${item.music}`, 0.7)
  }

  return (
    <motion.div className="activity-card content-card">
      <motion.div 
        className="emoji-huge"
        animate={{ 
          scale: [1, 1.3, 1],
          rotate: [0, 10, -10, 0]
        }}
        transition={{ duration: 1, repeat: Infinity }}
      >
        {item.emoji}
      </motion.div>
      <h2 style={{ fontSize: '2rem', margin: '20px 0', color: '#2c3e50' }}>{item.name}</h2>
      
      <motion.div 
        className="activity-instruction"
        style={{ 
          backgroundColor: '#fce4ec', 
          padding: '20px', 
          borderRadius: '15px',
          margin: '15px 0',
          fontSize: '1.3rem'
        }}
      >
        <div style={{ fontSize: '1.5rem', marginBottom: '10px' }}>💃 Let's Move:</div>
        <div style={{ fontWeight: 'bold', color: '#c2185b' }}>{item.instruction}</div>
      </motion.div>

      <div style={{ 
        backgroundColor: '#e0f2f1', 
        padding: '15px', 
        borderRadius: '15px',
        margin: '15px 0',
        fontSize: '1.2rem'
      }}>
        <div style={{ fontSize: '1.3rem', marginBottom: '8px' }}>🎵 Music Tip:</div>
        <div style={{ color: '#00695c' }}>{item.music}</div>
      </div>

      <div style={{ 
        backgroundColor: '#fff9c4', 
        padding: '15px', 
        borderRadius: '15px',
        margin: '15px 0',
        fontSize: '1.2rem'
      }}>
        <div style={{ fontSize: '1.3rem', marginBottom: '8px' }}>🎯 Benefits:</div>
        <div style={{ color: '#f57f17' }}>{item.benefit}</div>
      </div>

      <div style={{ display: 'flex', gap: '10px', marginTop: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <motion.button
          className="speak-button"
          onClick={speakName}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          🔊 Activity Name
        </motion.button>
        <motion.button
          className="speak-button"
          onClick={speakInstruction}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          🔊 Instructions
        </motion.button>
        <motion.button
          className="speak-button"
          onClick={speakAll}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          🔊 Read All
        </motion.button>
      </div>
    </motion.div>
  )
}

// Component for Coordination items
const CoordinationCard = ({ item }) => {
  const speakName = () => {
    speakWithVoice(item.name, 0.8)
  }

  const speakInstruction = () => {
    speakWithVoice(item.instruction, 0.7)
  }

  const speakAll = () => {
    speakWithVoice(`${item.name}. ${item.instruction}. This improves ${item.skill}. ${item.benefit}`, 0.7)
  }

  return (
    <motion.div className="activity-card content-card">
      <motion.div 
        className="emoji-huge"
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        {item.emoji}
      </motion.div>
      <h2 style={{ fontSize: '2rem', margin: '20px 0', color: '#2c3e50' }}>{item.name}</h2>
      
      <motion.div 
        className="activity-instruction"
        style={{ 
          backgroundColor: '#e8eaf6', 
          padding: '20px', 
          borderRadius: '15px',
          margin: '15px 0',
          fontSize: '1.3rem'
        }}
      >
        <div style={{ fontSize: '1.5rem', marginBottom: '10px' }}>🎯 Activity:</div>
        <div style={{ fontWeight: 'bold', color: '#3f51b5' }}>{item.instruction}</div>
      </motion.div>

      <div style={{ 
        backgroundColor: '#e0f7fa', 
        padding: '15px', 
        borderRadius: '15px',
        margin: '15px 0',
        fontSize: '1.2rem'
      }}>
        <div style={{ fontSize: '1.3rem', marginBottom: '8px' }}>🏆 Skill:</div>
        <div style={{ color: '#00838f', fontWeight: 'bold' }}>{item.skill}</div>
      </div>

      <div style={{ 
        backgroundColor: '#f3e5f5', 
        padding: '15px', 
        borderRadius: '15px',
        margin: '15px 0',
        fontSize: '1.2rem'
      }}>
        <div style={{ fontSize: '1.3rem', marginBottom: '8px' }}>🎯 Benefits:</div>
        <div style={{ color: '#6a1b9a' }}>{item.benefit}</div>
      </div>

      <div style={{ display: 'flex', gap: '10px', marginTop: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <motion.button
          className="speak-button"
          onClick={speakName}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          🔊 Activity Name
        </motion.button>
        <motion.button
          className="speak-button"
          onClick={speakInstruction}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          🔊 Instructions
        </motion.button>
        <motion.button
          className="speak-button"
          onClick={speakAll}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          🔊 Read All
        </motion.button>
      </div>
    </motion.div>
  )
}

// Component for Brain Booster items
const BrainBoosterCard = ({ item }) => {
  const speakName = () => {
    speakWithVoice(item.name, 0.8)
  }

  const speakInstruction = () => {
    speakWithVoice(item.instruction, 0.7)
  }

  const speakAll = () => {
    speakWithVoice(`${item.name}. ${item.instruction}. This is a ${item.type} activity. ${item.benefit}`, 0.7)
  }

  return (
    <motion.div className="activity-card content-card">
      <motion.div 
        className="emoji-huge"
        animate={{ 
          scale: [1, 1.2, 1],
          rotate: [0, 360]
        }}
        transition={{ 
          scale: { duration: 2, repeat: Infinity },
          rotate: { duration: 3, repeat: Infinity, ease: "linear" }
        }}
      >
        {item.emoji}
      </motion.div>
      <h2 style={{ fontSize: '2rem', margin: '20px 0', color: '#2c3e50' }}>{item.name}</h2>
      
      <motion.div 
        className="activity-instruction"
        style={{ 
          backgroundColor: '#fff3e0', 
          padding: '20px', 
          borderRadius: '15px',
          margin: '15px 0',
          fontSize: '1.3rem'
        }}
      >
        <div style={{ fontSize: '1.5rem', marginBottom: '10px' }}>🧠 Brain Challenge:</div>
        <div style={{ fontWeight: 'bold', color: '#ef6c00' }}>{item.instruction}</div>
      </motion.div>

      <div style={{ 
        backgroundColor: '#fce4ec', 
        padding: '15px', 
        borderRadius: '15px',
        margin: '15px 0',
        fontSize: '1.2rem'
      }}>
        <div style={{ fontSize: '1.3rem', marginBottom: '8px' }}>📚 Type:</div>
        <div style={{ color: '#c2185b', fontWeight: 'bold' }}>{item.type}</div>
      </div>

      <div style={{ 
        backgroundColor: '#e8f5e9', 
        padding: '15px', 
        borderRadius: '15px',
        margin: '15px 0',
        fontSize: '1.2rem'
      }}>
        <div style={{ fontSize: '1.3rem', marginBottom: '8px' }}>🎯 Benefits:</div>
        <div style={{ color: '#2e7d32' }}>{item.benefit}</div>
      </div>

      <div style={{ display: 'flex', gap: '10px', marginTop: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <motion.button
          className="speak-button"
          onClick={speakName}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          🔊 Activity Name
        </motion.button>
        <motion.button
          className="speak-button"
          onClick={speakInstruction}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          🔊 Instructions
        </motion.button>
        <motion.button
          className="speak-button"
          onClick={speakAll}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          🔊 Read All
        </motion.button>
      </div>
    </motion.div>
  )
}

// Component for Calm Activity items
const CalmActivityCard = ({ item }) => {
  const speakName = () => {
    speakWithVoice(item.name, 0.8)
  }

  const speakInstruction = () => {
    speakWithVoice(item.instruction, 0.6)
  }

  const speakAll = () => {
    speakWithVoice(`${item.name}. ${item.instruction}. ${item.benefit}. ${item.duration}`, 0.6)
  }

  return (
    <motion.div className="activity-card content-card">
      <motion.div 
        className="emoji-huge"
        animate={{ 
          scale: [1, 1.05, 1],
          opacity: [1, 0.8, 1]
        }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        {item.emoji}
      </motion.div>
      <h2 style={{ fontSize: '2rem', margin: '20px 0', color: '#2c3e50' }}>{item.name}</h2>
      
      <motion.div 
        className="activity-instruction"
        style={{ 
          backgroundColor: '#e8eaf6', 
          padding: '20px', 
          borderRadius: '15px',
          margin: '15px 0',
          fontSize: '1.3rem'
        }}
      >
        <div style={{ fontSize: '1.5rem', marginBottom: '10px' }}>🧘 Calm Activity:</div>
        <div style={{ fontWeight: 'bold', color: '#5e35b1' }}>{item.instruction}</div>
      </motion.div>

      <div style={{ 
        backgroundColor: '#f1f8e9', 
        padding: '15px', 
        borderRadius: '15px',
        margin: '15px 0',
        fontSize: '1.2rem'
      }}>
        <div style={{ fontSize: '1.3rem', marginBottom: '8px' }}>⏱️ Duration:</div>
        <div style={{ color: '#558b2f' }}>{item.duration}</div>
      </div>

      <div style={{ 
        backgroundColor: '#e0f2f1', 
        padding: '15px', 
        borderRadius: '15px',
        margin: '15px 0',
        fontSize: '1.2rem'
      }}>
        <div style={{ fontSize: '1.3rem', marginBottom: '8px' }}>🎯 Benefits:</div>
        <div style={{ color: '#00695c' }}>{item.benefit}</div>
      </div>

      <div style={{ display: 'flex', gap: '10px', marginTop: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <motion.button
          className="speak-button"
          onClick={speakName}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          🔊 Activity Name
        </motion.button>
        <motion.button
          className="speak-button"
          onClick={speakInstruction}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          🔊 Instructions
        </motion.button>
        <motion.button
          className="speak-button"
          onClick={speakAll}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          🔊 Read All
        </motion.button>
      </div>
    </motion.div>
  )
}

export default CategoryPage

