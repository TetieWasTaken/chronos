"use client";

import { FirebaseAuth } from "@/utils/firebase/auth";
import { useState } from "react";

const auth = new FirebaseAuth();

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignUp = async () => {
    try {
      await auth.signUpWithEmail(email, password);
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleSignIn = async () => {
    try {
      await auth.signInWithEmail(email, password);
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleSignOut = async () => {
    try {
      await auth.signOut();
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleResetPassword = async () => {
    try {
      await auth.resetPassword(email);
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSignUp}>Sign Up</button>
      <button onClick={handleSignIn}>Sign In</button>
      <button onClick={handleSignOut}>Sign Out</button>
      <button onClick={handleResetPassword}>Reset Password</button>
      {error && <p>{error}</p>}
    </div>
  );
}
