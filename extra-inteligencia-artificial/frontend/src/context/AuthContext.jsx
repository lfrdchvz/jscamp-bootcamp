import { createContext, useState, use } from "react";

export const AuthContext = createContext()

export function AuthProvider({ children }){
  const [isLoggedIn, setIsLoggedIn] = useState(false); 

  const login = () => {
    setIsLoggedIn(true)
  } 

  const logout = () => {
    setIsLoggedIn(false)
  }

  const value = {
    isLoggedIn,
    login,
    logout
  }

  return <AuthContext.Provider value = {value}>
    {children}
  </AuthContext.Provider>
}

export function useAuth() {
  const context = use(AuthContext)

  if(context === undefined){
    throw new Error('useAuth must be used with in an AuthProvider')
  }

  return context
}