"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

const SUCCESS_MESSAGES: Record<string, string> = {
  "job-created": "勤務先を作成しました。",
  "job-updated": "勤務先を更新しました。",
  "job-archived": "勤務先を非表示にしました。",
  "job-restored": "勤務先を復元しました。",
  "shift-created": "シフトを作成しました。",
  "shift-updated": "シフトを更新しました。",
  "shift-deleted": "シフトを削除しました。",
};

export default function PageToast() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const hasShown = useRef(false);

  useEffect(() => {
    const success = searchParams.get("success");

    if (!success || hasShown.current) return;

    const message = SUCCESS_MESSAGES[success];

    if (message) {
      hasShown.current = true;
      toast.success(message);

      // Remove the query parameter without adding a history entry
      router.replace(pathname, { scroll: false });
    }
  }, [searchParams, pathname, router]);

  return null;
}