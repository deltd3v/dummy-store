import React from "react";
import firebase from "firebase/app";
import { ObservableStatus } from "reactfire";
import { fireAuth, fireStore } from "../firebase";

const Customer = () => {};

export const SignInBtn = () => {
  const handleSignIn = async () => {
    const credentials = await fireAuth.signInWithPopup(
      new firebase.auth.GoogleAuthProvider()
    );

    const { uid, email } = credentials.user!;
    fireStore.collection("users").doc(uid).set({ email }, { merge: true });
  };

  return (
    <>
      <button onClick={handleSignIn}>Sign In with Google</button>
    </>
  );
};

export function SignOutBtn(props: { user?: ObservableStatus<firebase.User> }) {
  return (
    props.user! && (
      <button onClick={() => fireAuth.signOut()}>
        Sign Out {props.user.data.uid}
      </button>
    )
  );
}

export const SignOut = () => {};

export default Customer;
