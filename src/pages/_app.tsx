import type { AppProps } from 'next/app'
import { AuthContext } from '@/hooks/context'
import { useEffect, useState } from 'react';
import '@/styles/globals.scss'

export default function App({ Component, pageProps }: AppProps) {
  const [token, setToken] = useState<string | null>(null);
  useEffect(() => {
    setToken(localStorage.getItem("token"))
  }) 
  return (
    <AuthContext.Provider value={{token, setToken}}>
      <Component {...pageProps} />
    </AuthContext.Provider>
  )
}
