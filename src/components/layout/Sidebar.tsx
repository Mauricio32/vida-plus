"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "🏠 Painel", href: "/" },
  { label: "📅 Missões Semanais", href: "/semanais" },
  { label: "🎁 Recompensas", href: "/recompensas" },
  { label: "📉 Histórico", href: "/historico" },
  { label: "👹 Bosses", href: "/bosses" },
  { label: "⚙️ Backoffice", href: "/admin" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      <button
        className="fixed top-4 left-4 z-50 p-2 bg-gray-900 text-white rounded-md shadow-lg md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      <aside
        className={`fixed top-0 left-0 h-screen bg-gray-900 text-white px-4 py-6 shadow-xl transition-transform z-40 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 w-64 flex flex-col space-y-4`}
      >
        <h2 className="text-xl font-bold mb-4 text-center">🧠 Vida+</h2>
        {navItems.map((item) => (
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
    </>
  );
}
