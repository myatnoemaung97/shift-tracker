import { JobColor } from "@/app/generated/prisma/browser";

export const colorMap: Record<
  JobColor,
  {
    background: string;
    backgroundSoft: string;
    border: string;
    ring: string;
  }
> = {
  red: {
    background: "bg-red-500",
    backgroundSoft: "bg-red-100",
    border: "border-l-red-500",
    ring: "ring-red-500",
  },
  blue: {
    background: "bg-blue-500",
    backgroundSoft: "bg-blue-100",
    border: "border-l-blue-500",
    ring: "ring-blue-500",
  },
  green: {
    background: "bg-green-500",
    backgroundSoft: "bg-green-100",
    border: "border-l-green-500",
    ring: "ring-green-500",
  },
  yellow: {
    background: "bg-yellow-500",
    backgroundSoft: "bg-yellow-100",
    border: "border-l-yellow-500",
    ring: "ring-yellow-500",
  },
  orange: {
    background: "bg-orange-500",
    backgroundSoft: "bg-orange-100",
    border: "border-l-orange-500",
    ring: "ring-orange-500",
  },
  amber: {
    background: "bg-amber-500",
    backgroundSoft: "bg-amber-100",
    border: "border-l-amber-500",
    ring: "ring-amber-500",
  },
  emerald: {
    background: "bg-emerald-500",
    backgroundSoft: "bg-emerald-100",
    border: "border-l-emerald-500",
    ring: "ring-emerald-500",
  },
  cyan: {
    background: "bg-cyan-500",
    backgroundSoft: "bg-cyan-100",
    border: "border-l-cyan-500",
    ring: "ring-cyan-500",
  },
  indigo: {
    background: "bg-indigo-500",
    backgroundSoft: "bg-indigo-100",
    border: "border-l-indigo-500",
    ring: "ring-indigo-500",
  },
  purple: {
    background: "bg-purple-500",
    backgroundSoft: "bg-purple-100",
    border: "border-l-purple-500",
    ring: "ring-purple-500",
  },
  pink: {
    background: "bg-pink-500",
    backgroundSoft: "bg-pink-100",
    border: "border-l-pink-500",
    ring: "ring-pink-500",
  },
  slate: {
    background: "bg-slate-500",
    backgroundSoft: "bg-slate-100",
    border: "border-l-slate-500",
    ring: "ring-slate-500",
  },
};