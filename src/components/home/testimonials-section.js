import Image from "next/image"
import { Card, CardContent } from "./ui/card"
import { Quote } from "lucide-react"

const testimonials = [
  {
    quote:
      "I've tried learning to code multiple times before, but XEGO is the first platform that actually made it stick. The step-by-step approach is perfect for beginners.",
    author: "Sarah Johnson",
    title: "Marketing Specialist",
    avatar: "/placeholder.svg?height=100&width=100",
  },
  {
    quote:
      "As a designer with no coding experience, XEGO helped me build my first interactive prototype in just two days. The real-time preview is a game-changer.",
    author: "Michael Chen",
    title: "UI/UX Designer",
    avatar: "/placeholder.svg?height=100&width=100",
  },
  {
    quote:
      "I'm using XEGO to teach my students the basics of web development. The guided approach and AI assistance have made my job so much easier.",
    author: "Priya Patel",
    title: "Computer Science Teacher",
    avatar: "/placeholder.svg?height=100&width=100",
  },
]

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-20 bg-background">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Loved by beginners</h2>
          <p className="text-xl text-muted-foreground">See what our users have to say about learning with XEGO</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-border hover:border-platinum-400/50 transition-colors">
              <CardContent className="p-8">
                <Quote className="h-8 w-8 text-platinum-400/60 mb-4" />
                <p className="mb-6 text-lg">{testimonial.quote}</p>
                <div className="flex items-center gap-4">
                  <div className="relative h-12 w-12 rounded-full overflow-hidden">
                    <Image
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.author}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold">{testimonial.author}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
