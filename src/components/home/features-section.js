import { Code, BookOpen, Zap, Database, Layout, Users } from "lucide-react"

const features = [
  {
    icon: <BookOpen className="h-10 w-10 text-platinum-400" />,
    title: "Step-by-Step Tutorials",
    description: "Follow guided instructions (Xegos) that break down complex coding concepts into simple steps.",
  },
  {
    icon: <Code className="h-10 w-10 text-platinum-400" />,
    title: "Real-Time Preview",
    description: "See your code changes instantly with our live preview feature powered by esbuild.",
  },
  {
    icon: <Zap className="h-10 w-10 text-platinum-400" />,
    title: "AI Assistance",
    description: "Get help from our AI that detects errors, suggests fixes, and explains concepts in simple language.",
  },
  {
    icon: <Database className="h-10 w-10 text-platinum-400" />,
    title: "Built-in Database",
    description: "Create and manage data collections without leaving the platform.",
  },
  {
    icon: <Layout className="h-10 w-10 text-platinum-400" />,
    title: "Multiple Views",
    description: "Switch between Frontend, Web Preview, and Database views to manage your entire project.",
  },
  {
    icon: <Users className="h-10 w-10 text-platinum-400" />,
    title: "Beginner Friendly",
    description: "Designed specifically for non-programmers and coding beginners.",
  },
]

export default function FeaturesSection() {
  return (
    <section id="features" className="py-20 bg-background">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Built for coding beginners</h2>
          <p className="text-xl text-muted-foreground">
            Everything you need to start building real projects without prior experience
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-background rounded-lg p-8 shadow-sm border border-border hover:border-platinum-400/50 transition-colors"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
