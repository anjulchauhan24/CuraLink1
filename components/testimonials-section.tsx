"use client"

const testimonials = [
  {
    name: "Sarah M.",
    role: "Patient Advocate",
    content:
      "CuraLink helped me find a trial that changed my life. The matching was so accurate and the support team was incredible.",
    avatar: "👩‍🦰",
  },
  {
    name: "Dr. James Chen",
    role: "Clinical Researcher",
    content:
      "Finally, a platform that connects us with engaged patients. Our recruitment timelines improved dramatically.",
    avatar: "👨‍⚕️",
  },
  {
    name: "Michael T.",
    role: "Patient",
    content: "The platform is intuitive and I felt confident about sharing my health information. Highly recommend!",
    avatar: "👨‍💼",
  },
]

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-foreground">Real Stories of Impact</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, idx) => (
            <div key={idx} className="bg-card rounded-xl p-8 border border-border">
              <div className="flex items-center gap-4 mb-6">
                <div className="text-4xl">{testimonial.avatar}</div>
                <div>
                  <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                  <p className="text-sm text-foreground/70">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-foreground/70 leading-relaxed">{testimonial.content}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
