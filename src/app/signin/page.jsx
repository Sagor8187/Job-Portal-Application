"use client";

import React, { useState } from "react";
import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";

import { Check } from "@gravity-ui/icons";
import Link from "next/link";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function SigninForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    setLoading(true);

    const { data: result, error } = await authClient.signIn.email({
      email: data.email,
      password: data.password,
      rememberMe: true,
      callbackURL: "/dashboard",
    });

    setLoading(false);

    if (error) {
      toast.error(error.message || "Login failed");
      return;
    }

    toast.success("Login successful!");
    console.log("User:", result);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">

      <div className="w-full max-w-md bg-[#0f0f0f] border border-neutral-800 rounded-2xl p-6 shadow-2xl shadow-purple-500/10">

        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold text-white">
            Sign In
          </h2>
          <p className="text-sm text-neutral-400 mt-1">
            Welcome back, please login
          </p>
        </div>

        {/* FORM */}
        <Form className="flex flex-col gap-4" onSubmit={onSubmit}>

          {/* Email */}
          <TextField
            isRequired
            name="email"
            type="email"
            validate={(value) => {
              if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
              ) {
                return "Enter a valid email address";
              }
              return null;
            }}
          >
            <Label className="text-white">Email</Label>
            <Input placeholder="john@example.com" />
            <FieldError />
          </TextField>

          {/* Password */}
          <TextField
            isRequired
            name="password"
            type={showPassword ? "text" : "password"}
            validate={(value) => {
              if (value.length < 6) {
                return "Password must be at least 6 characters";
              }
              return null;
            }}
          >
            <Label className="text-white">Password</Label>

            <div className="relative w-full">
              <Input
                placeholder="••••••••"
                type={showPassword ? "text" : "password"}
                className="w-full pr-12"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white"
              >
                {showPassword ? (
                  <FaEyeSlash className="w-5 h-5" />
                ) : (
                  <FaEye className="w-5 h-5" />
                )}
              </button>
            </div>

            <Description>Enter your account password</Description>
            <FieldError />
          </TextField>

          {/* Buttons */}
          <div className="flex gap-3 pt-2">

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  Signing in...
                </>
              ) : (
                <>
                  <Check />
                  Sign In
                </>
              )}
            </Button>

            <Button type="reset" variant="secondary" className="w-full">
              Reset
            </Button>
          </div>

        </Form>

        {/* LINKS */}
        <div className="text-center mt-5 text-sm text-neutral-400 space-y-2">

          <p>
            Don’t have an account?{" "}
            <Link href="/signup" className="text-indigo-400 hover:text-indigo-300">
              Sign up
            </Link>
          </p>

          <p>
            <Link href="/forgot-password" className="text-neutral-500 hover:text-white">
              Forgot password?
            </Link>
          </p>

        </div>

      </div>
    </div>
  );
}