"use client"

import { useState, useEffect } from "react"

type CountdownState = {
  [key: string]: {
    [id: number]: number
  }
}

export function useCountdown(exerciseType: "shoulder" | "hip") {
  const [countdowns, setCountdowns] = useState<CountdownState[typeof exerciseType]>({})

  useEffect(() => {
    const loadCountdowns = () => {
      const storedCountdowns = localStorage.getItem("exerciseCountdowns")
      if (storedCountdowns) {
        const parsedCountdowns = JSON.parse(storedCountdowns)
        setCountdowns(parsedCountdowns[exerciseType] || {})
      }
    }

    loadCountdowns()
    const interval = setInterval(loadCountdowns, 1000) // Update every second

    return () => clearInterval(interval)
  }, [exerciseType])

  useEffect(() => {
    const now = Date.now()
    const updatedCountdowns = { ...countdowns }
    let hasChanges = false

    Object.entries(updatedCountdowns).forEach(([id, completionTime]) => {
      const numId = Number(id)
      const remainingTime = Math.max(0, completionTime - now)
      if (remainingTime === 0) {
        delete updatedCountdowns[numId]
        hasChanges = true

        // Get the exercises from localStorage and update the completed status
        const storedExercises = localStorage.getItem(`${exerciseType}Exercises`)
        if (storedExercises) {
          const exercises = JSON.parse(storedExercises)
          const updatedExercises = exercises.map((exercise: any) => {
            if (exercise.id === numId) {
              return { ...exercise, completed: false, completionTime: undefined, reappearTime: undefined }
            }
            return exercise
          })
          localStorage.setItem(`${exerciseType}Exercises`, JSON.stringify(updatedExercises))
        }
      }
    })

    if (hasChanges) {
      setCountdowns(updatedCountdowns)
      const storedCountdowns = JSON.parse(localStorage.getItem("exerciseCountdowns") || "{}")
      storedCountdowns[exerciseType] = updatedCountdowns
      localStorage.setItem("exerciseCountdowns", JSON.stringify(storedCountdowns))
    }
  }, [countdowns, exerciseType])

  const startCountdown = (id: number, duration: number) => {
    const completionTime = Date.now() + duration * 1000
    setCountdowns((prev) => {
      const updated = { ...prev, [id]: completionTime }
      const storedCountdowns = JSON.parse(localStorage.getItem("exerciseCountdowns") || "{}")
      storedCountdowns[exerciseType] = updated
      localStorage.setItem("exerciseCountdowns", JSON.stringify(storedCountdowns))
      return updated
    })
  }

  const stopCountdown = (id: number) => {
    setCountdowns((prev) => {
      const updated = { ...prev }
      delete updated[id]
      const storedCountdowns = JSON.parse(localStorage.getItem("exerciseCountdowns") || "{}")
      storedCountdowns[exerciseType] = updated
      localStorage.setItem("exerciseCountdowns", JSON.stringify(storedCountdowns))
      return updated
    })
  }

  const getRemainingTime = (id: number): number | null => {
    const completionTime = countdowns[id]
    if (!completionTime) return null
    return Math.max(0, completionTime - Date.now())
  }

  return { countdowns, startCountdown, stopCountdown, getRemainingTime }
}

