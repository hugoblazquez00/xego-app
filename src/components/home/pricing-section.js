import { Check } from "lucide-react"
import { Button } from "./ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import Link from "next/link"

const plans = [
  {
    name: "Free",
    price: "$0",
    description: "Perfect for beginners just getting started",
    features: ["Access to 5 beginner Xegos", "Frontend editing only", "Community support", "1GB storage"],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Pro",
    price: "$19",
    description: "For serious learners ready to build real projects",
    features: [
      "Access to all 50+ Xegos",
      "Frontend and database editing",
      "AI code assistance",
      "10GB storage",
      "Priority email support",
      "Project export",
    ],
    cta: "Get Started",
    popular: true,
  },
  {
    name: "Team",
    price: "$49",
    description: "For teams and educators teaching coding",
    features: [
      "Everything in Pro",
      "Team collaboration",
      "Custom Xego creation",
      "50GB storage",
      "Dedicated support",
      "Admin dashboard",
      "Student progress tracking",
    ],
    cta: "Contact Sales",
    popular: false,
  },
]

export default function PricingSection() {
  return (
    <section
      id="pricing"
      className="py-20 bg-gradient-to-b from-platinum-50/50 to-background dark:from-platinum-900/10 dark:to-background"
      >
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Simple, transparent pricing</h2>
          <p className="text-xl text-[#14379e]">Start for free, upgrade as you grow</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`border-border ${plan.popular ? "border-[#5084ff] shadow-md relative" : ""}`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 -translate-y-1/2 px-3 py-1 bg-[#275eff] text-white text-xs font-medium rounded-full">
                  Most Popular
                </div>
              )}
              <CardHeader>
                <CardTitle>{plan.name}</CardTitle>
                <div className="mt-4 flex items-baseline text-5xl font-extrabold">
                  {plan.price}
                  {plan.price !== "Custom" && (
                    <span className="ml-1 text-xl font-medium text-[#14379e]">/mo</span>
                  )}
                </div>
                <CardDescription className="mt-2 text-[#14379e]">{plan.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <Check className="h-5 w-5 text-[#275eff] mr-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  className={`w-full ${plan.popular ? "bg-[#275eff] hover:bg-[#1a44be] text-white" : "bg-transparent border border-[#a5c4ff] hover:bg-[#d2e2ff] text-foreground"}`}
                  asChild
                >
                  <Link href={plan.name === "Team" ? "/contact" : "/register"}>{plan.cta}</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
