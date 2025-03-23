"use client";

import { Badge } from "@/components/ui/badge";
import React from "react";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  MessageSquare,
  Send,
  ChevronLeft,
  MoreVertical,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import CandidateNavbar from "@/components/candidate-navbar";

export default function CommunicationPage() {
  const messagesEndRef = React.useRef<HTMLDivElement>(null);
  const [activeChat, setActiveChat] = useState<number | null>(0);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "them",
      text: "Hi Alex, I reviewed your application for the Senior Frontend Developer position at TechCorp. Your experience looks great!",
      time: "10:30 AM",
    },
    {
      id: 2,
      sender: "them",
      text: "Would you be available for a video interview next week?",
      time: "10:31 AM",
    },
    {
      id: 3,
      sender: "me",
      text: "Hello Sarah, thank you for reaching out! Yes, I would be available for an interview next week. What days and times work best for you?",
      time: "10:45 AM",
    },
    {
      id: 4,
      sender: "them",
      text: "Great! How about Tuesday at 2:00 PM or Wednesday at 10:00 AM (PST)?",
      time: "11:02 AM",
    },
    {
      id: 5,
      sender: "me",
      text: "Tuesday at 2:00 PM works perfectly for me. Should I expect a Zoom link?",
      time: "11:15 AM",
    },
    {
      id: 6,
      sender: "them",
      text: "Perfect! Yes, I'll send you a Zoom link closer to the date. The interview will be with our Lead Developer and myself.",
      time: "11:20 AM",
    },
    {
      id: 7,
      sender: "them",
      text: "Could you also prepare a brief presentation (5-10 minutes) about a challenging project you've worked on?",
      time: "11:22 AM",
    },
  ]);

  const fadeIn = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  const chats = [
    {
      id: 0,
      name: "Sarah Miller",
      company: "TechCorp Inc.",
      role: "HR Manager",
      unread: 2,
    },
    {
      id: 1,
      name: "James Wilson",
      company: "InnovateSoft",
      role: "Technical Recruiter",
      unread: 0,
    },
    {
      id: 2,
      name: "Emily Chen",
      company: "DesignStudio",
      role: "Creative Director",
      unread: 1,
    },
  ];

  function formatDate(): string {
    const date: Date = new Date();
    let hours: number = date.getHours();
    const minutes: number = date.getMinutes();

    // Determine AM or PM suffix
    const ampm: string = hours >= 12 ? "PM" : "AM";

    // Convert to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'

    // Pad minutes with leading zero if needed
    const minutesStr: string =
      minutes < 10 ? "0" + minutes : minutes.toString();

    // Format the final string
    return `${hours}:${minutesStr} ${ampm}`;
  }

  const handleSendMessage = () => {
    if (message.trim()) {
      // In a real app, you would send the message to the backend
      // In a fake app, push to the chat anyway
      let msgsClone = structuredClone(messages);
      msgsClone.push({
        id: messages.length + 1,
        sender: "me",
        text: message,
        time: formatDate(),
      });
      setMessages(msgsClone);
      setMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const pushMessageToChat = (msg_text: string) => {};

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

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
          <h1 className="text-3xl font-bold mb-2">Messages</h1>
          <p className="text-muted-foreground">
            Communicate with recruiters and employers
          </p>
        </motion.div>

        <motion.div initial="hidden" animate="visible" variants={fadeIn}>
          <Tabs defaultValue="messages">
            <TabsList className="mb-6">
              <TabsTrigger value="messages" className="gap-2 hover:bg-transparent data-[state=active]:bg-transparent">
                <MessageSquare size={16} /> Messages
              </TabsTrigger>
            </TabsList>

            <TabsContent value="messages" className="mt-0">
              <Card className="border-0 shadow-none">
                <CardContent className="p-0">
                  <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 h-[calc(100vh-250px)] min-h-[500px]">
                    <div
                      className={`border-r border-border ${
                        activeChat !== null && "hidden md:block"
                      }`}
                    >
                      <div className="p-4">
                        <Input
                          placeholder="Search messages..."
                          className="mb-4"
                        />

                        <div className="space-y-2">
                          {chats.map((chat) => (
                            <div
                              key={chat.id}
                              className={`p-3 rounded-lg cursor-pointer transition-colors ${
                                activeChat === chat.id
                                  ? "bg-primary/10"
                                  : "hover:bg-muted"
                              }`}
                              onClick={() => setActiveChat(chat.id)}
                            >
                              <div className="flex gap-3">
                                <Avatar>
                                  <AvatarImage
                                    src={`/placeholder.svg?height=40&width=40`}
                                    alt={chat.name}
                                  />
                                  <AvatarFallback>
                                    {chat.name.charAt(0)}
                                  </AvatarFallback>
                                </Avatar>
                                <div className="flex-grow min-w-0">
                                  <div className="flex justify-between items-start">
                                    <h3 className="font-medium truncate">
                                      {chat.name}
                                    </h3>
                                    <span className="text-xs text-muted-foreground">
                                      2h ago
                                    </span>
                                  </div>
                                  <p className="text-sm text-muted-foreground truncate">
                                    {chat.company}
                                  </p>
                                  <p className="text-xs text-primary truncate">
                                    {chat.role}
                                  </p>
                                </div>
                              </div>
                              {chat.unread > 0 && (
                                <div className="flex justify-end mt-1">
                                  <span className="bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full">
                                    {chat.unread} new
                                  </span>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div
                      className={`md:col-span-2 lg:col-span-3 flex flex-col h-[600px] ${
                        activeChat === null && "hidden md:flex"
                      }`}
                    >
                      {activeChat !== null ? (
                        <>
                          <div className="flex-none border-b border-border p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="md:hidden"
                                  onClick={() => setActiveChat(null)}
                                >
                                  <ChevronLeft size={20} />
                                </Button>
                                <Avatar>
                                  <AvatarImage
                                    src={`/placeholder.svg?height=40&width=40`}
                                    alt={chats[activeChat].name}
                                  />
                                  <AvatarFallback>
                                    {chats[activeChat].name.charAt(0)}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <h3 className="font-medium">
                                    {chats[activeChat].name}
                                  </h3>
                                  <p className="text-sm text-muted-foreground">
                                    {chats[activeChat].company}
                                  </p>
                                </div>
                              </div>
                              
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreVertical size={20} />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>
                                    View Profile
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    Mark as Unread
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    Mute Conversation
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="text-red-500">
                                    Block Contact
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </div>

                          <div className="flex-1 overflow-y-auto">
                            <div className="p-4 space-y-4">
                              {messages.map((msg) => (
                                <div
                                  key={msg.id}
                                  className={`flex ${
                                    msg.sender === "me"
                                      ? "justify-end"
                                      : "justify-start"
                                  }`}
                                >
                                  <div
                                    className={`max-w-[80%] md:max-w-[70%] rounded-lg p-3 ${
                                      msg.sender === "me"
                                        ? "bg-primary text-primary-foreground"
                                        : "bg-muted"
                                    }`}
                                  >
                                    <p>{msg.text}</p>
                                    <p
                                      className={`text-xs mt-1 ${
                                        msg.sender === "me"
                                          ? "text-primary-foreground/80"
                                          : "text-muted-foreground"
                                      }`}
                                    >
                                      {msg.time}
                                    </p>
                                  </div>
                                </div>
                              ))}
                              <div ref={messagesEndRef} />
                            </div>
                          </div>

                          <div className="flex-none border-t border-border p-4">
                            <div className="flex items-center gap-2">
                              <Input
                                placeholder="Type a message..."
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                onKeyDown={handleKeyPress}
                                className="flex-grow"
                              />
                              <Button
                                size="icon"
                                onClick={handleSendMessage}
                                disabled={!message.trim()}
                              >
                                <Send size={20} />
                              </Button>
                            </div>
                          </div>
                        </>
                      ) : (
                        <div className="flex-grow flex items-center justify-center">
                          <div className="text-center">
                            <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                            <h3 className="text-lg font-medium mb-2">
                              Select a conversation
                            </h3>
                            <p className="text-muted-foreground">
                              Choose a conversation from the list to start
                              messaging
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </main>
    </div>
  );
}
