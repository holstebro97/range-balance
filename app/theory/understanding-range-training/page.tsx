"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

export default function UnderstandingRangeTraining() {
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
      <h1 className="text-3xl font-bold mb-8">Understanding Range Training Newsletter</h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Welcome to Our Newsletter!</CardTitle>
          <CardDescription>Stay updated with the latest insights on Range Training</CardDescription>
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
          <CardTitle>Understanding Range Training: A Comprehensive Guide</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            Range Training is a specialized approach to exercise that focuses on improving joint mobility, stability,
            and overall function across different ranges of motion. This innovative method emphasizes the importance of
            training muscles and joints through their full range of movement to enhance flexibility, strength, and
            performance. A key concept in Range Training is understanding tension and its role in muscle adaptation and
            growth.
          </p>

          <h3 className="text-xl font-semibold mb-2">Understanding Tension in Range Training</h3>
          <Carousel className="w-full max-w-xs mx-auto mb-4">
            <CarouselContent>
              {[
                {
                  title: "What is Tension?",
                  content:
                    "Tension in range training refers to the amount of stress placed on muscles during exercise. It's a key factor in stimulating muscle growth and strength gains.",
                },
                {
                  title: "Types of Tension",
                  content:
                    "There are three main types of tension: mechanical tension (from weight), metabolic tension (from fatigue), and muscle damage (from eccentric movements).",
                },
                {
                  title: "Importance of Tension",
                  content: (
                    <>
                      <div className="mb-2">
                        Proper tension ensures that muscles are adequately challenged, leading to adaptations like
                        increased strength, size, and endurance.
                      </div>
                      <img
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ujX7hP8rRCCHMOD7USxDXiOwrOSDiz.png"
                        alt="Bicep curl exercise demonstration showing proper tension through range of motion"
                        className="w-full h-auto rounded-md"
                      />
                    </>
                  ),
                },
                {
                  title: "Tension and Range of Motion",
                  content:
                    "Tension can vary throughout a movement's range. Understanding this helps in designing exercises that target specific portions of the range for optimal results.",
                },
                {
                  title: "Balancing Tension",
                  content:
                    "Effective range training involves balancing tension across different ranges of motion to ensure comprehensive muscle development and joint health.",
                },
              ].map((slide, index) => (
                <CarouselItem key={index}>
                  <div className="p-1">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">{slide.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        {typeof slide.content === "string" ? <p>{slide.content}</p> : slide.content}
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>

          <p className="mb-4">
            As illustrated in the carousel above, tension plays a vital role in Range Training. By understanding and
            manipulating tension throughout different ranges of motion, we can optimize muscle growth, strength gains,
            and overall performance improvements.
          </p>

          <p className="mb-4">
            At its core, Range Training is about more than just increasing flexibility or building strength. It's about
            creating a balanced, functional body that can perform optimally in various situations. By working through
            different ranges of motion, you challenge your body in new ways, leading to improved coordination, better
            body awareness, and reduced risk of injury.
          </p>

          <p className="mb-4">Key principles of Range Training include:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Progressive overload: Gradually increasing the demands on your body</li>
            <li>Specificity: Tailoring exercises to your specific goals and needs</li>
            <li>Variation: Incorporating different movements and ranges to prevent plateaus</li>
            <li>Recovery and adaptation: Allowing proper rest for your body to adapt and grow stronger</li>
            <li>Individualization: Customizing your training approach to your unique body and goals</li>
          </ul>

          <p>
            As you embark on your Range Training journey, remember that consistency is key. Start with manageable ranges
            and gradually expand as your body adapts. Always listen to your body and consult with a fitness professional
            if you're unsure about proper form or technique. With dedication and patience, Range Training can transform
            your fitness routine and overall physical capabilities.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

