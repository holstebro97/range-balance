"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, Tooltip, PolarRadiusAxis } from "recharts"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"

type RangeBalanceData = {
  subject: string
  A: number
}

type MobileRangeBalanceChartsProps = {
  shortRangeData: RangeBalanceData[]
  longRangeData: RangeBalanceData[]
}

export function MobileRangeBalanceCharts({ shortRangeData, longRangeData }: MobileRangeBalanceChartsProps) {
  const [openShort, setOpenShort] = useState(false)
  const [openLong, setOpenLong] = useState(false)

  const renderChart = (data: RangeBalanceData[], type: "short" | "long") => (
    <ResponsiveContainer width="100%" height={300}>
      <RadarChart data={data}>
        <PolarGrid stroke="#e0e0e0" />
        <PolarAngleAxis
          dataKey="subject"
          tick={{ fill: "hsl(var(--foreground))", fontSize: 12 }}
          axisLine={{ stroke: "hsl(var(--border))" }}
        />
        <PolarRadiusAxis angle={30} domain={[0, 1]} tickCount={4} />
        <Radar
          name="Tension"
          dataKey="A"
          stroke={type === "short" ? "hsl(var(--success))" : "hsl(var(--destructive))"}
          fill={type === "short" ? "hsl(var(--success))" : "hsl(var(--destructive))"}
          fillOpacity={0.6}
        />
        <Tooltip
          content={({ payload }) => {
            if (payload && payload.length) {
              const value = payload[0].value as number
              let tensionLevel = "No tension"
              if (value >= 1) tensionLevel = "High tension"
              else if (value >= 0.66) tensionLevel = "Medium tension"
              else if (value >= 0.33) tensionLevel = "Low tension"
              return (
                <div className="bg-white p-2 rounded shadow">
                  <p className="font-semibold">{payload[0].payload.subject}</p>
                  <p>{tensionLevel}</p>
                </div>
              )
            }
            return null
          }}
        />
      </RadarChart>
    </ResponsiveContainer>
  )

  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <CardTitle hideVisually>Range Balance Charts</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col space-y-4">
        <Dialog open={openShort} onOpenChange={setOpenShort}>
          <DialogTrigger asChild>
            <Button variant="outline" className="w-full">
              Short Range Balance
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">{renderChart(shortRangeData, "short")}</DialogContent>
        </Dialog>

        <Dialog open={openLong} onOpenChange={setOpenLong}>
          <DialogTrigger asChild>
            <Button variant="outline" className="w-full">
              Long Range Balance
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">{renderChart(longRangeData, "long")}</DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  )
}

