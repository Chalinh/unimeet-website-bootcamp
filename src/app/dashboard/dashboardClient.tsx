"use client"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../../components/ui/dropdown-menu"
import { useState, useEffect } from "react"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Textarea } from "../../components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../components/ui/dialog"
import { Avatar, AvatarFallback } from "../../components/ui/avatar"
import { Search, MoreVertical, Edit, Trash2, LogOutIcon, Link2Icon } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"
import Join from "./join"

interface TeamEntry {
  id: string
  name: string
  member: string
  createdOn: string
  lastModifiedOn: string
  description: string
  invite_link: string
}

export default function DashboardClient({ user }: { user: any }) {
  const [showCreateGroup, setShowCreateGroup] = useState(false)
  const [showJoin, setShowJoin] = useState(false)
  const [teamData, setTeamData] = useState<TeamEntry[]>([])
  const [editingEntry, setEditingEntry] = useState<TeamEntry | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    member: "",
    description: "",
  })

  const filteredTeamData = teamData.filter((entry) =>
    entry.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Fetch groups on load
  useEffect(() => {
    if (!user) return
    fetchGroups()
  }, [user])

  const fetchGroups = async () => {
    try {
      const res = await fetch("/api/groups")
      const data = await res.json()
      if (data.success && data.groups) {
        const formatted: TeamEntry[] = data.groups.map((g: any) => ({
          id: g.id,
          name: g.name,
          member: g.member || "N/A",
          description: g.description || "",
          createdOn: new Date(g.created_at).toLocaleDateString(),
          lastModifiedOn: new Date(g.created_at).toLocaleDateString(),
          invite_link: g.invite_link || "",
        }))
        setTeamData(formatted)
      }
    } catch (err) {
      console.error(err)
    }
  }

  const handleAddEntry = async () => {
    if (!formData.name || !formData.description || !formData.member) {
      toast.error("Please fill all fields")
      return
    }

    try {
      let body = {
        name: formData.name,
        description: formData.description,
        member: formData.member,
      }

      if (editingEntry) {
        const res = await fetch("/api/groups", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ group_id: editingEntry.id, ...body }),
        })
        const data = await res.json()
        if (data.success) {
          fetchGroups()
          toast.success("Group updated successfully")
        } else {
          toast.error("Failed to update group")
        }
        setEditingEntry(null)
      } else {
        const res = await fetch("/api/groups", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        })
        const data = await res.json()
        if (data.success) {
          fetchGroups()
          toast.success("Group created successfully")
        } else {
          toast.error("Failed to create group")
        }
      }
      setFormData({ name: "", description: "", member: "" })
      setShowCreateGroup(false)
    } catch (err) {
      console.error(err)
      toast.error("Error creating/updating group")
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

  const handleDeleteEntry = async (entryId: string) => {
    try {
      const res = await fetch("/api/groups", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ group_id: entryId }),
      })
      const data = await res.json()
      if (data.success) {
        setTeamData(teamData.filter((entry) => entry.id !== entryId))
        toast.success("Group deleted successfully")
      } else {
        toast.error("Failed to delete group")
      }
    } catch (err) {
      console.error(err)
      toast.error("Error deleting group")
    }
  }

  const handleCloseForm = () => {
    setShowCreateGroup(false)
    setEditingEntry(null)
    setFormData({ name: "", description: "", member: "" })
  }

  const handleCopyLink = async (entry: TeamEntry) => {
    try {
      await navigator.clipboard.writeText(`${window.location.origin}/group/${entry.invite_link}`)
      toast.success("Link copied successfully!")
    } catch {
      toast.error("Failed to copy link")
    }
  }

  return (
    <div className="flex-1 mt-6 ml-5 mr-5 flex flex-col">
      {/* Topbar */}
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
            Create Group
          </Button>
          <Button
            onClick={() => setShowJoin(true)}
            className="rounded-8 bg-[#ffffff] text-[#000000] hover:bg-[#0DA2E7] hover:text-[#ffffff] border-1"
          >
            Join
          </Button>
          <Join
  open={showJoin}
  onOpenChange={setShowJoin}
  onJoinSuccess={fetchGroups} // refresh dashboard after successful join
/>
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

      {/* Create/Edit Group Dialog */}
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

      {/* Team Table */}
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-medium mb-4">My Team</h1>
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
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-[#808080] hover:text-[#000000]"
                        >
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-32">
                        <DropdownMenuItem
                          onClick={() => handleEditEntry(entry)}
                          className="cursor-pointer"
                        >
                          <Edit className="h-4 w-4 mr-2" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleCopyLink(entry)}
                          className="cursor-pointer"
                        >
                          <Link2Icon className="h-4 w-4 mr-2" /> Copy Link
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDeleteEntry(entry.id)}
                          className="cursor-pointer text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4 mr-2" /> Delete
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
        </div>
      </main>
    </div>
  )
}