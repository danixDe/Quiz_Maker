import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser')
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  const login = (email, password) => {
    if (email && password) {
      const user = {
        id: 'user1',
        email,
        name: email.split('@')[0],
        role: 'user'
      }
      
      setCurrentUser(user)
      localStorage.setItem('currentUser', JSON.stringify(user))
      return Promise.resolve(user)
    }
    return Promise.reject(new Error('Invalid credentials'))
  }

  const register = (email, password, name) => {
    if (email && password) {
      const user = {
        id: `user${Date.now()}`,
        email,
        name: name || email.split('@')[0],
        role: 'user'
      }
      
      setCurrentUser(user)
      localStorage.setItem('currentUser', JSON.stringify(user))
      return Promise.resolve(user)
    }
    return Promise.reject(new Error('Registration failed'))
  }

  const logout = () => {
    setCurrentUser(null)
    localStorage.removeItem('currentUser')
    return Promise.resolve()
  }

  const value = {
    currentUser,
    login,
    register,
    logout,
    loading
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}