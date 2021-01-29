import fireBase from "firebase-admin";

fireBase.initializeApp();

export const fireStore = fireBase.firestore();

export const fireAuth = fireBase.auth();

export default { fireStore, fireAuth };
