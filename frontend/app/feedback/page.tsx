"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageSquare, ThumbsUp, ThumbsDown, Send, FileText, CheckCircle, Info } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import EmployerNavbar from "@/components/employer-navbar"

export default function FeedbackPage() {
  const [feedbackSent, setFeedbackSent] = useState(false)
  const [feedbackText, setFeedbackText] = useState("")

  const handleSendFeedback = () => {
    if (feedbackText.trim()) {
      // In a real app, you would send the feedback to the backend
      setFeedbackSent(true)
    }
  }

  const fadeIn = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  }

  return (
    <div className="min-h-screen bg-background">
      <EmployerNavbar />

      <main className="container mx-auto px-4 py-8">
        <motion.div initial="hidden" animate="visible" variants={fadeIn} className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Candidate Feedback</h1>
          <p className="text-muted-foreground">Provide constructive feedback to candidates and earn rebates</p>
        </motion.div>

        <motion.div initial="hidden" animate="visible" variants={fadeIn} className="mb-8">
          <Card className="bg-muted/50 border-primary/20">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Info className="h-5 w-5 text-primary" />
                <h3 className="font-medium">Feedback Rebate Program</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Providing detailed, constructive feedback to candidates helps them improve and earns you rebates on your
                subscription. Your current plan allows for up to $180 in monthly rebates.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div className="bg-background rounded-lg p-4">
                  <p className="text-2xl font-bold text-primary">$120</p>
                  <p className="text-sm text-muted-foreground">Rebates earned this month</p>
                </div>
                <div className="bg-background rounded-lg p-4">
                  <p className="text-2xl font-bold">24</p>
                  <p className="text-sm text-muted-foreground">Feedback given</p>
                </div>
                <div className="bg-background rounded-lg p-4">
                  <p className="text-2xl font-bold">$5</p>
                  <p className="text-sm text-muted-foreground">Average rebate per feedback</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial="hidden" animate="visible" variants={fadeIn}>
          <Tabs defaultValue="pending">
            <TabsList className="mb-6">
              <TabsTrigger value="pending">Pending Feedback</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>

            <TabsContent value="pending" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={`/placeholder.svg?height=40&width=40`} alt="Michael Chen" />
                          <AvatarFallback>MC</AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-lg">Michael Chen</CardTitle>
                          <CardDescription>Applied for: UX Designer</CardDescription>
                        </div>
                      </div>
                      <div className="text-xs bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100 px-2 py-1 rounded-full">
                        Interview Stage
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {!feedbackSent ? (
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <h3 className="text-sm font-medium">Provide Feedback</h3>
                          <Select defaultValue="interview">
                            <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder="Feedback type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="interview">Interview Performance</SelectItem>
                              <SelectItem value="technical">Technical Skills</SelectItem>
                              <SelectItem value="cultural">Cultural Fit</SelectItem>
                              <SelectItem value="cv">CV Improvement</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <Textarea
                          placeholder="Provide detailed, constructive feedback to help the candidate improve..."
                          className="min-h-[120px]"
                          value={feedbackText}
                          onChange={(e) => setFeedbackText(e.target.value)}
                        />

                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm" className="gap-1">
                              <ThumbsUp size={14} /> Strengths
                            </Button>
                            <Button variant="outline" size="sm" className="gap-1">
                              <ThumbsDown size={14} /> Areas to Improve
                            </Button>
                          </div>
                          <Button onClick={handleSendFeedback} disabled={!feedbackText.trim()} className="gap-1">
                            <Send size={14} /> Send Feedback
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-6">
                        <CheckCircle className="h-12 w-12 text-green-600 dark:text-green-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium mb-2">Feedback Sent Successfully</h3>
                        <p className="text-muted-foreground mb-4">
                          Thank you for providing feedback. You've earned a $5 rebate.
                        </p>
                        <Button onClick={() => setFeedbackSent(false)}>Provide More Feedback</Button>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={`/placeholder.svg?height=40&width=40`} alt="Jessica Williams" />
                          <AvatarFallback>JW</AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-lg">Jessica Williams</CardTitle>
                          <CardDescription>Applied for: Product Manager</CardDescription>
                        </div>
                      </div>
                      <div className="text-xs bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100 px-2 py-1 rounded-full">
                        Rejected
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className="text-sm font-medium">Provide Feedback</h3>
                        <Select defaultValue="cv">
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Feedback type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="interview">Interview Performance</SelectItem>
                            <SelectItem value="technical">Technical Skills</SelectItem>
                            <SelectItem value="cultural">Cultural Fit</SelectItem>
                            <SelectItem value="cv">CV Improvement</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <Textarea
                        placeholder="Provide detailed, constructive feedback to help the candidate improve..."
                        className="min-h-[120px]"
                      />

                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm" className="gap-1">
                            <ThumbsUp size={14} /> Strengths
                          </Button>
                          <Button variant="outline" size="sm" className="gap-1">
                            <ThumbsDown size={14} /> Areas to Improve
                          </Button>
                        </div>
                        <Button className="gap-1">
                          <Send size={14} /> Send Feedback
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="completed" className="mt-0">
              <div className="space-y-4">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={`/placeholder.svg?height=40&width=40`} alt="Alex Johnson" />
                          <AvatarFallback>AJ</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-medium">Alex Johnson</h3>
                          <p className="text-sm text-muted-foreground">Applied for: Senior Frontend Developer</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 px-2 py-1 rounded-full">
                          Feedback Sent
                        </div>
                        <span className="text-sm text-muted-foreground">2 days ago</span>
                      </div>
                    </div>

                    <div className="mt-4 border-t border-border pt-4">
                      <h4 className="text-sm font-medium mb-2">Your Feedback:</h4>
                      <div className="bg-muted p-3 rounded-lg text-sm">
                        <p>
                          Alex demonstrated strong technical skills in React and TypeScript during the interview. His
                          problem-solving approach was methodical and he communicated his thought process clearly.
                        </p>
                        <p className="mt-2">Areas for improvement include:</p>
                        <ul className="list-disc pl-5 mt-1 space-y-1">
                          <li>Deeper knowledge of state management patterns beyond Redux</li>
                          <li>More experience with testing frameworks</li>
                          <li>Further development of system design skills for larger applications</li>
                        </ul>
                      </div>

                      <div className="mt-4 flex justify-between items-center">
                        <div className="text-sm text-green-600 dark:text-green-400 font-medium">Rebate earned: $8</div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm" className="gap-1">
                            <FileText size={14} /> View Application
                          </Button>
                          <Button variant="outline" size="sm" className="gap-1">
                            <MessageSquare size={14} /> Message
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={`/placeholder.svg?height=40&width=40`} alt="Sarah Thompson" />
                          <AvatarFallback>ST</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-medium">Sarah Thompson</h3>
                          <p className="text-sm text-muted-foreground">Applied for: Marketing Manager</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 px-2 py-1 rounded-full">
                          Feedback Sent
                        </div>
                        <span className="text-sm text-muted-foreground">1 week ago</span>
                      </div>
                    </div>

                    <div className="mt-4 border-t border-border pt-4">
                      <h4 className="text-sm font-medium mb-2">Your Feedback:</h4>
                      <div className="bg-muted p-3 rounded-lg text-sm">
                        <p>
                          Sarah's CV shows strong experience in digital marketing campaigns and team leadership. Her
                          portfolio demonstrates creativity and data-driven decision making.
                        </p>
                        <p className="mt-2">Suggestions for CV improvement:</p>
                        <ul className="list-disc pl-5 mt-1 space-y-1">
                          <li>Quantify achievements with specific metrics and results</li>
                          <li>Highlight experience with specific marketing tools and platforms</li>
                          <li>Include more details about budget management experience</li>
                          <li>Consider reorganizing to put most relevant experience first</li>
                        </ul>
                      </div>

                      <div className="mt-4 flex justify-between items-center">
                        <div className="text-sm text-green-600 dark:text-green-400 font-medium">Rebate earned: $10</div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm" className="gap-1">
                            <FileText size={14} /> View Application
                          </Button>
                          <Button variant="outline" size="sm" className="gap-1">
                            <MessageSquare size={14} /> Message
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </main>
    </div>
  )
}

