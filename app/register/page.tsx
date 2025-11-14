'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../login/login.module.css';   // Reusing styles from whats already in the login page

//State variables
export default function RegisterPage() {
  const [email, setEmail] = useState('');         //Stores the user's email input
  const [password, setPassword] = useState('');   //Stores the user's password input
  const [error, setError] = useState('');         //Stores error messages
  const router = useRouter();                     //Next.js page router

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();               // Prevent default form submission
    setError('');                     // Clears previous error messages

    try {
      const res = await fetch('/api/register', {      // Sends request to API route for registration
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),    // Sends email and password in request
      });

      if (res.ok) {                // If registration succeeds then user is redirected to dashboard without needing to log in again
        router.push('/dashboard');
      } else {                     // If registration fails then display error message 
        const data = await res.json();
        setError(data.error || 'Account creation failed.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <main className={styles.container}>
      <div className={styles.loginBox}>
        <h1>Create Account</h1>
        <h2>Join Multi Task Managers</h2>
        <p>Fill in your details to get started</p>
        <form onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="you@example.com"
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

          <button type="submit" className={styles.loginButton}>
            Create Account
          </button>
        </form>
      </div>
    </main>
  );
}