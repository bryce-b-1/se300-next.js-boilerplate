import Link from 'next/link';
import MyCalendar from "./calendar/page";

export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight">Dashboard Home</h1>
      <p>Welcome to your dashboard. Here is an overview of your group's activity.</p>
      <MyCalendar />

      <br />
      <Link href="/">Back to Login</Link> 

    </div>
  );
}



