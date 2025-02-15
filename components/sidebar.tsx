"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { BarChart, BookOpen, Dumbbell, Menu, Book, LogOut } from "lucide-react"
import type React from "react"
import { useState } from "react"
import { useAuth } from "@/lib/AuthContext"
import { signOut } from "firebase/auth"
import { auth } from "@/lib/firebase"

export function Sidebar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { user } = useAuth()

  const handleSignOut = async () => {
    try {
      await signOut(auth)
    } catch (error) {
      console.error("Error signing out: ", error)
    }
  }

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="flex h-[60px] items-center border-b px-6">
        <Link className="flex items-center gap-2 font-semibold" href="/">
          <Dumbbell className="h-6 w-6" />
          <span className="">Range Balance App</span>
        </Link>
      </div>
      <ScrollArea className="flex-1 px-4">
        {user && (
          <>
            <div className="py-4">
              <SidebarLink href="/welcome" onClick={() => setIsMobileMenuOpen(false)}>
                Welcome To The Journey
              </SidebarLink>
            </div>
            <div className="space-y-4 py-4">
              <SidebarGroup title="Balance Overview" icon={BarChart}>
                <SidebarLink href="/shoulder-balance" onClick={() => setIsMobileMenuOpen(false)}>
                  Shoulder Balance
                </SidebarLink>
                <SidebarLink href="/hip-balance" onClick={() => setIsMobileMenuOpen(false)}>
                  Hip Balance
                </SidebarLink>
                <SidebarLink href="/knee-balance" onClick={() => setIsMobileMenuOpen(false)}>
                  Knee Balance
                </SidebarLink>
                <SidebarLink href="/wrist-elbow-balance" onClick={() => setIsMobileMenuOpen(false)}>
                  Wrist & Elbow Balance
                </SidebarLink>
                <SidebarLink href="/ankle-toes-balance" onClick={() => setIsMobileMenuOpen(false)}>
                  Ankle & Toes Balance
                </SidebarLink>
              </SidebarGroup>
              <SidebarGroup title="Definitions" icon={Book}>
                <SidebarLink href="/definitions/short-range" onClick={() => setIsMobileMenuOpen(false)}>
                  Short Range
                </SidebarLink>
                <SidebarLink href="/definitions/long-range" onClick={() => setIsMobileMenuOpen(false)}>
                  Long Range
                </SidebarLink>
                <SidebarLink href="/definitions/understanding-tension" onClick={() => setIsMobileMenuOpen(false)}>
                  Understanding Tension
                </SidebarLink>
                <SidebarLink href="/definitions/tension-levels" onClick={() => setIsMobileMenuOpen(false)}>
                  Tension Levels
                </SidebarLink>
                <SidebarLink href="/definitions/the-range-scale" onClick={() => setIsMobileMenuOpen(false)}>
                  The Range Scale
                </SidebarLink>
              </SidebarGroup>
              <SidebarGroup title="Newsletters" icon={BookOpen}>
                <SidebarLink href="/theory/understanding-range-training" onClick={() => setIsMobileMenuOpen(false)}>
                  Understanding Range Training
                </SidebarLink>
                <SidebarLink href="/theory/range-balance" onClick={() => setIsMobileMenuOpen(false)}>
                  Range Balance
                </SidebarLink>
                <SidebarLink href="/theory/how-to-get-good-adaptation" onClick={() => setIsMobileMenuOpen(false)}>
                  Adaptation Mastery
                </SidebarLink>
              </SidebarGroup>
            </div>
          </>
        )}
      </ScrollArea>
      {user && (
        <div className="border-t p-4">
          <Button variant="ghost" className="w-full justify-start" onClick={handleSignOut}>
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </Button>
        </div>
      )}
    </div>
  )

  if (!user) {
    return null
  }

  return (
    <>
      <div className="hidden lg:block border-r bg-gray-100/40 dark:bg-gray-800/40 sidebar-nordic w-64">
        <SidebarContent />
      </div>
      <div className="lg:hidden">
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="ml-auto">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            <SidebarContent />
          </SheetContent>
        </Sheet>
      </div>
    </>
  )
}

function SidebarGroup({
  title,
  icon: Icon,
  children,
}: {
  title: string
  icon: React.ElementType
  children: React.ReactNode
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center px-3 py-2 text-sm font-semibold">
        <Icon className="mr-2 h-4 w-4" />
        <span>{title}</span>
      </div>
      <div className="ml-4 space-y-1">{children}</div>
    </div>
  )
}

function SidebarLink({ href, children, onClick }: { href: string; children: React.ReactNode; onClick?: () => void }) {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Link href={href} passHref>
      <Button
        variant="ghost"
        className={cn("w-full justify-start sidebar-link text-sm", isActive && "bg-gray-200 dark:bg-gray-700")}
        onClick={onClick}
      >
        {children}
      </Button>
    </Link>
  )
}

