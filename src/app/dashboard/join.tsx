'use client'
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../components/ui/dialog";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { toast } from "sonner";

interface JoinProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onJoinSuccess?: () => void;
}

export default function Join({ open, onOpenChange, onJoinSuccess }: JoinProps) {
  const [groupLink, setGroupLink] = useState(""); // <- declare state
  const [loading, setLoading] = useState(false);  // <- declare loading state

  const handleJoin = async () => {
    if (!groupLink) {
      toast.error("Please enter a group link");
      return;
    }

    setLoading(true);

    try {
      // Extract groupId from link
      let groupId = "";
      try {
        const url = new URL(groupLink, window.location.origin);
        groupId = url.searchParams.get("groupId") || groupLink;
      } catch {
        groupId = groupLink; 
      }

      const res = await fetch("/api/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ groupId }),
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Joined group successfully!");
        setGroupLink(""); // reset input
        onOpenChange(false); // close dialog
        onJoinSuccess?.(); // refresh dashboard
      } else {
        toast.error(data.error || "Failed to join group");
      }
    } catch (err) {
      console.error(err);
      toast.error("Unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center font-medium">Join Group</DialogTitle>
        </DialogHeader>
        <div className="gap-2 flex flex-col">
          <label htmlFor="groupLink">Group Link</label>
          <Input
            id="groupLink"
            placeholder="Enter group link or ID"
            className="mb-4 bg-[#DCF2FD]"
            value={groupLink}
            onChange={(e) => setGroupLink(e.target.value)}
          />
        </div>
        <Button
          className="w-20 bg-[#F7B544] text-[#ffffff] hover:bg-[#F59F0A] mt-2 justify-center"
          onClick={handleJoin}
          disabled={loading}
        >
          {loading ? "Joining..." : "Join"}
        </Button>
      </DialogContent>
    </Dialog>
  );
}