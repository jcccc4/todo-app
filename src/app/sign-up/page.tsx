"use client";
import { signUpSchema, TSignUpSchema } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";

const Page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    getValues,
    setError,
  } = useForm<TSignUpSchema>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit: SubmitHandler<TSignUpSchema> = async (
    data: TSignUpSchema
  ) => {
    const response = await fetch("api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: data.username,
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
      }),
    });

    const responseData = await response.json();

    if (responseData.errors) {
      const errors = responseData.errors;

      if (errors.email) {
        setError("email", {
          type: "server",
          message: errors.email,
        });
      } else if (errors.password) {
        setError("password", {
          type: "server",
          message: errors.password,
        });
      } else if (errors.confirmPassword) {
        setError("confirmPassword", {
          type: "server",
          message: errors.confirmPassword,
        });
      } else {
        alert("Something went wrong!");
      }
    }
  };

  return (
    <div
      onSubmit={handleSubmit(onSubmit)}
      className="absolute top-0 left-0 h-full w-full z-[-10] bg-slate-200 flex justify-center items-center"
    >
      <form className="relative bg-white w-80 px-4 py-10 flex flex-col gap-y-2 rounded">
        <input
          {...register("username")}
          type="text"
          placeholder="username"
          className="px-4 py-2 rounded bg-slate-200"
        />
        {errors.username && (
          <p className="text-red-500">{errors.username.message}</p>
        )}

        <input
          {...register("email")}
          type="email"
          placeholder="email"
          className="px-4 py-2 rounded bg-slate-200"
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
        <input
          {...register("password")}
          type="password"
          placeholder="password"
          className="px-4 py-2 rounded bg-slate-200"
        />
        {errors.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}

        <input
          {...register("confirmPassword")}
          type="password"
          placeholder="password"
          className="px-4 py-2 rounded bg-slate-200"
        />
        {errors.confirmPassword && (
          <p className="text-red-500">{errors.confirmPassword.message}</p>
        )}
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-500 text-white disabled:bg-gray-500 py-2 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Page;
