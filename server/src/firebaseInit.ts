import admin from "firebase-admin";

import { googleApplicationCredentials } from "./settings";

const serviceAccount = require(googleApplicationCredentials!);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:
    "https://tron-flow-default-rtdb.asia-southeast1.firebasedatabase.app",
});

export const messaging = admin.messaging();
