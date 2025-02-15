import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function TheRangeScale() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">The Range Scale</h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Understanding the Range Scale</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            The Range Scale is a concept used to describe the different portions of a movement's range of motion.
            Traditionally, the Range Scale is divided into five levels:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Extreme Short Range</li>
            <li>Short Range</li>
            <li>Mid Range</li>
            <li>Long Range</li>
            <li>Extreme Long Range</li>
          </ul>
          <p className="mb-4">
            However, in this app, we've simplified the scale to two levels: Short Range and Long Range. This
            simplification makes it easier to categorize exercises and track progress while still covering the full
            spectrum of motion.
          </p>
          <p className="mb-4">In our simplified scale:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>
              <strong>Short Range</strong> encompasses everything from Extreme Short Range to Mid Range
            </li>
            <li>
              <strong>Long Range</strong> covers Mid Range to Extreme Long Range
            </li>
          </ul>
          <p>
            This approach allows for a more straightforward categorization of exercises while still ensuring that you're
            working on your full range of motion.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Visual Comparison: Traditional vs. Simplified Range Scale</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="w-full max-w-3xl mx-auto">
            <svg viewBox="0 0 800 400" className="w-full h-auto">
              {/* Traditional Scale */}
              <text x="400" y="30" textAnchor="middle" fontSize="20" fontWeight="bold">
                Traditional Range Scale
              </text>
              <rect x="50" y="50" width="700" height="60" fill="#e5e7eb" />
              <rect x="50" y="50" width="140" height="60" fill="#bbf7d0" />
              <rect x="190" y="50" width="140" height="60" fill="#86efac" />
              <rect x="330" y="50" width="140" height="60" fill="#fde68a" />
              <rect x="470" y="50" width="140" height="60" fill="#fed7aa" />
              <rect x="610" y="50" width="140" height="60" fill="#fecaca" />

              <text x="120" y="130" textAnchor="middle" fontSize="12">
                Extreme Short
              </text>
              <text x="260" y="130" textAnchor="middle" fontSize="12">
                Short
              </text>
              <text x="400" y="130" textAnchor="middle" fontSize="12">
                Mid
              </text>
              <text x="540" y="130" textAnchor="middle" fontSize="12">
                Long
              </text>
              <text x="680" y="130" textAnchor="middle" fontSize="12">
                Extreme Long
              </text>

              {/* Simplified Scale */}
              <text x="400" y="190" textAnchor="middle" fontSize="20" fontWeight="bold">
                Simplified Range Scale (This App)
              </text>
              <rect x="50" y="210" width="700" height="60" fill="#e5e7eb" />
              <rect x="50" y="210" width="350" height="60" fill="#bbf7d0" />
              <rect x="400" y="210" width="350" height="60" fill="#fecaca" />

              <text x="225" y="290" textAnchor="middle" fontSize="16">
                Short Range
              </text>
              <text x="575" y="290" textAnchor="middle" fontSize="16">
                Long Range
              </text>

              {/* Arrows */}
              <line x1="50" y1="320" x2="400" y2="320" stroke="black" strokeWidth="2" markerEnd="url(#arrowhead)" />
              <line x1="400" y1="320" x2="750" y2="320" stroke="black" strokeWidth="2" markerEnd="url(#arrowhead)" />

              <text x="225" y="350" textAnchor="middle" fontSize="14">
                Extreme Short to Mid
              </text>
              <text x="575" y="350" textAnchor="middle" fontSize="14">
                Mid to Extreme Long
              </text>

              {/* Arrow Marker */}
              <defs>
                <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
                  <polygon points="0 0, 10 3.5, 0 7" />
                </marker>
              </defs>
            </svg>
          </div>
        </CardContent>
      </Card>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Example: Shoulder Flexion</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            Let's apply our simplified range scale to shoulder flexion. In this movement, the arm moves from a position
            beside the body, through the front, and potentially behind the body.
          </p>
          <div className="w-full max-w-3xl mx-auto">
            <svg viewBox="0 0 800 300" className="w-full h-auto">
              {/* Background */}
              <rect x="0" y="0" width="800" height="300" fill="#f3f4f6" />

              {/* Short Range */}
              <text x="200" y="30" textAnchor="middle" fontSize="16" fontWeight="bold">
                Short Range
              </text>
              <circle cx="200" cy="150" r="50" fill="none" stroke="#000000" strokeWidth="2" />
              <line x1="200" y1="150" x2="200" y2="100" stroke="#000000" strokeWidth="2" />
              <line x1="200" y1="150" x2="180" y2="180" stroke="#000000" strokeWidth="2" />
              <line x1="200" y1="150" x2="220" y2="180" stroke="#000000" strokeWidth="2" />
              <path d="M200,150 Q215,140 230,150" fill="none" stroke="#000000" strokeWidth="2" />
              <text x="200" y="220" textAnchor="middle" fontSize="14">
                Arm in front of body
              </text>
              <rect x="150" y="240" width="100" height="20" fill="#bbf7d0" />

              {/* Long Range */}
              <text x="600" y="30" textAnchor="middle" fontSize="16" fontWeight="bold">
                Long Range
              </text>
              <circle cx="600" cy="150" r="50" fill="none" stroke="#000000" strokeWidth="2" />
              <line x1="600" y1="150" x2="600" y2="100" stroke="#000000" strokeWidth="2" />
              <line x1="600" y1="150" x2="580" y2="180" stroke="#000000" strokeWidth="2" />
              <line x1="600" y1="150" x2="620" y2="180" stroke="#000000" strokeWidth="2" />
              <path d="M600,150 Q585,140 570,150" fill="none" stroke="#000000" strokeWidth="2" />
              <text x="600" y="220" textAnchor="middle" fontSize="14">
                Arm behind body
              </text>
              <rect x="550" y="240" width="100" height="20" fill="#fecaca" />

              {/* Dividing Line */}
              <line x1="400" y1="50" x2="400" y2="250" stroke="#000000" strokeWidth="2" strokeDasharray="5,5" />
              <text x="400" y="280" textAnchor="middle" fontSize="14">
                Midline of body
              </text>
            </svg>
          </div>
          <p className="mt-4">In our simplified range scale:</p>
          <ul className="list-disc pl-6 mt-2">
            <li>
              <strong>Short Range:</strong> Any position where the arm is in front of the body. This includes the
              traditional "short" and "mid" ranges.
            </li>
            <li>
              <strong>Long Range:</strong> Any position where the arm is behind the body. This corresponds to the
              traditional "long" and "extreme long" ranges.
            </li>
          </ul>
          <p className="mt-4">
            This simplification allows for easier categorization of exercises while still ensuring you work through your
            full range of motion in shoulder flexion.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

