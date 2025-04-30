import React, { ReactNode } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import cn from "../../utils/cn"; // Corrected import
import { useTheme } from "../../hooks/useTheme";
import { useTranslation } from "react-i18next";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { pathname } = useRouter();
  const { theme, toggleTheme } = useTheme();
  const { t, i18n } = useTranslation();
  const { data: session, status } = useSession(); // Added status to handle loading state

  const navLinks = [
    { name: t("weather"), path: "/weather" },
    { name: t("news"), path: "/news" },
    { name: t("finance"), path: "/finance" },
  ];

  if (status === "loading") {
    return <div>Loading...</div>; // Handle loading state
  }

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-primary text-white flex flex-col sticky top-0 h-full shadow-lg">
        <div className="text-xl font-bold p-4 border-b border-white/20">
          PGAGI Dashboard
        </div>
        <nav className="flex flex-col gap-2 p-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.path}
              className={cn(
                "px-4 py-2 rounded hover:bg-primary/80 transition",
                pathname === link.path
                  ? "bg-white text-primary font-semibold"
                  : "text-white"
              )}
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-gray-100 dark:bg-gray-900 overflow-y-auto">
        {/* Header */}
        <header className="sticky top-0 z-10 bg-white dark:bg-gray-800 shadow px-6 py-4 flex items-center justify-between">
          {/* Search */}
          <input
            type="text"
            placeholder={t("search")}
            className="px-4 py-2 border rounded-md w-1/3 dark:bg-gray-700 dark:text-white"
          />

          <div className="flex items-center gap-4">
            {/* Language Switch */}
            <select
              value={i18n.language}
              onChange={(e) => i18n.changeLanguage(e.target.value)}
              className="border rounded p-1 bg-white text-sm"
            >
              <option value="en">EN</option>
              <option value="es">ES</option>
            </select>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="text-sm px-3 py-1 bg-secondary text-white rounded hover:bg-secondary/90"
            >
              {theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
            </button>

            {/* Auth */}
            {session?.user ? (
              <div className="flex items-center gap-2">
                <img
                  src={session.user.image || "/path/to/default-avatar.jpg"} // Default avatar fallback
                  alt="avatar"
                  className="w-8 h-8 rounded-full"
                />
                <span>{session.user.name}</span>
                <button
                  onClick={() => signOut()}
                  className="text-sm bg-red-500 px-3 py-1 text-white rounded"
                >
                  {t("signOut")}
                </button>
              </div>
            ) : (
              <button
                onClick={() => signIn()}
                className="text-sm bg-primary px-3 py-1 text-white rounded"
              >
                {t("signIn")}
              </button>
            )}
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
