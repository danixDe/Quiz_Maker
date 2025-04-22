import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../contexts/AuthContext'
import { useQuiz } from '../contexts/QuizContext'
import { FaPlus, FaTrash, FaExclamationCircle } from 'react-icons/fa'
import { v4 as uuidv4 } from 'uuid'

const CreateQuiz = () => {
  const navigate = useNavigate()
  const { currentUser } = useAuth()
  const { createQuiz } = useQuiz()
  
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [timeLimit, setTimeLimit] = useState(10)
  const [questions, setQuestions] = useState([
    {
      id: uuidv4(),
      text: '',
      options: [
        { id: 'a', text: '' },
        { id: 'b', text: '' },
        { id: 'c', text: '' },
        { id: 'd', text: '' }
      ],
      correctOption: 'a',
      points: 10
    }
  ])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleAddQuestion = () => {
    setQuestions(prev => [...prev, {
      id: uuidv4(),
      text: '',
      options: [
        { id: 'a', text: '' },
        { id: 'b', text: '' },
        { id: 'c', text: '' },
        { id: 'd', text: '' }
      ],
      correctOption: 'a',
      points: 10
    }])
  }

  const handleRemoveQuestion = (questionId) => {
    if (questions.length > 1) {
      setQuestions(prev => prev.filter(q => q.id !== questionId))
    }
  }

  const handleQuestionChange = (questionId, field, value) => {
    setQuestions(prev => prev.map(q => 
      q.id === questionId ? { ...q, [field]: value } : q
    ))
  }

  const handleOptionChange = (questionId, optionId, value) => {
    setQuestions(prev => prev.map(q => 
      q.id === questionId 
        ? {
            ...q,
            options: q.options.map(opt => 
              opt.id === optionId ? { ...opt, text: value } : opt
            )
          }
        : q
    ))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    // Validation
    if (!title.trim()) {
      setError('Quiz title is required')
      return
    }

    if (!description.trim()) {
      setError('Quiz description is required')
      return
    }

    const isQuestionsValid = questions.every(q => 
      q.text.trim() && q.options.every(opt => opt.text.trim())
    )

    if (!isQuestionsValid) {
      setError('All questions and options must be filled out')
      return
    }

    try {
      setLoading(true)
      const quizId = await createQuiz({
        title,
        description,
        timeLimit: parseInt(timeLimit),
        questions,
        isPublic: true
      }, currentUser.id)
      
      navigate(`/quizzes/${quizId}`)
    } catch (err) {
      setError('Failed to create quiz')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

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
          <h1 className="text-2xl font-bold text-slate-800 mb-6">Create a New Quiz</h1>
          
          {error && (
            <motion.div 
              className="bg-error-50 text-error-700 p-3 rounded-md flex items-start mb-4"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.3 }}
            >
              <FaExclamationCircle className="mt-1 mr-2 flex-shrink-0" />
              <span>{error}</span>
            </motion.div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="title" className="block text-sm font-medium text-slate-700 mb-1">
                Quiz Title
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full py-2 px-3 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="Enter quiz title"
                required
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="description" className="block text-sm font-medium text-slate-700 mb-1">
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full py-2 px-3 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                rows="3"
                placeholder="Enter quiz description"
                required
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="timeLimit" className="block text-sm font-medium text-slate-700 mb-1">
                Time Limit (minutes)
              </label>
              <input
                id="timeLimit"
                type="number"
                value={timeLimit}
                onChange={(e) => setTimeLimit(e.target.value)}
                className="w-full py-2 px-3 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                min="1"
                max="120"
                required
              />
            </div>
            
            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-slate-800">Questions</h2>
                <button
                  type="button"
                  onClick={handleAddQuestion}
                  className="flex items-center px-3 py-2 bg-primary-50 text-primary-700 rounded-md hover:bg-primary-100"
                >
                  <FaPlus className="mr-2" />
                  Add Question
                </button>
              </div>
              
              {questions.map((question, index) => (
                <div key={question.id} className="bg-slate-50 p-4 rounded-lg mb-4">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-medium text-slate-800">Question {index + 1}</h3>
                    {questions.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveQuestion(question.id)}
                        className="text-error-600 hover:text-error-700"
                      >
                        <FaTrash />
                      </button>
                    )}
                  </div>
                  
                  <div className="mb-4">
                    <input
                      type="text"
                      value={question.text}
                      onChange={(e) => handleQuestionChange(question.id, 'text', e.target.value)}
                      className="w-full py-2 px-3 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="Enter question"
                      required
                    />
                  </div>
                  
                  <div className="space-y-3">
                    {question.options.map(option => (
                      <div key={option.id} className="flex items-center space-x-3">
                        <input
                          type="radio"
                          name={`correct-${question.id}`}
                          checked={question.correctOption === option.id}
                          onChange={() => handleQuestionChange(question.id, 'correctOption', option.id)}
                          className="text-primary-600 focus:ring-primary-500"
                        />
                        <input
                          type="text"
                          value={option.text}
                          onChange={(e) => handleOptionChange(question.id, option.id, e.target.value)}
                          className="flex-1 py-2 px-3 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                          placeholder={`Option ${option.id.toUpperCase()}`}
                          required
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 px-4 rounded-md font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
                loading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {loading ? 'Creating Quiz...' : 'Create Quiz'}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  )
}

export default CreateQuiz