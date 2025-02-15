"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar, Legend } from "recharts"
import { Progress } from "@/components/ui/progress"
import { useState, useEffect } from "react"

interface RadarChartProps {
  data: {
    subject: string
    A: number
    fullMark: number
  }[]
  title: string
  description: string
  color: string
  allHighTension: boolean
}

export function RadarChartComponent({ data, title, description, color, allHighTension }: RadarChartProps) {
  const [completionPercentage, setCompletionPercentage] = useState(0)

  useEffect(() => {
    const totalPercentage = data.reduce((acc, item) => {
      if (item.A === 1) {
        return acc + 12.5 // High tension
      } else if (item.A >= 0.66) {
        return acc + 8.33 // Medium tension
      } else if (item.A >= 0.33) {
        return acc + 4.16 // Low tension
      }
      return acc
    }, 0)

    setCompletionPercentage(Math.min(totalPercentage, 100))
  }, [data])

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="h-[500px]">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" tick={{ fill: "var(--foreground)", fontSize: 14 }} />
              <Radar
                name="Tension Level"
                dataKey="A"
                stroke={title.includes("Short Range") ? "green" : color}
                fill={title.includes("Short Range") ? "green" : color}
                fillOpacity={0.6}
              />
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Road To High Tension Ability</span>
            <span className="text-sm font-medium">{completionPercentage.toFixed(2)}%</span>
          </div>
          <Progress value={completionPercentage} className="w-full" />
        </div>
        {completionPercentage >= 99.99 && (
          <div className="mt-4 text-center text-green-600 font-semibold">All functions have reached high tension!</div>
        )}
      </CardContent>
    </Card>
  )
}

