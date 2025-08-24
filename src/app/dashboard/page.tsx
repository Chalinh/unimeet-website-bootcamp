"use client"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Search, Home, Calendar, Plus, MoreVertical, Edit, Trash2, LogOutIcon, Link2Icon } from "lucide-react"
import Image from "next/image"
import { Sidebar, SidebarContent, SidebarHeader, SidebarProvider } from "@/components/ui/sidebar"
import Link from "next/link"
import { toast } from "sonner"

interface TeamEntry {
  id: string
  name: string
  member: string
  createdOn: string
  lastModifiedOn: string
  description: string
}

export default function Dashboard() {
  const [showCreateGroup, setShowCreateGroup] = useState(false)
  const [showJoin, setJoin] = useState(false)
  const [showLogout, setLogout] = useState(false)
  const [teamData, setTeamData] = useState<TeamEntry[]>([])
  const [editingEntry, setEditingEntry] = useState<TeamEntry | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    member: "",
    description: "",
  })

  const filteredTeamData = teamData.filter((entry) => entry.name.toLowerCase().includes(searchTerm.toLowerCase()))

  const handleAddEntry = () => {
    if (formData.name && formData.description && formData.member) {
      if (editingEntry) {
        const updatedEntry: TeamEntry = {
          ...editingEntry,
          name: formData.name,
          description: formData.description,
          member: formData.member,
          lastModifiedOn: new Date().toLocaleDateString(),
        }
        setTeamData(teamData.map((entry) => (entry.id === editingEntry.id ? updatedEntry : entry)))
        setEditingEntry(null)
      } else {
        const newEntry: TeamEntry = {
          id: (teamData.length + 1).toString().padStart(3, "0"),
          name: formData.name,
          description: formData.description,
          member: formData.member,
          createdOn: new Date().toLocaleDateString(),
          lastModifiedOn: new Date().toLocaleDateString(),
        }
        setTeamData([...teamData, newEntry])
      }
      setFormData({ name: "", description: "", member: "" })
      setShowCreateGroup(false)
    }
  }

  const handleEditEntry = (entry: TeamEntry) => {
    setEditingEntry(entry)
    setFormData({
      name: entry.name,
      description: entry.description,
      member: entry.member,
    })
    setShowCreateGroup(true)
  }

  const handleDeleteEntry = (entryId: string) => {
    setTeamData(teamData.filter((entry) => entry.id !== entryId))
  }

  const handleCloseForm = () => {
    setShowCreateGroup(false)
    setEditingEntry(null)
    setFormData({ name: "", description: "", member: "" })
  }

  const handleCopyLink = async (entry: TeamEntry) => {
    try {
      const groupLink = `${window.location.origin}/group/${entry.id}`
      await navigator.clipboard.writeText(groupLink)

      toast.success("Link copied successfully!", {
        description: "The group link has been copied to your clipboard.",
        duration: 3000,
      })
    } catch (error) {
      toast.error("Failed to copy link", {
        description: "Please try again.",
        duration: 3000,
      })
    }
  }

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
      <div className="flex-1 mt-6 ml-5 mr-5 flex flex-col">
        <div className="p-6 border-b border-[#e5e7eb] flex justify-between items-center gap-30">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-[#808080]" />
            <Input
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-200 bg-[#f8f8f8] border-[#e5e7eb] rounded-md"
            />
          </div>
          <div className="flex items-center gap-6">
            <Button
              className="rounded-8 bg-[#ffffff] text-[#000000] hover:bg-[#0DA2E7] hover:text-[#ffffff] border-1 flex items-center gap-2"
              onClick={() => {
                setEditingEntry(null)
                setFormData({ name: "", description: "", member: "" })
                setShowCreateGroup(true)
              }}
            >
              <Plus className="w-4 h-4" />
              Create Group
            </Button>
            <Button
              onClick={() => setJoin(true)}
              className="rounded-8 bg-[#ffffff] text-[#000000] hover:bg-[#0DA2E7] hover:text-[#ffffff] border-1"
            >
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

        <Dialog open={showCreateGroup} onOpenChange={setShowCreateGroup}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="text-center font-medium">
                {editingEntry ? "Edit Group" : "Create New Group"}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="gap-2 flex flex-col">
                <label htmlFor="name">Group Name</label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter your group name"
                  className="mb-4 bg-[#DCF2FD]"
                />
              </div>
              <div className="gap-2 flex flex-col">
                <label htmlFor="description">Description</label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Write the description"
                  className="mb-4 bg-[#DCF2FD]"
                />
              </div>
              <div className="gap-2 flex flex-col">
                <label htmlFor="member">Member</label>
                <Input
                  value={formData.member}
                  onChange={(e) => setFormData({ ...formData, member: e.target.value })}
                  placeholder="Add your group member"
                  className="mb-4 bg-[#DCF2FD]"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <Button onClick={handleCloseForm} variant="outline" className="flex-1 bg-transparent">
                Cancel
              </Button>
              <Button
                onClick={handleAddEntry}
                className="flex-1 bg-[#F7B544] text-[#ffffff] hover:bg-[#F59F0A] justify-center"
              >
                {editingEntry ? "Save" : "Create"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={showJoin} onOpenChange={setJoin}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="text-center font-medium">Join Group</DialogTitle>
            </DialogHeader>
            <div className="gap-2 flex flex-col">
              <label htmlFor="name">Group Link</label>
              <Input placeholder="Enter group link" className="mb-4 bg-[#DCF2FD]" />
            </div>
            <Button
              className="w-20 bg-[#F7B544] text-[#ffffff] hover:bg-[#F59F0A] mt-2 justify-center"
              onClick={() => setJoin(false)}
            >
              Join
            </Button>
          </DialogContent>
        </Dialog>

        <main>
          <div className="flex-1 p-6">
            <h1 className="text-2xl font-medium mb-4">My Team</h1>

            {/* Group Table */}
            <div className="bg-white border border-[#e5e7eb] rounded-xl w-full h-full flex flex-col relative">
              <div className="grid grid-cols-6 gap-4 p-6 border-b border-[#e5e7eb] text-[#000000] font-medium">
                <div>ID</div>
                <div>Group Name</div>
                <div>Member</div>
                <div>Created on</div>
                <div>Last modified on</div>
                <div></div>
              </div>
              {filteredTeamData.length > 0 ? (
                <div className="p-6">
                  {filteredTeamData.map((entry, index) => (
                    <div
                      key={entry.id}
                      className={`grid grid-cols-6 gap-4 py-3 items-center ${
                        index === filteredTeamData.length - 1 ? "" : "border-b border-[#e5e7eb]"
                      }`}
                    >
                      <div className="text-[#000000]">{entry.id}</div>
                      <div className="text-[#000000] font-medium">{entry.name}</div>
                      <div className="text-[#808080]">{entry.member}</div>
                      <div className="text-[#808080]">{entry.createdOn}</div>
                      <div className="text-[#808080]">{entry.lastModifiedOn}</div>
                      <div className="flex justify-end pr-20">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-[#808080] hover:text-[#000000]">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-32">
                            <DropdownMenuItem onClick={() => handleEditEntry(entry)} className="cursor-pointer">
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleCopyLink(entry)} className="cursor-pointer">
                              <Link2Icon className="h-4 w-4 mr-2" />
                              Copy Link
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleDeleteEntry(entry.id)}
                              className="cursor-pointer text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="relative inset-0 top-20 flex flex-col items-center justify-center text-center">
                  {searchTerm ? (
                    <>
                      <h2 className="text-xl font-medium text-[#000000] mb-2">No groups found</h2>
                      <p className="text-[#808080] max-w-md">
                        No groups match your search for "{searchTerm}". Try a different search term.
                      </p>
                    </>
                  ) : (
                    <>
                      <h2 className="text-xl font-medium text-[#000000] mb-2">Create a group or project</h2>
                      <p className="text-[#808080] max-w-md">
                        This view will show group or project that you and your teammates are involved in.
                      </p>
                    </>
                  )}
                </div>
              )}

              <div className="grid grid-cols-6 gap-4 py-6 border-t border-[#e5e7eb] items-end mt-auto">
                <div className="col-span-5"></div>
                <div className="flex p-6 justify-end">
                  <Button
                    onClick={() => {
                      setEditingEntry(null)
                      setFormData({ name: "", description: "", member: "" })
                      setShowCreateGroup(true)
                    }}
                    size="icon"
                    className="w-12 h-12 bg-[#3fbbf4] hover:bg-[#3fbbf4]/90 text-white rounded-full shadow-lg"
                  >
                    <Plus className="w-6 h-6" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
