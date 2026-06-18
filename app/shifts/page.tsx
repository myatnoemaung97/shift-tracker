import { redirect } from "next/navigation";
import Calendar from "@/app/ui/shifts/Calendar";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ year?: string; month?: string }>;
}) {
  const params = await searchParams;
  const today = new Date();

  if (!params.year || !params.month) {
    redirect(
      `/shifts?year=${today.getFullYear()}&month=${today.getMonth() + 1}`,
    );
  }

  return <Calendar year={Number(params.year)} month={Number(params.month) - 1} />;
}
