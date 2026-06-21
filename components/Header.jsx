import React from "react";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
import {
  ChevronDown,
  FileText,
  GraduationCap,
  LayoutDashboard,
  PenBox,
  StarsIcon,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

import { checkUser } from "@/lib/checkUser";
import { auth } from "@clerk/nextjs/server";

const Header = async () => {
  // 1. First sync/register the user in your database
  await checkUser();
  
  // 2. Await auth() and destructure userId to check if they are logged in
  const { userId } = await auth();

  return (
    <header className="fixed top-0 w-full border-b bg-gradient-to-r from-gray-500 via-slate-200 to-gray-500 backdrop-blur-md z-50">
      <nav className="w-full px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <Image
            src="/logo.png"
            alt="Logo"
            width={200}
            height={60}
            priority
            className="h-12 py-1 w-auto object-contain rounded-xl"
          />
        </Link>

        {/* Right Side */}
        <div className="flex items-center gap-3 ml-auto">
          {userId ? (
            <>
              {/* Dashboard */}
              <Link href="/dashboard">
                <Button className="h-12 px-4 bg-slate-600">
                  <LayoutDashboard className="h-4 w-4" />
                  <span className="hidden md:block">Industry Insights</span>
                </Button>
              </Link>

              {/* Growth Tools */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="h-12 px-4">
                    <StarsIcon className="h-4 w-4" />
                    <span className="hidden md:block">Growth Tools</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link
                      href="/resume"
                      className="flex items-center gap-2 h-12"
                    >
                      <FileText className="w-4 h-4" />
                      <span>Build Resume</span>
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem asChild>
                    <Link
                      href="/ai-cover-letter"
                      className="flex items-center gap-2 h-12"
                    >
                      <PenBox className="w-4 h-4" />
                      <span>Cover Letter</span>
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem asChild>
                    <Link
                      href="/interview"
                      className="flex items-center gap-2 h-12"
                    >
                      <GraduationCap className="w-4 h-4" />
                      <span>Interview Prep</span>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* User Profile */}
              {/*<UserButton 
                 appearance={{
                  elements: {
                    avatarBox: "w-10 h-10", // Adjusted from 16 to fit navbar neatly
                    userButtonAvatarBox: "w-10 h-10",
                    userButtonPopoverCard: "shadow-xl",
                    userPreviewMainIdentifier: "font-semibold",
                  },
                 }}
                 afterSignOutUrl="/"
              />*/}
              <UserButton afterSignOutUrl="/"/>
            </>
          ) : (
            /* Using a clean link to your dedicated route prevents session modal errors */
            <Link href="/sign-in">
              <Button className="h-12 px-6">
                Sign In
              </Button>
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;