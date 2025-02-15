import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function TensionLevels() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Tension Levels</h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Understanding Tension Levels</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            In our approach to range training, we categorize exercises into three tension levels: low, medium, and high.
            These levels correspond to different intensities and serve various purposes in developing muscle function
            and overall fitness. Understanding these levels is crucial for effectively using this app and achieving your
            fitness goals.
          </p>
          <p>
            It's important to note that these tension levels are closely related to the concepts explained in the{" "}
            <Link href="/definitions/understanding-tension" className="text-blue-600 hover:underline">
              Understanding Tension
            </Link>{" "}
            page. The type of tension (leverage-based or band-based) and how it's applied determines the tension level
            of an exercise.
          </p>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Low Tension</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-6 mb-4">
            <li>Typically performed with resistance bands or bodyweight</li>
            <li>Rep range: 30-100 repetitions</li>
            <li>Focus: Regaining baseline function in specific muscle ranges</li>
            <li>Tension type: Primarily uses band-based tension or very low leverage-based tension (bodyweight)</li>
          </ul>
          <p>
            Low tension exercises are crucial for establishing a foundation of movement and muscle activation. They help
            improve blood flow, joint mobility, and basic muscle function without putting excessive stress on the body.
          </p>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Medium Tension</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-6 mb-4">
            <li>Introduces more intensity, typically using weights for leverage-based tension</li>
            <li>Rep range: 15-50 repetitions</li>
            <li>Focus: Challenging muscles more than low tension exercises</li>
            <li>Tension type: Primarily leverage-based tension with moderate weights</li>
          </ul>
          <p>
            Medium tension exercises build upon the foundation established by low tension work. They start to develop
            more significant strength and muscle endurance, preparing the body for higher intensity work.
          </p>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>High Tension</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-6 mb-4">
            <li>Represents advanced muscle function in the targeted range</li>
            <li>Uses leverage with heavier weights</li>
            <li>Rep range: 8-20 repetitions</li>
            <li>Tension type: High leverage-based tension</li>
          </ul>
          <p>
            High tension exercises are where significant strength and muscle development occur. These exercises
            challenge your muscles to their limits, promoting growth and power development.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>The Purpose of This App</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            The main goal of this app is to help you develop high tension ability across all functions of your joints.
            By systematically working through these tension levels for each movement and joint function, you can:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Create a solid foundation for athletic performance</li>
            <li>Develop a more balanced and resilient body</li>
            <li>Reduce the risk of injuries</li>
            <li>Improve overall strength and muscle function</li>
          </ul>
          <p className="mb-4">
            As you progress through the tension levels, you'll notice improvements in your strength, flexibility, and
            overall physical capability. This balanced approach ensures that you're not just strong in one specific
            range or movement, but across all ranges of motion.
          </p>
          <p>
            As an added bonus, consistently working towards high tension ability in all your joint functions will not
            only make you more athletic and resilient but will also give you an impressive, well-developed physique.
            You'll look and perform like a complete beast!
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

