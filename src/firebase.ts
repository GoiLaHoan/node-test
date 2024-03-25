import admin from "firebase-admin";
var serviceAccount = require("./serviceAccountKey.json");

const app = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:
    "https://node-test-e0e90-default-rtdb.asia-southeast1.firebasedatabase.app/",
});

const database = app.database();
const firestore = app.firestore();

export { app, admin, database, firestore };
