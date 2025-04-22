import { createContext, useContext, useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'

// Create the context
const QuizContext = createContext()

// Custom hook to use the quiz context
export function useQuiz() {
  return useContext(QuizContext)
}

// Provider component
export function QuizProvider({ children }) {
  const [quizzes, setQuizzes] = useState([])
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(true)

  // Load data from localStorage on initial render
  useEffect(() => {
    const storedQuizzes = localStorage.getItem('quizzes')
    const storedResults = localStorage.getItem('results')
    
    if (storedQuizzes) {
      setQuizzes(JSON.parse(storedQuizzes))
    } else {
      // Add some sample quizzes if none exist
      const sampleQuizzes = getSampleQuizzes()
      setQuizzes(sampleQuizzes)
      localStorage.setItem('quizzes', JSON.stringify(sampleQuizzes))
    }
    
    if (storedResults) {
      setResults(JSON.parse(storedResults))
    }
    
    setLoading(false)
  }, [])

  // Save quizzes to localStorage whenever they change
  useEffect(() => {
    if (!loading) {
      localStorage.setItem('quizzes', JSON.stringify(quizzes))
    }
  }, [quizzes, loading])

  // Save results to localStorage whenever they change
  useEffect(() => {
    if (!loading) {
      localStorage.setItem('results', JSON.stringify(results))
    }
  }, [results, loading])

  // Create a new quiz
  const createQuiz = (quizData, userId) => {
    const newQuiz = {
      id: uuidv4(),
      ...quizData,
      createdBy: userId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    
    setQuizzes(prevQuizzes => [...prevQuizzes, newQuiz])
    return newQuiz.id
  }

  // Update an existing quiz
  const updateQuiz = (quizId, quizData) => {
    setQuizzes(prevQuizzes => 
      prevQuizzes.map(quiz => 
        quiz.id === quizId 
          ? { 
              ...quiz, 
              ...quizData, 
              updatedAt: new Date().toISOString() 
            } 
          : quiz
      )
    )
  }

  // Delete a quiz
  const deleteQuiz = (quizId) => {
    setQuizzes(prevQuizzes => prevQuizzes.filter(quiz => quiz.id !== quizId))
    // Also delete any results associated with this quiz
    setResults(prevResults => prevResults.filter(result => result.quizId !== quizId))
  }

  // Get a quiz by ID
  const getQuiz = (quizId) => {
    return quizzes.find(quiz => quiz.id === quizId) || null
  }

  // Get quizzes created by a specific user
  const getUserQuizzes = (userId) => {
    return quizzes.filter(quiz => quiz.createdBy === userId)
  }

  // Submit a quiz attempt/result
  const submitQuizResult = (resultData) => {
    const newResult = {
      id: uuidv4(),
      ...resultData,
      submittedAt: new Date().toISOString()
    }
    
    setResults(prevResults => [...prevResults, newResult])
    return newResult.id
  }

  // Get all results for a specific quiz
  const getQuizResults = (quizId) => {
    return results.filter(result => result.quizId === quizId)
  }

  // Get a specific result by ID
  const getResult = (resultId) => {
    return results.find(result => result.id === resultId) || null
  }

  // Get user's results
  const getUserResults = (userId) => {
    return results.filter(result => result.userId === userId)
  }

  // Get leaderboard data for a specific quiz
  const getLeaderboard = (quizId) => {
    const quizResults = quizId 
      ? results.filter(result => result.quizId === quizId)
      : results
    
    return quizResults
      .sort((a, b) => b.score - a.score || new Date(a.submittedAt) - new Date(b.submittedAt))
      .slice(0, 10) // Top 10
  }

  const value = {
    quizzes,
    results,
    loading,
    createQuiz,
    updateQuiz,
    deleteQuiz,
    getQuiz,
    getUserQuizzes,
    submitQuizResult,
    getQuizResults,
    getResult,
    getUserResults,
    getLeaderboard
  }

  return (
    <QuizContext.Provider value={value}>
      {!loading && children}
    </QuizContext.Provider>
  )
}

// Helper function to create sample quizzes
function getSampleQuizzes() {
  return [
    {
      id: '1',
      title: 'JavaScript Fundamentals',
      description: 'Test your knowledge of JavaScript basics',
      timeLimit: 10, // minutes
      createdBy: 'system',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isPublic: true,
      questions: [
        {
          id: '1-1',
          text: 'Which of the following is NOT a JavaScript data type?',
          options: [
            { id: 'a', text: 'String' },
            { id: 'b', text: 'Boolean' },
            { id: 'c', text: 'Float' }, // Correct answer
            { id: 'd', text: 'Object' }
          ],
          correctOption: 'c',
          points: 10
        },
        {
          id: '1-2',
          text: 'What will the following code return: console.log(typeof [])?',
          options: [
            { id: 'a', text: 'array' },
            { id: 'b', text: 'object' }, // Correct answer
            { id: 'c', text: 'undefined' },
            { id: 'd', text: 'string' }
          ],
          correctOption: 'b',
          points: 10
        },
        {
          id: '1-3',
          text: 'Which method is used to add elements to the end of an array?',
          options: [
            { id: 'a', text: 'push()' }, // Correct answer
            { id: 'b', text: 'pop()' },
            { id: 'c', text: 'unshift()' },
            { id: 'd', text: 'shift()' }
          ],
          correctOption: 'a',
          points: 10
        }
      ]
    },
    {
      id: '2',
      title: 'React Basics',
      description: 'A quick quiz about React fundamentals',
      timeLimit: 15,
      createdBy: 'system',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isPublic: true,
      questions: [
        {
          id: '2-1',
          text: 'What function is used to update state in functional components?',
          options: [
            { id: 'a', text: 'this.setState()' },
            { id: 'b', text: 'useState()' }, // Correct answer
            { id: 'c', text: 'setState()' },
            { id: 'd', text: 'state.update()' }
          ],
          correctOption: 'b',
          points: 10
        },
        {
          id: '2-2',
          text: 'Which hook is used for side effects in React?',
          options: [
            { id: 'a', text: 'useEffect()' }, // Correct answer
            { id: 'b', text: 'useSideEffect()' },
            { id: 'c', text: 'useCase()' },
            { id: 'd', text: 'useAction()' }
          ],
          correctOption: 'a',
          points: 10
        }
      ]
    }
  ]
}