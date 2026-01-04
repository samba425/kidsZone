import React, { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { triggerStarBurst, playClickSound } from '../utils/celebration'
import { addStars } from '../utils/rewards'
import './ColoringPage.css'

const ColoringPage = ({ item }) => {
  const [currentColor, setCurrentColor] = useState('#FF6B6B')
  const [strokes, setStrokes] = useState([])
  const [isDrawing, setIsDrawing] = useState(false)
  const canvasRef = useRef(null)

  const colors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8',
    '#F7DC6F', '#BB8FCE', '#85C1E2', '#F8B88B', '#AAB7B8',
    '#FF1744', '#00E676', '#2979FF', '#FF9100', '#E040FB',
    '#000000', '#FFFFFF', '#8B4513', '#FFD700', '#C0C0C0'
  ]

  const startDrawing = (e) => {
    setIsDrawing(true)
    playClickSound()
    const canvas = canvasRef.current
    if (!canvas) return
    
    const rect = canvas.getBoundingClientRect()
    const clientX = e.touches ? e.touches[0].clientX : e.clientX
    const clientY = e.touches ? e.touches[0].clientY : e.clientY
    const x = clientX - rect.left
    const y = clientY - rect.top
    
    setStrokes([...strokes, { color: currentColor, points: [{ x, y }] }])
  }

  const draw = (e) => {
    if (!isDrawing) return
    
    const canvas = canvasRef.current
    if (!canvas) return
    
    const rect = canvas.getBoundingClientRect()
    const clientX = e.touches ? e.touches[0].clientX : e.clientX
    const clientY = e.touches ? e.touches[0].clientY : e.clientY
    const x = clientX - rect.left
    const y = clientY - rect.top
    
    const newStrokes = [...strokes]
    newStrokes[newStrokes.length - 1].points.push({ x, y })
    setStrokes(newStrokes)
    
    const ctx = canvas.getContext('2d')
    ctx.strokeStyle = currentColor
    ctx.lineWidth = 5
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    
    const points = newStrokes[newStrokes.length - 1].points
    if (points.length > 1) {
      const lastPoint = points[points.length - 2]
      const currentPoint = points[points.length - 1]
      
      ctx.beginPath()
      ctx.moveTo(lastPoint.x, lastPoint.y)
      ctx.lineTo(currentPoint.x, currentPoint.y)
      ctx.stroke()
    }
  }

  const stopDrawing = () => {
    setIsDrawing(false)
  }

  const clearCanvas = () => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    drawTemplate()
    setStrokes([])
  }

  const drawTemplate = () => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    
    // Draw the emoji/letter as outline
    ctx.font = 'bold 200px Arial'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.strokeStyle = '#ddd'
    ctx.lineWidth = 3
    ctx.strokeText(item.emoji || item.symbol || item.letter || item.icon, canvas.width / 2, canvas.height / 2)
  }

  const saveDrawing = () => {
    triggerStarBurst()
    addStars(2)
    const canvas = canvasRef.current
    const dataURL = canvas.toDataURL('image/png')
    const link = document.createElement('a')
    link.download = `coloring-${item.name || 'art'}.png`
    link.href = dataURL
    link.click()
  }

  React.useEffect(() => {
    drawTemplate()
  }, [item])

  return (
    <div className="coloring-page">
      <h2>🎨 Color Me!</h2>
      <div className="coloring-item-title">{item.name || item.title}</div>
      
      <div className="color-palette">
        {colors.map((color) => (
          <motion.div
            key={color}
            className={`color-swatch ${currentColor === color ? 'selected' : ''}`}
            style={{ backgroundColor: color }}
            onClick={() => {
              setCurrentColor(color)
              playClickSound()
            }}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          />
        ))}
      </div>

      <canvas
        ref={canvasRef}
        width={400}
        height={400}
        className="coloring-canvas"
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        onTouchStart={(e) => {
          e.preventDefault()
          startDrawing(e)
        }}
        onTouchMove={(e) => {
          e.preventDefault()
          draw(e)
        }}
        onTouchEnd={stopDrawing}
      />

      <div className="coloring-controls">
        <motion.button
          className="control-btn clear-btn"
          onClick={clearCanvas}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          🗑️ Clear
        </motion.button>
        <motion.button
          className="control-btn save-btn"
          onClick={saveDrawing}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          💾 Save Art (+2 ⭐)
        </motion.button>
      </div>
    </div>
  )
}

export default ColoringPage
