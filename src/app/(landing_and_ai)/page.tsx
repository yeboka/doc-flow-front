import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  AlertCircle,
  ArrowRight,
  BarChart,
  CheckCircle,
  Clock,
  Clock3,
  FileText,
  Github,
  Linkedin,
  PenTool,
  Shield,
  Twitter,
  Users,
  Zap,
} from "lucide-react"
import Image from "next/image"

export default function Home() {
  return (
    <div className="flex min-h-screen w-full items-center flex-col bg-gradient-to-b from-[#D4A5FF]/30 to-white pt-16">

      <main className={"w-full flex flex-col items-center text-white"}>
        {/* Hero Section */}
        <section className="flex justify-center w-full py-20 md:py-28">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-[#9B4DFF]">
                    Streamlining Your Document Management and Signature Workflow
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Create, manage, and analyze documents with ease. Doc-Flow simplifies document creation, signing, and
                    workflow management for businesses.
                  </p>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <CheckCircle className="h-4 w-4 text-[#685DFF]" />
                    <span>Free 14-day trial</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircle className="h-4 w-4 text-[#685DFF]" />
                    <span>No credit card required</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative aspect-video overflow-hidden rounded-xl border bg-muted md:aspect-square lg:aspect-video">
                  <Image
                    src="/imgs/landing_illustration.png"
                    alt="Product screenshot"
                    className="object-cover"
                    width={800}
                    height={600}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* AI-Powered Document Analysis Section */}
        <section id="features" className="py-20 w-full flex justify-center">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center gap-4 text-center md:gap-8">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight text-gray-800">AI-Powered Document Analysis</h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Harness the power of AI to review and analyze your documents, such as employment agreements. Doc-Flow
                  provides insights on potential risks, weaknesses, and areas for improvement.
                </p>
              </div>
              <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:gap-8">
                {[{ title: "Risk Assessment", description: "Our AI identifies potential legal risks and compliance issues in your documents, helping you avoid costly mistakes.", icon: <Shield className="h-10 w-10 text-[#685DFF]" /> },
                  { title: "Content Analysis", description: "Get detailed insights on document clarity, readability, and effectiveness with our advanced AI analysis.", icon: <Zap className="h-10 w-10 text-[#685DFF]" /> },
                  { title: "Improvement Suggestions", description: "Receive actionable recommendations to strengthen your documents based on industry best practices and legal standards.", icon: <Users className="h-10 w-10 text-[#685DFF]" /> },
                ].map((feature, i) => (
                  <div
                    key={i}
                    className="flex flex-col items-center gap-2 rounded-lg border bg-background p-6 text-center shadow-sm"
                  >
                    <div className="flex h-16 w-16 items-center justify-center rounded-full border bg-muted">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl text-foreground/80 font-bold">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                ))}
              </div>
              <Link href={"/ai-analyze"}>
                <Button size="lg" className="bg-[#685DFF] text-white hover:bg-[#D45A00]">
                  Try AI-Analysis <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Document Workflow Management Section */}
        <section id="workflow" className="py-20 w-full flex justify-center  bg-[#D4A5FF]">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center gap-8">
              <div className="space-y-2 text-center">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight text-white">
                  Efficient Document Workflow Management
                </h2>
                <p className="mx-auto max-w-[700px] text-white/80 md:text-xl">
                  Easily create documents using pre-designed templates, send them for signing, and track the entire
                  document lifecycle in real time. Streamline your business processes with Doc-Flow.
                </p>
              </div>
              {/* Workflow Steps */}
              <div className="mt-8 w-full">
                <div className="relative">
                  {/* Connector Line */}
                  <div className="absolute top-24 left-0 w-full h-1 bg-muted hidden md:block"></div>
                  {/* Workflow Steps */}
                  <div className="grid md:grid-cols-3 gap-8">
                    {[{ step: "1", title: "Create Documents", description: "Choose from our library of templates or upload your own documents to get started.", icon: <FileText className="h-8 w-8 text-[#685DFF]" /> },
                      { step: "2", title: "Collect Signatures", description: "Send documents for electronic signature to multiple parties with automated reminders.", icon: <PenTool className="h-8 w-8 text-[#685DFF]" /> },
                      { step: "3", title: "Track & Manage", description: "Monitor document status in real-time and get insights into your document workflows.", icon: <Clock className="h-8 w-8 text-[#685DFF]" /> },
                    ].map((step, i) => (
                      <div key={i} className="flex flex-col items-center">
                        <div className="relative flex flex-col items-center">
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#685DFF] text-white text-xl font-bold">
                            {step.step}
                          </div>
                          <div className="mt-4 flex items-center justify-center h-16 w-16 rounded-full border-2 border-[#685DFF]/20 bg-background">
                            {step.icon}
                          </div>
                        </div>
                        <div className="mt-6 text-center">
                          <h3 className="text-xl font-bold">{step.title}</h3>
                          <p className="mt-2 text-white/80">{step.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-12 flex justify-center">
                <Button size="lg" className="gap-2 bg-[#685DFF] hover:bg-[#D45A00] text-white">
                  See DocFlow in Action <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Why Doc-Flow Section */}
        <section id="why-docflow" className="py-20 w-full flex justify-center ">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center gap-4 text-center md:gap-8">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight text-[#9B4DFF]">Why Doc-Flow?</h2>
                <p className="mx-auto max-w-[700px] text-[#9B4DFF]/80 md:text-xl">
                  Doc-Flow is designed for businesses that need a comprehensive solution for document creation, signing,
                  and analysis. Stay organized, save time, and reduce risks with our all-in-one platform.
                </p>
              </div>
              <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:gap-8">
                {[{ title: "Save Time", description: "Automate repetitive document tasks and reduce manual work with templates and streamlined workflows.", icon: <Clock3 className="h-10 w-10 text-[#685DFF]" /> },
                  { title: "Reduce Risks", description: "Minimize legal and compliance risks with AI-powered document analysis and standardized processes.", icon: <AlertCircle className="h-10 w-10 text-[#685DFF]" /> },
                  { title: "Increase Efficiency", description: "Gain valuable insights into your document workflows with comprehensive analytics and reporting.", icon: <BarChart className="h-10 w-10 text-[#685DFF]" /> },
                ].map((benefit, i) => (
                  <div
                    key={i}
                    className="flex flex-col items-center gap-4 rounded-lg border bg-background p-6 text-center shadow-sm"
                  >
                    <div className="flex h-16 w-16 items-center justify-center rounded-full border bg-muted">
                      {benefit.icon}
                    </div>
                    <h3 className="text-xl text-foreground/80 font-bold">{benefit.title}</h3>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t w-full flex justify-center py-12 md:py-16 bg-[#9B4DFF]/70 text-white">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Zap className="h-6 w-6 text-white" />
                <span className="text-xl font-bold">DocFlow</span>
              </div>
              <p className="text-sm text-white/80">
                Simplifying document management and signature workflows since 2020.
              </p>
              <div className="flex gap-4">
                <Link href="src/app/(main)#" className="text-white/80 hover:text-foreground">
                  <Twitter className="h-5 w-5" />
                  <span className="sr-only">Twitter</span>
                </Link>
                <Link href="src/app/(main)#" className="text-white/80 hover:text-foreground">
                  <Linkedin className="h-5 w-5" />
                  <span className="sr-only">LinkedIn</span>
                </Link>
                <Link href="src/app/(main)#" className="text-white/80 hover:text-foreground">
                  <Github className="h-5 w-5" />
                  <span className="sr-only">GitHub</span>
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t pt-8 text-center text-sm text-white/80">
            &copy; {new Date().getFullYear()} DocFlow. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
