import React, { ReactNode } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import cn from "../../utils/cn";
import { useTheme } from "../../hooks/useTheme";
import { useTranslation } from "react-i18next";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { pathname } = useRouter();
  const { theme, toggleTheme } = useTheme();
  const { t, i18n } = useTranslation();
  const { data: session, status } = useSession();

  const navLinks = [
    { name: t("weather"), path: "/weather" },
    { name: t("news"), path: "/news" },
    { name: t("finance"), path: "/finance" },
  ];

  if (status === "loading") return <div>Loading...</div>;

  return (
    <div className="flex h-screen overflow-hidden font-sans bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white dark:text-white transition-all duration-300">
      {/* Sidebar */}
      <aside className="w-64 bg-black/80 backdrop-blur text-white border-r border-gray-700 shadow-2xl flex flex-col">
        <div className="text-1xl font-extrabold text-center py-6 tracking-wider neon-text">
          ⚡PGAGI-DASHBOARD
        </div>
        <nav className="flex flex-col gap-3 px-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.path}
              className={cn(
                "px-4 py-2 rounded-lg text-sm transition-all duration-200 hover:scale-105 hover:bg-purple-700/20 hover:text-purple-400",
                pathname === link.path
                  ? "bg-purple-700 text-white shadow-lg"
                  : "text-gray-300"
              )}
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-gray-100 dark:bg-gray-950 text-black dark:text-white transition-all">
        {/* Header */}
        <header className="sticky top-0 z-20 bg-white dark:bg-black shadow-xl px-6 py-4 flex items-center justify-between border-b border-gray-300 dark:border-gray-700">
          <input
            type="text"
            placeholder={t("search")}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md w-1/3 bg-white dark:bg-gray-800 text-black dark:text-white"
          />

          <div className="flex items-center gap-4">
            {/* Language Selector */}
            <select
              value={i18n.language}
              onChange={(e) => i18n.changeLanguage(e.target.value)}
              className="border rounded p-1 text-sm bg-gray-200 dark:bg-gray-700 text-black dark:text-white"
            >
              <option value="en">EN</option>
              <option value="es">ES</option>
            </select>

            {/* Emoji Theme Toggle */}
            <button
              onClick={toggleTheme}
              title="Toggle theme"
              className="text-xl hover:scale-110 transition"
            >
              {theme === "dark" ? "🌞" : "🌙"}
            </button>

            {/* User Auth */}
            {session?.user ? (
              <div className="flex items-center gap-2">
                <img
                  src={session.user.image || "/avatar.png"}
                  alt="avatar"
                  className="w-8 h-8 rounded-full border border-white"
                />
                <span className="font-medium">{session.user.name}</span>
                <button
                  onClick={() => signOut()}
                  className="text-sm bg-red-600 hover:bg-red-700 px-3 py-1 text-white rounded shadow"
                >
                  {t("signOut")}
                </button>
              </div>
            ) : (
              <button
                onClick={() => signIn()}
                className="text-sm bg-purple-700 px-3 py-1 text-white rounded shadow"
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
