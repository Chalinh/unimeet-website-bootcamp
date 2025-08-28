'use client';

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/lib/auth-actions";

export default function LoginForm() {
  const router = useRouter();
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage(null);
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    try {
      const result = await login(formData);

      // Handle server response
      if (result?.success) {
        setMessage("Logged in successfully!");
        router.push("/dashboard"); // change redirect page as needed
      } else {
        setMessage(result?.message || "Invalid email or password.");
      }
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
                <CardTitle className="text-center">Log In</CardTitle>
                    <p className="text-center text-sm text-blue-600 mt-2"></p>
            </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="justify-center flex flex-col space-y-3 w-100">
                        <div className='flex flex-col space-y-2'>
                            <label htmlFor="email">Email Address</label>
                            <input type="email" id="email" name="email" placeholder='Enter your email address' className='border-1 rounded-md px-3'required />
                        </div>
                        <div className='flex flex-col space-y-2'>
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" name="password" placeholder='****************' className='border-1 rounded-md px-3'required />
                        </div>
                        <Button type="submit" className="bg-[#F7B544] text-[#ffffff] hover:bg-[#F59F0A] mt-2">
                            {loading ? "Logging in..." : "Log In"}
                        </Button>
                        {message && (
            <p
              className={`ml-2 text-sm text-center ${
                message.includes("successfully") ? "text-green-600" : "text-red-600"
              }`}
            >
              {message}
            </p>
          )}
                    </form>
                </CardContent>
        </Card>
    )
}