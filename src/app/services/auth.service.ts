import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  UserCredential,
} from '@angular/fire/auth';
import { User } from '../interfaces/User';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: Auth) {}

  // Register
  register(user: User): Promise<UserCredential> {
    return createUserWithEmailAndPassword(this.auth, user.email, user.password);
  }

  // Login
  login(user: User): Promise<UserCredential> {
    return signInWithEmailAndPassword(this.auth, user.email, user.password);
  }

  // Login With Google
  loginWithGoogle(): Promise<UserCredential> {
    return signInWithPopup(this.auth, new GoogleAuthProvider());
  }

  // Logout
  logout(): Promise<void> {
    return this.auth.signOut();
  }

  // Get Session Storage Session
  getSessionData(key: string): string {
    return sessionStorage.getItem(key) as string;
  }

  // Set Session Storage Session
  setSessionData(key: string, value: string): void {
    sessionStorage.setItem(key, value);
  }

  // Get Checkbox Local Storage
  getLocalData(key: string): string {
    return localStorage.getItem(key) as string;
  }

  // Set Checkbox Local Storage
  setLocalData(key: string, value: string): void {
    localStorage.setItem(key, value);
  }
}
