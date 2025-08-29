
import Image from "next/image"
import Link from "next/link"
import { Button } from "../../components/ui/button"
import { Card, CardContent } from "../../components/ui/card"

export default function Component() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
        <header className="fixed top-0 left-0 w-full flex items-center justify-between h-20 px-5 md:px-7 bg-[#ffffff]">
              <Image src="/unimeet_logo.png" alt="unimeet logo" width={205} height={116}></Image>
            <nav className="flex items-center gap-5">
                <Button className="rounded-8 bg-[#ffffff] text-[#000000] hover:bg-[#0DA2E7] hover:text-[#ffffff] border-1">
                    <Link href="/login" className="flex items-center">Log In</Link>
                </Button>
                <Button className="rounded-8 bg-[#ffffff] text-[#000000] hover:bg-[#0DA2E7] hover:text-[#ffffff] border-1">
                    <Link href="/signUp" className="flex items-center">Sign Up</Link>
                </Button>
            </nav>
        </header>  
      {/* Hero Section */}
        <section className="bg-[#0da2e7] flex-1 flex items-center justify-between px-1 md:px-7 space-y-3 py-10 md:py-20">
            <div className="space-y-6 mx-5">
            <h1 className="font-outfit text-5xl font-medium text-white">Plan Smart<br />Study Together</h1>
            <h2 className="font-outfit text-2xl font-medium text-white">Create or join study groups, schedule sessions, and stay organized — all in one simple tool for students.</h2>
            <Button className="px-5 text-2xl rounded-8 bg-[#F7B544] text-[#ffffff] font-medium hover:bg-[#F59F0A]">
                <Link href="/signUp" className="flex items-center">Get Started</Link>
            </Button>
            </div>
            <Image src="/meeting.png" alt="Meeting Illustration" width={639} height={472} className="hidden md:block px-5" />
        </section>
      {/* Key Features */}
      <section className="flex-1 px-5 md:px-7 pt-10 pb-30 bg-[#ffffff] flex flex-col items-center justify-between">
          <div className="space-y-6 flex flex-col items-center">
            <h2 className="text-2xl font-medium">Key Features</h2>
            <p className="text-lg text-muted-foreground text-center">UniMeet is built to help students focus on what matters — learning together.<br />From scheduling sessions to staying organized with your group, these core features make collaboration fast, easy, and distraction-free.</p>
          </div>
          <br />
          <div className="justify-between gap-1 items-stretch flex flex-row">
          <Card className="flex items-center w-1/4 h-1/4">
            <CardContent className="flex flex-col items-center text-center pt-5 pb-10">
              <Image src="/team-icon.png" alt="Team Icon" width={60} height={60} className="mr-2" />
              <h3 className="text-lg font-medium">Create & Join Group</h3>
              <p className="text-sm text-muted-foreground">
                Start a new group or join one instantly via invite
              </p>
            </CardContent>
            </Card>
            <Card className="justify-between w-1/4 h-1/4">
            <CardContent className="flex flex-col items-center text-center pt-5 pb-10">
              <Image src="/calendar-icon.png" alt="Calendar Icon" width={60} height={60} className="mr-2" />
              <h3 className="text-lg font-medium">Calendar View</h3>
              <p className="text-sm text-muted-foreground">
                Stay organized with a weekly or monthly calendar
              </p>
            </CardContent>
            </Card>
            <Card className="justify-between w-1/4 h-1/4">
            <CardContent className="flex flex-col items-center text-center pt-5 pb-10">
              <Image src="/collab-icon.png" alt="Collab Icon" width={60} height={60} className="mr-2" />
              <h3 className="text-lg font-medium">Schedule Meetings</h3>
              <p className="text-sm text-muted-foreground">
                Create meeting schedule for your group
              </p>
            </CardContent>
            </Card>
          </div>
      </section>

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
