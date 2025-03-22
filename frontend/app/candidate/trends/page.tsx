"use client"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, PieChart, LineChart, MapPin, Info } from "lucide-react"
import CandidateNavbar from "@/components/candidate-navbar"

export default function TrendsPage() {
  const fadeIn = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <div className="min-h-screen bg-background">
      <CandidateNavbar />
      
      <main className="container mx-auto px-4 py-8">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold mb-2">Career Insights & Trends</h1>
          <p className="text-muted-foreground">
            Discover what employers are looking for and optimize your job search
          </p>
        </motion.div>
        
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="mb-8"
        >
          <Card className="bg-muted/50">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Info className="h-5 w-5 text-primary" />
                <h3 className="font-medium">Your Career Field: Frontend Development</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                These insights are tailored to your profile and career interests. Use this data to focus your skill development and job search strategy.
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
        
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
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
                    <CardDescription>
                      Most requested skills in job postings for your field
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">React</span>
                          <span className="text-sm text-muted-foreground">78%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2.5">
                          <div className="bg-primary h-2.5 rounded-full" style={{ width: '78%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">TypeScript</span>
                          <span className="text-sm text-muted-foreground">65%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2.5">
                          <div className="bg-primary h-2.5 rounded-full" style={{ width: '65%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Next.js</span>
                          <span className="text-sm text-muted-foreground">52%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2.5">
                          <div className="bg-primary h-2.5 rounded-full" style={{ width: '52%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Tailwind CSS</span>
                          <span className="text-sm text-muted-foreground">48%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2.5">
                          <div className="bg-primary h-2.5 rounded-full" style={{ width: '48%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">GraphQL</span>
                          <span className="text-sm text-muted-foreground">35%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2.5">
                          <div className="bg-primary h-2.5 rounded-full" style={{ width: '35%' }}></div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 pt-6 border-t border-border">
                      <h4 className="text-sm font-medium mb-3">Fastest Growing Skills</h4>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-muted p-3 rounded-lg">
                          <div className="flex justify-between items-center">
                            <span className="text-sm">React Server Components</span>
                            <span className="text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 px-1.5 py-0.5 rounded-full">+42%</span>
                          </div>
                        </div>
                        <div className="bg-muted p-3 rounded-lg">
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Web3 / Blockchain</span>
                            <span className="text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 px-1.5 py-0.5 rounded-full">+38%</span>
                          </div>
                        </div>
                        <div className="bg-muted p-3 rounded-lg">
                          <div className="flex justify-between items-center">
                            <span className="text-sm">AI Integration</span>
                            <span className="text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 px-1.5 py-0.5 rounded-full">+35%</span>
                          </div>
                        </div>
                        <div className="bg-muted p-3 rounded-lg">
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Micro Frontends</span>
                            <span className="text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 px-1.5 py-0.5 rounded-full">+28%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Soft Skills & Qualifications</CardTitle>
                    <CardDescription>
                      Non-technical skills employers value most
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Communication</span>
                          <span className="text-sm text-muted-foreground">85%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2.5">
                          <div className="bg-primary h-2.5 rounded-full" style={{ width: '85%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Problem Solving</span>
                          <span className="text-sm text-muted-foreground">82%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2.5">
                          <div className="bg-primary h-2.5 rounded-full" style={{ width: '82%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Teamwork</span>
                          <span className="text-sm text-muted-foreground">76%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2.5">
                          <div className="bg-primary h-2.5 rounded-full" style={{ width: '76%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span\

