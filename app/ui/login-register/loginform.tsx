'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './form.module.css';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try { // can be condensed down. 
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });




      const contentType = res.headers.get("content-type");

      if(res.ok){
        router.push('/dashboard');
      } 
      else if (contentType?.includes("application/json")) {
        const data = await res.json();
        setError( data.error || data.message || 'login failed');
      } 
      else {
        const text = await res.text();
        setError( text || 'login failed');
      }


    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
      <div className={styles.box}>
        <h1>Welcome!</h1>
        <h2>Log in to Multi Task Managers</h2>
        <p>Sign in to your account</p>

        <form onSubmit={handleSubmit} autoComplete="off">
          <div className={styles.inputGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="admin@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className={styles.error}>{error}</p>}

          <button type="submit" className={styles.button}>
            Login
          </button>

          <button
            type="button"
            className={styles.button}
            onClick={() => router.push('/register')}
          >
            Create Account
          </button>
        </form>
      </div>
  );
}
