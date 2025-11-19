'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './form.module.css'

export default function RegisterForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [firstName, setFirstName] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const contentType = res.headers.get("content-type");



      if(res.ok){
        router.push('/login');
      } 
      else if (contentType?.includes("application/json")) {
        const data = await res.json();
        setError( data.error || data.message || 'registration failed');
      } 
      else {
        const text = await res.text();
        setError( text || 'registration failed');
      }

    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
        <div className={styles.box}>
            <h1>Create Account</h1>
            <h2>Join Multi Task Managers</h2>
            <p>Fill in your details to get started</p>

            <form onSubmit={handleSubmit}>
              <div className={styles.inputGroup}>
                  <label htmlFor="email">Email</label>
                  <input
                  type="email"
                  id="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  />
              </div>

              <div className={styles.inputGroup}>
                  <label htmlFor="firstName">First Name</label>
                  <input
                  type="text"
                  id="firstName"
                  placeholder="John (optional)"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  />
              </div>

              <div className={styles.inputGroup}>
                  <label htmlFor="password">Password</label>
                  <input
                  type="password"
                  id="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  />
              </div>

              {error && <p className={styles.error}>{error}</p>}

              <button type="submit" className={styles.button}>
                  Create Account
              </button>

              <button 
                type="button"
                className={styles.button}
                onClick={() => router.push('/login')}>
                  Back to Login
              </button>
            </form>
         </div>
  );
}
