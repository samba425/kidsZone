import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LevelPage from './pages/LevelPage'
import CategoryPage from './pages/CategoryPage'
import './App.css'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/level/:levelId" element={<LevelPage />} />
        <Route path="/level/:levelId/category/:categoryId" element={<CategoryPage />} />
      </Routes>
    </div>
  )
}

export default App


