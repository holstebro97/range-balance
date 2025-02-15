"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from "recharts"

const data = [
  { subject: "Flexion", lowTension: 20, mediumTension: 50, highTension: 100 },
  { subject: "Extension", lowTension: 30, mediumTension: 60, highTension: 100 },
  { subject: "Abduction", lowTension: 25, mediumTension: 55, highTension: 100 },
  { subject: "Adduction", lowTension: 35, mediumTension: 65, highTension: 100 },
  { subject: "Rotation", lowTension: 15, mediumTension: 45, highTension: 100 },
]

export default function WelcomeToTheJourney() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Welcome To The Journey</h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>A Personal Message</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            I created this app for my past self. I struggled with achieving any significant results in the gym. I was
            blind to all the dysfunctions my body had. The modern lifestyle and mainstream training practices are for
            many people, including me, a sure way to create a dysfunctional body.
          </p>
          <p>
            The goal of this app is to take you from a dysfunctional body created by the comforts of modern lifestyle,
            and reverse this to create the ultimate foundation for becoming athletic. Being strong in all joints
            throughout their whole range of movement. This process can seem overwhelmingly complex, and to be honest, it
            is quite hard to make this approach not be overwhelming. So in my app I have chosen to "gamify" the journey
            to achieving range balance. The radar charts provides a visual representation of how far you are on your
            journey to range balance.
          </p>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Your Journey to Range Balance</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            The radar charts below visualize your progression from low tension ability to high tension ability across
            different joint functions. As you progress in your training, you'll see the area of the chart expand,
            representing your increasing strength and control throughout your joints' full range of motion.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h3 className="text-lg font-semibold mb-2 text-center">Low Tension Ability</h3>
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart data={data}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} />
                  <Radar name="Tension" dataKey="lowTension" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2 text-center">Medium Tension Ability</h3>
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart data={data}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} />
                  <Radar name="Tension" dataKey="mediumTension" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2 text-center">High Tension Ability</h3>
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart data={data}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} />
                  <Radar name="Tension" dataKey="highTension" stroke="#ffc658" fill="#ffc658" fillOpacity={0.6} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Start Your Journey</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            As you progress through the exercises and challenges in this app, you'll see your own radar charts expand,
            mirroring the growth in your physical capabilities. Each expansion represents not just increased strength,
            but improved function, reduced risk of injury, and a more balanced, resilient body.
          </p>
          <p>
            Are you ready to embark on this journey? To transform your body from its current state to one of all-round
            strength and athleticism? The path ahead is challenging, but with consistent effort and the guidance
            provided by this app, you'll be amazed at what your body can achieve.
          </p>
          <p className="mt-4 font-semibold">
            Let's begin your journey to range balance and unlock your true athletic potential!
          </p>
        </CardContent>
      </Card>
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Your Body Should Be an Asset—Not a Liability</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            Most men over 30 start feeling it—the stiffness, the aches, the slow loss of mobility. They wake up tight,
            struggle to squat without discomfort, and second-guess explosive movements because something might "tweak."
            It's frustrating because deep down, they know they should move better.
          </p>
          <p className="mb-4">
            They see other men—some their age, some older—who are still athletic, powerful, and unrestricted. And they
            wonder:
          </p>
          <p className="mb-4 font-semibold italic">"Why can't I move like that anymore?"</p>
          <p className="mb-4">Here's the truth: It's not age—it's neglect.</p>

          <h3 className="text-xl font-semibold mb-4">The Problem: Your Body Is Holding You Back</h3>
          <ul className="list-none pl-0 mb-4 space-y-2">
            <li>
              🚨 You wake up feeling stiff and sluggish. Instead of jumping out of bed ready to go, it takes time to
              "loosen up."
            </li>
            <li>
              🚨 Your workouts feel restricted. Knees ache, shoulders pinch, and basic movements don't feel smooth
              anymore.
            </li>
            <li>
              🚨 Sports and activities don't feel the same. You hesitate to sprint, cut, or jump—because you don't fully
              trust your body.
            </li>
            <li>
              🚨 You're always "working around" tightness and pain. Whether it's sitting too long or training too hard,
              your body fights back instead of supporting you.
            </li>
            <li>
              🚨 You fear injury more than you should. The thought of tweaking your back or blowing out a knee lingers
              in your mind, stopping you from pushing your limits.
            </li>
            <li>
              🚨 You see a slow decline happening—and it scares you. You're not as athletic as you used to be, and if
              you don't fix it now, it's only going to get worse.
            </li>
          </ul>

          <h3 className="text-xl font-semibold mb-4">The Solution: Move Like an Athlete for Life</h3>
          <p className="mb-4">Now, imagine the opposite:</p>
          <ul className="list-none pl-0 mb-4 space-y-2">
            <li>
              ✅ Waking up feeling light, loose, and powerful. No stiffness, no hesitation—just a body that moves
              effortlessly.
            </li>
            <li>
              ✅ Training with confidence. Squats feel smooth, presses feel strong, and you don't need a 30-minute
              warm-up just to feel "normal."
            </li>
            <li>
              ✅ Dominating sports and daily life. Sprinting, jumping, and cutting without hesitation—because your body
              is built for it.
            </li>
            <li>
              ✅ Aging like an athlete. While other men slow down, you're only getting better—staying strong, mobile,
              and pain-free for decades to come.
            </li>
          </ul>

          <h3 className="text-xl font-semibold mb-4">Build a Body That Works FOR You—Not Against You</h3>
          <p className="mb-4">
            I help men unlock their body's full potential by building a foundation for athleticism—restoring mobility,
            eliminating stiffness, and making movement effortless again.
          </p>
          <p className="mb-4">
            If you're tired of feeling trapped in a body that doesn't perform the way you want it to, this app is for
            you. Start your journey today.
          </p>
          <p className="font-semibold">Your body should be your greatest asset. Let's make it one.</p>
        </CardContent>
      </Card>
    </div>
  )
}

