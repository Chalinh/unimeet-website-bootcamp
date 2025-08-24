import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from "next/image"

export default function PrivacyPolicy() {
    return (
        <div className="flex flex-col min-h-screen pt-5">
            {/* Header */}
            <header className="flex fixed top-0 left-0 w-full items-center justify-between h-20 px-5 md:px-7 bg-[#ffffff] shadow-md">
                <Link href="/" className="flex items-center gap-2" prefetch={false}>
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
                    <h1 className="font-outfit text-5xl font-medium text-white text-center">Privacy Policy</h1>
            </section>

            {/* Privacy Policy Content */}
            <main className="max-w-4xl mx-auto px-6 py-12 bg-[#ffffff]">
                <div className='space-y-8'>
                    <div className='text-muted-foreground text-sm'>Last updated: June 18, 2025</div>
                    <p className='text-muted-foreground leading-relaxed'>At UniMeet, we value the privacy of our users. This Privacy Policy explains how we collect, use, and protect your personal information when you use our website and services.</p>
                    <p className='text-muted-foreground leading-relaxed'>We comply with the European Union’s General Data Protection Regulation (GDPR) and the data protection laws of Switzerland. By using UniMeet, you agree to the practices outlined in this Privacy Policy. If you do not agree, please discontinue use of the service.</p>

                    <section>
                        <h2 className='text-xl font-medium text-[#000000] mb-4'>1. Personal Information</h2>
                        <p className='text-muted-foreground leading-relaxed mb-4'>
                            We collect limited personal information during account creation and use of our services. This may include:
                        </p>
                        <ul className='list-disc list-inside text-muted-foreground space-y-2 ml-4'>
                            <li>Your name (if provided)</li>
                            <li>Email address</li>
                            <li>Authentication data from Google or other providers</li>
                            <li>Profile settings or preferences</li>
                        </ul>
                        <p className='text-muted-foreground leading-relaxed mb-4'>
                            We will never share your personal information with third parties, except in the following cases:
                        </p>
                        <ul className='list-disc list-inside text-muted-foreground space-y-2 ml-4'>
                            <li>You have explicitly given consent</li>
                            <li>It is necessary to fulfill your requests (e.g., account authentication)</li>
                            <li>We are legally required to do so</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className='text-xl font-medium text-[#000000] mb-4'>2. Group & Scheduling Data</h2>
                        <p className='text-muted-foreground leading-relaxed mb-4'>
                            When you create or join a study group or schedule a session, we collect: 
                        </p>
                        <ul className='list-disc list-inside text-muted-foreground space-y-2 ml-4'>
                            <li>Group names and tags</li>
                            <li>Session titles, descriptions, locations, times, and participants</li>
                        </ul>
                        <p className='text-muted-foreground leading-relaxed mt-4'>
                            This data is private by default unless you join a public group or explicitly share it (e.g., via invite links). We do not sell or share this data unless: 
                        </p>
                        <ul className='list-disc list-inside text-muted-foreground space-y-2 ml-4'>
                            <li>You explicitly allow it (e.g., by sharing a calendar or group)</li>
                            <li>We are required by law</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className='text-xl font-medium text-[#000000] mb-4'>3. Logging & Cookies</h2>
                        <p className='text-muted-foreground leading-relaxed mt-4'>
                            We collect usage data to help us maintain and improve UniMeet. This includes:
                        </p>
                        <ul className='list-disc list-inside text-muted-foreground space-y-2 ml-4'>
                            <li>IP addresses</li>
                            <li>Device/browser type</li>
                            <li>Session timestamps</li>
                            <li>Error and performance logs</li>
                        </ul>
                        <p className='text-muted-foreground leading-relaxed mt-4'>
                            We may use cookies or similar technologies for session management, analytics, or to remember your preferences. You can disable cookies in your browser settings, though this may limit functionality.
                        </p>
                        <p className='text-muted-foreground leading-relaxed mt-4'>
                            We do not share raw log data with third parties, but we may use aggregated and anonymized data for usage analysis or marketing insights.
                        </p>
                    </section>

                    <section>
                        <h2 className='text-xl font-medium text-[#000000] mb-4'>4. Communication</h2>
                        <p className='text-muted-foreground leading-relaxed mb-4'>
                            If you contact us via email or web forms (e.g., for feedback or support), we store that communication to:
                        </p>
                        <ul className='list-disc list-inside text-muted-foreground space-y-2 ml-4'>
                            <li>Respond to your request</li>
                            <li>Improve our services</li>
                            <li>Maintain a history of support</li>
                        </ul>
                        <p className='text-muted-foreground leading-relaxed mt-4'>
                            We do not share your messages unless required to resolve issues or comply with legal obligations.
                        </p>
                    </section>

                    <section>
                        <h2 className='text-xl font-medium text-[#000000] mb-4'>5. Your Rights</h2>
                        <p className='text-muted-foreground leading-relaxed mb-4'>
                            You have the right to:
                        </p>
                        <ul className='list-disc list-inside text-muted-foreground space-y-2 ml-4'>
                            <li>Access the data we hold about you</li>
                            <li>Request correction or deletion of your data</li>
                            <li>Withdraw consent at any time</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className='text-xl font-medium text-[#000000] mb-4'>6. Changes to This Policy</h2>
                        <p className='text-muted-foreground leading-relaxed mb-4'>
                            We may update this Privacy Policy periodically. If we make significant changes, we will notify users via the website or email.
                        </p>
                        <p className='text-muted-foreground leading-relaxed mb-4'>
                            Your continued use of UniMeet after updates means you accept the revised policy.
                        </p>
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