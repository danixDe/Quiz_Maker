import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useQuiz } from '../contexts/QuizContext'
import { FaTrophy, FaMedal } from 'react-icons/fa'

const Leaderboard = () => {
  const { quizzes, getLeaderboard } = useQuiz()
  const [selectedQuiz, setSelectedQuiz] = useState('')
  const [leaderboardData, setLeaderboardData] = useState([])
  
  useEffect(() => {
    const data = getLeaderboard(selectedQuiz)
    setLeaderboardData(data)
  }, [selectedQuiz, getLeaderboard])
  
  const getMedalColor = (index) => {
    switch (index) {
      case 0: return 'text-yellow-500'  
      case 1: return 'text-slate-400' 
      case 2: return 'text-amber-600'   
      default: return 'text-slate-300'
    }
  }
  
  return (
    <div className="max-w-4xl mx-auto">
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
            <h1 className="text-2xl font-bold text-slate-800 mb-2">Leaderboard</h1>
            <p className="text-slate-600">See who's leading the pack!</p>
          </div>
          
          <div className="mb-8">
            <select
              value={selectedQuiz}
              onChange={(e) => setSelectedQuiz(e.target.value)}
              className="w-full p-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="">All Quizzes</option>
              {quizzes.map(quiz => (
                <option key={quiz.id} value={quiz.id}>
                  {quiz.title}
                </option>
              ))}
            </select>
          </div>
          
          <div className="overflow-hidden rounded-lg border border-slate-200">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Rank
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Player
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Quiz
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Score
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {leaderboardData.map((entry, index) => {
                  const quiz = quizzes.find(q => q.id === entry.quizId)
                  const percentage = Math.round((entry.score / entry.totalPossible) * 100)
                  
                  return (
                    <motion.tr
                      key={entry.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <FaMedal className={`text-xl ${getMedalColor(index)} mr-2`} />
                          <span className="text-slate-900">{index + 1}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-slate-900">
                          {entry.userId === 'anonymous' ? 'Anonymous' : entry.userId}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-slate-900">{quiz?.title}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-primary-600">
                          {percentage}%
                        </div>
                      </td>
                    </motion.tr>
                  )
                })}
                
                {leaderboardData.length === 0 && (
                  <tr>
                    <td colSpan="4" className="px-6 py-4 text-center text-slate-500">
                      No results yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Leaderboard