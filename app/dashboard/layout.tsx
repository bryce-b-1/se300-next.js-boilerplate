import NavLinks from '../ui/dashboard/nav-links';
import SideNav from '../ui/dashboard/sidenav';
import styles from './dashboard.module.css';
import { cookies } from "next/headers";
import UserModel from "@/lib/db-models/UserModel";
import dbConnect from "@/lib/dbConnect";

export default async function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}){ 

  const email = null; // null for now

  return (
    <section className={styles.dashboardContainer}>
      <nav className={styles.sidebar}>
        <SideNav email={email ?? ""} />
      </nav>
      <main className={styles.mainContent}>
        {children}
      </main>
    </section>
  );
}