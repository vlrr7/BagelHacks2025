"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Filter, MapPin, Briefcase, GraduationCap, Star, MessageSquare, FileText, X } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import EmployerNavbar from "@/components/employer-navbar"

export default function SearchCandidatesPage() {
  const [activeFilters, setActiveFilters] = useState<string[]>([])

  const addFilter = (filter: string) => {
    if (!activeFilters.includes(filter)) {
      setActiveFilters([...activeFilters, filter])
    }
  }

  const removeFilter = (filter: string) => {
    setActiveFilters(activeFilters.filter((f) => f !== filter))
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
          <h1 className="text-3xl font-bold mb-2">Search Candidates</h1>
          <p className="text-muted-foreground">Find the perfect candidates for your open positions</p>
        </motion.div>

        <motion.div initial="hidden" animate="visible" variants={fadeIn} className="mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search by skills, job titles, or keywords..." className="pl-10" />
            </div>
            <Select>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="anywhere">Anywhere</SelectItem>
                <SelectItem value="remote">Remote</SelectItem>
                <SelectItem value="us">United States</SelectItem>
                <SelectItem value="europe">Europe</SelectItem>
                <SelectItem value="asia">Asia</SelectItem>
              </SelectContent>
            </Select>
            <Button className="gap-2">
              <Search size={16} /> Search
            </Button>
          </div>

          {activeFilters.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {activeFilters.map((filter) => (
                <Badge key={filter} variant="secondary" className="gap-1">
                  {filter}
                  <button onClick={() => removeFilter(filter)}>
                    <X size={14} />
                  </button>
                </Badge>
              ))}
              <Button variant="link" size="sm" onClick={() => setActiveFilters([])}>
                Clear all
              </Button>
            </div>
          )}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <motion.div initial="hidden" animate="visible" variants={fadeIn} className="lg:col-span-1">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-semibold flex items-center gap-2">
                    <Filter size={16} /> Filters
                  </h2>
                  <Button variant="ghost" size="sm">
                    Reset
                  </Button>
                </div>

                <Accordion type="multiple" className="space-y-2">
                  <AccordionItem value="experience">
                    <AccordionTrigger className="py-2">Experience Level</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="entry" onCheckedChange={() => addFilter("Entry Level")} />
                          <label htmlFor="entry" className="text-sm cursor-pointer">
                            Entry Level (0-2 years)
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="mid" onCheckedChange={() => addFilter("Mid Level")} />
                          <label htmlFor="mid" className="text-sm cursor-pointer">
                            Mid Level (3-5 years)
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="senior" onCheckedChange={() => addFilter("Senior Level")} />
                          <label htmlFor="senior" className="text-sm cursor-pointer">
                            Senior Level (6+ years)
                          </label>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="skills">
                    <AccordionTrigger className="py-2">Skills</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="react" onCheckedChange={() => addFilter("React")} />
                          <label htmlFor="react" className="text-sm cursor-pointer">
                            React
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="typescript" onCheckedChange={() => addFilter("TypeScript")} />
                          <label htmlFor="typescript" className="text-sm cursor-pointer">
                            TypeScript
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="nodejs" onCheckedChange={() => addFilter("Node.js")} />
                          <label htmlFor="nodejs" className="text-sm cursor-pointer">
                            Node.js
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="python" onCheckedChange={() => addFilter("Python")} />
                          <label htmlFor="python" className="text-sm cursor-pointer">
                            Python
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="ui" onCheckedChange={() => addFilter("UI/UX Design")} />
                          <label htmlFor="ui" className="text-sm cursor-pointer">
                            UI/UX Design
                          </label>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="education">
                    <AccordionTrigger className="py-2">Education</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="bachelor" onCheckedChange={() => addFilter("Bachelor's Degree")} />
                          <label htmlFor="bachelor" className="text-sm cursor-pointer">
                            Bachelor's Degree
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="master" onCheckedChange={() => addFilter("Master's Degree")} />
                          <label htmlFor="master" className="text-sm cursor-pointer">
                            Master's Degree
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="phd" onCheckedChange={() => addFilter("PhD")} />
                          <label htmlFor="phd" className="text-sm cursor-pointer">
                            PhD
                          </label>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="availability">
                    <AccordionTrigger className="py-2">Availability</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="immediate" onCheckedChange={() => addFilter("Immediate")} />
                          <label htmlFor="immediate" className="text-sm cursor-pointer">
                            Immediate
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="two-weeks" onCheckedChange={() => addFilter("2 Weeks Notice")} />
                          <label htmlFor="two-weeks" className="text-sm cursor-pointer">
                            2 Weeks Notice
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="month" onCheckedChange={() => addFilter("1+ Month")} />
                          <label htmlFor="month" className="text-sm cursor-pointer">
                            1+ Month
                          </label>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial="hidden" animate="visible" variants={fadeIn} className="lg:col-span-3">
            <div className="flex justify-between items-center mb-4">
              <p className="text-muted-foreground">Showing 42 candidates</p>
              <div className="flex items-center gap-2">
                <span className="text-sm">Sort by:</span>
                <Select defaultValue="relevance">
                  <SelectTrigger className="w-[160px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevance">Relevance</SelectItem>
                    <SelectItem value="recent">Most Recent</SelectItem>
                    <SelectItem value="experience">Experience</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Tabs defaultValue="all">
              <TabsList className="mb-4">
                <TabsTrigger value="all">All Candidates</TabsTrigger>
                <TabsTrigger value="saved">Saved</TabsTrigger>
                <TabsTrigger value="contacted">Contacted</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="mt-0 space-y-4">
                {[1, 2, 3, 4, 5].map((candidate) => (
                  <Card key={candidate} className="overflow-hidden">
                    <CardContent className="p-0">
                      <div className="p-6">
                        <div className="flex flex-col md:flex-row md:items-center gap-4">
                          <Avatar className="h-16 w-16">
                            <AvatarImage src={`/placeholder.svg?height=64&width=64`} alt="Candidate" />
                            <AvatarFallback>CN</AvatarFallback>
                          </Avatar>

                          <div className="flex-grow">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                              <h3 className="font-semibold text-lg">Alex Johnson</h3>
                              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                                <MapPin size={14} />
                                <span>San Francisco, CA (Remote)</span>
                              </div>
                            </div>

                            <h4 className="text-primary font-medium mb-2">Senior Frontend Developer</h4>

                            <div className="flex flex-col md:flex-row gap-4 mb-4">
                              <div className="flex items-center gap-1 text-muted-foreground text-sm">
                                <Briefcase size={14} />
                                <span>5+ years experience</span>
                              </div>
                              <div className="flex items-center gap-1 text-muted-foreground text-sm">
                                <GraduationCap size={14} />
                                <span>Bachelor's in Computer Science</span>
                              </div>
                            </div>

                            <div className="flex flex-wrap gap-2 mb-4">
                              <Badge variant="secondary">React</Badge>
                              <Badge variant="secondary">TypeScript</Badge>
                              <Badge variant="secondary">Next.js</Badge>
                              <Badge variant="secondary">Node.js</Badge>
                              <Badge variant="secondary">UI/UX</Badge>
                            </div>

                            <div className="flex flex-wrap gap-2">
                              <Button size="sm" variant="outline" className="gap-1">
                                <Star size={14} /> Save
                              </Button>
                              <Button size="sm" variant="outline" className="gap-1">
                                <MessageSquare size={14} /> Message
                              </Button>
                              <Button size="sm" variant="outline" className="gap-1">
                                <FileText size={14} /> View CV
                              </Button>
                              <Button size="sm">View Profile</Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                <div className="flex justify-center mt-6">
                  <Button variant="outline">Load More Candidates</Button>
                </div>
              </TabsContent>

              <TabsContent value="saved" className="mt-0">
                <div className="text-center py-12">
                  <Star className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No saved candidates yet</h3>
                  <p className="text-muted-foreground mb-6">Save candidates you're interested in to view them later</p>
                </div>
              </TabsContent>

              <TabsContent value="contacted" className="mt-0">
                <div className="text-center py-12">
                  <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No contacted candidates yet</h3>
                  <p className="text-muted-foreground mb-6">Candidates you've messaged will appear here</p>
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </main>
    </div>
  )
}

