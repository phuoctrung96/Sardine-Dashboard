import admin from "firebase-admin";

export class FirebaseClient {
  auth: admin.auth.Auth;

  constructor() {
    admin.initializeApp();
    this.auth = admin.auth();
  }

  verifyIdToken = (idToken: string) => this.auth.verifyIdToken(idToken);

  userInfo = () => this.auth.listUsers();

  deleteAllUsers = (uids: string[]) => this.auth.deleteUsers(uids);

  deleteUser = (uid: string) => this.auth.deleteUser(uid);
}

export const firebaseAdmin = new FirebaseClient();
