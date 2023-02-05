import { createContext, useState, useContext, useEffect } from "react";

export const AuthContext = createContext<string | null>('');

export const AuthContextProvider = ({children}: any)=> {
  const [token, setToken] = useState<string | null>(null)
  useEffect(() => {
    setToken(localStorage.getItem("token"))
  }, [])
  return (
    <AuthContext.Provider value={token}>
      {children}
    </AuthContext.Provider>
  )
}