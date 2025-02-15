"use client"

import { useState, useEffect } from "react"
import { ExerciseList } from "@/components/exercise-list"
import { CategoryFilter } from "@/components/category-filter"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PlusCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useCountdown } from "@/hooks/use-countdown"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MobileRangeBalanceCharts } from "@/components/mobile-range-balance-charts"

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
      youtubeTitle: string
      typeOfMovement: "Compound Exercise" | "Isolation Exercise"
    },
    {
      name: string
      description: string
      function: string
      range: string
      youtubeLink: string
      youtubeTitle: string
      typeOfMovement: "Compound Exercise" | "Isolation Exercise"
    },
  ]
  reappearInterval: number
  completed: boolean
  completionTime?: number
  reappearTime?: number
  progress: ProgressEntry[]
}

const shoulderFunctions = [
  "Flexion",
  "Extension",
  "Abduction",
  "Adduction",
  "Horizontal Abduction",
  "Horizontal Adduction",
  "External Rotation",
  "Internal Rotation",
]

const ranges = ["short", "long"]

const generateRandomProgress = (): ProgressEntry => {
  const tensions: ("low" | "medium" | "high")[] = ["low", "medium", "high"]
  return {
    id: Date.now().toString(),
    exerciseIndex: Math.random() < 0.5 ? 0 : 1, // Randomly assign to first or second exercise
    date: new Date().toISOString().split("T")[0],
    tension: tensions[Math.floor(Math.random() * tensions.length)],
    reps: Math.floor(Math.random() * 15) + 5, // Random number between 5 and 20
    weight: Math.floor(Math.random() * 20) + 5, // Random number between 5 and 25
  }
}

const generateInitialExercises = (): Exercise[] => {
  let id = 1
  return shoulderFunctions.flatMap((func) =>
    ranges.map((range) => ({
      id: id++,
      exercises: [
        {
          name: `${range === "short" ? "Short" : "Full"} Range ${func} Exercise 1`,
          description: `Strengthen your shoulder muscles with ${range === "short" ? "limited" : "full"} range of motion`,
          function: func,
          range: range,
          youtubeLink: "https://www.youtube.com/watch?v=example",
          youtubeTitle:
            func === "Flexion"
              ? range === "short"
                ? "Shoulder Press"
                : "Dips"
              : func === "Extension"
                ? range === "short"
                  ? `${range === "short" ? "Short" : "Full"} Range ${func} Exercise 1`
                  : "Chin Up"
                : `${range === "short" ? "Short" : "Full"} Range ${func} Exercise 1`,
          typeOfMovement: "Compound Exercise",
        },
        {
          name: `${range === "short" ? "Short" : "Full"} Range ${func} Exercise 2`,
          description: `Isolate your shoulder muscles with ${range === "short" ? "limited" : "full"} range of motion`,
          function: func,
          range: range,
          youtubeLink: "https://www.youtube.com/watch?v=example",
          youtubeTitle:
            func === "Flexion"
              ? range === "short"
                ? "Short Range Front Raise"
                : "Long Range Front Raise"
              : func === "Extension"
                ? range === "short"
                  ? "Short Range DB Extension"
                  : "Long Range DB Pullover"
                : `${range === "short" ? "Short" : "Full"} Range ${func} Exercise 2`,
          typeOfMovement: "Isolation Exercise",
        },
      ],
      reappearInterval: range === "long" ? 48 : 24,
      completed: false,
      progress: [
        {
          id: Date.now().toString(),
          exerciseIndex: 0,
          date: new Date().toISOString().split("T")[0],
          tension: "low",
          reps: 0,
          weight: 0,
        },
        {
          id: (Date.now() + 1).toString(),
          exerciseIndex: 1,
          date: new Date().toISOString().split("T")[0],
          tension: "low",
          reps: 0,
          weight: 0,
        },
      ],
    })),
  )
}

export default function ShoulderBalance() {
  const [exercises, setExercises] = useState<Exercise[]>([])
  const [bodyAreaFilter, setBodyAreaFilter] = useState("all")
  const [rangeFilter, setRangeFilter] = useState("all")
  const [isAddExerciseOpen, setIsAddExerciseOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [newExercise, setNewExercise] = useState<Omit<Exercise, "id" | "completed" | "progress" | "reappearInterval">>({
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
  const [typeOfMovementFilter, setTypeOfMovementFilter] = useState("all")
  const [shortRangeData, setShortRangeData] = useState<any[]>([])
  const [longRangeData, setLongRangeData] = useState<any[]>([])
  const [allShortRangeHighTension, setAllShortRangeHighTension] = useState(false)
  const [allLongRangeHighTension, setAllLongRangeHighTension] = useState(false)
  const { stopCountdown } = useCountdown("shoulder")

  const tensionLevels = {
    low: 0,
    medium: 0.5,
    high: 1,
  }

  useEffect(() => {
    const loadExercises = () => {
      setIsLoading(true)
      try {
        const storedExercises = localStorage.getItem("shoulderExercises")
        if (storedExercises) {
          setExercises(JSON.parse(storedExercises))
        } else {
          const initialExercises = generateInitialExercises()
          setExercises(initialExercises)
          localStorage.setItem("shoulderExercises", JSON.stringify(initialExercises))
        }
      } catch (error) {
        setError("Failed to load shoulder exercises. Please try again.")
      } finally {
        setIsLoading(false)
      }
    }

    loadExercises()
  }, [])

  useEffect(() => {
    const getHighestTension = (exercisePairs: Exercise[], range: string) => {
      const tensions = exercisePairs.flatMap((pair) =>
        pair.exercises
          .filter((ex) => ex.range === range)
          .flatMap((ex, index) => pair.progress.filter((p) => p.exerciseIndex === index).map((p) => p.tension)),
      )
      if (tensions.includes("high")) return 1
      if (tensions.includes("medium")) return 0.66
      if (tensions.includes("low")) return 0.33
      return 0
    }

    const functions = Array.from(new Set(exercises.flatMap((e) => e.exercises.map((ex) => ex.function))))

    const shortRangeData = functions.map((func) => ({
      subject: func,
      A: getHighestTension(
        exercises.filter((e) => e.exercises.some((ex) => ex.function === func)),
        "short",
      ),
    }))

    const longRangeData = functions.map((func) => ({
      subject: func,
      A: getHighestTension(
        exercises.filter((e) => e.exercises.some((ex) => ex.function === func)),
        "long",
      ),
    }))

    setShortRangeData(shortRangeData)
    setLongRangeData(longRangeData)

    setAllShortRangeHighTension(shortRangeData.every((data) => data.A === 1))
    setAllLongRangeHighTension(longRangeData.every((data) => data.A === 1))
  }, [exercises])

  const handleAddExercise = () => {
    setIsAddExerciseOpen(true)
  }

  const handleSaveNewExercise = () => {
    if (
      !isValidYouTubeLink(newExercise.exercises[0].youtubeLink) ||
      !isValidYouTubeLink(newExercise.exercises[1].youtubeLink)
    ) {
      setError("Please enter valid YouTube links for both exercises")
      return
    }

    if (newExercise.exercises[0].range !== newExercise.exercises[1].range) {
      setError("Both exercises in a pair must have the same range")
      return
    }

    if (newExercise.exercises[0].function !== newExercise.exercises[1].function) {
      setError("Both exercises in a pair must have the same function")
      return
    }

    const reappearInterval = newExercise.exercises[0].range === "long" ? 48 : 24

    const updatedExercises = [
      ...exercises,
      {
        ...newExercise,
        id: Date.now(),
        completed: false,
        progress: [generateRandomProgress()], // Add one random progress entry for new exercises
        reappearInterval,
      },
    ]
    setExercises(updatedExercises)
    localStorage.setItem("shoulderExercises", JSON.stringify(updatedExercises))
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

  const isValidYouTubeLink = (url: string) => {
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/
    return youtubeRegex.test(url)
  }

  const updateExerciseProgress = (exerciseId: number, newProgress: ProgressEntry) => {
    const updatedExercises = exercises.map((exercise) => {
      if (exercise.id === exerciseId) {
        return {
          ...exercise,
          progress: [...exercise.progress, newProgress],
        }
      }
      return exercise
    })
    setExercises(updatedExercises)
    localStorage.setItem("shoulderExercises", JSON.stringify(updatedExercises))
  }

  const deleteExerciseProgress = (exerciseId: number, progressId: string, exerciseIndex: number) => {
    const updatedExercises = exercises.map((exercise) => {
      if (exercise.id === exerciseId) {
        return {
          ...exercise,
          progress: exercise.progress.filter((p) => p.id !== progressId || p.exerciseIndex !== exerciseIndex),
        }
      }
      return exercise
    })
    setExercises(updatedExercises)
    localStorage.setItem("shoulderExercises", JSON.stringify(updatedExercises))
  }

  const handleExerciseComplete = (id: number) => {
    setExercises((prevExercises) => {
      const updatedExercises = prevExercises.map((exercise) =>
        exercise.id === id ? { ...exercise, completed: true, completionTime: Date.now() } : exercise,
      )
      localStorage.setItem("shoulderExercises", JSON.stringify(updatedExercises))
      return updatedExercises
    })
    stopCountdown(id)
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Shoulder Balance</h1>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Range Balance</CardTitle>
        </CardHeader>
        <CardContent>
          <MobileRangeBalanceCharts shortRangeData={shortRangeData} longRangeData={longRangeData} />
        </CardContent>
      </Card>
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
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
                  bodyAreaFilter={bodyAreaFilter}
                  setBodyAreaFilter={setBodyAreaFilter}
                  functionFilter={functionFilter}
                  setFunctionFilter={setFunctionFilter}
                  rangeFilter={rangeFilter}
                  setRangeFilter={setRangeFilter}
                  functions={shoulderFunctions}
                  bodyPart="Shoulder"
                />
              </div>
              <ExerciseList
                exercises={exercises}
                setExercises={setExercises}
                bodyAreaFilter={bodyAreaFilter}
                functionFilter={functionFilter}
                rangeFilter={rangeFilter}
                typeOfMovementFilter={typeOfMovementFilter}
                updateExerciseProgress={updateExerciseProgress}
                deleteExerciseProgress={deleteExerciseProgress}
                onExerciseComplete={handleExerciseComplete}
                exerciseType="shoulder"
              />
            </CardContent>
          </Card>
        </div>
      )}
      <Dialog open={isAddExerciseOpen} onOpenChange={setIsAddExerciseOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Exercise Pair</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {[0, 1].map((index) => (
              <div key={index} className="space-y-4">
                <h3 className="font-semibold">Exercise {index + 1}</h3>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor={`name-${index}`} className="text-right">
                    Name
                  </Label>
                  <Input
                    id={`name-${index}`}
                    value={newExercise.exercises[index].name}
                    onChange={(e) =>
                      setNewExercise({
                        ...newExercise,
                        exercises: newExercise.exercises.map((ex, i) =>
                          i === index ? { ...ex, name: e.target.value } : ex,
                        ),
                      })
                    }
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor={`description-${index}`} className="text-right">
                    Description
                  </Label>
                  <Input
                    id={`description-${index}`}
                    value={newExercise.exercises[index].description}
                    onChange={(e) =>
                      setNewExercise({
                        ...newExercise,
                        exercises: newExercise.exercises.map((ex, i) =>
                          i === index ? { ...ex, description: e.target.value } : ex,
                        ),
                      })
                    }
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="function" className="text-right">
                    Function
                  </Label>
                  <Select
                    value={newExercise.exercises[0].function}
                    onValueChange={(value) =>
                      setNewExercise({
                        ...newExercise,
                        exercises: newExercise.exercises.map((ex) => ({ ...ex, function: value })),
                      })
                    }
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select function" />
                    </SelectTrigger>
                    <SelectContent>
                      {shoulderFunctions.map((func) => (
                        <SelectItem key={func} value={func}>
                          {func}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="range" className="text-right">
                    Range
                  </Label>
                  <Select
                    value={newExercise.exercises[0].range}
                    onValueChange={(value) =>
                      setNewExercise({
                        ...newExercise,
                        exercises: newExercise.exercises.map((ex) => ({ ...ex, range: value })),
                      })
                    }
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="short">Short Range</SelectItem>
                      <SelectItem value="long">Long Range</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor={`youtubeLink-${index}`} className="text-right">
                    YouTube Link
                  </Label>
                  <Input
                    id={`youtubeLink-${index}`}
                    value={newExercise.exercises[index].youtubeLink}
                    onChange={(e) =>
                      setNewExercise({
                        ...newExercise,
                        exercises: newExercise.exercises.map((ex, i) =>
                          i === index ? { ...ex, youtubeLink: e.target.value } : ex,
                        ),
                      })
                    }
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor={`youtubeTitle-${index}`} className="text-right">
                    YouTube Title
                  </Label>
                  <Input
                    id={`youtubeTitle-${index}`}
                    value={newExercise.exercises[index].youtubeTitle}
                    onChange={(e) =>
                      setNewExercise({
                        ...newExercise,
                        exercises: newExercise.exercises.map((ex, i) =>
                          i === index ? { ...ex, youtubeTitle: e.target.value } : ex,
                        ),
                      })
                    }
                    className="col-span-3"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor={`typeOfMovement-${index}`} className="text-right">
                    Type of Movement
                  </Label>
                  <Select
                    value={newExercise.exercises[index].typeOfMovement}
                    onValueChange={(value) =>
                      setNewExercise({
                        ...newExercise,
                        exercises: newExercise.exercises.map((ex, i) =>
                          i === index ? { ...ex, typeOfMovement: value } : ex,
                        ),
                      })
                    }
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select type of movement" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Compound Exercise">Compound Exercise</SelectItem>
                      <SelectItem value="Isolation Exercise">Isolation Exercise</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            ))}
          </div>
          <DialogTrigger asChild>
            <Button onClick={handleSaveNewExercise} className="nordic-button">
              Save Exercise Pair
            </Button>
          </DialogTrigger>
        </DialogContent>
      </Dialog>
    </div>
  )
}

// Update the RangeBalanceCharts component to accept and use the `type` prop.

