"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Bell,
  Menu,
  X,
  User,
  FileText,
  MessageSquare,
  Settings,
  LogOut,
  Search,
} from "lucide-react";
import { logout } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { User as AuthUser } from "@/lib/auth";

export default function CandidateNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const [userInfo, setUserInfo] = useState<{firstName: string, lastName: string} | null>(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch('http://localhost:10000/api/user-info', {
          credentials: 'include'
        });
        if (response.ok) {
          const data = await response.json();
          setUserInfo(data);
        }
      } catch (error) {
        console.error('Failed to fetch user info:', error);
      }
    };

    fetchUserInfo();
  }, []);

  const handleLogout = async () => {
    await logout(router);
  };

  return (
    <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link
              href="/candidate/dashboard"
              className="flex items-center gap-2"
            >
              <span className="text-xl font-bold text-primary">CVue</span>
            </Link>

            <nav className="hidden md:flex ml-10 space-x-6">
              <Link
                href="/candidate/cv-upload"
                className="text-foreground/80 hover:text-foreground transition-colors"
              >
                CV Upload
              </Link>
              <Link
                href="/communication"
                className="text-foreground/80 hover:text-foreground transition-colors"
              >
                Messages
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src="/placeholder.svg?height=32&width=32"
                      alt="User"
                    />
                    <AvatarFallback>
                      {userInfo ? `${userInfo.firstName[0]}${userInfo.lastName[0]}` : 'U'}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>{userInfo ? `${userInfo.firstName} ${userInfo.lastName}` : 'My Account'}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <FileText className="mr-2 h-4 w-4" />
                  <span>My Applications</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  <span>Messages</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(true)}
            >
              <Menu size={20} />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-background">
          <div className="container mx-auto px-4">
            <div className="flex h-16 items-center justify-between">
              <Link
                href="/candidate/dashboard"
                className="flex items-center gap-2"
              >
                <span className="text-xl font-bold text-primary">CVue</span>
              </Link>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMenuOpen(false)}
              >
                <X size={20} />
              </Button>
            </div>

            <nav className="flex flex-col space-y-4 py-8">
              <Link
                href="/candidate/dashboard"
                className="text-lg py-2 border-b border-border"
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link
                href="/candidate/cv-upload"
                className="text-lg py-2 border-b border-border"
                onClick={() => setIsMenuOpen(false)}
              >
                CV Upload
              </Link>
              <Link
                href="/candidate/trends"
                className="text-lg py-2 border-b border-border"
                onClick={() => setIsMenuOpen(false)}
              >
                Career Trends
              </Link>
              <Link
                href="/communication"
                className="text-lg py-2 border-b border-border"
                onClick={() => setIsMenuOpen(false)}
              >
                Messages
              </Link>
              <Link
                href="/candidate/settings"
                className="text-lg py-2 border-b border-border"
                onClick={() => setIsMenuOpen(false)}
              >
                Settings
              </Link>
            </nav>

            <div className="py-4">
              <Button className="w-full" onClick={() => setIsMenuOpen(false)}>
                <Search className="mr-2 h-4 w-4" />
                Search Jobs
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
