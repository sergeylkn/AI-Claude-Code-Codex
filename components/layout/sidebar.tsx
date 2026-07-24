"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const nav = [
  { href: "/", label: "Overview" },
  { href: "/dashboard", label: "Lessons (Phase 2)" },
  { href: "/projects", label: "Project Lab (Phase 7)" }
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-full border-b border-zinc-800 bg-zinc-950 md:h-screen md:w-72 md:border-b-0 md:border-r">
      <div className="p-4">
        <h2 className="mb-1 text-lg font-semibold">Local AI Learning</h2>
        <p className="mb-6 text-xs text-zinc-400">Phase 1 Foundation</p>
        <nav className="space-y-2">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`block rounded-lg px-3 py-2 text-sm ${
                pathname === item.href ? "bg-indigo-600 text-white" : "text-zinc-300 hover:bg-zinc-800"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
}
