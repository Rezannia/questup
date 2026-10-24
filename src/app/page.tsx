import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { TrustBar } from "@/components/landing/TrustBar";
import { WhyQuestUp } from "@/components/landing/WhyQuestUp";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { JourneyPreview } from "@/components/landing/JourneyPreview";
import { Careers } from "@/components/landing/Careers";
import { Testimonials } from "@/components/landing/Testimonials";
import { ForEmployers } from "@/components/landing/ForEmployers";
import { FAQ } from "@/components/landing/FAQ";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { Footer } from "@/components/landing/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-bg">
      <Header />
      <main className="pt-16 md:pt-20">
        <Hero />
        <TrustBar />
        <WhyQuestUp />
        <HowItWorks />
        <JourneyPreview />
        <Careers />
        <Testimonials />
        <ForEmployers />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}