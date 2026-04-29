import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAction } from "convex/react";
import { api } from "../../../convex/_generated/api";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  role?: 'user' | 'assistant';
}

export default function ServiceRecommendation() {
  const [isOpen, setIsOpen] = useState(false);
  const [showInitially, setShowInitially] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      text: "Hi there! 👋 I'm Synergy AI Assistant. How can I help you today with your branding or digital marketing needs?",
      isUser: false,
      role: 'assistant'
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isBotTyping, setIsBotTyping] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatAction = useAction(api.chat.chat);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isBotTyping]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowInitially(true);
    }, 10000);
    return () => clearTimeout(timer);
  }, []);

  const togglePopup = () => {
    setIsOpen(!isOpen);
    if (showInitially) {
      setShowInitially(false);
    }
  };

  const handleChat = async (text: string) => {
    if (!text.trim() || isBotTyping) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: text,
      isUser: true,
      role: 'user'
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsBotTyping(true);

    try {
      const history = messages.map(m => ({
        role: m.role || (m.isUser ? 'user' : 'assistant'),
        content: m.text
      })).slice(-6);

      const response = await chatAction({ 
        message: text, 
        history 
      });
      
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: response.reply,
        isUser: false,
        role: 'assistant'
      };

      setMessages((prev) => [...prev, botResponse]);
    } catch (error) {
      console.error('Chat Error:', error);
      const errorMessage: Message = {
        id: 'error',
        text: "Sorry, I'm having trouble connecting. Please try again later.",
        isUser: false,
        role: 'assistant'
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsBotTyping(false);
    }
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <AnimatePresence>
          {showInitially && !isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.8 }}
              className="bg-white p-4 rounded-lg shadow-lg mb-4 max-w-xs fixed bottom-24 right-6 border border-orange-100"
            >
              <button
                onClick={() => setShowInitially(false)}
                className="absolute -top-2 -right-2 bg-white rounded-full shadow-md p-1 hover:bg-gray-100"
              >
                <X size={14} />
              </button>
              <p className="text-sm text-gray-700 font-medium">
                Scaling your business? Ask our AI expert for advice! 🚀
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={togglePopup}
          className="bg-gradient-to-r from-[#FF6B00] to-[#FF8533] text-white p-4 rounded-full shadow-2xl flex items-center justify-center group relative"
          aria-label="AI Assistant"
        >
          {isOpen ? <X size={28} /> : <Briefcase size={28} />}
          {!isOpen && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-orange-500 border-2 border-white"></span>
            </span>
          )}
        </motion.button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            className="fixed bottom-24 right-6 w-80 md:w-96 bg-white rounded-2xl shadow-2xl z-50 overflow-hidden border border-gray-100 flex flex-col h-[500px]"
          >
            <div className="bg-gradient-to-r from-[#FF6B00] to-[#FF8533] text-white p-4 flex justify-between items-center shadow-md">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/30">
                  <Briefcase size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-sm tracking-wide">Synergy AI - Liv</h3>
                  <div className="flex items-center space-x-1">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                    <span className="text-[10px] text-white/80 font-medium uppercase tracking-widest">Online</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={togglePopup}
                className="hover:bg-white/20 p-2 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div 
              className="flex-1 p-4 overflow-y-auto flex flex-col space-y-4 bg-gray-50/50"
              data-lenis-prevent
            >
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[85%] p-3 rounded-2xl shadow-sm ${
                      message.isUser
                        ? "bg-[#FF6B00] text-white rounded-tr-none"
                        : "bg-white text-gray-800 rounded-tl-none border border-gray-100"
                    }`}
                  >
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.text}</p>
                  </div>
                </div>
              ))}
              {isBotTyping && (
                <div className="flex justify-start">
                  <div className="bg-white border border-gray-100 p-3 rounded-2xl rounded-tl-none shadow-sm">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                      <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <form 
              onSubmit={(e) => { e.preventDefault(); handleChat(inputValue); }} 
              className="p-4 bg-white border-t border-gray-100 flex items-center space-x-2"
            >
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Type your message..."
                  className="w-full p-3 pr-4 bg-gray-50 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                  disabled={isBotTyping}
                />
              </div>
              <Button 
                type="submit"
                disabled={!inputValue.trim() || isBotTyping}
                className="bg-[#FF6B00] hover:bg-[#FF8533] text-white rounded-full p-3 h-auto shadow-md"
              >
                <Send size={18} />
              </Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}