import app from "./config";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Initialize OAuth Providers
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

// Student Registration
export const registerStudent = async (email, password, userData) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  const user = userCredential.user;

  await updateProfile(user, {
    displayName: userData.fullName,
  });

  return {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
  };
};

// Student Login
export const loginStudent = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;
  return {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
  };
};

// Google Sign-In for Students
export const signInWithGoogle = async () => {
  googleProvider.addScope("profile");
  googleProvider.addScope("email");
  const userCredential = await signInWithPopup(auth, googleProvider);
  const user = userCredential.user;
  return {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL,
    provider: "google",
  };
};

// GitHub Sign-In for Students
export const signInWithGithub = async () => {
  githubProvider.addScope("user:email");
  const userCredential = await signInWithPopup(auth, githubProvider);
  const user = userCredential.user;
  return {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL,
    provider: "github",
  };
};

// Admin Login (custom)
export const adminLogin = async (username, password) => {
  const email = `${username}@smitadmin.local`;
  return await loginStudent(email, password);
};

// Logout
export const logout = async () => {
  await signOut(auth);
};

// Get current user
export const getCurrentUser = () => {
  return auth.currentUser;
};

// Auth state listener
export const onAuthStateChanged = (callback) => {
  return auth.onAuthStateChanged(callback);
};
