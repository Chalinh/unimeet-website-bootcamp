'use client';

import { Button } from "./button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "./card";
import Link from "next/link";
import React, { useState } from "react";
import { signup } from "../../lib/auth-actions";

export default function SignUpForm() {
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage(null);

    const formData = new FormData(e.currentTarget);
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirm-password") as string;

    // ✅ Client-side check: password match
    if (password !== confirmPassword) {
      setMessage("Passwords do not match!");
      return;
    }

    setLoading(true);

    try {
      const result = await signup(formData);

      // ✅ Server-side response handling
      // If user already exists or invalid email, server returns a friendly message
      setMessage(result.message);

    } catch (err) {
      console.error(err);
      setMessage("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

    return (
    <Card>
        <CardHeader>
            <CardTitle className="text-center">Sign Up</CardTitle>
        </CardHeader>
        <CardContent>
            <form onSubmit={handleSubmit} className="justify-center flex flex-col space-y-3 w-100">
                <div className='flex flex-col space-y-2'>
                    <label htmlFor="name">Your Name</label>
                    <input type="text" id="name" name="name" placeholder='Enter your name' className='border-1 rounded-md px-3' required />
                </div>
                <div className='flex flex-col space-y-2'>
                    <label htmlFor="email">Email Address</label>
                    <input type="email" id="email" name="email" placeholder='Enter your email address' className='border-1 rounded-md px-3' required />
                </div>
                <div className='flex flex-col space-y-2'>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" placeholder='****************' className='border-1 rounded-md px-3' required />
                </div>
                <div className='flex flex-col space-y-2'>
                    <label htmlFor="confirm-password">Confirm Password</label>
                    <input type="password" id="confirm-password" name="confirm-password" placeholder='****************' className='border-1 rounded-md px-3' required />
                </div>
                <div>
                    <input type="checkbox" id="terms" required />
                    <label htmlFor="terms" className="ml-2 text-sm">by creating an account your are agreeing to our Terms and Conditions and Privacy Policy</label>
                </div>
                    <Button type="submit" className="bg-[#F7B544] text-[#ffffff] hover:bg-[#F59F0A] mt-2">
                        {loading ? "Signing Up..." : "Sign Up"}
                    </Button>
                    {message && (
            <p className={`ml-2 text-sm text-center ${message.includes("Check your email") ? "text-green-600" : "text-red-600"}`}>
              {message}
            </p>
          )}
            </form>
        </CardContent>
        <CardFooter className="flex justify-center pb-5">
            <Link href="/login"><p className="text-sm text-muted-foreground underline">Already have an account?</p></Link>
        </CardFooter>
    </Card>
    )
}