import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Mic, 
  MicOff, 
  Send, 
  Bot, 
  User, 
  Volume2,
  Lightbulb,
  Leaf,
  Cloud,
  Zap
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

const quickActions = [
  { icon: Leaf, label: "Crop Health Check", query: "How is my crop health?" },
  { icon: Cloud, label: "Weather Advice", query: "What's the weather forecast for farming?" },
  { icon: Zap, label: "Pest Control", query: "Help me with pest control solutions" },
  { icon: Lightbulb, label: "Fertilizer Tips", query: "What fertilizer should I use?" }
];

const sampleResponses = [
  "Based on your location and crop type, I recommend checking for aphids during this season. Here are some organic solutions...",
  "The weather looks good for the next 3 days with moderate rainfall. This is perfect timing for your irrigation schedule.",
  "For your tomato crop, I suggest using organic neem oil spray. Apply it early morning or evening for best results.",
  "Your soil analysis indicates low nitrogen levels. Consider using compost or organic fertilizer in the next few days."
];

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: "Hello! I'm your AI farming assistant. I can help you with crop management, weather advice, pest control, and more. How can I assist you today?",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (message: string = inputMessage) => {
    if (!message.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: message,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: sampleResponses[Math.floor(Math.random() * sampleResponses.length)],
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const handleVoiceToggle = () => {
    setIsListening(!isListening);
    // Simulate voice input
    if (!isListening) {
      setTimeout(() => {
        setInputMessage("Help me identify pest problems in my tomato plants");
        setIsListening(false);
      }, 3000);
    }
  };

  const handleQuickAction = (query: string) => {
    handleSendMessage(query);
  };

  return (
    <div className="min-h-screen bg-gradient-card">
      <div className="container mx-auto p-4 max-w-4xl">
        {/* Header */}
        <div className="text-center space-y-4 mb-8 animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-2xl shadow-medium">
            <Bot className="h-8 w-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold text-foreground">AI Farming Assistant</h1>
          <p className="text-muted-foreground">
            Get instant answers to your farming questions with voice support
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6 animate-slide-up">
          {quickActions.map((action, index) => (
            <Button
              key={index}
              variant="outline"
              className="p-4 h-auto flex-col gap-2 hover:shadow-medium transition-all bg-card"
              onClick={() => handleQuickAction(action.query)}
            >
              <action.icon className="h-6 w-6 text-primary" />
              <span className="text-sm font-medium">{action.label}</span>
            </Button>
          ))}
        </div>

        {/* Chat Messages */}
        <Card className="mb-6 shadow-medium bg-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-primary" />
              Chat with AI Assistant
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-96 overflow-y-auto space-y-4 p-4 border rounded-lg bg-muted/20">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex gap-3 animate-fade-in",
                    message.type === 'user' ? 'justify-end' : 'justify-start'
                  )}
                >
                  <div
                    className={cn(
                      "flex gap-3 max-w-[80%]",
                      message.type === 'user' ? 'flex-row-reverse' : 'flex-row'
                    )}
                  >
                    <div
                      className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
                        message.type === 'user' 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-accent text-accent-foreground'
                      )}
                    >
                      {message.type === 'user' ? 
                        <User className="h-4 w-4" /> : 
                        <Bot className="h-4 w-4" />
                      }
                    </div>
                    <div
                      className={cn(
                        "p-3 rounded-xl shadow-soft",
                        message.type === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-card border border-border'
                      )}
                    >
                      <p className="text-sm">{message.content}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <p className={cn(
                          "text-xs opacity-70",
                          message.type === 'user' ? 'text-primary-foreground' : 'text-muted-foreground'
                        )}>
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                        {message.type === 'bot' && (
                          <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                            <Volume2 className="h-3 w-3" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex gap-3 justify-start animate-fade-in">
                  <div className="w-8 h-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center">
                    <Bot className="h-4 w-4" />
                  </div>
                  <div className="bg-card border border-border p-3 rounded-xl shadow-soft">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          </CardContent>
        </Card>

        {/* Input Area */}
        <Card className="shadow-medium bg-card">
          <CardContent className="p-4">
            <div className="flex gap-3 items-end">
              <div className="flex-1 space-y-2">
                {isListening && (
                  <Badge variant="secondary" className="animate-bounce-gentle">
                    <Mic className="h-3 w-3 mr-1" />
                    Listening...
                  </Badge>
                )}
                <div className="flex gap-2">
                  <Input
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Ask about crops, weather, pest control..."
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="flex-1"
                    disabled={isLoading}
                  />
                  <Button
                    variant={isListening ? "destructive" : "secondary"}
                    size="sm"
                    onClick={handleVoiceToggle}
                    className="px-3"
                  >
                    {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                  </Button>
                  <Button
                    onClick={() => handleSendMessage()}
                    disabled={!inputMessage.trim() || isLoading}
                    className="px-3 bg-gradient-primary"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="mt-3 text-center">
              <p className="text-xs text-muted-foreground">
                Tip: Use voice input for hands-free farming assistance while working in the field
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}