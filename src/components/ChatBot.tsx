
import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, X, MessageSquare } from 'lucide-react';
import { Button } from './ui/button';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from './ui/drawer';
import { useToast } from '@/hooks/use-toast';

interface Message {
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const initialMessages: Message[] = [
  {
    text: "👋 Hello! I'm NightCart's customer service bot. How can I help you today?",
    isBot: true,
    timestamp: new Date(),
  },
];

const ChatBot = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Auto-scroll to the bottom of the chat
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (inputValue.trim() === '') return;

    // Add user message
    const userMessage: Message = {
      text: inputValue.trim(),
      isBot: false,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Simulate API response delay
    setTimeout(() => {
      handleBotResponse(userMessage.text);
    }, 1000);
  };

  const handleBotResponse = (userQuery: string) => {
    // Simple response logic based on keywords
    let botResponse = '';
    const query = userQuery.toLowerCase();
    
    if (query.includes('hello') || query.includes('hi')) {
      botResponse = "Hello! How can I assist you with your shopping today?";
    } else if (query.includes('help')) {
      botResponse = "I'd be happy to help! You can ask me about products, order tracking, returns, or anything else you need assistance with.";
    } else if (query.includes('order') && (query.includes('track') || query.includes('status'))) {
      botResponse = "To track your order, please provide your order number and I'll check the status for you.";
    } else if (query.includes('return')) {
      botResponse = "Our return policy allows returns within 30 days of purchase. Would you like me to guide you through the return process?";
    } else if (query.includes('discount') || query.includes('coupon') || query.includes('promo')) {
      botResponse = "You can use code 'WELCOME10' to get 10% off your first purchase!";
    } else if (query.includes('contact') || query.includes('human') || query.includes('agent')) {
      botResponse = "You can reach our customer service team at support@nightcart.com or call us at +91 1800-123-4567.";
    } else if (query.includes('payment') || query.includes('pay')) {
      botResponse = "We accept all major credit cards, UPI, net banking, and cash on delivery.";
    } else if (query.includes('delivery') || query.includes('shipping')) {
      botResponse = "Delivery typically takes 3-5 business days. Express delivery is available for an additional fee.";
    } else if (query.includes('thank')) {
      botResponse = "You're welcome! Is there anything else I can help you with?";
    } else {
      botResponse = "I'm not sure I understand. Could you please rephrase your question or ask about our products, orders, returns, or delivery?";
    }

    const newBotMessage: Message = {
      text: botResponse,
      isBot: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, newBotMessage]);
    setIsLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerTrigger asChild>
          <Button 
            className="h-14 w-14 rounded-full shadow-lg bg-primary hover:bg-primary/90"
            aria-label="Open chatbot"
          >
            {isOpen ? <X /> : <MessageSquare />}
          </Button>
        </DrawerTrigger>
        <DrawerContent className="h-[70vh] max-w-[400px] mx-auto rounded-t-xl">
          <DrawerHeader className="bg-gradient-soft rounded-t-xl border-b">
            <DrawerTitle className="flex items-center gap-2">
              <Bot className="h-5 w-5" />
              <span>Customer Support</span>
            </DrawerTitle>
          </DrawerHeader>
          <div className="flex flex-col h-full p-4">
            <div className="flex-1 overflow-y-auto mb-4">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`mb-4 ${
                    msg.isBot ? 'flex flex-row' : 'flex flex-row-reverse'
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      msg.isBot
                        ? 'bg-secondary text-secondary-foreground'
                        : 'bg-primary text-primary-foreground'
                    }`}
                  >
                    <p className="text-sm">{msg.text}</p>
                    <p className="text-xs opacity-70 text-right mt-1">
                      {formatTime(msg.timestamp)}
                    </p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex flex-row mb-4">
                  <div className="max-w-[80%] rounded-lg p-3 bg-secondary text-secondary-foreground">
                    <div className="flex space-x-2">
                      <div className="h-2 w-2 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                      <div className="h-2 w-2 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                      <div className="h-2 w-2 bg-primary rounded-full animate-bounce"></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            <div className="relative">
              <textarea
                className="w-full border rounded-lg pl-3 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                placeholder="Type your message here..."
                rows={2}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <Button
                className="absolute right-2 bottom-2"
                size="icon"
                variant="ghost"
                onClick={handleSendMessage}
                disabled={inputValue.trim() === '' || isLoading}
              >
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default ChatBot;
