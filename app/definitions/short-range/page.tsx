import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function ShortRange() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Short Range</h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Understanding Short Range Exercises</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            Short range exercises focus on movements that occur within a limited portion of a joint's full range of
            motion. These exercises typically target the initial part of a movement, often where the muscle is at its
            strongest.
          </p>
          <h3 className="text-xl font-semibold mb-2">Key Characteristics of Short Range Exercises:</h3>
          <ul className="list-disc pl-6 mb-4">
            <li>Limited range of motion, usually less than half of the full range</li>
            <li>Often performed in the strongest part of the movement</li>
            <li>Can allow for heavier loads to be used</li>
            <li>May help improve strength at specific joint angles</li>
            <li>Useful for breaking through plateaus in strength training</li>
          </ul>
          <p className="mb-4">Short range exercises can be particularly beneficial for:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Developing explosive power in sports-specific movements</li>
            <li>Improving strength in weak portions of a lift</li>
            <li>Rehabilitation, when full range of motion is not yet possible or advisable</li>
            <li>Bodybuilders looking to target specific portions of a muscle</li>
          </ul>
          <p>
            While short range exercises can be highly effective, they should typically be used in conjunction with full
            range of motion exercises for balanced muscle development and overall functional strength.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Examples of Short Range Exercises</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-6">
            <li>Partial squats or quarter squats</li>
            <li>Board presses in bench press</li>
            <li>Rack pulls (partial deadlifts)</li>
            <li>Short range bicep curls</li>
            <li>Partial range of motion leg extensions</li>
            <li>Isometric holds at specific joint angles</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

