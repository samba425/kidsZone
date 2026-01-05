import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import './TeacherDashboard.css'

const TeacherDashboard = () => {
  const navigate = useNavigate()
  const [students, setStudents] = useState([])
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [classStats, setClassStats] = useState({
    totalStudents: 0,
    averageStars: 0,
    activeToday: 0,
    completedLessons: 0
  })

  useEffect(() => {
    loadClassData()
  }, [])

  const loadClassData = () => {
    // Load from localStorage
    const classData = JSON.parse(localStorage.getItem('classData') || '{"students": []}')
    setStudents(classData.students)
    
    // Calculate class statistics
    const stats = {
      totalStudents: classData.students.length,
      averageStars: Math.round(classData.students.reduce((sum, s) => sum + (s.stars || 0), 0) / (classData.students.length || 1)),
      activeToday: classData.students.filter(s => isActiveToday(s.lastActive)).length,
      completedLessons: classData.students.reduce((sum, s) => sum + (s.completedLessons || 0), 0)
    }
    setClassStats(stats)
  }

  const isActiveToday = (lastActive) => {
    if (!lastActive) return false
    const today = new Date().toDateString()
    const activeDate = new Date(lastActive).toDateString()
    return today === activeDate
  }

  const addStudent = () => {
    const name = prompt('Enter student name:')
    if (!name) return

    const newStudent = {
      id: Date.now(),
      name,
      stars: 0,
      streak: 0,
      completedLessons: 0,
      badges: [],
      createdAt: new Date().toISOString(),
      lastActive: new Date().toISOString()
    }

    const classData = JSON.parse(localStorage.getItem('classData') || '{"students": []}')
    classData.students.push(newStudent)
    localStorage.setItem('classData', JSON.stringify(classData))
    loadClassData()
  }

  const exportClassReport = () => {
    const report = {
      generatedAt: new Date().toISOString(),
      classStats,
      students: students.map(s => ({
        name: s.name,
        stars: s.stars || 0,
        streak: s.streak || 0,
        completedLessons: s.completedLessons || 0,
        badges: s.badges?.length || 0
      }))
    }

    const dataStr = JSON.stringify(report, null, 2)
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr)
    const exportFileDefaultName = `class-report-${new Date().toISOString().split('T')[0]}.json`

    const linkElement = document.createElement('a')
    linkElement.setAttribute('href', dataUri)
    linkElement.setAttribute('download', exportFileDefaultName)
    linkElement.click()
  }

  const printCertificates = () => {
    window.print()
  }

  return (
    <div className="teacher-dashboard">
      <div className="dashboard-header">
        <motion.button
          className="home-button"
          onClick={() => navigate('/')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          🏠 Home
        </motion.button>
        <h1>👨‍🏫 Teacher Dashboard</h1>
        <p className="subtitle">Manage your class and track student progress</p>
      </div>

      {/* Class Statistics */}
      <div className="stats-grid">
        <motion.div 
          className="stat-card"
          whileHover={{ scale: 1.05 }}
        >
          <div className="stat-icon">👥</div>
          <div className="stat-value">{classStats.totalStudents}</div>
          <div className="stat-label">Total Students</div>
        </motion.div>

        <motion.div 
          className="stat-card"
          whileHover={{ scale: 1.05 }}
        >
          <div className="stat-icon">⭐</div>
          <div className="stat-value">{classStats.averageStars}</div>
          <div className="stat-label">Avg Stars/Student</div>
        </motion.div>

        <motion.div 
          className="stat-card"
          whileHover={{ scale: 1.05 }}
        >
          <div className="stat-icon">✅</div>
          <div className="stat-value">{classStats.activeToday}</div>
          <div className="stat-label">Active Today</div>
        </motion.div>

        <motion.div 
          className="stat-card"
          whileHover={{ scale: 1.05 }}
        >
          <div className="stat-icon">📚</div>
          <div className="stat-value">{classStats.completedLessons}</div>
          <div className="stat-label">Total Lessons</div>
        </motion.div>
      </div>

      {/* Action Buttons */}
      <div className="action-buttons">
        <motion.button
          className="action-btn add-student"
          onClick={addStudent}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          ➕ Add Student
        </motion.button>

        <motion.button
          className="action-btn export-report"
          onClick={exportClassReport}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          📊 Export Report
        </motion.button>

        <motion.button
          className="action-btn print-certs"
          onClick={printCertificates}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          🎓 Print Certificates
        </motion.button>
      </div>

      {/* Students List */}
      <div className="students-section">
        <h2>📋 Student Roster</h2>
        
        {students.length === 0 ? (
          <div className="empty-state">
            <p>No students added yet. Click "Add Student" to get started!</p>
          </div>
        ) : (
          <div className="students-grid">
            {students.map((student, index) => (
              <motion.div
                key={student.id}
                className="student-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.03 }}
                onClick={() => setSelectedStudent(student)}
              >
                <div className="student-avatar">
                  {student.name.charAt(0).toUpperCase()}
                </div>
                <h3>{student.name}</h3>
                <div className="student-stats">
                  <span>⭐ {student.stars || 0}</span>
                  <span>🔥 {student.streak || 0}</span>
                  <span>📚 {student.completedLessons || 0}</span>
                </div>
                <div className="student-status">
                  {isActiveToday(student.lastActive) ? (
                    <span className="status-active">● Active</span>
                  ) : (
                    <span className="status-inactive">○ Inactive</span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Student Detail Modal */}
      {selectedStudent && (
        <motion.div
          className="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setSelectedStudent(null)}
        >
          <motion.div
            className="student-detail-modal"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2>{selectedStudent.name}'s Progress</h2>
            <div className="detail-stats">
              <div className="detail-stat">
                <div className="detail-icon">⭐</div>
                <div className="detail-value">{selectedStudent.stars || 0}</div>
                <div className="detail-label">Total Stars</div>
              </div>
              <div className="detail-stat">
                <div className="detail-icon">🔥</div>
                <div className="detail-value">{selectedStudent.streak || 0}</div>
                <div className="detail-label">Day Streak</div>
              </div>
              <div className="detail-stat">
                <div className="detail-icon">🏅</div>
                <div className="detail-value">{selectedStudent.badges?.length || 0}</div>
                <div className="detail-label">Badges Earned</div>
              </div>
            </div>
            <button 
              className="close-modal-btn"
              onClick={() => setSelectedStudent(null)}
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}

export default TeacherDashboard
