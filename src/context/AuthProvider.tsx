import { getCurrentUser } from '@/lib/react-query/api'
import { IContextType, IUser } from '@/types/types.index'
import {createContext, useContext, useEffect, useState} from 'react'

export const INITIAL_USER = {
  id: '',
  name: '',
  email: '',
}

const INITIAL_STATE = {
  user: INITIAL_USER,
  isLoading: true,
  isAuthenticated: false,
  token: '',
  setToken: () => '',
  setUser: () => {},
  setIsAuthenticated: () => {},
  checkAuthUser: async () => false as boolean,
  storeToken: async () => false as boolean,
}

const AuthContext = createContext<IContextType> (INITIAL_STATE)

function AuthProvider({ children }: {children: React.ReactNode}) {
  const [user, setUser] = useState<IUser>(INITIAL_USER)
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [token, setToken] = useState('')

  const checkAuthUser = async () => {
    try {
      const currentUser = await getCurrentUser()
      if(!currentUser) return false

      const {token, expires_in, user} = currentUser
      const {id, name, email} = user

      setUser({ id, name, email })
      setIsAuthenticated(true)
      await storeToken(token, expires_in)

      return true
    } catch (error) {
      console.log(error)
      return false
    } finally {
      
      setIsLoading(false)
    }
  }

  // Store Token in Localstorage
  const storeToken = async (token: string|null, timeout: number = 3600 ): Promise<boolean> => {
    if(!token) return false
    const cookieExpiry = Date.now() + ( timeout * 1000)
    setToken(token)

    localStorage.setItem('cookieFallback', token);
    localStorage.setItem('cookieExpiry', JSON.stringify(cookieExpiry))
    return true
  }
  

  useEffect(() => {
    checkAuthUser()
  }, [])

  const value = { user, setUser, isLoading, token, isAuthenticated, setIsAuthenticated, setToken, checkAuthUser, storeToken}

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider

export const useUserContext = () => useContext(AuthContext);