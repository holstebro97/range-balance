"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function RangeBalance() {
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
      <h1 className="text-3xl font-bold mb-8">Range Balance Newsletter</h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Subscribe to Our Range Balance Insights!</CardTitle>
          <CardDescription>Get weekly tips and strategies for achieving optimal range balance</CardDescription>
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
          <CardTitle>Range Balance: The Key to Optimal Movement and Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            Range Balance refers to the equilibrium between strength, flexibility, and control throughout a joint's
            entire range of motion. It's a crucial concept in fitness and physical therapy that ensures muscles and
            joints can function optimally at any point within their movement capabilities.
          </p>
          <p className="mb-4">Achieving proper Range Balance is essential for several reasons:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Injury Prevention: Balanced muscles and joints are less prone to strains and overuse injuries</li>
            <li>Improved Performance: Better range of motion and control can enhance athletic abilities</li>
            <li>Posture and Alignment: Balanced muscles contribute to better overall body posture</li>
            <li>Functional Strength: Strength throughout the full range of motion improves daily activities</li>
            <li>Long-term Joint Health: Proper balance reduces wear and tear on joints over time</li>
          </ul>
          <p className="mb-4">
            To work towards Range Balance, consider incorporating the following into your fitness routine:
          </p>
          <ol className="list-decimal pl-6 mb-4">
            <li>Assess your current range of motion and identify any imbalances</li>
            <li>Include exercises that target different parts of each joint's range of motion</li>
            <li>Focus on both strength and flexibility in your training</li>
            <li>Practice controlled movements through full ranges of motion</li>
            <li>Incorporate unilateral exercises to address side-to-side imbalances</li>
          </ol>
          <p>
            Remember, achieving Range Balance is an ongoing process. It requires consistent effort and attention to
            detail in your training. As you progress, you'll likely notice improvements in your overall movement
            quality, reduced discomfort in daily activities, and enhanced athletic performance. Stay patient and
            persistent in your journey towards optimal Range Balance.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

