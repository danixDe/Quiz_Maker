import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../contexts/AuthContext'
import { useQuiz } from '../contexts/QuizContext'
import QuizCard from '../components/quiz/QuizCard'
import { FaPlus, FaChartBar } from 'react-icons/fa'

const Dashboard = () => {
  const { currentUser } = useAuth()
  const { getUserQuizzes, getUserResults } = useQuiz()
  const [activeTab, setActiveTab] = useState('quizzes')
  
  const userQuizzes = getUserQuizzes(currentUser.id)
  const userResults = getUserResults(currentUser.id)
  
  return (
    <div className="max-w-6xl mx-auto">
      <motion.div 
        className="bg-white rounded-xl shadow-lg overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="h-2 bg-primary-500"></div>
        
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-2xl font-bold text-slate-800 mb-2">Welcome, {currentUser.name}!</h1>
              <p className="text-slate-600">Manage your quizzes and view your results</p>
            </div>
            
            <Link
              to="/create-quiz"
              className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              <FaPlus className="mr-2" />
              Create Quiz
            </Link>
          </div>
          
          <div className="mb-6">
            <div className="border-b border-slate-200">
              <nav className="flex space-x-8">
                <button
                  onClick={() => setActiveTab('quizzes')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'quizzes'
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                  }`}
                >
                  My Quizzes
                </button>
                <button
                  onClick={() => setActiveTab('results')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'results'
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                  }`}
                >
                  My Results
                </button>
              </nav>
            </div>
          </div>
          
          {activeTab === 'quizzes' ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userQuizzes.length > 0 ? (
                userQuizzes.map(quiz => (
                  <QuizCard key={quiz.id} quiz={quiz} />
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <FaPlus className="mx-auto text-4xl text-slate-300 mb-4" />
                  <p className="text-slate-600 mb-4">You haven't created any quizzes yet</p>
                  <Link
                    to="/create-quiz"
                    className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                  >
                    Create Your First Quiz
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {userResults.length > 0 ? (
                userResults.map(result => {
                  const quiz = getQuiz(result.quizId)
                  const percentage = Math.round((result.score / result.totalPossible) * 100)
                  
                  return (
                    <motion.div
                      key={result.id}
                      className="bg-slate-50 p-4 rounded-lg flex items-center justify-between"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                    >
                      <div>
                        <h3 className="font-medium text-slate-800">{quiz?.title}</h3>
                        <p className="text-sm text-slate-600">
                          Completed on {new Date(result.submittedAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <div className="text-lg font-bold text-primary-600">{percentage}%</div>
                          <div className="text-sm text-slate-600">Score</div>
                        </div>
                        <Link
                          to={`/results/${result.id}`}
                          className="p-2 text-primary-600 hover:text-primary-700"
                        >
                          <FaChartBar size={20} />
                        </Link>
                      </div>
                    </motion.div>
                  )
                })
              ) : (
                <div className="text-center py-12">
                  <FaChartBar className="mx-auto text-4xl text-slate-300 mb-4" />
                  <p className="text-slate-600 mb-4">You haven't taken any quizzes yet</p>
                  <Link
                    to="/"
                    className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                  >
                    Browse Quizzes
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  )
}

export default Dashboard