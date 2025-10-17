import Link from 'next/link';

export default function DashboardPage() {
  return (
    <div>
      <h1>Dashboard Home</h1>
      <p>Welcome to your dashboard. Here is an overview of your group's activity.</p>
      <Link href="/">Back to Login</Link> 
    </div>
  );
}