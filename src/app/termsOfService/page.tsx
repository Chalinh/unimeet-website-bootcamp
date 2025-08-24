import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from "next/image"

export default function TermsOfService() {
    return (
        <div className="flex flex-col min-h-screen pt-5">
            {/* Header */}
            <header className="flex fixed top-0 left-0 w-full items-center justify-between h-20 px-5 md:px-7 bg-[#ffffff] shadow-md">
                <Link href="/" className="flex items-center" prefetch={false}>
                    <Image src="/unimeet_logo.png" alt="unimeet logo" width={205} height={116}></Image>
                </Link>
                <nav className="flex items-center gap-5">
                    <Button className="rounded-8 bg-[#ffffff] text-[#000000] hover:bg-[#0DA2E7] hover:text-[#ffffff] border-1">
                        <Link href="/login" className="flex items-center">Log In</Link>
                    </Button>
                    <Button className="rounded-8 bg-[#ffffff] text-[#000000] hover:bg-[#0DA2E7] hover:text-[#ffffff] border-1">
                        <Link href="/signup" className="flex items-center">Sign Up</Link>
                    </Button>
                </nav>
            </header>

            <section className="bg-[#0da2e7] flex-1 flex items-center justify-center px-1 md:px-7 space-y-3 py-10 md:py-20">
                    <h1 className="font-outfit text-5xl font-medium text-white text-center">Terms of Service</h1>
            </section>

            {/* Terms of Service Content */}
            <main className="max-w-4xl mx-auto px-6 py-12 bg-[#ffffff]">
                <div className='space-y-8'>
                    <div className='text-muted-foreground text-sm'>Last updated: June 18, 2025</div>
                    <p className='text-muted-foreground leading-relaxed'>Welcome to UniMeet. These Terms & Conditions ("Terms") govern your use of the UniMeet website and services (the "Service"). By accessing or using UniMeet, you agree to be bound by these Terms and our Privacy Policy. If you do not agree, please do not use the Service.</p>

                    <section>
                        <h2 className='text-xl font-medium text-[#000000] mb-4'>1. Eligibility</h2>
                        <p className='text-muted-foreground leading-relaxed mb-4'>
                            To use UniMeet, you must be:
                        </p>
                        <ul className='list-disc list-inside text-muted-foreground space-y-2 ml-4'>
                            <li>At least 13 years old</li>
                            <li>Able to form a binding contract under applicable law</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className='text-xl font-medium text-[#000000] mb-4'>2. Use of the Service</h2>
                        <p className='text-muted-foreground leading-relaxed mb-4'>
                            UniMeet provides tools for students to:
                        </p>
                        <ul className='list-disc list-inside text-muted-foreground space-y-2 ml-4'>
                            <li>Create and manage study groups</li>
                            <li>Schedule and join study sessions</li>
                            <li>View Calendar</li>
                        </ul>
                        <p className='text-muted-foreground leading-relaxed mt-4'>
                            You agree to use the Service only for lawful purposes and in accordance with these Terms.
                        </p>
                    </section>

                    <section>
                        <h2 className='text-xl font-medium text-[#000000] mb-4'>3. Account Responsibilities</h2>
                        <ul className='list-disc list-inside text-muted-foreground space-y-2 ml-4'>
                            <li>You are responsible for maintaining the confidentiality of your login credentials.</li>
                            <li>You agree to use accurate and up-to-date information when registering.</li>
                            <li>You are responsible for all activity under your account.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className='text-xl font-medium text-[#000000] mb-4'>4. Content Ownership & User Data</h2>
                        <p className='text-muted-foreground leading-relaxed mb-4'>
                            You retain ownership of any content you submit to the platform, such as:
                        </p>
                        <ul className='list-disc list-inside text-muted-foreground space-y-2 ml-4'>
                            <li>Group names</li>
                            <li>Description</li>
                            <li>Team members</li>
                        </ul>
                        <p className='text-muted-foreground leading-relaxed mt-4'>
                            By submitting content, you grant UniMeet a limited, non-exclusive license to use, display, and store this content as needed to operate the Service.
                        </p>
                    </section>

                    <section>
                        <h2 className='text-xl font-medium text-[#000000] mb-4'>5. Prohibited Conduct</h2>
                        <p className='text-muted-foreground leading-relaxed mb-4'>
                            You agree not to:
                        </p>
                        <ul className='list-disc list-inside text-muted-foreground space-y-2 ml-4'>
                            <li>Post or share unlawful, offensive, or harmful content</li>
                            <li>Harass or threaten other users</li>
                            <li>Attempt to access accounts or data you do not own</li>
                            <li>Interfere with the security or operation of the Service</li>
                            <li>Use the Service for spam, advertising, or non-academic purposes</li>
                        </ul>
                        <p className='text-muted-foreground leading-relaxed mt-4'>
                            We may update this Privacy Policy periodically. If we make significant changes, we will notify users via the website or email.
                        </p>
                    </section>

                    <section>
                        <h2 className='text-xl font-medium text-[#000000] mb-4'>6. Intellectual Property</h2>
                        <p className='text-muted-foreground leading-relaxed mb-4'>
                            All software, branding, and content on UniMeet (except user-submitted content) are the property of UniMeet or its licensors and are protected by copyright and trademark laws. You may not copy, modify, or redistribute any part of the Service without permission.
                        </p>
                    </section>

                    <section>
                        <h2 className='text-xl font-medium text-[#000000] mb-4'>7. Service Availability</h2>
                        <p className='text-muted-foreground leading-relaxed mb-4'>
                            We aim to provide reliable service but do not guarantee:
                        </p>
                        <ul className='list-disc list-inside text-muted-foreground space-y-2 ml-4'>
                            <li>Continuous, uninterrupted access</li>
                            <li>Freedom from bugs or errors</li>
                            <li>Data recovery in the case of user deletion or service failure</li>
                        </ul>
                        <p className='text-muted-foreground leading-relaxed mt-4'>
                            We reserve the right to update, suspend, or terminate parts of the Service at any time without notice.
                        </p>
                    </section>

                    <section>
                        <h2 className='text-xl font-medium text-[#000000] mb-4'>8. Limitation of Liability</h2>
                        <p className='text-muted-foreground leading-relaxed mb-4'>
                            To the fullest extent permitted by law, UniMeet shall not be liable for:
                        </p>
                        <ul className='list-disc list-inside text-muted-foreground space-y-2 ml-4'>
                            <li>Indirect or consequential damages</li>
                            <li>Data loss or corruption</li>
                            <li>Unauthorized access to your account</li>
                        </ul>
                    </section>
                </div>
            </main>

            {/* Footer */}
        <footer className="bg-[#435977] py-10">
          <div className="container mx-auto text-center items-center flex flex-row justify-center gap-8">
            <p className="text-sm  text-[#ffffff]">
              &copy; {new Date().getFullYear()} UniMeet. All rights reserved.
            </p>
            <Link href="/privacyPolicy"><p className="text-sm  text-[#ffffff] hover:underline cursor-pointer">Privacy Policy</p></Link>
            <Link href="/termsOfService"><p className="text-sm  text-[#ffffff] hover:underline cursor-pointer">Terms of Service</p></Link>
          </div>
        </footer>
        </div>
    )
}