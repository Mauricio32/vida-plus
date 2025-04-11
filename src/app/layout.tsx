import "./globals.css";
import { ReactNode } from "react";
import Sidebar from "@/components/layout/Sidebar";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="flex">
        <Sidebar />
        <main className="ml-64 w-full p-6">{children}</main>
      </body>
    </html>
  );
}
