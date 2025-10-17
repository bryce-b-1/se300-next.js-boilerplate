import Link from 'next/link';
import styles from './login.module.css'; // We'll create this file for styling

export default function LoginPage() {
  return (
    <main className={styles.container}>
      <div className={styles.loginBox}>
        <h1>Welcome!</h1>
        <h2>Log in to Multi Task Managers</h2>
        <p>Sign in to your account</p>
        <form>
          <div className={styles.inputGroup}>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" placeholder="you@example.com" />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" placeholder="••••••••" />
          </div>
          {/* This Link will take the user to the dashboard for now */}
          <Link href="/dashboard" className={styles.loginButton}>
            Login
          </Link>
        </form>
      </div>
    </main>
  );
}