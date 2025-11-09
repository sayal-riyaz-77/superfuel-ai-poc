"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  Layers,
  Calendar,
  ShoppingBag,
  Link as LinkIcon,
  Search,
  Menu,
  Settings,
  Clock,
  User,
  FileText,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";

export function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { icon: BarChart3, href: "/", label: "Dashboard" },
    { icon: Layers, href: "/", label: "Layers" },
    { icon: Calendar, href: "/", label: "Calendar" },
    { icon: ShoppingBag, href: "/", label: "Products" },
    { icon: LinkIcon, href: "/", label: "Links" },
    { icon: Search, href: "/", label: "Search" },
    { icon: Menu, href: "/", label: "Menu" },
    { icon: Settings, href: "/", label: "Settings" },
    { icon: Clock, href: "/", label: "History" },
  ];

  const bottomItems = [
    { icon: Settings, href: "/", label: "Settings" },
    { icon: User, href: "/", label: "Profile" },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-16 bg-[#1a1a1a] border-r border-[#2a2a2a] flex flex-col items-center py-4 z-50">
      {/* Logo Section */}
      <div className="flex flex-col items-center gap-2 mb-6">
        <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
          <Zap className="w-5 h-5 text-white" />
        </div>
        <div className="w-8 h-8 rounded bg-white flex items-center justify-center">
          <span className="text-[#1a1a1a] font-bold text-sm">S</span>
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 flex flex-col gap-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "w-10 h-10 flex items-center justify-center rounded-lg transition-colors",
                "hover:bg-[#2a2a2a] text-gray-400 hover:text-white"
              )}
              title={item.label}
            >
              <Icon className="w-5 h-5" />
            </Link>
          );
        })}
      </nav>

      {/* Bottom Items */}
      <div className="flex flex-col gap-4 mt-auto">
        {bottomItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "w-10 h-10 flex items-center justify-center rounded-lg transition-colors",
                "hover:bg-[#2a2a2a] text-gray-400 hover:text-white"
              )}
              title={item.label}
            >
              <Icon className="w-5 h-5" />
            </Link>
          );
        })}
      </div>
    </aside>
  );
}

