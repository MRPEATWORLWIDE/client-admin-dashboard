"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Send, Mic, Bot, User } from "lucide-react"

interface Message {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
}

export default function ParkpalChatWidget() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "How can I help with your parking today?",
      role: "assistant",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isListening, setIsListening] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: getAIResponse(input),
        role: "assistant",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiResponse])
    }, 1000)
  }

  const getAIResponse = (userInput: string): string => {
    const responses = [
      "I can help you find available parking spots near your location.",
      "Let me check the current parking rates and availability for you.",
      "I can assist with parking reservations and payment options.",
      "Would you like me to help you extend your parking session?",
      "I can provide information about parking regulations in your area.",
    ]
    return responses[Math.floor(Math.random() * responses.length)]
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSend()
    }
  }

  const toggleVoiceInput = () => {
    setIsListening(!isListening)
    // Voice input functionality would be implemented here
    setTimeout(() => setIsListening(false), 2000) // Simulate voice input
  }

  return (
    <Card className="w-full h-96 flex flex-col shadow-lg">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <Bot className="w-5 h-5 text-blue-600" />
          Parkpal Assistant
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col p-0">
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto px-4 space-y-3">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start gap-2 animate-in slide-in-from-bottom-2 duration-300 ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {message.role === "assistant" && (
                <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-1">
                  <Bot className="w-3 h-3 text-blue-600" />
                </div>
              )}
              <div
                className={`max-w-[75%] p-2 rounded-lg text-sm ${
                  message.role === "user"
                    ? "bg-gray-100 text-gray-800"
                    : "bg-blue-50 text-blue-900 border border-blue-100"
                }`}
              >
                {message.content}
              </div>
              {message.role === "user" && (
                <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 mt-1">
                  <User className="w-3 h-3 text-gray-600" />
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        {/* Input Area */}
        <div className="p-4 border-t bg-gray-50">
          <div className="flex gap-2 mb-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about parking..."
              className="flex-1 text-sm"
            />
            <Button
              onClick={toggleVoiceInput}
              variant="outline"
              size="sm"
              className={`px-2 ${isListening ? "bg-red-50 border-red-200" : ""}`}
            >
              <Mic className={`w-4 h-4 ${isListening ? "text-red-500" : "text-gray-500"}`} />
            </Button>
            <Button onClick={handleSend} size="sm" className="px-2">
              <Send className="w-4 h-4" />
            </Button>
          </div>
          {/* Disclaimer */}
          <p className="text-xs text-gray-500 text-center">AI may make mistakes. Verify important details.</p>
        </div>
      </CardContent>
    </Card>
  )
}
