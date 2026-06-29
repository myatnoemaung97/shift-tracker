import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export function redirectAndRevalidate(path: string, searchParams?: string) {
  revalidatePath(path)
  redirect(path + (searchParams ? `?${searchParams}` : ""));
}