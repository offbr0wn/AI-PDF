import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { FileUpload } from "@/components/file-upload"

export function Hero() {
  return (
    <section className="py-16 md:py-24 lg:py-32 relative overflow-hidden">
      {/* Subtle gradient background with animation */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-pink-50 z-0"></div>

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-1/4 left-1/3 w-64 h-64 bg-blue-100/20 rounded-full blur-3xl animate-float-slow"></div>
          <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-teal-100/20 rounded-full blur-3xl animate-float-medium"></div>
        </div>
      </div>

      <div className="container px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Text content */}
          <div className="flex flex-col items-start space-y-6">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-medium">
              <span className="relative flex h-2 w-2 mr-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              Powered by AI
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500">
                Extract data from PDFs
                <br />
                with ease
              </span>
            </h1>

            <p className="text-slate-600 md:text-xl max-w-[600px] border-l-4 border-blue-200 pl-4">
              Our powerful AI-driven PDF parser extracts text, tables, and forms from any PDF document in seconds.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white border-none shadow-md transition-all duration-300"
              >
                Try for free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-slate-300 text-slate-700 hover:bg-slate-50 transition-all duration-300"
              >
                View demo
              </Button>
            </div>

            <div className="mt-8 flex items-center space-x-6">
              <div className="flex -space-x-2">
                {[
                  { num: 1, bg: "bg-blue-100" },
                  { num: 2, bg: "bg-blue-200" },
                  { num: 3, bg: "bg-blue-300" },
                  { num: 4, bg: "bg-blue-400" },
                ].map((item) => (
                  <div
                    key={item.num}
                    className={`w-8 h-8 rounded-full ${item.bg} border-2 border-white shadow-sm flex items-center justify-center text-xs font-medium text-slate-700`}
                  >
                    {item.num}
                  </div>
                ))}
              </div>
              <div className="text-sm">
                <span className="font-bold text-blue-600">2,500+</span>{" "}
                <span className="text-slate-600">documents processed today</span>
              </div>
            </div>
          </div>

          {/* Right side - File upload */}
          <div className="w-full max-w-xl mx-auto lg:mx-0 relative">
            {/* Subtle shadow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-100/50 to-teal-100/50 rounded-xl blur animate-pulse-slow"></div>

            <div className="relative">
              <FileUpload />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
