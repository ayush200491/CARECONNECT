import React, { createContext, useContext, useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const AuthContext = createContext()

// Simple localStorage-backed auth for frontend-only/demo usage.
// In production, replace calls with real API requests.
export const AuthProvider = (props) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const api = axios.create({ baseURL: 'http://localhost:5001/api/auth' })

  useEffect(() => {
    const saved = localStorage.getItem('cc_auth')
    if (saved) {
      try {
        setUser(JSON.parse(saved))
      } catch (e) {
        localStorage.removeItem('cc_auth')
      }
    }
    setLoading(false)
  }, [])

  const register = async ({ name, email, password }) => {
    const response = await api.post('/register', { name, email, password })
    const auth = { token: response.data.token, user: response.data.user }
    localStorage.setItem('cc_auth', JSON.stringify(auth))
    setUser(auth)
    return auth
  }

  const login = async ({ email, password }) => {
    const response = await api.post('/login', { email, password })
    const auth = { token: response.data.token, user: response.data.user }
    localStorage.setItem('cc_auth', JSON.stringify(auth))
    setUser(auth)
    return auth
  }

  const logout = () => {
    localStorage.removeItem('cc_auth')
    setUser(null)
    navigate('/login')
  }

  const updateUser = async (newUser) => {
    const current = JSON.parse(localStorage.getItem('cc_auth') || '{}')
    const token = current.token || user?.token || null

    if (!token) {
      throw new Error('Missing login session. Please log in again.')
    }

    try {
      const response = await api.put('/profile', newUser, { headers: { Authorization: `Bearer ${token}` } })
      const updated = response.data.user
      const newAuth = { token, user: updated }
      localStorage.setItem('cc_auth', JSON.stringify(newAuth))
      setUser(newAuth)
      return newAuth
    } catch (e) {
      const message = e?.response?.data?.message || e.message || 'Failed to update profile'
      throw new Error(message)
    }
  }

  return (
    <AuthContext.Provider value={{ user: user?.user ?? null, token: user?.token ?? null, loading, register, login, logout, updateUser }}>
      {props.children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)

export default AuthProvider
