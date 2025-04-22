import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './contexts/AuthContext'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
//import Dashboard from './pages/Dashboard'
import CreateQuiz from './pages/CreateQuiz'
import TakeQuiz from './pages/TakeQuiz'
import QuizResults from './pages/QuizResults'
import Leaderboard from './pages/Leaderboard'
//import NotFound from './pages/NotFound'

// Protected route wrapper
const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth()
  
  if (!currentUser) {
    return <Navigate to="/login" replace />
  }
  
  return children
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
       <Route path="quizzes/:quizId" element={<TakeQuiz />} /> 
        <Route path="results/:resultId" element={<QuizResults />} />
        <Route path="leaderboard" element={<Leaderboard />} />
       {/**<Route path="dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} /> */} 
        <Route path="create-quiz" element={<ProtectedRoute><CreateQuiz /></ProtectedRoute>} />
        <Route path="edit-quiz/:quizId" element={<ProtectedRoute><CreateQuiz /></ProtectedRoute>} /> 
      </Route>
    </Routes>
  )
}

export default App