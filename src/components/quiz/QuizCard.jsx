import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaRegClock, FaRegQuestionCircle } from 'react-icons/fa'

const QuizCard = ({ quiz }) => {
  const { id, title, description, questions, timeLimit } = quiz
  
  // Format the date if needed
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }
  
  return (
    <motion.div 
      className="bg-white rounded-xl shadow-md overflow-hidden h-full border border-slate-200"
      whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      {/* Quiz category banner */}
      <div className="h-2 bg-primary-500"></div>
      
      <div className="p-6 flex flex-col h-full">
        <h3 className="text-xl font-semibold mb-2 text-slate-800">{title}</h3>
        <p className="text-slate-600 text-sm mb-4 flex-grow">{description}</p>
        
        <div className="flex items-center justify-between text-xs text-slate-500 mb-4">
          <div className="flex items-center">
            <FaRegQuestionCircle className="mr-1" />
            <span>{questions.length} questions</span>
          </div>
          <div className="flex items-center">
            <FaRegClock className="mr-1" />
            <span>{timeLimit} min</span>
          </div>
        </div>
        
        <Link
          to={`/quizzes/${id}`}
          className="block w-full text-center py-2 bg-primary-50 hover:bg-primary-100 text-primary-700 rounded-md font-medium transition-colors duration-200"
        >
          Take Quiz
        </Link>
      </div>
    </motion.div>
  )
}

export default QuizCard