"use client"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  TrendingUp,
  BarChart,
  PieChart,
  LineChart,
  Briefcase,
  GraduationCap,
  MapPin,
  Download,
  Info,
  CheckCircle,
} from "lucide-react"
import CandidateNavbar from "@/components/candidate-navbar"

export default function TrendsPage() {
  const fadeIn = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  }

  return (
    <div className="min-h-screen bg-background">
      <CandidateNavbar />

      <main className="container mx-auto px-4 py-8">
        <motion.div initial="hidden" animate="visible" variants={fadeIn} className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Career Insights & Trends</h1>
          <p className="text-muted-foreground">Discover what employers are looking for and optimize your job search</p>
        </motion.div>

        <motion.div initial="hidden" animate="visible" variants={fadeIn} className="mb-8">
          <Card className="bg-muted/50">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Info className="h-5 w-5 text-primary" />
                <h3 className="font-medium">Your Career Field: Frontend Development</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                These insights are tailored to your profile and career interests. Use this data to focus your skill
                development and job search strategy.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div className="bg-background rounded-lg p-4">
                  <p className="text-2xl font-bold text-primary">+15%</p>
                  <p className="text-sm text-muted-foreground">Demand growth in your field</p>
                </div>
                <div className="bg-background rounded-lg p-4">
                  <p className="text-2xl font-bold">$105,000</p>
                  <p className="text-sm text-muted-foreground">Average salary</p>
                </div>
                <div className="bg-background rounded-lg p-4">
                  <p className="text-2xl font-bold">842</p>
                  <p className="text-sm text-muted-foreground">Open positions in your area</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial="hidden" animate="visible" variants={fadeIn}>
          <Tabs defaultValue="skills">
            <TabsList className="mb-6">
              <TabsTrigger value="skills" className="gap-2">
                <BarChart size={16} /> Skills in Demand
              </TabsTrigger>
              <TabsTrigger value="industries" className="gap-2">
                <PieChart size={16} /> Hot Industries
              </TabsTrigger>
              <TabsTrigger value="locations" className="gap-2">
                <MapPin size={16} /> Top Locations
              </TabsTrigger>
              <TabsTrigger value="salaries" className="gap-2">
                <LineChart size={16} /> Salary Trends
              </TabsTrigger>
            </TabsList>

            <TabsContent value="skills" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Technical Skills in Demand</CardTitle>
                    <CardDescription>Most requested skills in job postings for your field</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">React</span>
                          <span className="text-sm text-muted-foreground">78%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2.5">
                          <div className="bg-primary h-2.5 rounded-full" style={{ width: "78%" }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">TypeScript</span>
                          <span className="text-sm text-muted-foreground">65%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2.5">
                          <div className="bg-primary h-2.5 rounded-full" style={{ width: "65%" }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Next.js</span>
                          <span className="text-sm text-muted-foreground">52%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2.5">
                          <div className="bg-primary h-2.5 rounded-full" style={{ width: "52%" }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Tailwind CSS</span>
                          <span className="text-sm text-muted-foreground">48%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2.5">
                          <div className="bg-primary h-2.5 rounded-full" style={{ width: "48%" }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">GraphQL</span>
                          <span className="text-sm text-muted-foreground">35%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2.5">
                          <div className="bg-primary h-2.5 rounded-full" style={{ width: "35%" }}></div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 pt-6 border-t border-border">
                      <h4 className="text-sm font-medium mb-3">Fastest Growing Skills</h4>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-muted p-3 rounded-lg">
                          <div className="flex justify-between items-center">
                            <span className="text-sm">React Server Components</span>
                            <span className="text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 px-1.5 py-0.5 rounded-full">
                              +42%
                            </span>
                          </div>
                        </div>
                        <div className="bg-muted p-3 rounded-lg">
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Web3 / Blockchain</span>
                            <span className="text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 px-1.5 py-0.5 rounded-full">
                              +38%
                            </span>
                          </div>
                        </div>
                        <div className="bg-muted p-3 rounded-lg">
                          <div className="flex justify-between items-center">
                            <span className="text-sm">AI Integration</span>
                            <span className="text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 px-1.5 py-0.5 rounded-full">
                              +35%
                            </span>
                          </div>
                        </div>
                        <div className="bg-muted p-3 rounded-lg">
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Micro Frontends</span>
                            <span className="text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 px-1.5 py-0.5 rounded-full">
                              +28%
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Soft Skills & Qualifications</CardTitle>
                    <CardDescription>Non-technical skills employers value most</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Communication</span>
                          <span className="text-sm text-muted-foreground">85%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2.5">
                          <div className="bg-primary h-2.5 rounded-full" style={{ width: "85%" }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Problem Solving</span>
                          <span className="text-sm text-muted-foreground">82%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2.5">
                          <div className="bg-primary h-2.5 rounded-full" style={{ width: "82%" }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Teamwork</span>
                          <span className="text-sm text-muted-foreground">76%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2.5">
                          <div className="bg-primary h-2.5 rounded-full" style={{ width: "76%" }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Adaptability</span>
                          <span className="text-sm text-muted-foreground">72%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2.5">
                          <div className="bg-primary h-2.5 rounded-full" style={{ width: "72%" }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Time Management</span>
                          <span className="text-sm text-muted-foreground">68%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2.5">
                          <div className="bg-primary h-2.5 rounded-full" style={{ width: "68%" }}></div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 pt-6 border-t border-border">
                      <h4 className="text-sm font-medium mb-3">Education & Certifications</h4>
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <GraduationCap size={16} className="text-primary" />
                          <span className="text-sm">
                            Bachelor's Degree (Computer Science/Related): 65% of job postings
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <GraduationCap size={16} className="text-primary" />
                          <span className="text-sm">Frontend Certifications: 42% of job postings</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <GraduationCap size={16} className="text-primary" />
                          <span className="text-sm">Cloud Certifications: 28% of job postings</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="industries" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Industries Hiring Frontend Developers</CardTitle>
                    <CardDescription>Sectors with the highest demand for your skills</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Technology</span>
                          <span className="text-sm text-muted-foreground">42%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2.5">
                          <div className="bg-primary h-2.5 rounded-full" style={{ width: "42%" }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">E-commerce</span>
                          <span className="text-sm text-muted-foreground">18%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2.5">
                          <div className="bg-primary h-2.5 rounded-full" style={{ width: "18%" }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Financial Services</span>
                          <span className="text-sm text-muted-foreground">12%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2.5">
                          <div className="bg-primary h-2.5 rounded-full" style={{ width: "12%" }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Healthcare</span>
                          <span className="text-sm text-muted-foreground">8%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2.5">
                          <div className="bg-primary h-2.5 rounded-full" style={{ width: "8%" }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Media & Entertainment</span>
                          <span className="text-sm text-muted-foreground">7%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2.5">
                          <div className="bg-primary h-2.5 rounded-full" style={{ width: "7%" }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Other Industries</span>
                          <span className="text-sm text-muted-foreground">13%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2.5">
                          <div className="bg-primary h-2.5 rounded-full" style={{ width: "13%" }}></div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Fastest Growing Industries</CardTitle>
                    <CardDescription>Sectors with increasing demand for frontend talent</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="bg-muted p-4 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <div className="flex items-center gap-2">
                            <Briefcase className="h-5 w-5 text-primary" />
                            <span className="font-medium">HealthTech</span>
                          </div>
                          <span className="text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 px-2 py-0.5 rounded-full">
                            +32% YoY
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Digital health platforms, telemedicine, and health monitoring apps are driving demand for
                          frontend developers with experience in secure, accessible interfaces.
                        </p>
                      </div>

                      <div className="bg-muted p-4 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <div className="flex items-center gap-2">
                            <Briefcase className="h-5 w-5 text-primary" />
                            <span className="font-medium">FinTech</span>
                          </div>
                          <span className="text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 px-2 py-0.5 rounded-full">
                            +28% YoY
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Banking apps, investment platforms, and cryptocurrency services need frontend developers who
                          can build secure, intuitive financial interfaces.
                        </p>
                      </div>

                      <div className="bg-muted p-4 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <div className="flex items-center gap-2">
                            <Briefcase className="h-5 w-5 text-primary" />
                            <span className="font-medium">EdTech</span>
                          </div>
                          <span className="text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 px-2 py-0.5 rounded-full">
                            +25% YoY
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Online learning platforms, educational apps, and virtual classroom tools are expanding
                          rapidly, creating demand for frontend developers.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="locations" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Top Hiring Locations</CardTitle>
                  <CardDescription>Areas with the highest demand for frontend developers</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-sm font-medium mb-3">United States</h3>
                      <div className="space-y-3">
                        <div className="bg-muted p-3 rounded-lg">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <MapPin size={14} className="text-primary" />
                              <span className="text-sm">San Francisco Bay Area</span>
                            </div>
                            <span className="text-sm font-medium">$135,000</span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">Average salary • 1,245 open positions</p>
                        </div>

                        <div className="bg-muted p-3 rounded-lg">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <MapPin size={14} className="text-primary" />
                              <span className="text-sm">New York City</span>
                            </div>
                            <span className="text-sm font-medium">$128,000</span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">Average salary • 985 open positions</p>
                        </div>

                        <div className="bg-muted p-3 rounded-lg">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <MapPin size={14} className="text-primary" />
                              <span className="text-sm">Seattle</span>
                            </div>
                            <span className="text-sm font-medium">$125,000</span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">Average salary • 745 open positions</p>
                        </div>

                        <div className="bg-muted p-3 rounded-lg">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <MapPin size={14} className="text-primary" />
                              <span className="text-sm">Austin</span>
                            </div>
                            <span className="text-sm font-medium">$115,000</span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">Average salary • 685 open positions</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium mb-3">Remote & International</h3>
                      <div className="space-y-3">
                        <div className="bg-muted p-3 rounded-lg">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <MapPin size={14} className="text-primary" />
                              <span className="text-sm">Remote (US-based)</span>
                            </div>
                            <span className="text-sm font-medium">$120,000</span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">Average salary • 1,850 open positions</p>
                        </div>

                        <div className="bg-muted p-3 rounded-lg">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <MapPin size={14} className="text-primary" />
                              <span className="text-sm">London, UK</span>
                            </div>
                            <span className="text-sm font-medium">£75,000</span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">Average salary • 625 open positions</p>
                        </div>

                        <div className="bg-muted p-3 rounded-lg">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <MapPin size={14} className="text-primary" />
                              <span className="text-sm">Toronto, Canada</span>
                            </div>
                            <span className="text-sm font-medium">C$95,000</span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">Average salary • 485 open positions</p>
                        </div>

                        <div className="bg-muted p-3 rounded-lg">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <MapPin size={14} className="text-primary" />
                              <span className="text-sm">Berlin, Germany</span>
                            </div>
                            <span className="text-sm font-medium">€72,000</span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">Average salary • 420 open positions</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-border">
                    <h3 className="text-sm font-medium mb-3">Emerging Tech Hubs</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      <div className="bg-muted p-3 rounded-lg text-center">
                        <p className="text-sm font-medium">Miami, FL</p>
                        <p className="text-xs text-muted-foreground">+45% growth</p>
                      </div>
                      <div className="bg-muted p-3 rounded-lg text-center">
                        <p className="text-sm font-medium">Raleigh, NC</p>
                        <p className="text-xs text-muted-foreground">+38% growth</p>
                      </div>
                      <div className="bg-muted p-3 rounded-lg text-center">
                        <p className="text-sm font-medium">Lisbon, Portugal</p>
                        <p className="text-xs text-muted-foreground">+35% growth</p>
                      </div>
                      <div className="bg-muted p-3 rounded-lg text-center">
                        <p className="text-sm font-medium">Singapore</p>
                        <p className="text-xs text-muted-foreground">+32% growth</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="salaries" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Salary Ranges by Experience</CardTitle>
                    <CardDescription>Average compensation for frontend developers</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="bg-muted p-4 rounded-lg">
                        <h3 className="text-sm font-medium mb-2">Entry Level (0-2 years)</h3>
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-full bg-primary/20 rounded-full h-4 relative">
                            <div className="absolute inset-0 flex items-center justify-center text-xs font-medium">
                              $70,000 - $90,000
                            </div>
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Most common skills: HTML, CSS, JavaScript, React basics
                        </p>
                      </div>

                      <div className="bg-muted p-4 rounded-lg">
                        <h3 className="text-sm font-medium mb-2">Mid Level (3-5 years)</h3>
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-full bg-primary/20 rounded-full h-4 relative">
                            <div className="absolute inset-0 flex items-center justify-center text-xs font-medium">
                              $90,000 - $120,000
                            </div>
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Most common skills: Advanced React, TypeScript, Next.js, State Management
                        </p>
                      </div>

                      <div className="bg-muted p-4 rounded-lg">
                        <h3 className="text-sm font-medium mb-2">Senior Level (6+ years)</h3>
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-full bg-primary/20 rounded-full h-4 relative">
                            <div className="absolute inset-0 flex items-center justify-center text-xs font-medium">
                              $120,000 - $160,000+
                            </div>
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Most common skills: Architecture, Performance Optimization, Team Leadership
                        </p>
                      </div>

                      <div className="bg-muted p-4 rounded-lg">
                        <h3 className="text-sm font-medium mb-2">Lead/Principal (8+ years)</h3>
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-full bg-primary/20 rounded-full h-4 relative">
                            <div className="absolute inset-0 flex items-center justify-center text-xs font-medium">
                              $150,000 - $200,000+
                            </div>
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Most common skills: System Design, Frontend Architecture, Technical Leadership, Mentoring
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Salary Trends & Benefits</CardTitle>
                    <CardDescription>Compensation trends and common benefits</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-sm font-medium mb-2">Salary Growth Trends</h3>
                        <div className="bg-muted p-3 rounded-lg">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm">Year-over-Year Increase</span>
                            <span className="text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 px-2 py-0.5 rounded-full">
                              +4.8%
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Frontend developer salaries are growing faster than the industry average of 3.2%
                          </p>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-sm font-medium mb-2">Most Common Benefits</h3>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-center gap-2">
                            <CheckCircle size={14} className="text-green-600 dark:text-green-400" />
                            <span>Remote work options (92% of job postings)</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle size={14} className="text-green-600 dark:text-green-400" />
                            <span>Health insurance (88% of job postings)</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle size={14} className="text-green-600 dark:text-green-400" />
                            <span>Flexible working hours (85% of job postings)</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle size={14} className="text-green-600 dark:text-green-400" />
                            <span>Professional development budget (72% of job postings)</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle size={14} className="text-green-600 dark:text-green-400" />
                            <span>Stock options/equity (65% of job postings)</span>
                          </li>
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-sm font-medium mb-2">Emerging Compensation Trends</h3>
                        <div className="bg-muted p-3 rounded-lg">
                          <p className="text-sm">
                            Companies are increasingly offering location-based pay adjustments for remote workers, with
                            an average of 85-95% of base salary for those living in lower cost-of-living areas.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>

        <motion.div initial="hidden" animate="visible" variants={fadeIn} className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Personalized Recommendations</CardTitle>
              <CardDescription>Based on your profile and current market trends</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-muted p-4 rounded-lg">
                  <h3 className="text-sm font-medium mb-2 flex items-center gap-2">
                    <TrendingUp size={16} className="text-primary" />
                    Skills to Develop
                  </h3>
                  <p className="text-sm mb-3">
                    Based on your current skills and market demand, consider developing expertise in:
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    <div className="bg-background p-2 rounded text-sm text-center">React Server Components</div>
                    <div className="bg-background p-2 rounded text-sm text-center">TypeScript</div>
                    <div className="bg-background p-2 rounded text-sm text-center">Next.js</div>
                    <div className="bg-background p-2 rounded text-sm text-center">Performance Optimization</div>
                    <div className="bg-background p-2 rounded text-sm text-center">Testing (Jest/RTL)</div>
                    <div className="bg-background p-2 rounded text-sm text-center">State Management</div>
                  </div>
                </div>

                <div className="bg-muted p-4 rounded-lg">
                  <h3 className="text-sm font-medium mb-2 flex items-center gap-2">
                    <Briefcase size={16} className="text-primary" />
                    Job Search Strategy
                  </h3>
                  <p className="text-sm mb-3">To maximize your opportunities and compensation:</p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle size={16} className="text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                      <span>
                        Focus on companies in HealthTech and FinTech sectors, which are showing the strongest growth
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle size={16} className="text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                      <span>
                        Highlight your experience with React and TypeScript prominently in your CV and portfolio
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle size={16} className="text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                      <span>
                        Consider remote positions to access a wider range of opportunities and potentially higher
                        compensation
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <Button className="gap-2">
                  <Download size={16} /> Download Full Report
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  )
}

