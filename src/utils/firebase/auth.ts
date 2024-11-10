import { auth } from "./init";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import type { Auth, User, UserCredential } from "firebase/auth";

class FirebaseAuth {
  private auth: Auth;

  constructor() {
    this.auth = auth;
  }

  async signUpWithEmail(
    email: string,
    password: string,
  ): Promise<UserCredential> {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password,
      );

      return userCredential;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async signInWithEmail(
    email: string,
    password: string,
  ): Promise<UserCredential> {
    try {
      const userCredential = await signInWithEmailAndPassword(
        this.auth,
        email,
        password,
      );
      return userCredential;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async signOut(): Promise<void> {
    try {
      await signOut(this.auth);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async resetPassword(email: string): Promise<void> {
    try {
      await sendPasswordResetEmail(this.auth, email);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  onAuthStateChanged(callback: (user: User | null) => void): void {
    onAuthStateChanged(this.auth, callback);
  }
}

export { FirebaseAuth };
