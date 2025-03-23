"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  FileText,
  MessageSquare,
  TrendingUp,
  Upload,
  Building,
  CheckCircle,
  Clock,
} from "lucide-react";
import CandidateNavbar from "@/components/candidate-navbar";

export default function CandidateDashboard() {
  const [profileCompletion] = useState(75);
  const [userInfo, setUserInfo] = useState<{ firstName: string; lastName: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/user-info", {
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          setUserInfo(data);
        }
      } catch (error) {
        console.error("Failed to fetch user info:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  const fadeIn = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  const welcomeTextFade = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5, delay: 0.2 } }
  };

  return (
    <div className="min-h-screen bg-background">
      <CandidateNavbar />

      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8"
        >
          <div>
            {!isLoading && (
              <motion.h1 
                className="text-3xl font-bold"
                initial="hidden"
                animate="visible"
                variants={welcomeTextFade}
              >
                Welcome back{userInfo ? `, ${userInfo.firstName}` : ''}
              </motion.h1>
            )}
            <p className="text-muted-foreground">Your job search dashboard</p>
          </div>
          <div className="mt-4 md:mt-0">
            <Button
              className="gap-2"
              onClick={() => (window.location.href = "/candidate/cv-upload")}
            >
              <Upload size={16} /> Upload New CV
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Building size={18} className="text-primary" /> Application
                Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-primary/5 rounded-lg">
                  <p className="text-2xl font-bold">12</p>
                  <p className="text-sm text-muted-foreground">Impressions</p>
                </div>
                <div className="text-center p-3 bg-primary/5 rounded-lg">
                  <p className="text-2xl font-bold">3</p>
                  <p className="text-sm text-muted-foreground">Interviews</p>
                </div>
              </div>
              <Button
                variant="link"
                className="p-0 h-auto text-primary mt-4"
                onClick={() =>
                  (window.location.href = "/candidate/applications")
                }
              >
                View All Applications
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <MessageSquare size={18} className="text-primary" /> Messages
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">New Messages</span>
                  <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                    4
                  </span>
                </div>
                <div className="text-sm text-muted-foreground">
                  <p>You have 4 unread messages from recruiters</p>
                </div>
                <Button
                  variant="link"
                  className="p-0 h-auto text-primary"
                  onClick={() => (window.location.href = "/communication")}
                >
                  Open Inbox
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="mb-8"
        >
          <Tabs defaultValue="recommended">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Tailoring for Companies</h2>
              <TabsList>
                <TabsTrigger value="recommended">Recommended</TabsTrigger>
                <TabsTrigger value="saved">Saved</TabsTrigger>
                <TabsTrigger value="applied">Applied</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="recommended" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((company) => (
                  <Card key={company} className="overflow-hidden">
                    <CardContent className="p-0">
                      <div className="p-6">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-semibold text-lg">
                              TechCorp Inc.
                            </h3>
                            <p className="text-muted-foreground text-sm">
                              Technology • Remote
                            </p>
                          </div>
                          <span className="text-sm bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 px-2 py-1 rounded-full">
                            Hiring
                          </span>
                        </div>
                        <p className="text-sm mb-4">
                          Looking for frontend developers with React expertise.
                          Values strong communication and problem-solving
                          skills...
                        </p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          <span className="text-xs bg-muted px-2 py-1 rounded-full">
                            React
                          </span>
                          <span className="text-xs bg-muted px-2 py-1 rounded-full">
                            TypeScript
                          </span>
                          <span className="text-xs bg-muted px-2 py-1 rounded-full">
                            Next.js
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">
                            5 open positions
                          </span>
                          <Button size="sm">Tailor CV</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="mt-4 text-center">
                <Button variant="outline">View More Companies</Button>
              </div>
            </TabsContent>

            <TabsContent value="saved" className="mt-0">
              <div className="text-center py-8">
                <p className="text-muted-foreground">
                  You haven't saved any companies yet
                </p>
                <Button variant="link">Browse Companies</Button>
              </div>
            </TabsContent>

            <TabsContent value="applied" className="mt-0">
              <div className="space-y-4">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-lg">DesignStudio</h3>
                        <p className="text-muted-foreground text-sm">
                          Design Agency • San Francisco, CA
                        </p>
                      </div>
                      <div className="flex items-center gap-1 text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/50 px-2 py-1 rounded-full text-xs">
                        <Clock size={12} /> Application In Review
                      </div>
                    </div>
                    <div className="mt-4 text-sm">
                      <p>Applied on May 15, 2023</p>
                      <div className="mt-2 flex justify-between">
                        <Button variant="outline" size="sm">
                          View Application
                        </Button>
                        <Button variant="ghost" size="sm">
                          Contact Recruiter
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-lg">TechGrowth</h3>
                        <p className="text-muted-foreground text-sm">
                          Technology • Remote
                        </p>
                      </div>
                      <div className="flex items-center gap-1 text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-950/50 px-2 py-1 rounded-full text-xs">
                        <CheckCircle size={12} /> Interview Scheduled
                      </div>
                    </div>
                    <div className="mt-4 text-sm">
                      <p>Applied on May 10, 2023</p>
                      <div className="mt-2 flex justify-between">
                        <Button variant="outline" size="sm">
                          View Application
                        </Button>
                        <Button variant="ghost" size="sm">
                          Prepare for Interview
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>

        <motion.div initial="hidden" animate="visible" variants={fadeIn}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp size={20} className="text-primary" />
                Career Insights
              </CardTitle>
              <CardDescription>
                Trending skills and qualifications in your field
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium mb-2">
                    Top Skills in Demand
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {["React", "TypeScript", "UI/UX Design", "Node.js"].map(
                      (skill) => (
                        <div
                          key={skill}
                          className="bg-muted p-3 rounded-lg text-center"
                        >
                          <p className="text-sm font-medium">{skill}</p>
                          <p className="text-xs text-muted-foreground">
                            +15% demand
                          </p>
                        </div>
                      )
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-2">Salary Insights</h3>
                  <div className="bg-muted p-4 rounded-lg">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">
                        Average Salary Range (Your Field)
                      </span>
                      <span className="text-sm font-medium">
                        $85,000 - $120,000
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Based on 200+ job postings in your area in the last 30
                      days
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  );
}
