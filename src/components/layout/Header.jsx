import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { motion } from 'framer-motion'
import { FaQuestionCircle, FaBars, FaTimes, FaSignOutAlt } from 'react-icons/fa'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await logout()
      navigate('/')
    } catch (error) {
      console.error('Failed to log out', error)
    }
  }

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center space-x-2">
            <motion.div
              whileHover={{ rotate: 15 }}
              transition={{ type: 'spring', stiffness: 500 }}
            >
              <FaQuestionCircle className="text-primary-500 text-3xl" />
            </motion.div>
            <span className="text-xl font-bold text-slate-800">QuizMaker</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <NavLinks currentUser={currentUser} handleLogout={handleLogout} />
          </nav>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-slate-800 focus:outline-none"
          >
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden py-4 border-t border-slate-200"
          >
            <div className="flex flex-col space-y-4">
              <NavLinks currentUser={currentUser} handleLogout={handleLogout} isMobile />
            </div>
          </motion.div>
        )}
      </div>
    </header>
  )
}

const NavLinks = ({ currentUser, handleLogout, isMobile = false }) => {
  const linkClasses = isMobile 
    ? "block py-2 text-slate-700 hover:text-primary-600" 
    : "text-slate-700 hover:text-primary-600"

  return (
    <>
      <Link to="/" className={linkClasses}>Home</Link>
      <Link to="/leaderboard" className={linkClasses}>Leaderboard</Link>
      
      {currentUser ? (
        <>
          <Link to="/dashboard" className={linkClasses}>Dashboard</Link>
          <Link to="/create-quiz" className={linkClasses}>Create Quiz</Link>
          <button 
            onClick={handleLogout}
            className={`${linkClasses} flex items-center space-x-1`}
          >
            <span>Logout</span>
            <FaSignOutAlt />
          </button>
        </>
      ) : (
        <>
          <Link to="/login" className={linkClasses}>Login</Link>
          <Link 
            to="/register" 
            className={isMobile 
              ? "block py-2 px-4 bg-primary-500 text-white rounded-md hover:bg-primary-600" 
              : "px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600"
            }
          >
            Sign Up
          </Link>
        </>
      )}
    </>
  )
}

export default Header