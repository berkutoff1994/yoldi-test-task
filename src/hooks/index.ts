import { useState, useEffect } from 'react';

export function useGetEmail() {
  const [email, setEmail] = useState<string | null>(null);
  useEffect(() => {
    const email = localStorage.getItem('email')
    setEmail(email)
  }, []);

  return email;
}