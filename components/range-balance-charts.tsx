"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Tooltip } from "recharts"

type ProgressEntry = {
  id: string
  exerciseIndex: number
  date: string
  tension: "low" | "medium" | "high"
  reps: number
  weight: number
}

type Exercise = {
  id: number
  exercises: [
    {
      name: string
      description: string
      function: string
      range: string
      youtubeLink: string
      typeOfMovement: "Compound Exercise" | "Isolation Exercise"
    },
    {
      name: string
      description: string
      function: string
      range: string
      youtubeLink: string
      typeOfMovement: "Compound Exercise" | "Isolation Exercise"
    },
  ]
  reappearInterval: number
  completed: boolean
  completionTime?: number
  reappearTime?: number
  progress: ProgressEntry[]
}

type RangeBalanceChartsProps = {
  exercises: Exercise[]
  type: "short" | "long"
}

const tensionLevels = { low: 0.33, medium: 0.66, high: 1 }

export function RangeBalanceCharts({ exercises, type }: RangeBalanceChartsProps) {
  const [data, setData] = useState<any[]>([])
  const [allHighTension, setAllHighTension] = useState(false)

  useEffect(() => {
    const getHighestTension = (exercisePairs: Exercise[], range: string) => {
      const tensions = exercisePairs.flatMap((pair) =>
        pair.exercises
          .filter((ex) => ex.range === range)
          .flatMap((ex, index) =>
            pair.progress
              .filter((p) => p.exerciseIndex === index)
              .map((p) => (p.tension === "low" && p.reps === 0 && p.weight === 0 ? 0 : tensionLevels[p.tension])),
          ),
      )
      return Math.max(...tensions, 0)
    }

    const functions = Array.from(new Set(exercises.flatMap((e) => e.exercises.map((ex) => ex.function))))

    const chartData = functions.map((func) => ({
      subject: func,
      A: getHighestTension(
        exercises.filter((e) => e.exercises.some((ex) => ex.function === func && ex.range === type)),
        type,
      ),
    }))

    setData(chartData)
    setAllHighTension(chartData.every((data) => data.A === 1))
  }, [exercises, type])

  console.log("Chart data:", data)
  console.log("Chart type:", type)

  return (
    <Card className="w-full shadow-lg min-h-[400px]">
      <CardHeader>
        <CardTitle>{`${type.charAt(0).toUpperCase() + type.slice(1)} Range Balance`}</CardTitle>
      </CardHeader>
      <CardContent>
        {data.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%" minHeight={300}>
            <RadarChart data={data}>
              <PolarGrid stroke="#e0e0e0" />
              <PolarAngleAxis
                dataKey="subject"
                tick={{ fill: "hsl(var(--foreground))", fontSize: 12 }}
                axisLine={{ stroke: "hsl(var(--border))" }}
              />
              <PolarRadiusAxis angle={30} domain={[0, 1]} tickCount={4} axisLine={{ stroke: "none" }} tick={false} />
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
        ) : (
          <div className="flex justify-center items-center h-[300px]">
            <p>No data available for the chart.</p>
          </div>
        )}
        {allHighTension && (
          <p className="text-center mt-4 font-semibold text-green-600">
            Congratulations! You've reached high tension in all functions!
          </p>
        )}
      </CardContent>
    </Card>
  )
}

