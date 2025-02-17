"use client"

import type React from "react"
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
} from "@/components/ui/alert-dialog"
import { useCountdown } from "@/hooks/use-countdown"
import { useAuth } from "@/lib/AuthContext"
import { db } from "@/lib/firebase"
import { collection, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore"

type ProgressEntry = {
  id: string
  reps: number
  sets: number
  weight: number
  date: number
}

type ExerciseType = {
  id: number
  name: string
  description: string
  muscleGroup: string
  exercises: {
    id: number
    range: string
    reps: number
    sets: number
    weight: number
    function: string
  }[]
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
  const { countdowns, startCountdown, stopCountdown, getRemainingTime } = useCountdown(exerciseType)
  const { user } = useAuth()

  const filteredExercises = exercises.filter((exercise) => {
    const functionMatch = functionFilter === "all" || exercise.exercises.some((ex) => ex.function === functionFilter)
    const rangeMatch = rangeFilter === "all" || exercise.exercises.some((ex) => ex.range === rangeFilter)
    return functionMatch && rangeMatch
  })

  const handleCheckExercise = async (id: number) => {
    if (!user) return

    setExercises((prevExercises) => {
      const updatedExercises = prevExercises.map((exercise) => {
        if (exercise.id === id) {
          const newCompleted = !exercise.completed
          if (newCompleted) {
            const duration = exercise.exercises[0].range === "short" ? 24 * 3600 : 48 * 3600
            startCountdown(id, duration)
            return {
              ...exercise,
              completed: true,
              completionTime: Date.now(),
              reappearTime: Date.now() + duration * 1000,
            }
          } else {
            stopCountdown(id)
            return { ...exercise, completed: false, completionTime: undefined, reappearTime: undefined }
          }
        }
        return exercise
      })
      return updatedExercises
    })

    // Update Firestore
    const exerciseRef = doc(db, "users", user.uid, "exercises", id.toString())
    await updateDoc(exerciseRef, {
      completed: !exercises.find((e) => e.id === id)?.completed,
      completionTime: exercises.find((e) => e.id === id)?.completed ? null : Date.now(),
      reappearTime: exercises.find((e) => e.id === id)?.completed
        ? null
        : Date.now() +
          (exercises.find((e) => e.id === id)?.exercises[0].range === "short" ? 24 * 3600 * 1000 : 48 * 3600 * 1000),
    })
  }

  const handleDeleteExercise = (id: number) => {
    setExerciseToDelete(exercises.find((exercise) => exercise.id === id) || null)
  }

  const confirmDeleteExercise = async () => {
    if (exerciseToDelete && user) {
      const updatedExercises = exercises.filter((exercise) => exercise.id !== exerciseToDelete.id)
      setExercises(updatedExercises)
      stopCountdown(exerciseToDelete.id)
      setExerciseToDelete(null)

      // Delete from Firestore
      await deleteDoc(doc(db, "users", user.uid, "exercises", exerciseToDelete.id.toString()))
    }
  }

  const handleUpdateProgress = async (id: number, progress: ProgressEntry) => {
    if (!user) return

    setExercises((prevExercises) => {
      const updatedExercises = prevExercises.map((exercise) => {
        if (exercise.id === id) {
          return { ...exercise, progress: [...exercise.progress, progress] }
        }
        return exercise
      })
      return updatedExercises
    })

    // Add progress to Firestore
    const progressRef = collection(db, "users", user.uid, "exercises", id.toString(), "progress")
    await addDoc(progressRef, progress)
  }

  const handleDeleteProgress = async (exerciseId: number, progressId: string) => {
    if (!user) return

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
      return updatedExercises
    })

    // Delete progress from Firestore
    await deleteDoc(doc(db, "users", user.uid, "exercises", exerciseId.toString(), "progress", progressId))
  }

  const handleCancelRest = async (id: number) => {
    if (!user) return

    const updatedExercises = exercises.map((exercise) => {
      if (exercise.id === id) {
        stopCountdown(id)
        return { ...exercise, completed: false, completionTime: undefined, reappearTime: undefined }
      }
      return exercise
    })
    setExercises(updatedExercises)

    // Update Firestore
    const exerciseRef = doc(db, "users", user.uid, "exercises", id.toString())
    await updateDoc(exerciseRef, {
      completed: false,
      completionTime: null,
      reappearTime: null,
    })
  }

  const handleReset = async (id: number) => {
    if (!user) return

    setExercises((prevExercises) => {
      const updatedExercises = prevExercises.map((exercise) => {
        if (exercise.id === id) {
          stopCountdown(id)
          return { ...exercise, completed: false, completionTime: undefined, reappearTime: undefined }
        }
        return exercise
      })
      return updatedExercises
    })

    // Update Firestore
    if (user) {
      const exerciseRef = doc(db, "users", user.uid, "exercises", id.toString())
      await updateDoc(exerciseRef, {
        completed: false,
        completionTime: null,
        reappearTime: null,
      })
    }
  }

  useEffect(() => {
    // This effect will run whenever the exercises prop changes
    console.log("Exercises updated in ExerciseList:", exercises)
  }, [exercises])

  return (
    <div>
      {filteredExercises.map((exercise) => (
        <Exercise
          key={exercise.id}
          exercise={exercise}
          onCheck={() => handleCheckExercise(exercise.id)}
          onDelete={() => handleDeleteExercise(exercise.id)}
          onUpdateProgress={handleUpdateProgress}
          onDeleteProgress={handleDeleteProgress}
          onExerciseComplete={onExerciseComplete}
          isResting={!!exercise.completionTime}
          onCancelRest={() => handleCancelRest(exercise.id)}
          onStartCountdown={startCountdown}
          countdownRemaining={getRemainingTime(exercise.id)}
          onReset={() => handleReset(exercise.id)}
        />
      ))}
      <AlertDialog open={exerciseToDelete !== null} onOpenChange={() => setExerciseToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>Delete Exercise</AlertDialogHeader>
          <AlertDialogDescription>Are you sure you want to delete this exercise?</AlertDialogDescription>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setExerciseToDelete(null)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDeleteExercise}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

