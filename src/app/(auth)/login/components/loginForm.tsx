'use client';

import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { login } from "@/lib/auth-actions"
import { useSearchParams } from 'next/navigation';

export default function LoginForm() {
    const searchParams = useSearchParams();
    const message = searchParams.get('message');

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-center">Log In</CardTitle>
                {message && (
                    <p className="text-center text-sm text-blue-600 mt-2">{message}</p>
                )}
            </CardHeader>
                <CardContent>
                    <form className="justify-center flex flex-col space-y-3 w-100">
                        <div className='flex flex-col space-y-2'>
                            <label htmlFor="email">Email Address</label>
                            <input type="email" id="email" name="email" placeholder='Enter your email address' className='border-1 rounded-md px-3'required />
                        </div>
                        <div className='flex flex-col space-y-2'>
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" name="password" placeholder='****************' className='border-1 rounded-md px-3'required />
                        </div>
                        <Button type="submit" formAction={login} className="bg-[#F7B544] text-[#ffffff] hover:bg-[#F59F0A] mt-2">Log In</Button>
                    </form>
                </CardContent>
        </Card>
    )
}