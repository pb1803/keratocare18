import { initializeApp, getApps } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, User } from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  serverTimestamp,
  QueryDocumentSnapshot,
  DocumentData,
} from "firebase/firestore";

// Required env keys
const REQUIRED_KEYS = [
  "VITE_FIREBASE_API_KEY",
  "VITE_FIREBASE_AUTH_DOMAIN",
  "VITE_FIREBASE_PROJECT_ID",
  "VITE_FIREBASE_STORAGE_BUCKET",
  "VITE_FIREBASE_MESSAGING_SENDER_ID",
  "VITE_FIREBASE_APP_ID",
];

function checkEnv() {
  const missing: string[] = [];
  for (const k of REQUIRED_KEYS) {
    if (!import.meta.env[k]) missing.push(k);
  }
  if (missing.length) {
    // Friendly runtime message for developers
    // eslint-disable-next-line no-console
    console.error(
      `Firebase not initialized — missing environment variables: ${missing.join(", ")}.\n` +
        `Create a .env.local at the project root (same folder as package.json) with these VITE_* keys. See FIREBASE_SETUP.md for details.`
    );
    return false;
  }
  return true;
}

// Reads config from Vite env variables.
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

let db: ReturnType<typeof getFirestore> | null = null;
let auth: ReturnType<typeof getAuth> | null = null;

if (checkEnv()) {
  try {
    if (!getApps().length) {
      const app = initializeApp(firebaseConfig as any);
      db = getFirestore(app);
      auth = getAuth(app);
    } else {
      db = getFirestore();
      auth = getAuth();
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.warn("Firebase initialization failed:", err);
  }
} else {
  // If env missing, leave db/auth null — callers must handle gracefully
}

const COLLECTION = "contact_messages";

export type ContactEntry = {
  name: string;
  email: string;
  phone: string;
  condition?: string;
  message?: string;
  createdAt?: any;
};

export async function addContactMessage(entry: ContactEntry) {
  if (!db) {
    console.error("❌ Firestore not initialized");
    throw new Error("Database service unavailable. Please call us directly at +91 72768 61131");
  }

  try {
    console.log("🔄 Adding document to collection:", COLLECTION);
    const col = collection(db, COLLECTION);
    const docRef = await addDoc(col, {
      ...entry,
      createdAt: serverTimestamp(),
      submittedAt: new Date().toISOString(), // Backup timestamp
    });
    console.log("✅ Document added with ID:", docRef.id);
    return docRef.id;
  } catch (error: any) {
    console.error("❌ Firestore addDoc error:", error);
    
    // Provide specific error messages for common issues
    if (error?.code === 'permission-denied') {
      throw new Error("Database access restricted. Please call us directly.");
    } else if (error?.code === 'unavailable') {
      throw new Error("Service temporarily unavailable. Please try again.");
    } else if (error?.code === 'cancelled' || error?.code === 'deadline-exceeded') {
      throw new Error("Connection timeout - please check your internet and try again");
    } else {
      throw new Error(`Database error: ${error?.message || 'Unknown error'}`);
    }
  }
}

export async function fetchContactMessages(): Promise<Array<{ id: string; data: ContactEntry }>> {
  if (!db) throw new Error("Firestore not initialized. Check your Firebase config.");
  const col = collection(db, COLLECTION);
  const snap = await getDocs(col);
  const results: Array<{ id: string; data: ContactEntry }> = [];
  snap.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {
    results.push({ id: doc.id, data: doc.data() as ContactEntry });
  });
  // Sort by createdAt if present
  results.sort((a, b) => {
    const ta = a.data.createdAt?.seconds ?? 0;
    const tb = b.data.createdAt?.seconds ?? 0;
    return tb - ta;
  });
  return results;
}

// Firebase Auth helpers (Google sign-in)
export function getAuthInstance() {
  if (!auth) throw new Error("Firebase Auth not initialized. Check your Firebase config.");
  return auth;
}

export async function signInWithGoogle(): Promise<User> {
  if (!auth) throw new Error("Firebase Auth not initialized. Check your Firebase config.");
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  return result.user as User;
}

export async function signOutUser() {
  if (!auth) throw new Error("Firebase Auth not initialized. Check your Firebase config.");
  return signOut(auth);
}

export function onAuthChange(callback: (user: User | null) => void) {
  if (!auth) {
    callback(null);
    return () => {};
  }
  return onAuthStateChanged(auth, callback);
}

export default db;

// Helper for UI to know whether Firebase is configured
export function isFirebaseConfigured(): boolean {
  return checkEnv();
}
