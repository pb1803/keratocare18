import React from "react";
import { isFirebaseConfigured } from "@/lib/firebase";

const EnvBanner = () => {
  const ok = isFirebaseConfigured();
  if (ok) return null;
  return (
    <div className="w-full bg-yellow-50 border-b border-yellow-200 text-yellow-900 px-4 py-3">
      <div className="container mx-auto">
        <strong>Firebase not configured</strong> — missing VITE_FIREBASE_* environment variables. Create a <code>.env.local</code> in the project root (next to <code>package.json</code>) and restart the dev server. See <code>FIREBASE_SETUP.md</code> for details.
      </div>
    </div>
  );
};

export default EnvBanner;
