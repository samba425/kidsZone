import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LevelPage from './pages/LevelPage'
import CategoryPage from './pages/CategoryPage'
import GamesPage from './pages/GamesPage'
import ParentDashboard from './components/ParentDashboard'
import Mascot from './components/Mascot'
import './App.css'

function App() {
  const [mascotMood, setMascotMood] = useState('happy')
  const [mascotMessage, setMascotMessage] = useState('')

  return (
    <div className="App">
      <Mascot mood={mascotMood} message={mascotMessage} position="bottom-right" />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/level/:levelId" element={<LevelPage />} />
        <Route path="/level/:levelId/category/:categoryId" element={<CategoryPage />} />
        <Route path="/games" element={<GamesPage />} />
        <Route path="/parent-dashboard" element={<ParentDashboard />} />
      </Routes>
    </div>
  )
}

export default App


