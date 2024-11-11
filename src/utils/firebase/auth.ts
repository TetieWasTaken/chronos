import { auth } from "./init";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import type { Auth, User, UserCredential } from "firebase/auth";
import { FirebaseError } from "firebase/app";

// todo: github/sms/google providers

class FirebaseAuth {
  private auth: Auth;

  constructor() {
    this.auth = auth;
  }

  async signUpWithEmail(
    email: string,
    password: string,
    redirectCallback?: () => void,
  ): Promise<UserCredential> {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password,
      );

      if (redirectCallback) {
        redirectCallback();
      }

      return userCredential;
    } catch (error: unknown) {
      if (error instanceof FirebaseError) throw new Error(error.message);
      else throw new Error("An unknown error occurred.");
    }
  }

  async signInWithEmail(
    email: string,
    password: string,
    redirectCallback?: () => void,
  ): Promise<UserCredential> {
    try {
      const userCredential = await signInWithEmailAndPassword(
        this.auth,
        email,
        password,
      );

      if (redirectCallback) {
        redirectCallback();
      }

      return userCredential;
    } catch (error: unknown) {
      if (error instanceof FirebaseError) throw new Error(error.message);
      else throw new Error("An unknown error occurred.");
    }
  }

  async signOut(redirectCallback?: () => void): Promise<void> {
    try {
      await signOut(this.auth);

      if (redirectCallback) {
        redirectCallback();
      }
    } catch (error: unknown) {
      if (error instanceof FirebaseError) throw new Error(error.message);
      else throw new Error("An unknown error occurred.");
    }
  }

  async resetPassword(email: string): Promise<void> {
    try {
      await sendPasswordResetEmail(this.auth, email);
    } catch (error: unknown) {
      if (error instanceof FirebaseError) throw new Error(error.message);
      else throw new Error("An unknown error occurred.");
    }
  }

  onAuthStateChanged(callback: (user: User | null) => void): void {
    onAuthStateChanged(this.auth, callback);
  }
}

export { FirebaseAuth };
