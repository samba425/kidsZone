import React, { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { triggerConfetti, playSuccessSound, playClickSound } from '../utils/celebration'
import { addStars } from '../utils/rewards'
import './LetterTracing.css'

const LetterTracing = () => {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
  const [currentLetter, setCurrentLetter] = useState('A')
  const [isTracing, setIsTracing] = useState(false)
  const [tracedPath, setTracedPath] = useState([])
  const [completionPercent, setCompletionPercent] = useState(0)
  const [showSuccess, setShowSuccess] = useState(false)
  const canvasRef = useRef(null)

  useEffect(() => {
    drawLetter()
  }, [currentLetter])

  const drawLetter = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    // Draw letter outline
    ctx.strokeStyle = '#ddd'
    ctx.lineWidth = 40
    ctx.font = 'bold 300px Arial'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.strokeText(currentLetter, canvas.width / 2, canvas.height / 2)
    
    // Draw letter fill
    ctx.fillStyle = '#f0f0f0'
    ctx.fillText(currentLetter, canvas.width / 2, canvas.height / 2)
  }

  const startTracing = (e) => {
    setIsTracing(true)
    playClickSound()
    const canvas = canvasRef.current
    if (!canvas) return
    
    const rect = canvas.getBoundingClientRect()
    const clientX = e.touches ? e.touches[0].clientX : e.clientX
    const clientY = e.touches ? e.touches[0].clientY : e.clientY
    const x = clientX - rect.left
    const y = clientY - rect.top
    
    setTracedPath([{ x, y }])
  }

  const trace = (e) => {
    if (!isTracing) return
    
    const canvas = canvasRef.current
    if (!canvas) return
    
    const rect = canvas.getBoundingClientRect()
    const clientX = e.touches ? e.touches[0].clientX : e.clientX
    const clientY = e.touches ? e.touches[0].clientY : e.clientY
    const x = clientX - rect.left
    const y = clientY - rect.top
    
    const newPath = [...tracedPath, { x, y }]
    setTracedPath(newPath)
    
    const ctx = canvas.getContext('2d')
    ctx.strokeStyle = '#667eea'
    ctx.lineWidth = 20
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    
    if (newPath.length > 1) {
      const lastPoint = newPath[newPath.length - 2]
      const currentPoint = newPath[newPath.length - 1]
      
      ctx.beginPath()
      ctx.moveTo(lastPoint.x, lastPoint.y)
      ctx.lineTo(currentPoint.x, currentPoint.y)
      ctx.stroke()
    }
    
    // Calculate completion (simple heuristic)
    const percent = Math.min(100, (newPath.length / 50) * 100)
    setCompletionPercent(Math.floor(percent))
  }

  const stopTracing = () => {
    setIsTracing(false)
    
    if (completionPercent >= 70) {
      setShowSuccess(true)
      playSuccessSound()
      triggerConfetti()
      addStars(2)
      
      setTimeout(() => {
        setShowSuccess(false)
      }, 2000)
    }
  }

  const nextLetter = () => {
    const currentIndex = alphabet.indexOf(currentLetter)
    const nextIndex = (currentIndex + 1) % alphabet.length
    setCurrentLetter(alphabet[nextIndex])
    clearCanvas()
  }

  const previousLetter = () => {
    const currentIndex = alphabet.indexOf(currentLetter)
    const prevIndex = currentIndex === 0 ? alphabet.length - 1 : currentIndex - 1
    setCurrentLetter(alphabet[prevIndex])
    clearCanvas()
  }

  const clearCanvas = () => {
    setTracedPath([])
    setCompletionPercent(0)
    setShowSuccess(false)
    drawLetter()
  }

  return (
    <div className="letter-tracing">
      <motion.div 
        className="tracing-header"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <h2>✏️ Letter Tracing</h2>
        <p className="instructions">Trace the letter with your finger!</p>
      </motion.div>

      <div className="current-letter-display">
        <button className="nav-btn" onClick={previousLetter}>⬅️</button>
        <div className="letter-info">
          <span className="big-letter">{currentLetter}</span>
          <span className="letter-number">{alphabet.indexOf(currentLetter) + 1} of {alphabet.length}</span>
        </div>
        <button className="nav-btn" onClick={nextLetter}>➡️</button>
      </div>

      <div className="tracing-area">
        <canvas
          ref={canvasRef}
          width={500}
          height={500}
          className="tracing-canvas"
          onMouseDown={startTracing}
          onMouseMove={trace}
          onMouseUp={stopTracing}
          onMouseLeave={stopTracing}
          onTouchStart={(e) => {
            e.preventDefault()
            startTracing(e)
          }}
          onTouchMove={(e) => {
            e.preventDefault()
            trace(e)
          }}
          onTouchEnd={stopTracing}
        />
        
        <div className="progress-indicator">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${completionPercent}%` }}
            ></div>
          </div>
          <span className="progress-text">{completionPercent}% Complete</span>
        </div>
      </div>

      <div className="tracing-controls">
        <motion.button
          className="control-btn clear-btn"
          onClick={clearCanvas}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          🔄 Try Again
        </motion.button>
        <motion.button
          className="control-btn next-btn"
          onClick={nextLetter}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          ➡️ Next Letter
        </motion.button>
      </div>

      {showSuccess && (
        <motion.div
          className="success-message"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
        >
          <span className="success-emoji">🎉</span>
          <p>Great job tracing {currentLetter}!</p>
          <p className="stars-earned">+2 ⭐</p>
        </motion.div>
      )}
    </div>
  )
}

export default LetterTracing
