import React from "react";

export const CheckOutSuccess = () => {
  const sessionId = new URL(window.location.href).searchParams.get(
    "session_id"
  );
  return (
    <>
      <h1 style={{ color: "limegreen" }}>Check Out Succeeded </h1>
      <code>Session ID: </code> <pre>{sessionId}</pre>
    </>
  );
};

export default CheckOutSuccess;
