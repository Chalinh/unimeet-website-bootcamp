
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "../../../../utils/supabase/server";

// Utility to generate a random invite link
function generateInviteLink(length = 16) {
  return Buffer.from(
    Array.from({ length }, () => Math.floor(Math.random() * 256))
  ).toString("base64");
}

// GET: fetch groups owned by the user
export async function GET() {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ success: false, error: "Not authenticated" });

    const { data: groups, error } = await supabase
      .from("groups")
      .select("*")
      .eq("owner_id", user.id);

    if (error) return NextResponse.json({ success: false, error });

    return NextResponse.json({ success: true, groups });
  } catch (err) {
    return NextResponse.json({ success: false, error: err });
  }
}

// POST: create a new group
export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();
    const body = await req.json();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ success: false, error: "Not authenticated" });

    const { data: group, error } = await supabase
      .from("groups")
      .insert({
        name: body.name,
        description: body.description,
        owner_id: user.id,
        invite_link: generateInviteLink(),
      })
      .select()
      .single();

    if (error) return NextResponse.json({ success: false, error });

    return NextResponse.json({ success: true, group });
  } catch (err) {
    return NextResponse.json({ success: false, error: err });
  }
}

// PATCH: update group (only owner can update)
export async function PATCH(req: NextRequest) {
  try {
    const supabase = await createClient();
    const body = await req.json();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ success: false, error: "Not authenticated" });

    const { group_id, name, description } = body;

    const { data: group, error } = await supabase
      .from("groups")
      .update({ name, description })
      .eq("id", group_id)
      .eq("owner_id", user.id)
      .select()
      .single();

    if (error) return NextResponse.json({ success: false, error });

    return NextResponse.json({ success: true, group });
  } catch (err) {
    return NextResponse.json({ success: false, error: err });
  }
}

// DELETE: delete group (only owner can delete)
export async function DELETE(req: NextRequest) {
  try {
    const supabase = await createClient();
    const body = await req.json();
    const { group_id } = body;

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ success: false, error: "Not authenticated" });

    const { error } = await supabase
      .from("groups")
      .delete()
      .eq("id", group_id)
      .eq("owner_id", user.id);

    if (error) return NextResponse.json({ success: false, error });

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ success: false, error: err });
  }
}