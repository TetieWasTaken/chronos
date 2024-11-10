"use client";

import { useState } from "react";
import { FirebaseAuth } from "@/utils/firebase/auth";
import { useRouter } from "next/navigation";

const auth = new FirebaseAuth();

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSignIn = async () => {
    try {
      await auth.signInWithEmail(email, password, () => {
        router.push("/calendar");
      });
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleSignUp = async () => {
    try {
      await auth.signUpWithEmail(email, password, () => {
        router.push("/calendar");
      });
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleResetPassword = async () => {
    try {
      await auth.resetPassword(email);
      setError("Password reset email sent!");
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleSignOut = async () => {
    try {
      await auth.signOut(() => {
        router.push("/calendar");
      });
      setError("Signed out successfully.");
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-4 sm:p-6 flex flex-col items-center">
      <h1 className="text-2xl sm:text-3xl font-semibold mb-6">Sign In</h1>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-80 p-3 mb-4 border rounded border-gray-600 bg-gray-800 text-gray-200"
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-80 p-3 mb-6 border rounded border-gray-600 bg-gray-800 text-gray-200"
      />

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      <div className="flex flex-col space-y-3">
        <button
          onClick={handleSignIn}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded w-80"
        >
          Sign In
        </button>

        <button
          onClick={handleSignUp}
          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded w-80"
        >
          Sign Up
        </button>

        <button
          onClick={handleResetPassword}
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-6 rounded w-80"
        >
          Reset Password
        </button>

        <button
          onClick={handleSignOut}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded w-80"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}
