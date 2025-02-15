"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function HowToGetGoodAdaptation() {
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the email to your backend or newsletter service
    console.log("Subscribing email:", email)
    setSubscribed(true)
    setEmail("")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Adaptation Mastery Newsletter</h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Join Our Adaptation Mastery Community!</CardTitle>
          <CardDescription>Receive weekly insights on optimizing your body's adaptation to training</CardDescription>
        </CardHeader>
        <CardContent>
          {subscribed ? (
            <Alert>
              <AlertTitle>Thank you for subscribing!</AlertTitle>
              <AlertDescription>You'll receive our next newsletter soon.</AlertDescription>
            </Alert>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button type="submit" className="w-full">
                Subscribe
              </Button>
            </form>
          )}
        </CardContent>
      </Card>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Mastering Adaptation: Optimizing Your Body's Response to Training</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            Adaptation is the cornerstone of physical improvement. It's the process by which your body adjusts to the
            stresses of exercise, becoming stronger, more efficient, and better equipped to handle future challenges.
            Mastering the art of adaptation is key to continuous progress in your fitness journey.
          </p>
          <p className="mb-4">Here are the fundamental principles for achieving good adaptation:</p>
          <ol className="list-decimal pl-6 mb-4">
            <li>
              <strong>Progressive Overload:</strong> Gradually increase the demands on your body over time. This can be
              achieved by increasing weight, reps, sets, or decreasing rest periods. Progressive overload ensures your
              body continues to adapt and improve.
            </li>
            <li>
              <strong>Consistency:</strong> Maintain a regular training schedule. Consistency allows your body to adapt
              to the stresses of exercise in a predictable manner. Aim for a balance between challenging workouts and
              adequate recovery time.
            </li>
            <li>
              <strong>Proper Nutrition:</strong> Fuel your body with the right nutrients to support adaptation and
              recovery. Ensure you're getting adequate protein for muscle repair, carbohydrates for energy, and healthy
              fats for hormone production. Don't forget about micronutrients from fruits and vegetables.
            </li>
            <li>
              <strong>Adequate Rest and Recovery:</strong> Allow your body time to recover between workouts. This is
              when adaptation occurs. Ensure you're getting enough sleep (7-9 hours for most adults) and consider
              incorporating active recovery techniques like stretching or light cardio.
            </li>
            <li>
              <strong>Variation in Training:</strong> Introduce variety into your workouts to prevent plateaus and
              continue challenging your body in new ways. This can include changing exercises, rep ranges, or training
              methods. However, balance variation with consistency to allow for measurable progress.
            </li>
            <li>
              <strong>Mindful Progression:</strong> Listen to your body and adjust your training based on how you feel.
              Some days you might push harder, while others might require a step back. This mindful approach helps
              prevent overtraining and promotes sustainable progress.
            </li>
          </ol>
          <p>
            Remember, adaptation is a personal process. What works best will vary from person to person based on factors
            like genetics, lifestyle, and training history. Be patient with your body, stay consistent with your
            efforts, and don't be afraid to experiment to find what works best for you. With time and dedication, you'll
            master the art of adaptation and continue making progress towards your fitness goals.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

