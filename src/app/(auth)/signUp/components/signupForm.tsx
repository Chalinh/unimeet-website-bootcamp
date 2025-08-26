'use client';

import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {signup} from "@/lib/auth-actions"

export default function SignUpForm() {
    const router = useRouter();

    return (
    <Card>
        <CardHeader>
            <CardTitle className="text-center">Sign Up</CardTitle>
        </CardHeader>
        <CardContent>
            <form action={signup} className="justify-center flex flex-col space-y-3 w-100">
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
                    <Button type="submit" formAction={signup} className="bg-[#F7B544] text-[#ffffff] hover:bg-[#F59F0A] mt-2">Sign Up</Button>
            </form>
        </CardContent>
        <CardFooter className="flex justify-center pb-5">
            <Link href="/login"><p className="text-sm text-muted-foreground underline">Already have an account?</p></Link>
        </CardFooter>
    </Card>
    )
}