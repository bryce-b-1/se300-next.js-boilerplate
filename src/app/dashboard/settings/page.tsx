'use client'; 


import ProfileSettings from "@/src/ui/dashboard/Settings/profile-settings";
import AccountSettings from "@/src/ui/dashboard/Settings/account-settings";
import NotificationSettings from "@/src/ui/dashboard/Settings/notification-settings";
import { getCurrentUserID } from "@/src/lib/ts-models/User";
import UserModel from "@/src/lib/db-models/UserModel";

export default async function SettingsPage() {

  // const userID = await getCurrentUserID();
  // const user = await UserModel.findOne({ userID })

  
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
