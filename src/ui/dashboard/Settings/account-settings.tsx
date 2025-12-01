"use client";

import { useState } from "react";

export default function AccountSettings() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [status, setStatus] = useState<null | "saving" | "saved" | "error">(null);
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg("");

    if (newPassword !== confirmPassword) {
      setErrorMsg("New passwords do not match.");
      return;
    }

    setStatus("saving");

    try {
      const res = await fetch("/api/account/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to change password");
      }

      setStatus("saved");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      console.error(err);
      setStatus("error");
      setErrorMsg(err.message || "Error changing password.");
    }
  }

  return (
    <>
      <h2 className="text-lg font-medium">Account</h2>
      <p className="mt-1 text-sm text-gray-500">
        Update security and sign-in preferences.
      </p>

      <form onSubmit={handleSubmit} className="mt-4 space-y-4 max-w-md">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Current password
          </label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
            autoComplete="current-password"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            New password
          </label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
            autoComplete="new-password"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Confirm new password
          </label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
            autoComplete="new-password"
          />
        </div>

        <button
          type="submit"
          disabled={status === "saving"}
          className="mt-2 inline-flex items-center justify-center rounded-md bg-sky-600 px-4 py-2 text-sm font-medium text-white hover:bg-sky-700 disabled:opacity-60"
        >
          {status === "saving" ? "Updating..." : "Change password"}
        </button>

        {errorMsg && (
          <p className="text-sm text-red-600 mt-1">{errorMsg}</p>
        )}
        {status === "saved" && !errorMsg && (
          <p className="text-sm text-green-600 mt-1">
            Password updated successfully ✅
          </p>
        )}
      </form>
    </>
  );
}
