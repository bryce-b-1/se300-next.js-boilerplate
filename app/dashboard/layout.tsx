import styles from './dashboard.module.css';

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section className={styles.dashboardContainer}>
      <nav className={styles.sidebar}>
        <h2>User's Dashboard</h2>
        <ul>
          <li>Calendar</li>
          <li>Events</li>
          <li>Groups</li>
          <li>Notifications</li>
          <li>Settings</li>
        </ul>
      </nav>
      <main className={styles.mainContent}>
        {children}
      </main>
    </section>
  );
}