"use client";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
  email: string;
  password: string;
  confirmPassword: string;
};

const Page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    getValues,
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <div
      onSubmit={handleSubmit(onSubmit)}
      className="absolute top-0 left-0 h-full w-full z-[-10] bg-slate-200 flex justify-center items-center"
    >
      <form className="relative bg-white w-80 px-4 py-10 flex flex-col gap-y-2 rounded">
        <input
          {...register("email")}
          type="email"
          placeholder="email"
          className="px-4 py-2 rounded bg-slate-200"
        />
        <input
          {...register("password", { required: true })}
          type="password"
          placeholder="password"
          className="px-4 py-2 rounded bg-slate-200"
        />
        <input
          {...register("confirmPassword")}
          type="password"
          placeholder="password"
          className="px-4 py-2 rounded bg-slate-200"
        />

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
