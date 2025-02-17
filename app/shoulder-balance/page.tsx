"use client"

import { useState, useCallback, useEffect, useRef } from "react"
import { ExerciseList } from "@/components/exercise-list"
import { CategoryFilter } from "@/components/category-filter"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { MobileRangeBalanceCharts } from "@/components/mobile-range-balance-charts"
import { useAuth } from "@/lib/AuthContext"
import { db } from "@/lib/firebase"
import { collection, query, where, getDocs, setDoc, doc, addDoc, deleteDoc } from "firebase/firestore"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

type Exercise = {
  id: number
  exercises: {
    name: string
    description: string
    function: string
    range: "short" | "long"
    youtubeLink: string
    youtubeTitle: string
    typeOfMovement: string
  }[]
  completed: boolean
  progress: any[]
  reappearInterval: number
  completionTime?: number
}

const shoulderFunctions = [
  "Shoulder Flexion",
  "Shoulder Extension",
  "Shoulder Abduction",
  "Shoulder Adduction",
  "Internal Rotation",
  "External Rotation",
  "Horizontal Abduction",
  "Horizontal Adduction",
]

const generateInitialExercises = (): Exercise[] => {
  let id = 1
  return shoulderFunctions.flatMap((func) => [
    {
      id: id++,
      exercises: [
        {
          name: `Short Range ${func} Isolation Exercise`,
          description: `Perform an isolated ${func.toLowerCase()} movement with limited range of motion.`,
          function: func,
          range: "short",
          youtubeLink: "https://www.youtube.com/watch?v=example",
          youtubeTitle: `Short Range ${func} Isolation Exercise`,
          typeOfMovement: "Isolation Exercise",
        },
        {
          name: `Short Range ${func} Compound Exercise`,
          description: `Perform a compound movement focusing on ${func.toLowerCase()} with limited range of motion.`,
          function: func,
          range: "short",
          youtubeLink: "https://www.youtube.com/watch?v=example",
          youtubeTitle: `Short Range ${func} Compound Exercise`,
          typeOfMovement: "Compound Exercise",
        },
      ],
      completed: false,
      progress: [],
      reappearInterval: 24,
    },
    {
      id: id++,
      exercises: [
        {
          name: `Long Range ${func} Isolation Exercise`,
          description: `Perform an isolated ${func.toLowerCase()} movement with full range of motion.`,
          function: func,
          range: "long",
          youtubeLink: "https://www.youtube.com/watch?v=example",
          youtubeTitle: `Long Range ${func} Isolation Exercise`,
          typeOfMovement: "Isolation Exercise",
        },
        {
          name: `Long Range ${func} Compound Exercise`,
          description: `Perform a compound movement focusing on ${func.toLowerCase()} with full range of motion.`,
          function: func,
          range: "long",
          youtubeLink: "https://www.youtube.com/watch?v=example",
          youtubeTitle: `Long Range ${func} Compound Exercise`,
          typeOfMovement: "Compound Exercise",
        },
      ],
      completed: false,
      progress: [],
      reappearInterval: 48,
    },
  ])
}

const filterExercises = (exercises: Exercise[], completed: boolean) => {
  return exercises.filter((exercise) => exercise.completed === completed)
}

export default function ShoulderBalance() {
  const { user } = useAuth()
  const [exercises, setExercises] = useState<Exercise[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isAddExerciseOpen, setIsAddExerciseOpen] = useState(false)
  const [newExercise, setNewExercise] = useState({
    exercises: [
      {
        name: "",
        description: "",
        function: "",
        range: "short",
        youtubeLink: "",
        youtubeTitle: "",
        typeOfMovement: "Compound Exercise",
      },
      {
        name: "",
        description: "",
        function: "",
        range: "short",
        youtubeLink: "",
        youtubeTitle: "",
        typeOfMovement: "Compound Exercise",
      },
    ],
  })
  const [functionFilter, setFunctionFilter] = useState("all")
  const [rangeFilter, setRangeFilter] = useState("all")
  const exercisesRef = useRef<Exercise[]>([])
  const loadingRef = useRef(false)
  const exercisesLoadedRef = useRef(false)
  const countdownTimers = useRef<{ [key: number]: NodeJS.Timeout }>({})

  const startCountdown = (id: number, duration: number) => {
    countdownTimers.current[id] = setTimeout(() => {
      handleExerciseReset(id)
    }, duration * 1000)
  }

  const stopCountdown = (id: number) => {
    clearTimeout(countdownTimers.current[id])
    delete countdownTimers.current[id]
  }

  const loadExercises = useCallback(async () => {
    if (loadingRef.current || exercisesLoadedRef.current) return
    loadingRef.current = true
    console.log("Loading exercises...")
    setIsLoading(true)
    try {
      let loadedExercises: Exercise[] = []
      if (user) {
        console.log("User authenticated, fetching from Firestore")
        const exercisesRef = collection(db, "users", user.uid, "exercises")
        const q = query(exercisesRef, where("type", "==", "shoulder"))
        const querySnapshot = await getDocs(q)

        const exercisesWithProgress = await Promise.all(
          querySnapshot.docs.map(async (doc) => {
            const exerciseData = doc.data() as Exercise
            const progressRef = collection(db, "users", user.uid, "exercises", doc.id, "progress")
            const progressSnapshot = await getDocs(progressRef)
            let progress = progressSnapshot.docs.map((progressDoc) => ({
              id: progressDoc.id,
              ...progressDoc.data(),
            }))

            // If no progress entries exist, create initial ones
            if (progress.length === 0) {
              progress = await Promise.all(
                exerciseData.exercises.map(async (_, index) => {
                  const newProgressRef = await addDoc(progressRef, {
                    exerciseIndex: index,
                    date: new Date().toISOString(),
                    tension: "low",
                    reps: 0,
                    weight: 0,
                  })
                  return {
                    id: newProgressRef.id,
                    exerciseIndex: index,
                    date: new Date().toISOString(),
                    tension: "low",
                    reps: 0,
                    weight: 0,
                  }
                }),
              )
            }

            return {
              id: Number(doc.id),
              ...exerciseData,
              progress: progress,
            }
          }),
        )

        loadedExercises = exercisesWithProgress
        console.log("Exercises loaded from Firestore:", loadedExercises)
      } else {
        console.log("User not authenticated, fetching from localStorage")
        const storedExercises = localStorage.getItem("shoulderExercises")
        if (storedExercises) {
          loadedExercises = JSON.parse(storedExercises)
          console.log("Exercises loaded from localStorage:", loadedExercises)
        }
      }

      const exercisesToSet = loadedExercises.length > 0 ? loadedExercises : generateInitialExercises()
      exercisesRef.current = exercisesToSet
      console.log("Exercises to be set:", exercisesToSet)

      if (loadedExercises.length === 0) {
        console.log("No exercises found, using generated initial exercises")
        if (user) {
          const exercisesRef = collection(db, "users", user.uid, "exercises")
          for (const exercise of exercisesToSet) {
            const exerciseDoc = doc(exercisesRef, exercise.id.toString())
            await setDoc(exerciseDoc, {
              ...exercise,
              type: "shoulder",
            })

            // Create initial progress entries for both exercises in the pair
            const progressRef = collection(exerciseDoc, "progress")
            for (let i = 0; i < 2; i++) {
              await addDoc(progressRef, {
                exerciseIndex: i,
                date: new Date().toISOString(),
                tension: "low",
                reps: 0,
                weight: 0,
              })
            }
          }
          console.log("Initial exercises and progress saved to Firestore")
        }
        localStorage.setItem("shoulderExercises", JSON.stringify(exercisesToSet))
        console.log("Initial exercises saved to localStorage")
      }

      setExercises(exercisesToSet)
      exercisesLoadedRef.current = true
    } catch (error) {
      console.error("Failed to load shoulder exercises:", error)
      setError("Failed to load shoulder exercises. Please try again.")
    } finally {
      setIsLoading(false)
      loadingRef.current = false
      console.log("Loading complete")
    }
  }, [user])

  useEffect(() => {
    console.log("loadExercises effect triggered")
    loadExercises()
  }, [loadExercises])

  useEffect(() => {
    console.log("Exercises state updated:", exercises)
    if (exercises.length === 0 && exercisesLoadedRef.current && !loadingRef.current) {
      console.warn("Exercises state cleared unexpectedly")
      setExercises(exercisesRef.current)
    } else if (exercises.length > 0) {
      exercisesRef.current = exercises
      localStorage.setItem("shoulderExercises", JSON.stringify(exercises))
    }
  }, [exercises])

  const handleAddExercise = () => {
    setIsAddExerciseOpen(true)
  }

  const handleNewExerciseChange = (index: number, field: keyof Exercise["exercises"][0], value: any) => {
    setNewExercise((prev) => ({
      ...prev,
      exercises: prev.exercises.map((exercise, i) => (i === index ? { ...exercise, [field]: value } : exercise)),
    }))
  }

  const handleSaveNewExercise = async () => {
    if (newExercise.exercises[0].name.trim() === "" || newExercise.exercises[1].name.trim() === "") {
      setError("Please fill in all exercise names.")
      return
    }

    const reappearInterval = newExercise.exercises[0].range === "long" ? 48 : 24

    const newExerciseData: Exercise = {
      id: Date.now(),
      exercises: newExercise.exercises,
      completed: false,
      progress: [],
      reappearInterval,
    }

    setExercises((prevExercises) => {
      const updatedExercises = [...prevExercises, newExerciseData]
      exercisesRef.current = updatedExercises
      localStorage.setItem("shoulderExercises", JSON.stringify(updatedExercises))
      return updatedExercises
    })

    if (user) {
      try {
        const exercisesRef = collection(db, "users", user.uid, "exercises")
        await setDoc(doc(exercisesRef, newExerciseData.id.toString()), {
          ...newExerciseData,
          type: "shoulder",
        })
        console.log("New exercise saved to Firestore")
      } catch (error) {
        console.error("Error saving new exercise to Firestore:", error)
        setError("Failed to save new exercise. Please try again.")
      }
    }

    setIsAddExerciseOpen(false)
    setNewExercise({
      exercises: [
        {
          name: "",
          description: "",
          function: "",
          range: "short",
          youtubeLink: "",
          youtubeTitle: "",
          typeOfMovement: "Compound Exercise",
        },
        {
          name: "",
          description: "",
          function: "",
          range: "short",
          youtubeLink: "",
          youtubeTitle: "",
          typeOfMovement: "Compound Exercise",
        },
      ],
    })
    setError(null)
  }

  const updateExerciseProgress = async (exerciseId: number, newProgress: any) => {
    setExercises((prevExercises) => {
      const updatedExercises = prevExercises.map((exercise) => {
        if (exercise.id === exerciseId) {
          const updatedProgress = [...exercise.progress, newProgress]
          return { ...exercise, progress: updatedProgress }
        }
        return exercise
      })
      exercisesRef.current = updatedExercises
      localStorage.setItem("shoulderExercises", JSON.stringify(updatedExercises))
      return updatedExercises
    })

    if (user) {
      const progressRef = collection(db, "users", user.uid, "exercises", exerciseId.toString(), "progress")
      await addDoc(progressRef, newProgress)
    }
  }

  const deleteExerciseProgress = async (exerciseId: number, progressId: string, exerciseIndex: number) => {
    setExercises((prevExercises) => {
      const updatedExercises = prevExercises.map((exercise) => {
        if (exercise.id === exerciseId) {
          const updatedProgress = exercise.progress.filter((_, index) => index !== exerciseIndex)
          return { ...exercise, progress: updatedProgress }
        }
        return exercise
      })
      exercisesRef.current = updatedExercises
      localStorage.setItem("shoulderExercises", JSON.stringify(updatedExercises))
      return updatedExercises
    })

    if (user) {
      const progressRef = doc(db, "users", user.uid, "exercises", exerciseId.toString(), "progress", progressId)
      await deleteDoc(progressRef)
    }
  }

  const onExerciseComplete = async (id: number) => {
    setExercises((prevExercises) => {
      const updatedExercises = prevExercises.map((exercise) => {
        if (exercise.id === id) {
          const duration = exercise.exercises[0].range === "short" ? 24 * 3600 : 48 * 3600 // 24 or 48 hours in seconds
          startCountdown(id, duration)
          return { ...exercise, completed: true, completionTime: Date.now() }
        }
        return exercise
      })
      localStorage.setItem("shoulderExercises", JSON.stringify(updatedExercises))
      return updatedExercises
    })

    if (user) {
      const exerciseRef = doc(db, "users", user.uid, "exercises", id.toString())
      await setDoc(exerciseRef, { completed: true, completionTime: Date.now() }, { merge: true })
    }
  }

  const handleExerciseReset = useCallback(
    async (id: number) => {
      setExercises((prevExercises) => {
        const updatedExercises = prevExercises.map((exercise) => {
          if (exercise.id === id) {
            stopCountdown(id)
            return { ...exercise, completed: false, completionTime: undefined }
          }
          return exercise
        })
        exercisesRef.current = updatedExercises
        localStorage.setItem("shoulderExercises", JSON.stringify(updatedExercises))
        return updatedExercises
      })

      if (user) {
        const exerciseRef = doc(db, "users", user.uid, "exercises", id.toString())
        await setDoc(exerciseRef, { completed: false, completionTime: null }, { merge: true })
      }
    },
    [user, stopCountdown], // Added stopCountdown to dependencies
  )

  const prepareRangeData = (range: "short" | "long") => {
    const functions = Array.from(new Set(exercises.flatMap((e) => e.exercises.map((ex) => ex.function))))
    return functions.map((func) => ({
      subject: func,
      A: Math.max(
        ...exercises
          .filter((e) => e.exercises.some((ex) => ex.function === func && ex.range === range))
          .flatMap((e) => e.progress.map((p) => (p.tension === "high" ? 1 : p.tension === "medium" ? 0.66 : 0.33))),
      ),
    }))
  }

  const shortRangeData = prepareRangeData("short")
  const longRangeData = prepareRangeData("long")

  useEffect(() => {
    const interval = setInterval(() => {
      setExercises((prevExercises) => {
        const updatedExercises = prevExercises.map((exercise) => {
          if (exercise.completed && exercise.completionTime) {
            const elapsedTime = Date.now() - exercise.completionTime
            const restDuration = exercise.exercises[0].range === "short" ? 24 * 3600 * 1000 : 48 * 3600 * 1000
            if (elapsedTime >= restDuration) {
              stopCountdown(exercise.id)
              return { ...exercise, completed: false, completionTime: undefined }
            }
          }
          return exercise
        })
        if (JSON.stringify(updatedExercises) !== JSON.stringify(prevExercises)) {
          exercisesRef.current = updatedExercises
          localStorage.setItem("shoulderExercises", JSON.stringify(updatedExercises))
          return updatedExercises
        }
        return prevExercises
      })
    }, 1000) // Check every second

    return () => clearInterval(interval)
  }, [])

  if (isLoading) {
    return <div>Loading exercises...</div>
  }

  if (error) {
    return (
      <Alert>
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )
  }

  if (exercises.length === 0 && exercisesLoadedRef.current && !loadingRef.current) {
    console.warn("Rendering with empty exercises array, but exercises should be loaded")
    return <div>No exercises found. Try adding some!</div>
  }

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">Shoulder Balance</h1>
      <MobileRangeBalanceCharts shortRangeData={shortRangeData} longRangeData={longRangeData} />
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="flex justify-between items-center flex-wrap gap-4">
            <span>Shoulder Exercises To-Do List</span>
            <Button onClick={handleAddExercise} className="nordic-button">
              <PlusCircle className="mr-2 h-4 w-4" /> Add Exercise
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <CategoryFilter
              functionFilter={functionFilter}
              setFunctionFilter={setFunctionFilter}
              rangeFilter={rangeFilter}
              setRangeFilter={setRangeFilter}
              functions={shoulderFunctions}
              bodyPart="Shoulder"
            />
          </div>
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Shoulder Exercises To-Do List</h2>
              <ExerciseList
                exercises={filterExercises(exercises, false)}
                setExercises={setExercises}
                functionFilter={functionFilter}
                rangeFilter={rangeFilter}
                updateExerciseProgress={updateExerciseProgress}
                deleteExerciseProgress={deleteExerciseProgress}
                onExerciseComplete={onExerciseComplete}
                exerciseType="shoulder"
                onReset={handleExerciseReset}
              />
            </div>

            <Separator className="my-4" />

            <div>
              <h2 className="text-2xl font-semibold mb-4">Rest Section</h2>
              <ExerciseList
                exercises={filterExercises(exercises, true)}
                setExercises={setExercises}
                functionFilter={functionFilter}
                rangeFilter={rangeFilter}
                updateExerciseProgress={updateExerciseProgress}
                deleteExerciseProgress={deleteExerciseProgress}
                onExerciseComplete={onExerciseComplete}
                exerciseType="shoulder"
                onReset={handleExerciseReset}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

