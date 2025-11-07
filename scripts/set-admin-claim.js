// Usage:
// 1. npm install firebase-admin
// 2. Obtain a Firebase service account JSON and set env var: GOOGLE_APPLICATION_CREDENTIALS=/path/to/serviceAccount.json
// 3. node scripts/set-admin-claim.js userUid
// OR supply an email and it will look up the user by email: node scripts/set-admin-claim.js --email user@example.com

const admin = require('firebase-admin');
const argv = require('yargs/yargs')(process.argv.slice(2)).argv;

if (!process.env.GOOGLE_APPLICATION_CREDENTIALS) {
  console.error('Please set GOOGLE_APPLICATION_CREDENTIALS to your service account JSON path.');
  process.exit(1);
}

admin.initializeApp();

async function setAdminByUid(uid) {
  await admin.auth().setCustomUserClaims(uid, { admin: true });
  console.log(`Set admin claim for uid=${uid}`);
}

async function lookupAndSetByEmail(email) {
  const user = await admin.auth().getUserByEmail(email);
  await setAdminByUid(user.uid);
}

(async () => {
  try {
    if (argv.email) {
      await lookupAndSetByEmail(argv.email);
    } else if (argv._ && argv._.length) {
      await setAdminByUid(argv._[0]);
    } else {
      console.error('Provide a uid as the first arg or use --email user@example.com');
      process.exit(1);
    }
    process.exit(0);
  } catch (err) {
    console.error('Error setting admin claim:', err);
    process.exit(1);
  }
})();
