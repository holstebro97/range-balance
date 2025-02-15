import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function UnderstandingTension() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Understanding Tension</h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>What is Tension in Exercise?</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            In the context of strength training, tension refers to the force exerted on a muscle during an exercise.
            Understanding where and how tension is created in a movement is crucial for effective training, as it helps
            you identify which part of the range of motion is being targeted most intensely.
          </p>
          <p>
            In this app, we focus on two primary scenarios where tension is created: through leverage and through the
            use of resistance bands.
          </p>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Tension Created by Leverage</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            Leverage-based tension occurs when the force of gravity acting on a weight creates varying degrees of
            resistance throughout a movement due to changes in the moment arm.
          </p>
          <h3 className="text-xl font-semibold mb-2">Key Points:</h3>
          <ul className="list-disc pl-6 mb-4">
            <li>Tension varies based on the position of the weight relative to the joint axis</li>
            <li>The point of maximum tension is where the moment arm is longest</li>
            <li>Changing body position can alter where in the range of motion maximum tension occurs</li>
          </ul>
          <h3 className="text-xl font-semibold mb-2">Examples:</h3>
          <ul className="list-disc pl-6 mb-4">
            <li>
              <strong>Standing Bicep Curl:</strong> Maximum tension occurs in the mid-range of the movement when the
              forearm is parallel to the ground. This is because the moment arm from the center of mass of the weight to
              the elbow joint is greatest at this point.
            </li>
            <li>
              <strong>Incline Bicep Curl:</strong> By changing the body position to lying on an incline bench, the point
              of maximum tension shifts. Now, the greatest tension occurs when the muscles are in their longest range
              (arms extended), as this is where the moment arm is longest in this position.
            </li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Tension Created by Resistance Bands</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            When using resistance bands, the tension profile is different from that created by leverage with free
            weights. With bands, tension increases linearly as the band is stretched.
          </p>
          <h3 className="text-xl font-semibold mb-2">Key Points:</h3>
          <ul className="list-disc pl-6 mb-4">
            <li>Tension increases progressively as the band is stretched</li>
            <li>Maximum tension occurs at the point of greatest stretch</li>
            <li>The tension curve is more linear compared to leverage-based exercises</li>
          </ul>
          <h3 className="text-xl font-semibold mb-2">Example:</h3>
          <p className="mb-4">
            In a banded bicep curl, the tension will be lowest at the starting position (arms extended) and highest at
            the top of the curl when the band is stretched to its maximum. This is in contrast to a dumbbell curl, where
            tension peaks in the middle of the movement.
          </p>
          <p>
            Understanding these different tension profiles allows you to choose exercises that target specific ranges of
            motion more effectively, helping you achieve a more balanced and comprehensive training approach.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

