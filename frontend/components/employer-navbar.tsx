"use client";

import { useState } from "react";
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
  Building,
  FileText,
  MessageSquare,
  Settings,
  LogOut,
  Users,
  PlusCircle,
} from "lucide-react";

export default function EmployerNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link
              href="/employer/dashboard"
              className="flex items-center gap-2"
            >
              <span className="text-xl font-bold text-primary">CVue</span>
              <span className="bg-primary/10 text-primary text-xs px-2 py-0.5 rounded">
                Employer
              </span>
            </Link>

            <nav className="hidden md:flex ml-10 space-x-6">
              <Link
                href="/employer/dashboard"
                className="text-foreground/80 hover:text-foreground transition-colors"
              >
                Dashboard
              </Link>
              <Link
                href="/employer/search-candidates"
                className="text-foreground/80 hover:text-foreground transition-colors"
              >
                Search Candidates
              </Link>
              <Link
                href="/feedback"
                className="text-foreground/80 hover:text-foreground transition-colors"
              >
                Feedback
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
            <Button variant="ghost" size="icon" className="relative">
              <Bell size={20} />
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-primary"></span>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src="/placeholder.svg?height=32&width=32"
                      alt="Company"
                    />
                    <AvatarFallback>TC</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>TechCorp Inc.</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">
                  <Building className="mr-2 h-4 w-4" />
                  <span>Company Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <FileText className="mr-2 h-4 w-4" />
                  <span>Job Postings</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <Users className="mr-2 h-4 w-4" />
                  <span>Candidates</span>
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
                <DropdownMenuItem className="cursor-pointer">
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
                href="/employer/dashboard"
                className="flex items-center gap-2"
              >
                <span className="text-xl font-bold text-primary">CVue</span>
                <span className="bg-primary/10 text-primary text-xs px-2 py-0.5 rounded">
                  Employer
                </span>
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
                href="/employer/dashboard"
                className="text-lg py-2 border-b border-border"
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link
                href="/employer/search-candidates"
                className="text-lg py-2 border-b border-border"
                onClick={() => setIsMenuOpen(false)}
              >
                Search Candidates
              </Link>
              <Link
                href="/feedback"
                className="text-lg py-2 border-b border-border"
                onClick={() => setIsMenuOpen(false)}
              >
                Feedback
              </Link>
              <Link
                href="/communication"
                className="text-lg py-2 border-b border-border"
                onClick={() => setIsMenuOpen(false)}
              >
                Messages
              </Link>
              <Link
                href="/employer/settings"
                className="text-lg py-2 border-b border-border"
                onClick={() => setIsMenuOpen(false)}
              >
                Settings
              </Link>
            </nav>

            <div className="py-4">
              <Button className="w-full" onClick={() => setIsMenuOpen(false)}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Post New Job
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
