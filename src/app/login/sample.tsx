"use client";
import React, { useState } from "react";

const Page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (password !== confirmPassword) {
      setErrors(["Passwords do not match"]);
      setIsSubmitting(false);
      return;
    } else setErrors([]);

    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitting(false);
  };
  return (
    <div className="absolute top-0 left-0 h-full w-full z-[-10] bg-slate-200 flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="relative bg-white w-80 px-4 py-10 flex flex-col gap-y-2 rounded"
      >
        {errors.length > 0 && (
          <ul>
            {errors.map((error) => (
              <li
                key={error}
                className="bg-red-100 text-red-500 px-4 py-2 rounded"
              >
                {error}
              </li>
            ))}
          </ul>
        )}
        <input
          type="email"
          value={email}
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
          className="px-4 py-2 rounded bg-slate-200"
        />
        <input
          type="password"
          value={password}
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
          className="px-4 py-2 rounded bg-slate-200"
        />
        <input
          type="password"
          value={confirmPassword}
          placeholder="password"
          onChange={(e) => setConfirmPassword(e.target.value)}
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
