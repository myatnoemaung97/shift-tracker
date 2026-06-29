import { createClient } from "@/app/lib/supabase/server";
import { redirect } from "next/navigation";
import LogOutButton from "@/app/ui/auth/LogOutButton";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  return (
    <>
      <div>Welcome, {user.email}</div>
      <LogOutButton />
    </>
  );
}
