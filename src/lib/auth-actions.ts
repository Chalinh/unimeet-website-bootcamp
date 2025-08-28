"use server";

import { redirect } from "next/navigation";
import { createClient } from "../../utils/supabase/server";

/* ------------------ SIGNUP ------------------ */
export async function signup(formData: FormData) {
  const supabase = await createClient();
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  // 2️⃣ Sign up user with email verification
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: name },
    },
  });

  // 3️⃣ Redirect to login with message
  if (error) {
    return { success: false, message: error.message };
  }

  return {
    success: true,
    message: "Check your email inbox to confirm your account before logging in.",
}
}

/* ------------------ LOGIN ------------------ */
export type AuthResponse = {
  success: boolean;
  message: string;
};

export async function login(formData: FormData): Promise<AuthResponse> {
  const supabase = await createClient();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const { data: { user }, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return { success: false, message: error.message };
  }

  if (user) {
    return { success: true, message: "Logged in successfully!" };
  }

  return { success: false, message: "Something went wrong." };
}
/* ------------------ LOGOUT ------------------ */
export async function logout() {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();

  if (error) redirect("/error?message=" + encodeURIComponent(error.message));
  redirect("/login");
}