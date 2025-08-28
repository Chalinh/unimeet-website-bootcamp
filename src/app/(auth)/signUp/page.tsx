'use client'

import SignUpForm from './components/signupForm';
import Image from 'next/image';

export default function SignUp() {
  return (
        <div className="flex flex-row min-h-screen pt-5 bg-[#ffffff]">
            <div className="bg-[#0DA2E7] w-3/7 flex items-center justify-center">
                <Image src="/signup-image.png" alt="Sign Up" width={554} height={707} className="px-10"/>
            </div>
            <div className="container flex-1 items-center justify-center flex flex-col space-y-2">
                <SignUpForm />
            </div>
        </div>
    )
}