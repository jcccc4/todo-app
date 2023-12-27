"use client";
import React from "react";
import Button from "./Button";
import { signIn, signOut, useSession } from "next-auth/react";

function AuthButtons() {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        {session?.user ? <p>{session?.user?.name}</p> : null}
        <br />
        <Button onClick={() => signOut()}>Logout</Button>
      </>
    );
  }
  return (
    <>
      <p>Not signed in </p>
      <br />
      <Button onClick={() => signIn()}>Sign in</Button>
    </>
  );
}

export default AuthButtons;
