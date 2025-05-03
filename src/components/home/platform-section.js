import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"

export default function PlatformSection() {
  return (
    <section
      id="platform"
      className="py-20 bg-gradient-to-b from-platinum-50/50 to-background dark:from-platinum-900/10 dark:to-background"
    >
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">A complete coding environment</h2>
          <p className="text-xl text-muted-foreground">
            XEGO provides everything you need to learn and build in one integrated platform
          </p>
        </div>

        <Tabs defaultValue="instruction" className="w-full max-w-5xl mx-auto">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="instruction">Instruction</TabsTrigger>
            <TabsTrigger value="frontend">Frontend</TabsTrigger>
            <TabsTrigger value="preview">Web Preview</TabsTrigger>
            <TabsTrigger value="database">Database</TabsTrigger>
          </TabsList>

          <TabsContent
            value="instruction"
            className="relative rounded-lg overflow-hidden shadow-lg border border-border group bg-transparent"
          >
            <div className="relative w-full bg-transparent" style={{ aspectRatio: '900/500' }}>
              <Image
                src="/home/xego01.png"
                alt="XEGO instruction screen showing step-by-step tutorial"
                fill
                className="object-cover"
                sizes="(max-width: 900px) 100vw, 900px"
                priority
              />
              <div
                className="absolute bottom-0 left-0 right-0 bg-background/95 p-6 transition-all duration-300 ease-in-out
                  group-hover:opacity-0 group-hover:translate-y-8 group-hover:pointer-events-none"
              >
                <h3 className="text-xl font-semibold mb-2">Instruction Screen</h3>
                <p className="text-muted-foreground">
                  Follow guided tutorials with clear step-by-step instructions, code snippets, and explanations.
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent
            value="frontend"
            className="relative rounded-lg overflow-hidden shadow-lg border border-border group bg-transparent"
          >
            <div className="relative w-full bg-transparent" style={{ aspectRatio: '900/500' }}>
              <Image
                src="/home/xego05.png"
                alt="XEGO frontend view showing code editor"
                fill
                className="object-cover"
                sizes="(max-width: 900px) 100vw, 900px"
              />
              <div
                className="absolute bottom-0 left-0 right-0 bg-background/95 p-6 transition-all duration-300 ease-in-out
                  group-hover:opacity-0 group-hover:translate-y-8 group-hover:pointer-events-none"
              >
                <h3 className="text-xl font-semibold mb-2">Frontend View</h3>
                <p className="text-muted-foreground">
                  Edit your React components and styles with our powerful code editor with syntax highlighting.
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent
            value="preview"
            className="relative rounded-lg overflow-hidden shadow-lg border border-border group bg-transparent"
          >
            <div className="relative w-full bg-transparent" style={{ aspectRatio: '900/500' }}>
              <Image
                src="/home/xego02.png"
                alt="XEGO web preview showing live application"
                fill
                className="object-cover"
                sizes="(max-width: 900px) 100vw, 900px"
              />
              <div
                className="absolute bottom-0 left-0 right-0 bg-background/95 p-6 transition-all duration-300 ease-in-out
                  group-hover:opacity-0 group-hover:translate-y-8 group-hover:pointer-events-none"
              >
                <h3 className="text-xl font-semibold mb-2">Web Preview</h3>
                <p className="text-muted-foreground">
                  See your changes in real-time with our live preview that updates as you type.
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent
            value="database"
            className="relative rounded-lg overflow-hidden shadow-lg border border-border group bg-transparent"
          >
            <div className="relative w-full bg-transparent" style={{ aspectRatio: '900/500' }}>
              <Image
                src="/home/xego03.png"
                alt="XEGO database view showing collections and documents"
                fill
                className="object-cover"
                sizes="(max-width: 900px) 100vw, 900px"
              />
              <div
                className="absolute bottom-0 left-0 right-0 bg-background/95 p-6 transition-all duration-300 ease-in-out
                  group-hover:opacity-0 group-hover:translate-y-8 group-hover:pointer-events-none"
              >
                <h3 className="text-xl font-semibold mb-2">Database View</h3>
                <p className="text-muted-foreground">
                  Create and manage data collections with our intuitive database interface powered by Supabase.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
