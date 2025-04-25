import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaExclamationTriangle } from 'react-icons/fa'

const NotFound = () => {
  return (
    <div className="max-w-xl mx-auto text-center">
      <motion.div
        className="bg-white rounded-xl shadow-lg overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="h-2 bg-primary-500"></div>
        
        <div className="p-8">
          <FaExclamationTriangle className="text-6xl text-primary-500 mx-auto mb-6" />
          
          <h1 className="text-3xl font-bold text-slate-800 mb-4">Page Not Found</h1>
          <p className="text-slate-600 mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
          
          <div className="flex justify-center space-x-4">
            <Link
              to="/"
              className="px-6 py-2 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors"
            >
              Go Home
            </Link>
            <button
              onClick={() => window.history.back()}
              className="px-6 py-2 bg-slate-100 text-slate-700 font-medium rounded-lg hover:bg-slate-200 transition-colors"
            >
              Go Back
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default NotFound