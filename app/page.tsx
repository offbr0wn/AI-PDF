"use client"

import { Features } from "@/components/features";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { RecentDocuments } from "@/components/recent-documents";
import { useUser } from "@clerk/nextjs";

export default function Home() {

  const {  user } = useUser()
  console.log(user?.id)
  return (
    <div className="min-h-screen flex flex-col bg-linear-to-br from-primary-50 to-white/40  relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-radial from-brand-secondary/10 to-transparent rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-radial from-brand-accent/10 to-transparent rounded-full translate-y-1/2 -translate-x-1/2"></div>
      </div>

      <Header />
      <main className="flex-1 relative z-10">
        <Hero />

        <Features />
        <RecentDocuments />
      </main>
      <footer className="border-t py-6 md:py-8 bg-white/50 backdrop-blur-sm relative z-10">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="text-sm text-gray-500">© 2025 PDF Parser. All rights reserved.</div>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <a href="#" className="hover:text-blue-600 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-blue-600 transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-blue-600 transition-colors">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
