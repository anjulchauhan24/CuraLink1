"use client"

const steps = [
  {
    number: "1",
    title: "Create Your Profile",
    description: "Share your health information in a secure, privacy-protected environment",
  },
  {
    number: "2",
    title: "Get Matched",
    description: "Our AI algorithm identifies clinical trials aligned with your condition",
  },
  {
    number: "3",
    title: "Connect with Researchers",
    description: "Review detailed trial information and connect with research teams",
  },
  {
    number: "4",
    title: "Make an Impact",
    description: "Participate and contribute to breakthrough medical discoveries",
  },
]

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">How It Works</h2>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            Get matched with relevant clinical trials in four simple steps
          </p>
        </div>
        <div className="grid md:grid-cols-4 gap-6">
          {steps.map((step, idx) => (
            <div key={idx} className="relative">
              <div className="bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg mb-4">
                {step.number}
              </div>
              <h3 className="font-semibold text-lg mb-2 text-foreground">{step.title}</h3>
              <p className="text-foreground/70 text-sm leading-relaxed">{step.description}</p>
              {idx < steps.length - 1 && (
                <div className="hidden md:block absolute top-6 left-[calc(100%+12px)] w-6 h-0.5 bg-border"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
