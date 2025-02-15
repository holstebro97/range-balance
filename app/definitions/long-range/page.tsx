import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function LongRange() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Long Range</h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Understanding Long Range Exercises</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            Long range exercises involve movements that utilize a joint's full or near-full range of motion. These
            exercises typically work muscles through their entire length, from a fully stretched position to a fully
            contracted position.
          </p>
          <h3 className="text-xl font-semibold mb-2">Key Characteristics of Long Range Exercises:</h3>
          <ul className="list-disc pl-6 mb-4">
            <li>Full or near-full range of motion</li>
            <li>Work muscles through their entire length</li>
            <li>Often involve multiple joint movements</li>
            <li>Promote overall muscle development and flexibility</li>
            <li>Enhance functional strength and mobility</li>
          </ul>
          <p className="mb-4">Long range exercises are beneficial for:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Improving overall muscle strength and size</li>
            <li>Enhancing flexibility and joint mobility</li>
            <li>Developing functional strength for everyday activities</li>
            <li>Improving athletic performance across various sports</li>
            <li>Maintaining joint health and preventing injuries</li>
          </ul>
          <p>
            While long range exercises are generally considered foundational in most training programs, they can be
            complemented with short range exercises for specific training goals or to overcome plateaus.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Examples of Long Range Exercises</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-6">
            <li>Full squats (to parallel or below)</li>
            <li>Full range bench press</li>
            <li>Conventional deadlifts</li>
            <li>Pull-ups or chin-ups</li>
            <li>Dips</li>
            <li>Lunges</li>
            <li>Full range of motion bicep curls</li>
            <li>Overhead presses</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

