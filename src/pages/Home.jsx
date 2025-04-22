import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useQuiz } from '../contexts/QuizContext'
import QuizCard from '../components/quiz/QuizCard'
import { FaChevronRight, FaBrain, FaUserFriends, FaChartBar } from 'react-icons/fa'

const Home = () => {
  const { quizzes } = useQuiz()
  const publicQuizzes = quizzes.filter(quiz => quiz.isPublic).slice(0, 3)

  return (
    <div>
      {/* Hero Section */}
      <section className="py-12 md:py-24 bg-gradient-to-br from-primary-600 to-secondary-700 text-white rounded-2xl mb-16">
        <div className="container mx-auto px-4 text-center">
          <motion.h1 
            className="text-4xl md:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Create and Share Interactive Quizzes
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Engage your audience with beautiful, responsive quizzes. Track performance and see who tops the leaderboard.
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link
              to="/create-quiz"
              className="px-8 py-3 bg-accent-500 hover:bg-accent-600 text-white font-semibold rounded-lg shadow-lg transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              <span>Create a Quiz</span>
              <FaChevronRight />
            </Link>
            <Link
              to="/quizzes/1"
              className="px-8 py-3 bg-white hover:bg-slate-100 text-primary-700 font-semibold rounded-lg shadow-lg transition-colors duration-200"
            >
              Try a Demo Quiz
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white rounded-xl shadow-sm mb-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-slate-800">Why Choose QuizMaker?</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<FaBrain className="text-4xl text-primary-500" />}
              title="Easy to Create"
              description="Create professional quizzes in minutes with our intuitive interface. No technical skills required."
            />
            <FeatureCard 
              icon={<FaUserFriends className="text-4xl text-secondary-500" />}
              title="Share Anywhere"
              description="Share your quizzes via link or embed them on your website for seamless user experience."
            />
            <FeatureCard 
              icon={<FaChartBar className="text-4xl text-accent-500" />}
              title="Detailed Analytics"
              description="Track quiz performance and participant results with comprehensive analytics."
            />
          </div>
        </div>
      </section>

      {/* Featured Quizzes */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-slate-800">Featured Quizzes</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {publicQuizzes.map(quiz => (
              <QuizCard key={quiz.id} quiz={quiz} />
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Link 
              to="/leaderboard"
              className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
            >
              <span>View Leaderboard</span>
              <FaChevronRight className="ml-2" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

const FeatureCard = ({ icon, title, description }) => {
  return (
    <motion.div 
      className="bg-slate-50 p-6 rounded-xl"
      whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-3 text-slate-800">{title}</h3>
      <p className="text-slate-600">{description}</p>
    </motion.div>
  )
}

export default Home