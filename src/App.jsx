import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import ExerciseList from './pages/ExerciseList'
import ExerciseDetail from './pages/ExerciseDetail'
import KnowledgeSarcopenia from './pages/KnowledgeSarcopenia'
import Protected from './components/Protected'
import Survey from './pages/Survey'
import QuizPreTest from './pages/QuizPreTest'
import QuizPostTest from './pages/QuizPostTest'

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login/>} />
      <Route path="/dashboard" element={<Protected><Dashboard/></Protected>} />
      <Route path="/knowledge/sarcopenia" element={<Protected><KnowledgeSarcopenia/></Protected>} />
      <Route path="/exercises" element={<Protected><ExerciseList/></Protected>} />
      <Route path="/exercises/:slug" element={<Protected><ExerciseDetail/></Protected>} />
      <Route path="/survey" element={<Protected><Survey/></Protected>} />
      <Route path="/quiz/pretest" element={<Protected><QuizPreTest/></Protected>} />
      <Route path="/quiz/posttest" element={<Protected><QuizPostTest/></Protected>} />
      <Route path="/" element={<Navigate replace to="/login" />} />
    </Routes>
  )
}

export default App
