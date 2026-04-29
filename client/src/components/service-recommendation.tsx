import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Briefcase, Mic, MicOff, Volume2, VolumeX } from "lucide-react";
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
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  const chatAction = useAction(api.chat.chat);

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isBotTyping]);

  useEffect(() => {
    // Show popup after 10 seconds of page load
    const timer = setTimeout(() => {
      setShowInitially(true);
    }, 10000);

    // Initialize Speech Recognition
    if (typeof window !== 'undefined' && ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-IN'; // Support Indian English/Hindi mix

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputValue(transcript);
        setIsListening(false);
        // Automatically send after voice input
        handleChat(transcript);
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }

    return () => clearTimeout(timer);
  }, []);

  const togglePopup = () => {
    setIsOpen(!isOpen);
    if (showInitially) {
      setShowInitially(false);
    }
  };

  const speak = (text: string) => {
    if (!voiceEnabled || typeof window === 'undefined') return;
    
    // Stop any current speech
    window.speechSynthesis.cancel();

    // Remove markdown symbols (**, #, etc) for cleaner speech
    const cleanText = text.replace(/\*\*|\*|#|__/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    
    // Find a good voice
    const voices = window.speechSynthesis.getVoices();
    // Prefer Google Hindi or Microsoft Hemant if available, otherwise any Hindi voice
    const hindiVoice = voices.find(v => v.lang.includes('hi-IN') && (v.name.includes('Google') || v.name.includes('Natural'))) 
                   || voices.find(v => v.lang.includes('hi-IN'));
    
    if (hindiVoice) {
      utterance.voice = hindiVoice;
    }
    
    utterance.lang = 'hi-IN';
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const handleChat = async (text: string) => {
    if (!text.trim()) return;

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
      })).slice(-6); // Keep last 6 messages for context

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
      speak(response.reply);
    } catch (error) {
      console.error('Chat Error:', error);
      const errorMessage: Message = {
        id: 'error',
        text: "Sorry, I'm having trouble connecting. Please try again.",
        isUser: false,
        role: 'assistant'
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsBotTyping(false);
    }
  };

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      recognitionRef.current?.start();
      setIsListening(true);
    }
  };

  return (
    <>
      {/* AI Assistant Button */}
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
                className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
              >
                <X size={16} />
              </button>
              <p className="text-sm font-medium text-gray-700">
                Hi! Main Liv hoon. 😊 Need help with your branding? Talk to me! 🎤
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          onClick={togglePopup}
          className="w-16 h-16 bg-[#FF6B00] rounded-full flex items-center justify-center shadow-lg hover:bg-orange-600 transition-colors relative"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Chat with AI Assistant"
        >
          <Briefcase className="text-white text-3xl" />
          {isBotTyping && (
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full animate-pulse" />
          )}
        </motion.button>
      </div>

      {/* Chat Popup */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            className="fixed bottom-24 right-6 w-80 md:w-96 bg-white rounded-2xl shadow-2xl z-50 overflow-hidden border border-gray-100 flex flex-col h-[500px]"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#FF6B00] to-[#FF8533] text-white p-4 flex justify-between items-center shadow-md">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center border border-white/30 relative">
                  <Briefcase size={20} />
                  {isSpeaking && (
                    <div className="absolute inset-0 rounded-full border-2 border-white animate-ping opacity-50" />
                  )}
                </div>
                <div>
                  <h3 className="font-bold text-sm">Synergy AI - Liv</h3>
                  <div className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                    <span className="text-[10px] opacity-90 uppercase tracking-widest font-bold">Online</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setVoiceEnabled(!voiceEnabled)}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                  {voiceEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
                </button>
                <button
                  onClick={togglePopup}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Chat Messages */}
            <div 
              className="flex-1 p-4 overflow-y-auto flex flex-col space-y-4 bg-gray-50/50"
              data-lenis-prevent
            >
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`rounded-2xl p-4 max-w-[85%] shadow-sm text-sm leading-relaxed ${
                      message.isUser
                        ? 'bg-[#1A1A1A] text-white rounded-tr-none'
                        : 'bg-white text-gray-800 border border-gray-100 rounded-tl-none'
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}

              {isBotTyping && (
                <div className="flex justify-start">
                  <div className="bg-white border border-gray-100 rounded-2xl rounded-tl-none p-4 shadow-sm">
                    <div className="flex space-x-1.5">
                      <div className="w-1.5 h-1.5 bg-[#FF6B00] rounded-full animate-bounce"></div>
                      <div className="w-1.5 h-1.5 bg-[#FF6B00] rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                      <div className="w-1.5 h-1.5 bg-[#FF6B00] rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-gray-100">
              <form 
                onSubmit={(e) => { e.preventDefault(); handleChat(inputValue); }} 
                className="flex items-center gap-2"
              >
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder={isListening ? "Listening..." : "Type or speak..."}
                    className="w-full pl-4 pr-10 py-3 bg-gray-100 border-none rounded-2xl focus:ring-2 focus:ring-orange-500/50 text-sm transition-all"
                  />
                  <button
                    type="button"
                    onClick={toggleListening}
                    className={`absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full transition-all ${
                      isListening ? 'bg-red-500 text-white animate-pulse' : 'text-gray-400 hover:text-orange-500'
                    }`}
                  >
                    {isListening ? <MicOff size={18} /> : <Mic size={18} />}
                  </button>
                </div>
                <Button
                  type="submit"
                  disabled={!inputValue.trim() || isBotTyping}
                  className="bg-[#1A1A1A] hover:bg-black text-white w-12 h-12 rounded-2xl p-0 flex items-center justify-center shadow-lg active:scale-95 transition-transform"
                >
                  <Send size={20} />
                </Button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}