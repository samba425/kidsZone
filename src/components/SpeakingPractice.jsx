import React, { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './SpeakingPractice.css'
import { addStars } from '../utils/rewards'

const SpeakingPractice = ({ word, category }) => {
  const practiceWord = word || 'Apple'
  const [isRecording, setIsRecording] = useState(false)
  const [audioURL, setAudioURL] = useState(null)
  const [feedback, setFeedback] = useState('')
  const [hasRecorded, setHasRecorded] = useState(false)
  const mediaRecorderRef = useRef(null)
  const chunksRef = useRef([])

  const speakWord = () => {
    const utterance = new SpeechSynthesisUtterance(practiceWord)
    utterance.rate = 0.7
    utterance.pitch = 1.5
    utterance.volume = 1
    
    const voices = window.speechSynthesis.getVoices()
    const childVoice = voices.find(v => 
      v.name.includes('Samantha') || 
      v.name.includes('Karen') ||
      (v.lang.includes('en') && v.name.includes('Female'))
    )
    if (childVoice) utterance.voice = childVoice
    
    window.speechSynthesis.speak(utterance)
  }

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      mediaRecorderRef.current = new MediaRecorder(stream)
      chunksRef.current = []

      mediaRecorderRef.current.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data)
        }
      }

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' })
        const url = URL.createObjectURL(blob)
        setAudioURL(url)
        setHasRecorded(true)
        setFeedback('Great job! You recorded your voice! 🎉')
        addStars(2)
        
        stream.getTracks().forEach(track => track.stop())
      }

      mediaRecorderRef.current.start()
      setIsRecording(true)
      setFeedback('Recording... Speak now!')
    } catch (error) {
      console.error('Error accessing microphone:', error)
      setFeedback('Please allow microphone access to practice speaking')
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
    }
  }

  const playRecording = () => {
    if (audioURL) {
      const audio = new Audio(audioURL)
      audio.play()
    }
  }

  const resetRecording = () => {
    setAudioURL(null)
    setHasRecorded(false)
    setFeedback('')
  }

  return (
    <div className="speaking-practice">
      <motion.div
        className="practice-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h3>🎤 Speaking Practice</h3>
        <p>Listen and repeat!</p>
      </motion.div>

      <motion.div
        className="word-display"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", bounce: 0.5 }}
      >
        <div className="word-text">{practiceWord}</div>
        <button className="listen-btn" onClick={speakWord}>
          🔊 Listen
        </button>
      </motion.div>

      <div className="recording-controls">
        {!hasRecorded ? (
          <motion.button
            className={`record-btn ${isRecording ? 'recording' : ''}`}
            onClick={isRecording ? stopRecording : startRecording}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isRecording ? (
              <>
                <span className="recording-pulse" />
                ⏹️ Stop Recording
              </>
            ) : (
              <>
                🎤 Start Recording
              </>
            )}
          </motion.button>
        ) : (
          <div className="playback-controls">
            <motion.button
              className="play-btn"
              onClick={playRecording}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              ▶️ Play My Voice
            </motion.button>
            <motion.button
              className="retry-btn"
              onClick={resetRecording}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              🔄 Try Again
            </motion.button>
          </div>
        )}
      </div>

      <AnimatePresence>
        {feedback && (
          <motion.div
            className="feedback-message"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {feedback}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="practice-tips">
        <h4>Tips:</h4>
        <ul>
          <li>Click "Listen" to hear the word</li>
          <li>Click "Start Recording" and say the word clearly</li>
          <li>Click "Play My Voice" to hear yourself</li>
          <li>Practice makes perfect! 🌟</li>
        </ul>
      </div>
    </div>
  )
}

export default SpeakingPractice
