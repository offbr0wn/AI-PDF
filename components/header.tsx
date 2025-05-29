"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FileText, Menu, X } from "lucide-react";
import { useState } from "react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md supports-[backdrop-filter]:bg-white/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-lg bg-blue-600 flex items-center justify-center shadow-md">
            <FileText className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold text-blue-600">PDF Parser</span>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="#"
            className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
          >
            Dashboard
          </Link>
          <Link
            href="#"
            className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
          >
            Documents
          </Link>
          <Link
            href="#"
            className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
          >
            Templates
          </Link>
          <Link
            href="#"
            className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
          >
            Pricing
          </Link>
        </nav>

        <div className="hidden md:flex items-center gap-4 cursor-pointer">
          <SignedOut>
            <Button
              variant="outline"
              size="sm"
              className="border-blue-600/20 text-blue-600 hover:bg-blue-50"
            >
              <SignInButton />
            </Button>
            <Button
              size="sm"
              className="bg-blue-600 hover:bg-blue-700 text-white border-none"
            >
              <SignUpButton />
            </Button>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </Button>
      </div>

      {isMenuOpen && (
        <div className="container md:hidden py-4 border-t">
          <nav className="flex flex-col gap-4">
            <Link
              href="#"
              className="text-sm font-medium text-gray-600 hover:text-blue-600"
            >
              Dashboard
            </Link>
            <Link
              href="#"
              className="text-sm font-medium text-gray-600 hover:text-blue-600"
            >
              Documents
            </Link>
            <Link
              href="#"
              className="text-sm font-medium text-gray-600 hover:text-blue-600"
            >
              Templates
            </Link>
            <Link
              href="#"
              className="text-sm font-medium text-gray-600 hover:text-blue-600"
            >
              Pricing
            </Link>
            <div className="flex flex-col gap-2 pt-2">
              <SignedOut>
                <Button
                  variant="outline"
                  size="sm"
                  className="justify-center border-blue-600/20 text-blue-600 hover:bg-blue-50"
                >
                  <SignInButton />
                </Button>
                <Button
                  size="sm"
                  className="justify-center bg-blue-600 hover:bg-blue-700 text-white border-none"
                >
                  <SignUpButton />
                </Button>
              </SignedOut>

              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
