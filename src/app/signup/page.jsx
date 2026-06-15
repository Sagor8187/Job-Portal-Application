"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
  Radio,
  RadioGroup,
} from "@heroui/react";

import { FaEye, FaEyeSlash, FaCheck } from "react-icons/fa";
import { authClient } from "@/lib/auth-client";

export default function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    setLoading(true);

    const { error } = await authClient.signUp.email({
      name: data.username,
      email: data.email,
      password: data.password,
      image: data.imageUrl,
      role: data.role,
      callbackURL: "/signin",
    });

    setLoading(false);

    if (error) {
      toast.error(error.message || "Signup failed");
      return;
    }

    toast.success("Account created successfully!");
    router.push("/signin");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="w-full max-w-md bg-[#0f0f0f] border border-neutral-800 rounded-2xl p-6 shadow-2xl shadow-purple-500/10">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold text-white">
            Create Account
          </h2>

          <p className="text-sm text-neutral-400 mt-1">
            Join and start your journey
          </p>
        </div>

        {/* Form */}
        <Form className="flex flex-col gap-4" onSubmit={onSubmit}>
          {/* Username */}
          <TextField isRequired name="username">
            <Label className="text-white">Username</Label>
            <Input placeholder="your_username" />
            <FieldError />
          </TextField>

          {/* Profile Image */}
          <TextField
            isRequired
            name="imageUrl"
            type="url"
            validate={(value) => {
              if (!value.startsWith("http")) {
                return "Please enter a valid image URL";
              }
              return null;
            }}
          >
            <Label className="text-white">Profile Image URL</Label>
            <Input placeholder="https://example.com/image.jpg" />
            <Description>Use a valid image link</Description>
            <FieldError />
          </TextField>

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

          {/* Role */}
          <div className="flex flex-col gap-3">
            <Label className="text-white">Select Role</Label>

            <RadioGroup
              name="role"
              defaultValue="seeker"
              orientation="horizontal"
              className="flex gap-4"
            >
              <Radio value="seeker">
                <Radio.Control>
                  <Radio.Indicator />
                </Radio.Control>

                <Radio.Content>
                  <Label className="text-white">Seeker</Label>
                  <Description>Looking for jobs</Description>
                </Radio.Content>
              </Radio>

              <Radio value="recruiter">
                <Radio.Control>
                  <Radio.Indicator />
                </Radio.Control>

                <Radio.Content>
                  <Label className="text-white">Recruiter</Label>
                  <Description>Posting jobs</Description>
                </Radio.Content>
              </Radio>
            </RadioGroup>
          </div>

          {/* Password */}
          <TextField
            isRequired
            name="password"
            type={showPassword ? "text" : "password"}
            validate={(value) => {
              if (value.length < 8) {
                return "At least 8 characters required";
              }

              if (!/[A-Z]/.test(value)) {
                return "Add at least 1 uppercase letter";
              }

              if (!/[0-9]/.test(value)) {
                return "Add at least 1 number";
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
                className="absolute right-3 top-1/2 -translate-y-1/2 text-black"
              >
                {showPassword ? (
                  <FaEyeSlash className="w-5 h-5" />
                ) : (
                  <FaEye className="w-5 h-5" />
                )}
              </button>
            </div>

            <Description>
              8+ characters, 1 uppercase letter, 1 number
            </Description>

            <FieldError />
          </TextField>

          {/* Buttons */}
          <div className="flex gap-3 pt-2 w-full">
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Loading...
                </>
              ) : (
                <>
                  <FaCheck className="w-4 h-4" />
                  Sign Up
                </>
              )}
            </Button>

            <Button
              type="reset"
              variant="secondary"
              className="w-full"
            >
              Reset
            </Button>
          </div>
        </Form>

        {/* Sign In Link */}
        <p className="text-center text-sm text-neutral-400 mt-6">
          Already have an account?{" "}
          <Link
            href="/signin"
            className="text-indigo-400 hover:text-indigo-300 transition"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}