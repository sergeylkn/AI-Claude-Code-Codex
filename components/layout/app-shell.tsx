import { Sidebar } from "@/components/layout/sidebar";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen md:flex">
      <Sidebar />
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
