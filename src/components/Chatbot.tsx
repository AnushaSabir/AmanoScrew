"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, User, ShieldCheck, ChevronRight } from "lucide-react";

type Message = {
  id: number;
  text: string;
  sender: "bot" | "user";
};

const SUGGESTED_QUESTIONS = [
  "How does Amano work?",
  "How are payments protected?",
  "How do I start a transaction?",
  "What happens during disputes?",
  "Is Amano secure?",
  "How long does verification take?"
];

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Welcome to Amano Secure Escrow 👋\n\nI can help you understand how secure escrow transactions work, how buyers and sellers are protected, and how to start a safe transaction.",
      sender: "bot",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const generateResponse = (input: string) => {
    const lowerInput = input.toLowerCase();
    
    if (lowerInput.includes("how") && lowerInput.includes("work")) {
      return "Amano works in 5 simple, secure steps:\n\n1. **Create Agreement**: Define terms and price.\n2. **Deposit Funds**: Buyer securely deposits funds into our vault.\n3. **Verification**: AI verifies the parties and terms.\n4. **Task Completion**: Seller delivers the goods or services.\n5. **Release Payment**: Funds are instantly released to the seller.";
    }
    if (lowerInput.includes("protect") || lowerInput.includes("safe")) {
      return "Payments are protected using institutional-grade escrow vaults and 256-bit SSL encryption. We hold the funds securely so the buyer knows the money won't be released until conditions are met, and the seller knows the funds are guaranteed before they start working.";
    }
    if (lowerInput.includes("start")) {
      return "To start a transaction, simply click the 'START A DEAL' button on our platform. You'll be guided to enter the counterparty's details, define the contract terms, and set the deposit amount.";
    }
    if (lowerInput.includes("dispute") || lowerInput.includes("problem")) {
      return "If a disagreement arises, our Dispute Center handles it. A combination of our AI mediators and human support team will review the original contract terms and evidence to resolve the issue fairly for both parties.";
    }
    if (lowerInput.includes("secure") || lowerInput.includes("security")) {
      return "Yes, absolutely. Amano uses bank-grade security architecture. We are fully regulatory compliant, employ end-to-end encryption, and use automated fraud detection to ensure zero fraud risk.";
    }
    if (lowerInput.includes("verification") || lowerInput.includes("long")) {
      return "Our AI-powered verification process is nearly instant. In most cases, identity and transaction terms are verified within seconds, allowing you to proceed with your deal without delay. Manual reviews, if triggered, take under 24 hours.";
    }
    if (lowerInput.includes("fee") || lowerInput.includes("cost")) {
      return "We charge a transparent platform fee starting at 1.5% per transaction, with no hidden costs.";
    }

    return "I'm here to help with your transactions. For specific account issues or more complex questions, please contact our human support team at support@amanoescrow.com.";
  };

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    // Add user message
    const newUserMsg: Message = { id: Date.now(), text, sender: "user" };
    setMessages((prev) => [...prev, newUserMsg]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const botResponseText = generateResponse(text);
      setMessages((prev) => [...prev, { id: Date.now(), text: botResponseText, sender: "bot" }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 md:bottom-8 md:right-8 p-4 bg-primary text-white rounded-full shadow-[0_10px_25px_rgba(7,27,77,0.3)] hover:bg-primary/90 transition-all hover:scale-110 z-50 flex items-center justify-center border-2 border-white/20 ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}
        aria-label="Open AI Assistant"
      >
        <MessageCircle className="h-8 w-8" />
        <span className="absolute 0 top-0 right-0 w-4 h-4 bg-accent rounded-full border-2 border-white"></span>
      </button>

      {/* Chat Window */}
      <div
        className={`fixed bottom-6 right-6 md:bottom-8 md:right-8 w-[calc(100%-48px)] md:w-[400px] bg-white rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] border border-slate-200/60 z-50 flex flex-col overflow-hidden transition-all duration-300 origin-bottom-right ${
          isOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 translate-y-8 pointer-events-none'
        }`}
        style={{ height: '600px', maxHeight: 'calc(100vh - 48px)' }}
      >
        {/* Premium Header */}
        <div className="bg-primary p-5 flex items-center justify-between shrink-0 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
          <div className="flex items-center gap-4 relative z-10">
            <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center border border-white/20 shadow-inner">
              <Bot className="h-7 w-7 text-accent" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base tracking-wide">Amano Assistant</h3>
              <div className="flex items-center gap-1.5 text-xs text-slate-200 font-medium mt-0.5">
                <span className="w-2 h-2 bg-accent rounded-full animate-pulse"></span> AI Support Online
              </div>
            </div>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="text-slate-300 hover:text-white hover:bg-white/10 p-2 rounded-xl transition-colors relative z-10"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Security Banner */}
        <div className="bg-slate-50 border-b border-slate-100 py-2.5 px-4 flex items-center justify-center gap-2 shrink-0">
          <ShieldCheck className="h-4 w-4 text-accent" />
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">End-to-End Encrypted Chat</span>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5 bg-slate-50/50">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex max-w-[85%] gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-auto ${msg.sender === 'user' ? 'bg-secondary text-white shadow-sm' : 'bg-primary/10 text-primary border border-primary/20 shadow-sm'}`}>
                  {msg.sender === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                </div>

                <div className={`p-4 rounded-2xl text-sm leading-relaxed ${
                  msg.sender === 'user' 
                    ? 'bg-secondary text-white rounded-br-sm shadow-md' 
                    : 'bg-white border border-slate-100 text-slate-700 rounded-bl-sm shadow-md whitespace-pre-line font-medium'
                }`}>
                  {msg.text}
                </div>

              </div>
            </div>
          ))}

          {/* Quick Suggestions (Only show if bot is the last message and not typing) */}
          {!isTyping && messages[messages.length - 1].sender === 'bot' && (
            <div className="flex flex-col gap-2 pl-11 pt-2">
              {SUGGESTED_QUESTIONS.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(q)}
                  className="text-left text-xs font-bold text-secondary bg-blue-50 border border-blue-100 hover:bg-secondary hover:text-white px-4 py-2.5 rounded-xl transition-all w-fit shadow-sm flex items-center gap-2 group"
                >
                  {q}
                  <ChevronRight className="h-3 w-3 opacity-50 group-hover:opacity-100" />
                </button>
              ))}
            </div>
          )}
          
          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex gap-3 max-w-[85%]">
                <div className="w-8 h-8 rounded-full bg-primary/10 text-primary border border-primary/20 flex items-center justify-center shrink-0 mt-auto shadow-sm">
                  <Bot className="h-4 w-4" />
                </div>
                <div className="bg-white border border-slate-100 p-4 rounded-2xl rounded-bl-sm shadow-md flex items-center gap-1.5 h-[52px]">
                  <span className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                  <span className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                  <span className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white border-t border-slate-100 shrink-0">
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              handleSend(inputValue);
            }} 
            className="flex items-center gap-2 relative"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask the Amano Assistant..."
              className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-5 py-3.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all"
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isTyping}
              className="w-12 h-12 bg-primary hover:bg-primary/90 disabled:bg-slate-300 disabled:cursor-not-allowed text-white rounded-xl flex items-center justify-center transition-colors shadow-sm"
            >
              <Send className="h-5 w-5 ml-0.5" />
            </button>
          </form>
          <div className="text-center mt-3">
            <span className="text-[10px] text-slate-400 font-semibold tracking-wide">AI Assistant may produce inaccurate information.</span>
          </div>
        </div>
      </div>
    </>
  );
}
