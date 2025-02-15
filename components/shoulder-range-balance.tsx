"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadarChartComponent } from "./radar-chart"

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

type FunctionRangeBalanceProps = {
  exercises: Exercise[]
}

const tensionLevels = {
  low: 0.33,
  medium: 0.66,
  high: 1,
}

export function FunctionRangeBalance({ exercises }: FunctionRangeBalanceProps) {
  const [shortRangeData, setShortRangeData] = useState<any[]>([])
  const [longRangeData, setLongRangeData] = useState<any[]>([])
  const [allShortRangeHighTension, setAllShortRangeHighTension] = useState(false)
  const [allLongRangeHighTension, setAllLongRangeHighTension] = useState(false)

  useEffect(() => {
    const getHighestTension = (exercisePairs: Exercise[], range: string) => {
      return Math.max(
        ...exercisePairs.flatMap((pair) =>
          pair.exercises
            .filter((ex) => ex.range === range)
            .flatMap((ex, index) =>
              pair.progress.filter((p) => p.exerciseIndex === index).map((p) => tensionLevels[p.tension]),
            ),
        ),
        0,
      )
    }

    const functions = Array.from(new Set(exercises.flatMap((e) => e.exercises.map((ex) => ex.function))))

    const shortRangeData = functions.map((func) => ({
      subject: func,
      A: getHighestTension(
        exercises.filter((e) => e.exercises.some((ex) => ex.function === func)),
        "short",
      ),
      fullMark: 1,
    }))

    const longRangeData = functions.map((func) => ({
      subject: func,
      A: getHighestTension(
        exercises.filter((e) => e.exercises.some((ex) => ex.function === func)),
        "long",
      ),
      fullMark: 1,
    }))

    setShortRangeData(shortRangeData)
    setLongRangeData(longRangeData)

    setAllShortRangeHighTension(shortRangeData.every((data) => data.A === 1))
    setAllLongRangeHighTension(longRangeData.every((data) => data.A === 1))
  }, [exercises])

  return (
    <Card className="w-full mt-6">
      <CardHeader>
        <CardTitle>Function Range Balance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-6">
          <RadarChartComponent
            data={shortRangeData}
            title="Short Range Balance"
            description="Tension levels for short range exercises"
            color="hsl(var(--success))"
            allHighTension={allShortRangeHighTension}
          />
          <RadarChartComponent
            data={longRangeData}
            title="Long Range Balance"
            description="Tension levels for long range exercises"
            color="hsl(var(--destructive))"
            allHighTension={allLongRangeHighTension}
          />
        </div>
      </CardContent>
    </Card>
  )
}

