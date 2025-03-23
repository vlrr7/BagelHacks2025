"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Users,
  Building,
  Search,
  MessageSquare,
  TrendingUp,
} from "lucide-react";

export default function HomePage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80">
      <header className="container mx-auto py-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-primary">CVue</span>
        </div>
        <nav className="hidden md:flex gap-6">
          <Link
            href="/pricing"
            className="text-foreground/80 hover:text-foreground transition-colors"
          >
            Pricing
          </Link>
          <Link
            href="/about"
            className="text-foreground/80 hover:text-foreground transition-colors"
          >
            About
          </Link>
        </nav>
        <div className="flex gap-4">
          <Link href="/login">
            <Button variant="outline">Log in</Button>
          </Link>
          <Link href="/signup">
            <Button>Sign up</Button>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16">
        <motion.section
          className="text-center max-w-4xl mx-auto"
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={fadeIn}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Get{" "}
            <span className="underline animate-move-left-right">Valuable</span>{" "}
            Feedback From HR Teams{" "}
            <span className="underline animate-move-left-right">
              Everywhere
            </span>
          </h1>
          <p className="text-xl text-foreground/80 mb-10 max-w-2xl mx-auto">
            Buy leads, not ads. And spend less time reviewing resumes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup?t=candidate">
              <Button size="lg" className="gap-2">
                I'm Looking for a Job <ArrowRight size={16} />
              </Button>
            </Link>
            <Link href="/signup?t=employer">
              <Button size="lg" variant="outline" className="gap-2">
                I'm an Employer <ArrowRight size={16} />
              </Button>
            </Link>
          </div>
        </motion.section>

        <motion.section
          className="py-24"
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          <h2 className="text-3xl font-bold text-center mb-16">
            How CVue Works
          </h2>
          <div className="grid md:grid-cols-3 gap-10">
            <motion.div
              variants={fadeIn}
              className="bg-card rounded-lg p-6 shadow-sm border border-border"
            >
              <div className="bg-primary/10 p-3 rounded-full w-fit mb-4">
                <Users className="text-primary h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">For Job Seekers</h3>
              <p className="text-foreground/80">
                Upload your CV, get valuable insight from reviewers, and connect
                directly with employers looking for your skills. The days of
                applying to job listings are over.
              </p>
            </motion.div>

            <motion.div
              variants={fadeIn}
              className="bg-card rounded-lg p-6 shadow-sm border border-border"
            >
              <div className="bg-primary/10 p-3 rounded-full w-fit mb-4">
                <Building className="text-primary h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">For Employers</h3>
              <p className="text-foreground/80">
                Search our talent database, communicate directly with
                candidates, and spend less time reviewing resumes and posting
                ghost job ads.
              </p>
            </motion.div>

            <motion.div
              variants={fadeIn}
              className="bg-card rounded-lg p-6 shadow-sm border border-border"
            >
              <div className="bg-primary/10 p-3 rounded-full w-fit mb-4">
                <TrendingUp className="text-primary h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Hiring Intelligence
              </h3>
              <p className="text-foreground/80">
                Our AI-powered system makes it easy for recruiters to find the
                right candidate, and makes it easy for applicants to make their
                application top-notch.
              </p>
            </motion.div>
          </div>
        </motion.section>

        <motion.section
          className="py-16"
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={fadeIn}
        >
          <div className="bg-card rounded-xl p-8 md:p-12 border border-border">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4">Key Features</h2>
                <ul className="space-y-4">
                  <li className="flex gap-3">
                    <Search className="h-6 w-6 text-primary flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold">Smart CV Search</h3>
                      <p className="text-foreground/80">
                        AI-powered keyword-based search to find the perfect
                        candidates
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <MessageSquare className="h-6 w-6 text-primary flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold">
                        Integrated Communication
                      </h3>
                      <p className="text-foreground/80">
                        Chat and video calls directly on the platform. The
                        applicants are always a click away
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <TrendingUp className="h-6 w-6 text-primary flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold">Trend Analysis</h3>
                      <p className="text-foreground/80">
                        See what skills and qualifications are in demand
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="rounded-lg p-6 h-64 flex items-center justify-center">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube-nocookie.com/embed/izrNcMY8iaE?si=0-bPHliVSp7zkLcu&amp;controls=0"
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        </motion.section>
      </main>
    </div>
  );
}
