'use client'
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from "next/image";
import { Card, CardHeader, CardFooter, CardTitle, CardContent } from "@/components/ui/card";
import { useState } from 'react';


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
    const [isChecked, setIsChecked] = useState(false);
    const handleCheck = () => {
    setIsChecked(!isChecked);
  };
  return (
        <div className="flex flex-row min-h-screen pt-5 bg-[#ffffff]">
            <div className="bg-[#0DA2E7] w-3/7 flex items-center justify-center">
                <Image src="/signup-image.png" alt="Sign Up" width={554} height={707} className="px-10"/>
            </div>
            <div className="container flex-1 items-center justify-center flex flex-col space-y-2">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-center">Sign Up</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form action="" className=" justify-center flex flex-col space-y-3 w-100">
                            <div className='flex flex-col space-y-2'>
                                <label htmlFor="name">Name</label>
                        <input type="text" id="name" name="name" placeholder='Enter your name' className='border-1 rounded-md px-3'required />
                    </div>
                    <div className='flex flex-col space-y-2'>
                        <label htmlFor="email">Email Address</label>
                        <input type="email" id="email" name="email" placeholder='Enter your email address' className='border-1 rounded-md px-3'required />
                    </div>
                    <div className='flex flex-col space-y-2'>
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" placeholder='****************' className='border-1 rounded-md px-3'required />
                    </div>
                    <div className='flex flex-col space-y-2'>
                        <label htmlFor="password">Confirm Password</label>
                        <input type="password" id="password" name="password" placeholder='****************' className='border-1 rounded-md px-3'required />
                    </div>
                    <div>
                        <input type="checkbox" id="terms" checked={isChecked} onChange={handleCheck} required />
                        <label htmlFor="terms" className="ml-2 text-sm">by creating an account your are agreeing to our Terms and Conditions and Privacy Policy</label>
                    </div>
                    <Button type="submit" className="bg-[#F7B544] text-[#ffffff] hover:bg-[#F59F0A] mt-2"><Link href="/dashboard">Sign Up</Link></Button>
                </form>
                    </CardContent>
                    <CardFooter className="flex justify-center pb-5">
                        <Link href="/login"><p className="text-sm text-muted-foreground underline">Already have an account?</p></Link>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}