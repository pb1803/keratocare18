# Firebase setup (Firestore + Hosting)

This project includes a Firestore integration for the "Send Us a Message" form and an admin view at `/admin` to list and export submissions as CSV. Follow these steps to enable it locally and deploy to Firebase Hosting.

1. Install the Firebase SDK:

```powershell
npm install firebase
```

2. Create a Firebase project at https://console.firebase.google.com and enable Firestore (in Native mode).

3. Add a web app in Firebase and copy the config values. Create a `.env` file at the project root with these variables (Vite requires the VITE_ prefix):

```
VITE_FIREBASE_API_KEY=YOUR_API_KEY
VITE_FIREBASE_AUTH_DOMAIN=YOUR_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET=YOUR_STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID=YOUR_MESSAGING_SENDER_ID
VITE_FIREBASE_APP_ID=YOUR_APP_ID
```

4. Local dev:

```powershell
# install deps
npm i
# start dev server
npm run dev
```

5. Production / Hosting:

- Install Firebase CLI: `npm install -g firebase-tools` and run `firebase login`.
- Initialize hosting in the project root: `firebase init hosting firestore` and follow the prompts.
- When deploying, be sure your Firestore security rules allow the operations your app needs. For a secure admin view, consider using Firebase Authentication and server-side access rules. The current example is for demonstration and assumes open reads; secure it before production.

Notes:
- The Firestore collection used is `contact_messages`.
- For production, restrict reads/writes with rules or use a server-side function to securely export data.

## Set an admin user (server-side)

To make the `/admin` route usable you must mark at least one Firebase Authentication user as an admin. This is done with the Firebase Admin SDK by setting a custom claim `admin: true` on the user.

Example helper script is included at `scripts/set-admin-claim.js`.

Usage:

1. Install the Admin SDK locally (only required to run the script):

```powershell
npm install firebase-admin yargs
```

2. Obtain a Firebase service account JSON from the Firebase Console (Project Settings → Service accounts → Generate new private key) and set the environment variable:

```powershell
$env:GOOGLE_APPLICATION_CREDENTIALS = 'C:\path\to\serviceAccount.json'
```

3. Run the script to set admin by uid or email:

```powershell
# by uid
node scripts/set-admin-claim.js <USER_UID>

# or by email
node scripts/set-admin-claim.js --email user@example.com
```

After setting the claim, Firestore rules (in `firestore.rules`) will allow reads for users who have `admin: true` in their token. The claim may take a minute to propagate; you may need to sign out and sign in again.

