"use client"
import { Button } from "../../components/ui/button"
import { Home, Calendar } from "lucide-react"
import Image from "next/image"
import { Sidebar, SidebarContent, SidebarHeader, SidebarProvider } from "../../components/ui/sidebar"
import Link from "next/link"
import DashboardClient from "./dashboardClient"
import { useState } from "react"
import { Input } from "../../components/ui/input"
import {toast} from "sonner"
interface DashboardProps {
  user: any;
}

export default function Dashboard({ user }: DashboardProps) {
  return (
    <div className="flex min-h-screen">
      <SidebarProvider>
        <Sidebar>
          <SidebarHeader>
            <div className="w-full flex items-center justify-between h-20 px-5 md:px-7">
              <Link href="/dashboard">
                <Image src="/unimeet_logo.png" alt="UniMeet Logo" width={205} height={116} />
              </Link>
            </div>
          </SidebarHeader>
          <hr className="py-2" />
          <SidebarContent>
            <nav className="flex flex-col items-center">
              <Button className="w-4/5 flex justify-start py-6 rounded-8 bg-gray-200 text-[#000000] hover:bg-gray-200">
                <Home className="mr-2" />
                Home
              </Button>
              <Link href="/calendar" className="w-4/5 flex justify-start py-1">
                <Button className="w-full flex justify-start py-6 rounded-8 bg-[#fafafa] text-[#000000] active:bg-gray-200 hover:bg-gray-200">
                  <Calendar className="mr-2" />
                  Calendar
                </Button>
              </Link>
            </nav>
          </SidebarContent>
        </Sidebar>
      </SidebarProvider>

      <DashboardClient user={user}/>
    </div>
  )
}
