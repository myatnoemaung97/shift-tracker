import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import PageToast from "@/app/ui/PageToast";
import { Suspense } from "react";
import { cookies } from "next/headers";


export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const toastMessage = cookieStore.get("toast")?.value;

  return (
    <SidebarProvider>
      <Suspense fallback={null}>
        <PageToast message={toastMessage} />
      </Suspense>
      <AppSidebar />

      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />

          <Separator
            orientation="vertical"
            className="mr-2 data-vertical:h-4 data-vertical:self-auto"
          />
        </header>

        <main className="flex flex-1 flex-col p-4 bg-zinc-50">{children}</main>
      </SidebarInset>
    </SidebarProvider>

    // <>{children}</>
  );
}
