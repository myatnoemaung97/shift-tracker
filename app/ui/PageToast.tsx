"use client";

import { useEffect } from "react";
import { toast } from "sonner";

export default function PageToast({ message }: { message: string | undefined }) {
  useEffect(() => {
    if (!message) return;
    toast.success(message);
  }, [message]);
  return null;
}