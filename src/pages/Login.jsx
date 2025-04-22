import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../contexts/AuthContext'
import { FaEnvelope, FaLock, FaExclamationCircle } from 'react-icons/fa'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  
  // Get the redirect URL from location state or default to dashboard
  const from = location.state?.from || '/dashboard'
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Reset error state
    setError('')
    
    // Validate form
    if (!email.trim() || !password.trim()) {
      setError('Please enter email and password')
      return
    }
    
    try {
      setLoading(true)
      await login(email, password)
      navigate(from, { replace: true })
    } catch (err) {
      setError('Failed to log in. Please check your credentials.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }
  
  return (
    <div className="max-w-md mx-auto">
      <motion.div 
        className="bg-white rounded-xl shadow-lg overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="h-2 bg-primary-500"></div>
        
        <div className="p-8">
          <h1 className="text-2xl font-bold text-slate-800 mb-6">Log In to Your Account</h1>
          
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
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                  <FaEnvelope />
                </span>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full py-2 pl-10 pr-3 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>
            
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1">
                Password
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                  <FaLock />
                </span>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full py-2 pl-10 pr-3 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 px-4 rounded-md font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
                loading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {loading ? 'Logging in...' : 'Log In'}
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-slate-600">
              Don't have an account?{' '}
              <Link to="/register" className="font-medium text-primary-600 hover:text-primary-500">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Login