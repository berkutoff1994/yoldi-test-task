import { useState, useEffect } from 'react';

export function useGetEmail() {
  const [email, setEmail] = useState<string | null>(null);
  useEffect(() => {
    const email = localStorage.getItem('email')
    setEmail(email)
  }, []);

  return email;
}

export function useGetToken() {
  const [token, setToken] = useState<string | null>('');
  useEffect(() => {
    const token = localStorage.getItem('token')
    setToken(token)
  }, []);

  return token;
}