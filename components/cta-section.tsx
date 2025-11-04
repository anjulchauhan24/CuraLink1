"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function CTASection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary/5 to-secondary/5">
      <div className="max-w-7xl mx-auto text-center space-y-8">
        <div className="space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">Ready to Make a Difference?</h2>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            Join thousands of patients and researchers advancing medical science together
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/join">
            <Button size="lg">I'm a Patient</Button>
          </Link>
          <Link href="/researcher">
            <Button size="lg" variant="outline">
              I'm a Researcher
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
