"use client"

import React from "react"
import { Header } from "./Header/Header"
import { LeftPanel } from "./LeftPanel/LeftPanel"
import { ErrorBoundary } from "@/components/ErrorBoundary"

interface MainLayoutProps {
  children: React.ReactNode
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <ErrorBoundary>
        <Header />
      </ErrorBoundary>
      <div className="flex max-w-[1920px] mx-auto">
        <ErrorBoundary>
          <LeftPanel />
        </ErrorBoundary>
        <main className="flex-1 p-4 md:p-6 min-w-0 overflow-x-hidden">
          <ErrorBoundary>
            {children}
          </ErrorBoundary>
        </main>
      </div>
    </div>
  )
}