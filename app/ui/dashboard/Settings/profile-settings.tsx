"use client";

import { useState } from "react";

type ProfileSettingsProps = {
  initialFirstName?: string;
  initialEmail?: string;
};

export default function ProfileSettings({
  initialFirstName = "",
  initialEmail = "",
}: ProfileSettingsProps) {
  const [firstName, setFirstName] = useState(initialFirstName);
  const [email, setEmail] = useState(initialEmail);
  const [status, setStatus] = useState<null | "saving" | "saved" | "error">(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("saving");

    try {
      const res = await fetch("/api/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, email }),
      });

      if (!res.ok) {
        throw new Error("Failed to save");
      }

      setStatus("saved");
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  }

  return (
    <>
      <h2 className="text-lg font-medium">Profile</h2>
      <p className="mt-1 text-sm text-gray-500">
        This information will be visible to other users.
      </p>

      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            First name
          </label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
            placeholder="John"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
            placeholder="you@example.com"
          />
        </div>

        <button
          type="submit"
          disabled={status === "saving"}
          className="mt-2 inline-flex items-center justify-center rounded-md bg-sky-600 px-4 py-2 text-sm font-medium text-white hover:bg-sky-700 disabled:opacity-60"
        >
          {status === "saving" ? "Saving..." : "Save profile"}
        </button>

        {status === "saved" && (
          <p className="text-sm text-green-600 mt-1">Profile saved ✅</p>
        )}
        {status === "error" && (
          <p className="text-sm text-red-600 mt-1">Error saving profile.</p>
        )}
      </form>
    </>
  );
}
