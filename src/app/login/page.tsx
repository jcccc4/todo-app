"use client";

import { TLoginSchema, loginSchema } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import GoogleButtons from "@/components/buttons/GoogleButtons";

function Page() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<TLoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<TLoginSchema> = async (data: TLoginSchema) => {
    const signInData = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (!signInData?.ok) {
      setError("email", {
        type: "server",
        message: "Invalid email",
      });
    } else {
      router.replace("/dashboard");
    }
  };
  return (
    <div
      onSubmit={handleSubmit(onSubmit)}
      className="absolute top-0 left-0 h-full w-full z-[-10] bg-slate-200 flex justify-center items-center"
    >
      <form className="relative bg-white w-80 px-4 py-10 flex flex-col gap-y-2 rounded">
        <input
          {...register("email")}
          id="loginId"
          type="email"
          placeholder="email"
          className="px-4 py-2 rounded bg-slate-200"
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}

        <input
          {...register("password")}
          id="loginPassword"
          type="password"
          placeholder="password"
          className="px-4 py-2 rounded bg-slate-200"
        />
        {errors.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-500 text-white disabled:bg-gray-500 py-2 rounded"
        >
          Login
        </button>
        <GoogleButtons>Google</GoogleButtons>
      </form>
    </div>
  );
}

export default Page;
