import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useQuiz } from '../contexts/QuizContext'
import { useAuth } from '../contexts/AuthContext'
import { FaClock, FaExclamationCircle } from 'react-icons/fa'

const TakeQuiz = () => {
  const { quizId } = useParams()
  const navigate = useNavigate()
  const { getQuiz, submitQuizResult } = useQuiz()
  const { currentUser } = useAuth()
  
  const [quiz, setQuiz] = useState(null)
  const [answers, setAnswers] = useState({})
  const [timeLeft, setTimeLeft] = useState(0)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    const loadQuiz = () => {
      const quizData = getQuiz(quizId)
      if (!quizData) {
        setError('Quiz not found')
        return
      }
      setQuiz(quizData)
      setTimeLeft(quizData.timeLimit * 60)
      setLoading(false)
    }
    
    loadQuiz()
  }, [quizId, getQuiz])
  
  useEffect(() => {
    if (!timeLeft || !quiz) return
    
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer)
          handleSubmit()
          return 0
        }
        return prev - 1
      })
    }, 1000)
    
    return () => clearInterval(timer)
  }, [timeLeft, quiz])
  
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }
  
  const handleAnswerSelect = (questionId, optionId) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: optionId
    }))
  }
  
  const handleSubmit = async () => {
    if (!quiz) return
    
    let score = 0
    let totalPossible = 0
    
    quiz.questions.forEach(question => {
      totalPossible += question.points
      if (answers[question.id] === question.correctOption) {
        score += question.points
      }
    })
    
    try {
      const resultId = await submitQuizResult({
        quizId,
        userId: currentUser?.id || 'anonymous',
        score,
        totalPossible,
        answers
      })
      
      navigate(`/results/${resultId}`)
    } catch (err) {
      setError('Failed to submit quiz')
      console.error(err)
    }
  }
  
  if (loading) {
    return <div className="text-center py-8">Loading quiz...</div>
  }
  
  if (error) {
    return (
      <div className="max-w-3xl mx-auto">
        <div className="bg-primary-50 text-primary-700 p-4 rounded-lg">
          <FaExclamationCircle className="inline-block mr-2" />
          {error}
        </div>
      </div>
    )
  }
  
  if (!quiz) return null
  
  return (
    <div className="max-w-3xl mx-auto">
      <motion.div 
        className="bg-white rounded-xl shadow-lg overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="h-2 bg-primary-500"></div>
        
        <div className="p-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-2xl font-bold text-slate-800 mb-2">{quiz.title}</h1>
              <p className="text-slate-600">{quiz.description}</p>
            </div>
            
            <div className="flex items-center text-primary-600 bg-primary-50 px-4 py-2 rounded-lg">
              <FaClock className="mr-2" />
              <span className="font-mono">{formatTime(timeLeft)}</span>
            </div>
          </div>
          
          <div className="space-y-8">
            {quiz.questions.map((question, index) => (
              <div key={question.id} className="bg-slate-50 p-6 rounded-lg">
                <h3 className="text-lg font-medium text-slate-800 mb-4">
                  {index + 1}. {question.text}
                </h3>
                
                <div className="space-y-3">
                  {question.options.map(option => (
                    <label 
                      key={option.id}
                      className={`block p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                        answers[question.id] === option.id
                          ? 'border-primary-500 bg-primary-50'
                          : 'border-slate-200 hover:border-primary-200'
                      }`}
                    >
                      <input
                        type="radio"
                        name={`question-${question.id}`}
                        value={option.id}
                        checked={answers[question.id] === option.id}
                        onChange={() => handleAnswerSelect(question.id, option.id)}
                        className="sr-only"
                      />
                      <span className="text-slate-700">{option.text}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          <button
            onClick={handleSubmit}
            className="mt-8 w-full py-3 px-4 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          >
            Submit Quiz
          </button>
        </div>
      </motion.div>
    </div>
  )
}

export default TakeQuiz