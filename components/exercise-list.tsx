"use client"

import { useState, useEffect } from "react"
import { Exercise } from "@/components/exercise"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useCountdown } from "@/hooks/use-countdown"
import type React from "react" // Added import for React

type ProgressEntry = {
  date: string
  tension: "low" | "medium" | "high"
  weight: number
  reps: number
  id: string
}

type ExerciseType = {
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

type ExerciseListProps = {
  exercises: ExerciseType[]
  setExercises: React.Dispatch<React.SetStateAction<ExerciseType[]>>
  functionFilter: string
  rangeFilter: string
  updateExerciseProgress: (exerciseId: number, newProgress: ProgressEntry) => void
  deleteExerciseProgress: (exerciseId: number, progressId: string, exerciseIndex: number) => void
  onExerciseComplete: (id: number) => void
  exerciseType: "shoulder" | "hip" | "knee" | "wristElbow" | "ankleToes"
}

export function ExerciseList({
  exercises,
  setExercises,
  functionFilter,
  rangeFilter,
  updateExerciseProgress,
  deleteExerciseProgress,
  onExerciseComplete,
  exerciseType,
}: ExerciseListProps) {
  const [exerciseToDelete, setExerciseToDelete] = useState<ExerciseType | null>(null)
  const [activeExercises, setActiveExercises] = useState<ExerciseType[]>([])
  const [restingExercises, setRestingExercises] = useState<ExerciseType[]>([])
  const { countdowns, startCountdown, stopCountdown, getRemainingTime } = useCountdown(exerciseType)

  useEffect(() => {
    const now = Date.now()
    const active = exercises.filter(
      (e) =>
        (functionFilter === "all" || e.exercises.some((ex) => ex.function === functionFilter)) &&
        (rangeFilter === "all" || e.exercises.some((ex) => ex.range === rangeFilter)) &&
        (!e.completed || (e.reappearTime && e.reappearTime <= now)),
    )
    const resting = exercises.filter(
      (e) =>
        (functionFilter === "all" || e.exercises.some((ex) => ex.function === functionFilter)) &&
        (rangeFilter === "all" || e.exercises.some((ex) => ex.range === rangeFilter)) &&
        e.completed &&
        e.reappearTime &&
        e.reappearTime > now,
    )
    setActiveExercises(active)
    setRestingExercises(resting)
  }, [exercises, functionFilter, rangeFilter])

  useEffect(() => {
    const checkCountdowns = () => {
      exercises.forEach((exercise) => {
        const remainingTime = getRemainingTime(exercise.id)
        if (remainingTime === 0 && exercise.completed) {
          const updatedExercises = exercises.map((ex) =>
            ex.id === exercise.id
              ? { ...ex, completed: false, completionTime: undefined, reappearTime: undefined }
              : ex,
          )
          setExercises(updatedExercises)
          localStorage.setItem(`${exerciseType}Exercises`, JSON.stringify(updatedExercises))
        }
      })
    }

    const interval = setInterval(checkCountdowns, 1000)
    return () => clearInterval(interval)
  }, [exercises, getRemainingTime, setExercises, exerciseType]) // Added setExercises to dependencies

  const handleCheckExercise = (id: number) => {
    const updatedExercises = exercises.map((exercise) => {
      if (exercise.id === id) {
        if (!exercise.completed) {
          const duration = exercise.exercises[0].range === "short" ? 24 * 3600 : 48 * 3600 // 24 hours or 48 hours
          startCountdown(id, duration)
          return {
            ...exercise,
            completed: true,
            completionTime: Date.now(),
            reappearTime: Date.now() + duration * 1000, // Set reappearTime to match countdown duration
          }
        } else {
          stopCountdown(id)
          return { ...exercise, completed: false, completionTime: undefined, reappearTime: undefined }
        }
      }
      return exercise
    })
    setExercises(updatedExercises)
    localStorage.setItem(`${exerciseType}Exercises`, JSON.stringify(updatedExercises))
  }

  const handleDeleteExercise = (id: number) => {
    setExerciseToDelete(exercises.find((exercise) => exercise.id === id) || null)
  }

  const confirmDeleteExercise = () => {
    if (exerciseToDelete) {
      const updatedExercises = exercises.filter((exercise) => exercise.id !== exerciseToDelete.id)
      setExercises(updatedExercises)
      localStorage.setItem(`${exerciseType}Exercises`, JSON.stringify(updatedExercises))
      stopCountdown(exerciseToDelete.id)
      setExerciseToDelete(null)
    }
  }

  const handleUpdateProgress = (id: number, progress: ProgressEntry) => {
    const updatedExercises = exercises.map((exercise) => {
      if (exercise.id === id) {
        return { ...exercise, progress: [...exercise.progress, progress] }
      }
      return exercise
    })
    setExercises(updatedExercises)
    localStorage.setItem(`${exerciseType}Exercises`, JSON.stringify(updatedExercises))
  }

  const handleDeleteProgress = (exerciseId: number, progressId: string) => {
    console.log(`Deleting progress: Exercise ID ${exerciseId}, Progress ID ${progressId}`)
    setExercises((prevExercises) => {
      const updatedExercises = prevExercises.map((exercise) => {
        if (exercise.id === exerciseId) {
          console.log(`Before deletion: ${exercise.progress.length} entries`)
          const updatedProgress = exercise.progress.filter((p) => p.id !== progressId)
          console.log(`After deletion: ${updatedProgress.length} entries`)
          return {
            ...exercise,
            progress: updatedProgress,
          }
        }
        return exercise
      })
      console.log("Updated exercises:", updatedExercises)
      localStorage.setItem(`${exerciseType}Exercises`, JSON.stringify(updatedExercises))
      return updatedExercises
    })
  }

  const handleCancelRest = (id: number) => {
    const updatedExercises = exercises.map((exercise) => {
      if (exercise.id === id) {
        stopCountdown(id)
        return { ...exercise, completed: false, completionTime: undefined, reappearTime: undefined }
      }
      return exercise
    })
    setExercises(updatedExercises)
    localStorage.setItem(`${exerciseType}Exercises`, JSON.stringify(updatedExercises))
  }

  const handleReset = (id: number) => {
    const updatedExercises = exercises.map((exercise) => {
      if (exercise.id === id) {
        stopCountdown(id)
        return { ...exercise, completed: false, completionTime: undefined, reappearTime: undefined }
      }
      return exercise
    })
    setExercises(updatedExercises)
    localStorage.setItem(`${exerciseType}Exercises`, JSON.stringify(updatedExercises))
  }

  return (
    <div>
      <div className="space-y-4">
        {activeExercises.map((exercise) => (
          <Exercise
            key={exercise.id}
            exercise={exercise}
            onCheck={handleCheckExercise}
            onUpdateProgress={updateExerciseProgress}
            onDeleteProgress={deleteExerciseProgress}
            isResting={false}
            onStartCountdown={startCountdown}
            countdownRemaining={getRemainingTime(exercise.id)}
            onReset={handleReset}
          />
        ))}
      </div>
      {restingExercises.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Rest Section</h2>
          {restingExercises.map((exercise) => (
            <Exercise
              key={exercise.id}
              exercise={exercise}
              onCheck={handleCheckExercise}
              onUpdateProgress={updateExerciseProgress}
              onDeleteProgress={deleteExerciseProgress}
              isResting={true}
              onCancelRest={handleCancelRest}
              onStartCountdown={startCountdown}
              countdownRemaining={getRemainingTime(exercise.id)}
              onReset={handleReset}
            />
          ))}
        </div>
      )}
      <AlertDialog open={!!exerciseToDelete} onOpenChange={() => setExerciseToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to delete this exercise?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the exercise from your list.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDeleteExercise}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

