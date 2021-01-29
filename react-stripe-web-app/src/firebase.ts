import "firebase/auth";
import "firebase/firestore";
import fireBase from "firebase/app";

export const fireBaseConfig = {
  apiKey: "AIzaSyBQa7HoihWxrhXS-hak4ckhJWIW2Jqf1GU",
  authDomain: "dummy-store-1f634.firebaseapp.com",
  projectId: "dummy-store-1f634",
  storageBucket: "dummy-store-1f634.appspot.com",
  messagingSenderId: "295555234063",
  appId: "1:295555234063:web:771afddca0d776400c667a",
  measurementId: "G-RSV0G6ESTG",
};

fireBase.initializeApp(fireBaseConfig);
export const fireAuth = fireBase.auth();
export const fireStore = fireBase.firestore();
export default fireBaseConfig;
