'use client'
import Link from 'next/link';
import { Button } from '../../../components/ui/button';
import Image from "next/image";
import { Card, CardHeader, CardTitle, CardContent } from "../../../components/ui/card";
import { useState } from 'react';
import LoginForm from '../../../components/ui/loginForm';

export default function SignUp() {
    const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false
  })

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  return (
        <div className="flex flex-row min-h-screen pt-5 bg-[#ffffff]">
            <div className="bg-[#0DA2E7] w-3/7 flex items-center justify-center">
                <Image src="/signup-image.png" alt="Sign Up" width={554} height={707} className="px-10"/>
            </div>
            <div className="container flex-1 items-center justify-center flex flex-col space-y-2">
                <LoginForm />
            </div>
        </div>
    )
}