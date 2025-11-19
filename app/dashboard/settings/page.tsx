'use client'; 


import ProfileSettings from "@/app/ui/dashboard/Settings/profile-settings";
import AccountSettings from "@/app/ui/dashboard/Settings/account-settings";
import NotificationSettings from "@/app/ui/dashboard/Settings/notification-settings";

export default function SettingsPage() {
  return (
    <div className="space-y-8">

      <header>
        <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>
        <p className="text-sm text-gray-500">
          Manage your account, preferences, and notifications.
        </p>
      </header>


      <section className="rounded-lg border bg-white p-6 shadow-sm">
        <ProfileSettings />
      </section>
      
      <section className="rounded-lg border bg-white p-6 shadow-sm">
        <AccountSettings />
      </section>


      <section className="rounded-lg border bg-white p-6 shadow-sm">
        <NotificationSettings />
      </section>

    </div>
  );
}
