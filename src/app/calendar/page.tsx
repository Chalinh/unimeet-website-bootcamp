"use client"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../../components/ui/dropdown-menu";
import { useState } from "react"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Textarea } from "../../components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../components/ui/dialog"
import { Avatar, AvatarFallback } from "../../components/ui/avatar"
import { Search, Home, Calendar, Plus, X, MoreVertical, Edit, Trash2, LogOutIcon, Users, User, ChevronLeft, ChevronRight, BarChart3, BookOpen, Coffee, MapPin, Clock } from 'lucide-react'
import Image from "next/image";
import { Sidebar, SidebarContent, SidebarHeader, SidebarProvider } from "../../components/ui/sidebar";
import Link from "next/link"

interface Meeting {
  id: string
  title: string
  description: string
  date: number
  month: number
  year: number
  startTime: string
  endTime: string
  location: string
  participants: string[]
  icon: any
  color: string
  bgColor: string
}

const meetings: Meeting[] = [
  {
    id: "1",
    title: "Math Examination",
    description: "Extra session for math examination preparation",
    date: 6,
    month: 7, // August (0-indexed)
    year: 2025,
    startTime: "4:20pm",
    endTime: "5:50pm",
    location: "Auditorium",
    participants: ["Noy Chalih", "Nho Tomaneath", "Inem piseysocheata"],
    icon: BarChart3,
    color: "#0da2e7",
    bgColor: "#dcf2fd",
  },
  {
    id: "2",
    title: "Study Group",
    description: "Weekly study session for advanced calculus",
    date: 8,
    month: 7,
    year: 2025,
    startTime: "2:00pm",
    endTime: "4:00pm",
    location: "Library Room 201",
    participants: ["Noy Chalih", "Sarah Johnson"],
    icon: BookOpen,
    color: "#10b77f",
    bgColor: "#d7fcef",
  },
  {
    id: "3",
    title: "Coffee Chat",
    description: "Informal discussion about project progress",
    date: 12,
    month: 7,
    year: 2025,
    startTime: "10:30am",
    endTime: "11:30am",
    location: "Campus Café",
    participants: ["Noy Chalih", "Mike Chen", "Lisa Park"],
    icon: Coffee,
    color: "#f7b544",
    bgColor: "#fef1dd",
  },
  {
    id: "4",
    title: "Team Meeting",
    description: "Weekly team sync and project updates",
    date: 15,
    month: 7,
    year: 2025,
    startTime: "9:00am",
    endTime: "10:00am",
    location: "Conference Room A",
    participants: ["Noy Chalih", "John Doe", "Jane Smith", "Alex Wilson"],
    icon: Users,
    color: "#0da2e7",
    bgColor: "#dcf2fd",
  },
]

export default function Dashboard() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedMeeting, setSelectedMeeting] = useState<Meeting | null>(null)
  const [meetingsData, setMeetingsData] = useState<Meeting[]>(meetings)
  const [searchQuery, setSearchQuery] = useState("")
  const [showSearchResults, setShowSearchResults] = useState(false)

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay()
    return firstDay === 0 ? 6 : firstDay - 1 // Convert Sunday (0) to be last (6), Monday (1) to be first (0)
  }

  const getSearchResults = () => {
    if (!searchQuery.trim()) return []

    return meetingsData.filter(
      (meeting) =>
        meeting.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        meeting.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        meeting.location.toLowerCase().includes(searchQuery.toLowerCase()),
    )
  }

  const generateCalendarData = () => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    const daysInMonth = getDaysInMonth(currentDate)
    const firstDayOfMonth = getFirstDayOfMonth(currentDate)
    const daysInPrevMonth = getDaysInMonth(new Date(year, month - 1, 1))

    const calendarData = []
    const allMeetings = meetingsData

    const today = new Date()
    const todayDate = today.getDate()
    const todayMonth = today.getMonth()
    const todayYear = today.getFullYear()

    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      calendarData.push({
        date: daysInPrevMonth - i,
        isCurrentMonth: false,
        meetings: [],
      })
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const dayMeetings = allMeetings.filter(
        (meeting) => meeting.date === day && meeting.month === month && meeting.year === year,
      )

      calendarData.push({
        date: day,
        isCurrentMonth: true,
        meetings: dayMeetings,
        highlighted: day === todayDate && month === todayMonth && year === todayYear,
      })
    }

    const remainingCells = 42 - calendarData.length
    for (let day = 1; day <= remainingCells; day++) {
      calendarData.push({
        date: day,
        isCurrentMonth: false,
        meetings: [],
      })
    }

    return calendarData
  }

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev)
      if (direction === "prev") {
        newDate.setMonth(prev.getMonth() - 1)
      } else {
        newDate.setMonth(prev.getMonth() + 1)
      }
      return newDate
    })
  }

  const formatMonthYear = (date: Date) => {
    return date.toLocaleDateString("en-US", { month: "short", year: "numeric" })
  }

  const handleMeetingClick = (meeting: Meeting, e: React.MouseEvent) => {
    e.stopPropagation() // Prevent date click handler
    setSelectedMeeting(meeting)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedMeeting(null)
  }

  const getDayName = (date: number, month: number, year: number) => {
    const dayDate = new Date(year, month, date)
    return dayDate.toLocaleDateString("en-US", { weekday: "long" })
  }

  const removeParticipant = (participantToRemove: string) => {
    if (!selectedMeeting) return

    const updatedMeetings = meetingsData.map((meeting) => {
      if (meeting.id === selectedMeeting.id) {
        return {
          ...meeting,
          participants: meeting.participants.filter((participant) => participant !== participantToRemove),
        }
      }
      return meeting
    })

    setMeetingsData(updatedMeetings)

    const updatedSelectedMeeting = updatedMeetings.find((meeting) => meeting.id === selectedMeeting.id)
    if (updatedSelectedMeeting) {
      setSelectedMeeting(updatedSelectedMeeting)
    }
  }

  const handleSearchResultClick = (meeting: Meeting) => {
    setSelectedMeeting(meeting)
    setIsModalOpen(true)
    setShowSearchResults(false)
    setSearchQuery("")
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchQuery(value)
    setShowSearchResults(value.trim().length > 0)
  }

  const clearSearch = () => {
    setSearchQuery("")
    setShowSearchResults(false)
  }

  const calendarData = generateCalendarData()
  const daysOfWeek = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"]
  const searchResults = getSearchResults()
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
          <Link href="/dashboard" className="w-4/5 flex justify-start py-1">
         <Button className="w-full flex justify-start py-6 rounded-8 bg-[#fafafa] text-[#000000] active:bg-gray-200 hover:bg-gray-200">
           <Home className="mr-2" />
           Home
         </Button>
         </Link>
         <Button className="w-4/5 flex justify-start py-6 rounded-8 bg-gray-200 text-[#000000] hover:bg-gray-200">
           <Calendar className="mr-2" />
           Calendar
         </Button>
        </nav>
      </SidebarContent>
    </Sidebar>
    </SidebarProvider>
    <div className="flex-1 mt-6 ml-5 mr-5 flex flex-col">
      <div className="p-6 border-b border-[#e5e7eb] flex justify-between items-center gap-30">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-[#808080]" />
          <Input 
            placeholder="Search"
            value={searchQuery}
            onChange={handleSearchChange}
            className="pl-10 w-200 bg-[#f8f8f8] border-[#e5e7eb] rounded-md"
          />
          {showSearchResults && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg border border-[#e5e7eb] shadow-lg z-50 max-h-80 overflow-y-auto">
                  {searchResults.length > 0 ? (
                    <div className="py-2">
                      {searchResults.map((meeting) => (
                        <div
                          key={meeting.id}
                          onClick={() => handleSearchResultClick(meeting)}
                          className="px-4 py-3 hover:bg-[#f8f8f8] cursor-pointer border-b border-[#f0f0f0] last:border-b-0"
                        >
                          <div className="flex items-start gap-3">
                            <div
                              className="w-8 h-8 rounded-md flex items-center justify-center flex-shrink-0"
                              style={{ backgroundColor: meeting.bgColor }}
                            >
                              <meeting.icon className="w-4 h-4" style={{ color: meeting.color }} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-medium text-[#000000] text-sm truncate">{meeting.title}</h4>
                              <p className="text-[#808080] text-xs mt-1 truncate">{meeting.description}</p>
                              <div className="flex items-center gap-4 mt-2 text-xs text-[#808080]">
                                <div className="flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  <span>
                                    {new Date(meeting.year, meeting.month, meeting.date).toLocaleDateString("en-US", {
                                      month: "short",
                                      day: "numeric",
                                    })}{" "}
                                    {meeting.startTime}
                                  </span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <MapPin className="w-3 h-3" />
                                  <span className="truncate">{meeting.location}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="px-4 py-6 text-center text-[#808080] text-sm">
                      No meetings found matching "{searchQuery}"
                    </div>
                  )}
                </div>
              )}
        </div>
        <div className="flex items-center gap-6">
          <Button
            className="rounded-8 bg-[#ffffff] text-[#000000] hover:bg-[#0DA2E7] hover:text-[#ffffff] border-1 invisible">
            Create Group
          </Button>
          <Button className="rounded-8 bg-[#ffffff] text-[#000000] hover:bg-[#0DA2E7] hover:text-[#ffffff] border-1 invisible">
            Join
           </Button>
           <div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar>
                  <AvatarFallback className="bg-[#F7B544] text-[#ffffff]">NC</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-32">
                <DropdownMenuItem className="cursor-pointer">
                  <Link href="/">
                  <LogOutIcon className="h-4 w-4 mr-2 inline text-red-600 items-center justify-center" />
                    <span className="text-red-600">Log Out</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-medium mb-4">My Calendar</h1>
          <div className="flex items-center gap-4 mb-6">
            <p className="text-[#585757]">{formatMonthYear(currentDate)}</p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigateMonth("prev")}
                className="p-1 hover:bg-[#e5e7eb] rounded-md transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-[#585757]" />
              </button>
              <button
                onClick={() => navigateMonth("next")}
                className="p-1 hover:bg-[#e5e7eb] rounded-md transition-colors"
              >
                <ChevronRight className="w-5 h-5 text-[#585757]" />
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-[#e5e7eb] p-1">
            {/* Days of Week Header */}
            <div className="grid grid-cols-7 gap-4 mb-2">
              {daysOfWeek.map((day) => (
                <div key={day} className="text-center text-[#000000] font-medium text-sm py-2">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-0.5">
              {calendarData.map((day, index) => (
                <div
                  key={index}
                  className={`aspect-square p-1 rounded-lg border ${
                    day.highlighted ? "bg-[#f7b544] border-[#f7b544]" : "bg-white border-[#e5e7eb]"
                  } ${!day.isCurrentMonth ? "opacity-40" : ""}`}
                >
                  <div
                    className={`text-sm font-medium mb-2 ${
                      day.highlighted ? "text-white" : day.isCurrentMonth ? "text-[#000000]" : "text-[#808080]"
                    }`}
                  >
                    {day.date}
                  </div>
                  <div className="space-y-1">
                    {day.meetings.map((meeting, meetingIndex) => (
                      <div
                        key={meetingIndex}
                        className="text-xs px-2 py-1 rounded cursor-pointer hover:opacity-80 transition-opacity"
                        style={{
                          backgroundColor: meeting.bgColor,
                          color: meeting.color,
                        }}
                        onClick={(e) => handleMeetingClick(meeting, e)}
                      >
                        {meeting.title}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="sr-only">Meeting Details</DialogTitle>
          </DialogHeader>

          {selectedMeeting && (
            <div className="p-2">
              {/* Event icon and title */}
              <div className="flex items-start gap-4 mb-6">
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: selectedMeeting.bgColor }}
                >
                  <selectedMeeting.icon className="w-6 h-6" style={{ color: selectedMeeting.color }} />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-[#000000] mb-1">{selectedMeeting.title}</h2>
                  <p className="text-[#808080] text-sm">{selectedMeeting.description}</p>
                </div>
              </div>

              {/* Event details */}
              <div className="space-y-4 mb-6">
                {/* Time */}
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-[#808080]" />
                  <span className="text-[#000000] font-medium">
                    {getDayName(selectedMeeting.date, selectedMeeting.month, selectedMeeting.year)},{" "}
                    {new Date(selectedMeeting.year, selectedMeeting.month, selectedMeeting.date).toLocaleDateString(
                      "en-US",
                      { month: "long", day: "numeric" },
                    )}{" "}
                    - {selectedMeeting.startTime} - {selectedMeeting.endTime}
                  </span>
                </div>

                {/* Location */}
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-[#808080]" />
                  <span className="text-[#000000] font-medium">{selectedMeeting.location}</span>
                </div>

                {/* Participants */}
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-[#808080]" />
                  <div className="flex items-center gap-2 flex-wrap">
                    {selectedMeeting.participants.map((participant, index) => (
                      <div key={index} className="flex items-center gap-2 bg-[#f8f8f8] rounded-full pl-1 pr-3 py-1">
                        <div className="w-6 h-6 bg-[#f7b544] rounded-full flex items-center justify-center">
                          <User className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-sm text-[#808080]">{participant}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
