"use client"

const features = [
  {
    title: "Smart Trial Matching",
    description: "AI analyzes your health profile to match you with relevant clinical trials in real-time",
    icon: "🎯",
  },
  {
    title: "Trusted Network",
    description: "Connect with board-certified researchers and medical experts in your condition",
    icon: "🤝",
  },
  {
    title: "Real-Time Updates",
    description: "Track trial progress, receive personalized updates, and manage your participation",
    icon: "📊",
  },
  {
    title: "Privacy First",
    description: "Your health data is encrypted and protected with medical-grade security standards",
    icon: "🔒",
  },
]

export default function FeaturesSection() {
  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">Why Choose CuraLink?</h2>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            We're reimagining how patients and researchers collaborate
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => (
            <div key={idx} className="bg-card rounded-xl p-6 border border-border hover:border-primary/50 transition">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="font-semibold text-lg mb-3 text-foreground">{feature.title}</h3>
              <p className="text-foreground/70 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
