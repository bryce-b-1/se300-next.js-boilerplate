import { redirect } from 'next/navigation';

export default function HomePage() {
  // This will permanently redirect any user who lands on the root URL
  // to the /login page.
  redirect('/login');
}