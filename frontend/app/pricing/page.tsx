"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Check, HelpCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">(
    "monthly"
  );

  const fadeIn = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="container mx-auto py-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Link href="/" className="text-2xl font-bold text-primary">
            CVue
          </Link>
        </div>
        <nav className="hidden md:flex gap-6">
          <Link
            href="/"
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
          className="text-center max-w-3xl mx-auto mb-16"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Pricing Plans for Every Hiring Need
          </h1>
          <p className="text-xl text-foreground/80 mb-10">
            Choose the perfect plan for your recruitment goals, with flexible
            options for businesses of all sizes.
          </p>

          <div className="flex items-center justify-center gap-3 mb-12">
            <Label
              htmlFor="billing-toggle"
              className={billingCycle === "monthly" ? "font-medium" : ""}
            >
              Monthly
            </Label>
            <Switch
              id="billing-toggle"
              checked={billingCycle === "annual"}
              onCheckedChange={(checked) =>
                setBillingCycle(checked ? "annual" : "monthly")
              }
            />
            <div className="flex items-center gap-1.5">
              <Label
                htmlFor="billing-toggle"
                className={billingCycle === "annual" ? "font-medium" : ""}
              >
                Annual
              </Label>
              <span className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 text-xs px-2 py-0.5 rounded-full">
                Save 20%
              </span>
            </div>
          </div>

          <Tabs defaultValue="employer" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-12">
              <TabsTrigger value="employer">For Employers</TabsTrigger>
              <TabsTrigger value="candidate">For Candidates</TabsTrigger>
            </TabsList>

            <TabsContent value="employer">
              <motion.div
                className="grid md:grid-cols-3 gap-8"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
              >
                <motion.div variants={fadeIn}>
                  <Card className="h-full flex flex-col">
                    <CardHeader>
                      <CardTitle>Starter</CardTitle>
                      <CardDescription>
                        For small businesses just getting started
                      </CardDescription>
                      <div className="mt-4">
                        <span className="text-4xl font-bold">
                          ${billingCycle === "monthly" ? "99" : "79"}
                        </span>
                        <span className="text-muted-foreground ml-1">
                          / month
                        </span>
                        {billingCycle === "annual" && (
                          <p className="text-sm text-muted-foreground mt-1">
                            Billed annually (${79 * 12})
                          </p>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <ul className="space-y-3">
                        <li className="flex items-start gap-2">
                          <Check className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                          <span>Basic candidate search</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                          <span>In-app messaging</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                          <span>Basic analytics</span>
                        </li>
                        <li className="flex items-start gap-2 text-muted-foreground">
                          <Check className="h-5 w-5 flex-shrink-0 mt-0.5" />
                          <span>Feedback rebates</span>
                        </li>
                        <li className="flex items-start gap-2 text-muted-foreground">
                          <Check className="h-5 w-5 flex-shrink-0 mt-0.5" />
                          <span>AI-powered candidate matching</span>
                        </li>
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button
                        className="w-full"
                        onClick={() =>
                          (window.location.href = "/employer/dashboard")
                        }
                      >
                        Get Started
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>

                <motion.div variants={fadeIn}>
                  <Card className="h-full flex flex-col border-primary">
                    <CardHeader>
                      <div className="bg-primary text-primary-foreground text-xs px-3 py-1 rounded-full w-fit mb-2">
                        Most Popular
                      </div>
                      <CardTitle>Professional</CardTitle>
                      <CardDescription>
                        For growing companies with active hiring needs
                      </CardDescription>
                      <div className="mt-4">
                        <span className="text-4xl font-bold">
                          ${billingCycle === "monthly" ? "299" : "239"}
                        </span>
                        <span className="text-muted-foreground ml-1">
                          / month
                        </span>
                        {billingCycle === "annual" && (
                          <p className="text-sm text-muted-foreground mt-1">
                            Billed annually (${239 * 12})
                          </p>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <ul className="space-y-3">
                        <li className="flex items-start gap-2">
                          <Check className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                          <span>Advanced candidate search with filters</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                          <span>In-app messaging and video calls</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                          <span>Comprehensive analytics dashboard</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                          <div className="flex items-center gap-1">
                            <span>Feedback rebates (up to $180/month)</span>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger>
                                  <HelpCircle
                                    size={14}
                                    className="text-muted-foreground"
                                  />
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p className="max-w-xs">
                                    Earn rebates for providing constructive
                                    feedback to candidates, up to $180 per
                                    month.
                                  </p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                        </li>
                        <li className="flex items-start gap-2 text-muted-foreground">
                          <Check className="h-5 w-5 flex-shrink-0 mt-0.5" />
                          <span>AI-powered candidate matching</span>
                        </li>
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button
                        className="w-full"
                        onClick={() =>
                          (window.location.href = "/employer/dashboard")
                        }
                      >
                        Get Started
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>

                <motion.div variants={fadeIn}>
                  <Card className="h-full flex flex-col">
                    <CardHeader>
                      <CardTitle>Enterprise</CardTitle>
                      <CardDescription>
                        For large organizations with complex hiring needs
                      </CardDescription>
                      <div className="mt-4">
                        <span className="text-4xl font-bold">
                          ${billingCycle === "monthly" ? "599" : "479"}
                        </span>
                        <span className="text-muted-foreground ml-1">
                          / month
                        </span>
                        {billingCycle === "annual" && (
                          <p className="text-sm text-muted-foreground mt-1">
                            Billed annually (${479 * 12})
                          </p>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <ul className="space-y-3">
                        <li className="flex items-start gap-2">
                          <Check className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                          <span>Premium candidate search with all filters</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                          <span>
                            Full communication suite (messaging, video,
                            scheduling)
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                          <span>Advanced analytics and reporting</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                          <span>Feedback rebates (unlimited)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                          <span>
                            AI-powered candidate matching and insights
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                          <span>Dedicated account manager</span>
                        </li>
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">Contact Sales</Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              </motion.div>
            </TabsContent>

            <TabsContent value="candidate">
              <motion.div
                className="grid md:grid-cols-3 gap-8"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
              >
                <motion.div variants={fadeIn}>
                  <Card className="h-full flex flex-col">
                    <CardHeader>
                      <CardTitle>Free</CardTitle>
                      <CardDescription>
                        Basic job search and application tools
                      </CardDescription>
                      <div className="mt-4">
                        <span className="text-4xl font-bold">$0</span>
                        <span className="text-muted-foreground ml-1">
                          / forever
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <ul className="space-y-3">
                        <li className="flex items-start gap-2">
                          <Check className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                          <span>Create a professional profile</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                          <span>Upload your CV</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                          <span>Apply to jobs</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                          <span>Basic messaging with employers</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                          <span>AI CV analysis</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                          <span>Priority in search results</span>
                        </li>
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button
                        className="w-full"
                        onClick={() =>
                          (window.location.href = "/candidate/dashboard")
                        }
                      >
                        Sign Up Free
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              </motion.div>
            </TabsContent>
          </Tabs>
        </motion.section>

        <motion.section
          className="max-w-3xl mx-auto text-center py-16"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <h2 className="text-3xl font-bold mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6 text-left">
            <div>
              <h3 className="text-xl font-medium mb-2">
                Can I change plans later?
              </h3>
              <p className="text-muted-foreground">
                Yes, you can upgrade, downgrade, or cancel your plan at any
                time. Changes to your subscription will take effect at the start
                of your next billing cycle.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-medium mb-2">
                How do feedback rebates work?
              </h3>
              <p className="text-muted-foreground">
                Employers on the Professional and Enterprise plans can earn
                rebates for providing constructive feedback to candidates. The
                more detailed and helpful your feedback, the higher the rebate,
                up to $180 per month on the Professional plan and unlimited on
                the Enterprise plan.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-medium mb-2">
                Is there a free trial available?
              </h3>
              <p className="text-muted-foreground">
                Yes, we offer a 14-day free trial for all employer plans.
                Candidate plans start with a free tier that you can use
                indefinitely.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-medium mb-2">
                What payment methods do you accept?
              </h3>
              <p className="text-muted-foreground">
                We accept all major credit cards, PayPal, and bank transfers for
                annual plans. Enterprise customers can also arrange for
                invoicing.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-medium mb-2">
                Do you offer discounts for startups or non-profits?
              </h3>
              <p className="text-muted-foreground">
                Yes, we offer special pricing for startups, non-profits, and
                educational institutions. Please contact our sales team for more
                information.
              </p>
            </div>
          </div>
        </motion.section>
      </main>
    </div>
  );
}
