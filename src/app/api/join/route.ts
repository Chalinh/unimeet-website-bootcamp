import { NextRequest, NextResponse } from "next/server";
import { createClient } from "../../../../utils/supabase/server"; // adjust path

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();
    const body = await req.json();
    const { groupLink } = body;

    if (!groupLink) return NextResponse.json({ success: false, error: "No group link provided" });

    // Get current user
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (!user || userError) return NextResponse.json({ success: false, error: "Not authenticated" });

    // Lookup group by invite link
    const { data: group, error: groupError } = await supabase
      .from("groups")
      .select("id")
      .eq("invite_link", groupLink)
      .single();

    if (groupError || !group) return NextResponse.json({ success: false, error: "Group not found" });

    // Insert user into group_members
    const { error: insertError } = await supabase
      .from("group_members")
      .insert({ group_id: group.id, user_id: user.id });

    if (insertError) return NextResponse.json({ success: false, error: insertError.message });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, error: "Unexpected error" });
  }
}
