'use client';

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Home, Briefcase, User, LogOut, Contact, Menu, X } from 'lucide-react';
import { useClerk } from "@clerk/nextjs";

export function NavBar() {
  const [isOpen, setIsOpen] = useState(true);
  const pathname = usePathname();
  const { signOut } = useClerk();

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        className="fixed top-4 left-4 z-50"
        onClick={toggleSidebar}
      >
        {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
      </Button>
      <nav className={`bg-background border-r h-screen w-64 fixed left-0 top-0 p-4 transition-transform duration-300 ease-in-out transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col space-y-4 mt-16">
          <Link href="/match">
            <Button
              variant={pathname === "/match" ? "default" : "ghost"}
              className="w-full justify-start"
            >
              <Home className="mr-2 h-4 w-4" />
              Home
            </Button>
          </Link>
          <Link href="/jobsApplied">
            <Button
              variant={pathname === "/jobsApplied" ? "default" : "ghost"}
              className="w-full justify-start"
            >
              <Briefcase className="mr-2 h-4 w-4" />
              Jobs Applied
            </Button>
          </Link>
          <Link href="/profile">
            <Button
              variant={pathname === "/profile" ? "default" : "ghost"}
              className="w-full justify-start"
            >
              <User className="mr-2 h-4 w-4" />
              Profile
            </Button>
          </Link>
          <Link href="/about">
            <Button
              variant={pathname === "/about" ? "default" : "ghost"}
              className="w-full justify-start"
            >
              <Contact className="mr-2 h-4 w-4" />
              About Us
            </Button>
          </Link>
          <Button variant="ghost" className="w-full justify-start" onClick={() => signOut({ redirectUrl: '/' })}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </nav>
    </>
  );
}

