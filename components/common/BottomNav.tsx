"use client";

import React from "react";
import { Home, BarChart2, Wallet, Settings } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const BottomNav = () => {
  const pathname = usePathname();

  const navItems = [
    { name: "홈", icon: Home, href: "/" },
    { name: "분석", icon: BarChart2, href: "/analysis" },
    { name: "자산", icon: Wallet, href: "/assets" },
    { name: "설정", icon: Settings, href: "/settings" },
  ];

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <nav className="flex items-center gap-2 bg-bg-elevated/80 backdrop-blur-md border border-border-main px-4 py-3 rounded-full shadow-2xl shadow-black/50">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
                isActive
                  ? "bg-accent text-bg-base font-bold"
                  : "text-text-muted hover:text-text-primary"
              }`}
            >
              <item.icon size={20} strokeWidth={isActive ? 2.5 : 2} />
              {isActive && <span className="text-sm">{item.name}</span>}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};
