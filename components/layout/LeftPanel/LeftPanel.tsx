"use client"

import React from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { RollingValues } from "./RollingValues"
import { EventCountdown } from "./EventCountdown"
import { MustWatch } from "./MustWatch"
import { Competitions } from "./Competitions"

export const LeftPanel = () => {
  return (
    <aside className="w-64 lg:w-80 h-[calc(100vh-4rem)] sticky top-16 border-r bg-background/50 backdrop-blur-sm hidden md:block">
      <ScrollArea className="h-full">
        <div className="p-4 space-y-6">
          {/* Rolling Values Section */}
          <section>
            <RollingValues />
          </section>

          {/* Days to Next Event */}
          <section>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <span className="text-2xl">📅</span>
              Days to Next Event
            </h3>
            <EventCountdown />
          </section>

          {/* Must Watch Content */}
          <section>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <span className="text-2xl">🎬</span>
              Must Watch
            </h3>
            <MustWatch />
          </section>

          {/* Current Competitions */}
          <section>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <span className="text-2xl">🏆</span>
              Current Competitions
            </h3>
            <Competitions />
          </section>
        </div>
      </ScrollArea>
    </aside>
  )
}