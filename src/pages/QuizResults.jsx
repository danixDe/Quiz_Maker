import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useQuiz } from '../contexts/QuizContext'
import { FaTrophy, FaCheck, FaTimes } from 'react-icons/fa'

const QuizResults = () => {
  const { resultId } = useParams()
  const { getResult, getQuiz } = useQuiz()
  
  const [result, setResult] = useState(null)
  const [quiz, setQuiz] = useState(null)
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    const loadResult = () => {
      const resultData = getResult(resultId)
      if (!resultData) return
      
      setResult(resultData)
      const quizData = getQuiz(resultData.quizId)
      setQuiz(quizData)
      setLoading(false)
    }
    
    loadResult()
  }, [resultId, getResult, getQuiz])
  
  if (loading) {
    return <div className="text-center py-8">Loading results...</div>
  }
  
  if (!result || !quiz) {
    return (
      <div className="max-w-3xl mx-auto">
        <div className="bg-primary-50 text-primary-700 p-4 rounded-lg">
          Results not found
        </div>
      </div>
    )
  }
  
  const percentage = Math.round((result.score / result.totalPossible) * 100)
  
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
          <div className="text-center mb-8">
            <FaTrophy className="text-primary-500 text-4xl mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-slate-800 mb-2">Quiz Results</h1>
            <p className="text-slate-600">{quiz.title}</p>
          </div>
          
          <div className="bg-slate-50 p-6 rounded-lg mb-8">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-3xl font-bold text-primary-600 mb-1">{result.score}</div>
                <div className="text-sm text-slate-600">Points Earned</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary-600 mb-1">{result.totalPossible}</div>
                <div className="text-sm text-slate-600">Total Points</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary-600 mb-1">{percentage}%</div>
                <div className="text-sm text-slate-600">Score</div>
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            {quiz.questions.map((question, index) => {
              const userAnswer = result.answers[question.id]
              const isCorrect = userAnswer === question.correctOption
              
              return (
                <div 
                  key={question.id}
                  className={`p-6 rounded-lg border-2 ${
                    isCorrect ? 'border-green-500 bg-green-50' : 'border-primary-500 bg-primary-50'
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-lg font-medium text-slate-800">
                      {index + 1}. {question.text}
                    </h3>
                    {isCorrect ? (
                      <FaCheck className="text-green-500" />
                    ) : (
                      <FaTimes className="text-primary-500" />
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    {question.options.map(option => (
                      <div
                        key={option.id}
                        className={`p-3 rounded-lg ${
                          option.id === question.correctOption
                            ? 'bg-green-100 text-green-800'
                            : option.id === userAnswer
                            ? 'bg-primary-100 text-primary-800'
                            : 'bg-white'
                        }`}
                      >
                        {option.text}
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
          
          <div className="mt-8 flex justify-center space-x-4">
            <Link
              to={`/quizzes/${quiz.id}`}
              className="px-6 py-2 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700"
            >
              Try Again
            </Link>
            <Link
              to="/leaderboard"
              className="px-6 py-2 bg-secondary-600 text-white font-medium rounded-lg hover:bg-secondary-700"
            >
              View Leaderboard
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default QuizResults