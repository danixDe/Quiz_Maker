import { FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="bg-slate-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-bold mb-2">QuizMaker</h3>
            <p className="text-slate-300 text-sm">Create and share interactive quizzes with ease</p>
          </div>
          
          <div className="flex space-x-6">
            <a href="#" className="text-slate-300 hover:text-white transition-colors duration-200">
              <FaGithub size={20} />
            </a>
            <a href="#" className="text-slate-300 hover:text-white transition-colors duration-200">
              <FaTwitter size={20} />
            </a>
            <a href="#" className="text-slate-300 hover:text-white transition-colors duration-200">
              <FaLinkedin size={20} />
            </a>
          </div>
        </div>
        
        <div className="mt-8 pt-4 border-t border-slate-700 flex flex-col md:flex-row justify-between items-center text-sm text-slate-400">
          <p>&copy; {currentYear} QuizMaker. All rights reserved.</p>
          <div className="flex mt-4 md:mt-0 space-x-8">
            <a href="#" className="hover:text-white transition-colors duration-200">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors duration-200">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors duration-200">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer