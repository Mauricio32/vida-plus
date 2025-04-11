"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "🏠 Painel", href: "/" },
  { label: "📅 Missões Semanais", href: "/semanais" },
  { label: "🎁 Recompensas", href: "/recompensas" },
  { label: "📉 Histórico", href: "/historico" },
  { label: "👹 Bosses", href: "/bosses" },
  { label: "⚙️ Backoffice", href: "/admin" }
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 h-screen bg-gray-900 text-white fixed top-0 left-0 flex flex-col px-4 py-6 space-y-4 shadow-xl">
      <h2 className="text-xl font-bold mb-4 text-center">🧠 Vida+</h2>
      {navItems.map(item => (
        <Link
          key={item.href}
          href={item.href}
          className={`py-2 px-3 rounded-md hover:bg-gray-700 transition-colors ${
            pathname === item.href ? "bg-gray-700 font-semibold" : ""
          }`}
        >
          {item.label}
        </Link>
      ))}
    </aside>
  );
}
