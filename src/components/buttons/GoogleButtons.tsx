import React, { ReactNode } from "react";
import Button from "./Button";
import { signIn } from "next-auth/react";

interface GoogleSignInButtonProps {
  children: ReactNode;
}

function GoogleButtons({ children }: GoogleSignInButtonProps) {
  const loginWithGoogle = async () =>
    await signIn("google", { callbackUrl: "/dashboard" });

  return <Button onClick={loginWithGoogle}>{children}</Button>;
}

export default GoogleButtons;
