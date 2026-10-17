import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageSquare, 
  X, 
  Send, 
  Droplets, 
  Sparkles, 
  Bot, 
  User, 
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: "Hello! I am AquaBot, your 24/7 water safety and sanitation assistant. Ask me anything about boiling rules, test strips, TDS limits, disease prevention, or reporting contamination in your area.",
      chips: [
        "How to test if water is safe?",
        "Is boiled water safe from chemicals?",
        "How to report contamination?",
        "Emergency ORS recipe"
      ]
    }
  ]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const quickResponses = {
    test: {
      answer: "To test your water at home:\n1. Look: Pour into a clear glass against white paper. Check for tint or suspended particles.\n2. Smell: Sniff for rotten eggs (sulfur), swimming pool smell (excess chlorine), or musty/earthy scents.\n3. Test strips: Use standard multi-parameter strips to test pH (ideal 6.5-8.5) and Free Chlorine (0.2-1.0 mg/L).\n\nTry our interactive test checklist for step-by-step guidance!",
      link: "/testing-guide",
      linkLabel: "Open Water Testing Guide"
    },
    boil: {
      answer: "Boiling water kills 99.99% of biological pathogens (bacteria, viruses, and cysts like Giardia).\n\n⚠️ IMPORTANT: Boiling does NOT remove heavy metals (lead, arsenic), nitrates, or pesticides. In fact, boiling slightly concentrates dissolved salts. If chemical or high TDS contamination is suspected, Reverse Osmosis (RO) is needed.",
      link: "/purification",
      linkLabel: "Compare Purification Methods"
    },
    report: {
      answer: "You can report water contamination, pipeline leaks, broken hand pumps, or sanitation failures directly through our Report portal. You can attach photos and pinpoint your location. A unique tracking ID will be generated immediately for public tracking.",
      link: "/report",
      linkLabel: "Report an Issue Now"
    },
    ors: {
      answer: "WHO Emergency Home ORS Recipe (Oral Rehydration Solution):\n• 1 Liter clean, boiled drinking water (cooled)\n• 6 level teaspoons sugar\n• 1/2 level teaspoon salt\n\nStir until completely dissolved. Sip continuously after every watery stool to prevent fatal dehydration.",
      link: "/education",
      linkLabel: "Disease Prevention Center"
    },
    tds: {
      answer: "Total Dissolved Solids (TDS) measures minerals and salts dissolved in water (mg/L or ppm):\n• < 300 ppm: Excellent mineral balance\n• 300 - 600 ppm: Good\n• 600 - 900 ppm: Fair\n• > 1,200 ppm: Unacceptable for continuous drinking\n\nTDS between 100-300 ppm contains healthy calcium and magnesium!",
      link: "/dashboard",
      linkLabel: "View Water Quality Dashboard"
    },
    tap: {
      answer: "Check our Interactive Map to find verified safe water points, public taps, and community RO kiosks near your coordinates. You can also filter for public toilets and treatment centers.",
      link: "/map",
      linkLabel: "Open Safe Tap Map"
    }
  };

  const processQuery = (userText) => {
    const text = userText.toLowerCase();
    let reply = null;

    if (text.includes('test') || text.includes('check') || text.includes('safe') || text.includes('smell')) {
      reply = quickResponses.test;
    } else if (text.includes('boil') || text.includes('chemical') || text.includes('heat') || text.includes('kill')) {
      reply = quickResponses.boil;
    } else if (text.includes('report') || text.includes('complaint') || text.includes('leak') || text.includes('dirty')) {
      reply = quickResponses.report;
    } else if (text.includes('ors') || text.includes('diarrhea') || text.includes('dehydration') || text.includes('cholera')) {
      reply = quickResponses.ors;
    } else if (text.includes('tds') || text.includes('ppm') || text.includes('hard') || text.includes('mineral')) {
      reply = quickResponses.tds;
    } else if (text.includes('tap') || text.includes('map') || text.includes('near') || text.includes('find')) {
      reply = quickResponses.tap;
    } else {
      reply = {
        answer: "Thank you for reaching out! AquaSure provides real-time community water monitoring, safe source mapping, and health education aligned with UN SDG 6. You can explore water quality data, report issues, or test your water safety using our tools.",
        link: "/dashboard",
        linkLabel: "Explore AquaSure Dashboard"
      };
    }

    setMessages(prev => [
      ...prev,
      {
        id: Date.now(),
        sender: 'user',
        text: userText
      },
      {
        id: Date.now() + 1,
        sender: 'bot',
        text: reply.answer,
        link: reply.link,
        linkLabel: reply.linkLabel,
        chips: [
          "How to test if water is safe?",
          "What does high TDS mean?",
          "Find nearest safe tap"
        ]
      }
    ]);
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const query = input;
    setInput('');
    processQuery(query);
  };

  const handleChipClick = (chipText) => {
    processQuery(chipText);
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <div className="fixed bottom-6 right-6 z-40">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-ocean-800 to-aqua-600 hover:from-ocean-700 hover:to-aqua-500 text-white shadow-2xl shadow-aqua-500/30 hover:scale-105 transition-all group"
            aria-label="Open AquaBot AI Assistant"
          >
            <div className="relative">
              <Droplets className="w-5 h-5 text-aqua-300 animate-bounce" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-400 rounded-full ring-2 ring-white"></span>
            </div>
            <span className="text-xs font-bold tracking-wide pr-1">
              Ask AquaBot
            </span>
          </button>
        )}
      </div>

      {/* Expanded Chat Drawer / Widget */}
      {isOpen && (
        <div className="fixed bottom-6 right-4 sm:right-6 z-50 w-[92vw] sm:w-96 bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col h-[520px] animate-in slide-in-from-bottom-6">
          
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-ocean-800 via-ocean-700 to-aqua-700 text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center">
                <Bot className="w-5 h-5 text-aqua-200" />
              </div>
              <div>
                <h4 className="font-bold text-sm leading-tight flex items-center gap-1.5">
                  AquaBot Assistant
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                </h4>
                <p className="text-[10px] text-aqua-100">Clean Water & Hygiene Advisor</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50/50 dark:bg-slate-950/40 text-xs">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`p-3 rounded-2xl max-w-[85%] leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-ocean-800 text-white rounded-br-none'
                      : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-200/80 dark:border-slate-700/60 rounded-bl-none shadow-sm'
                  }`}
                >
                  <p className="whitespace-pre-line">{m.text}</p>

                  {/* Context Link */}
                  {m.link && (
                    <div className="mt-2.5 pt-2 border-t border-slate-100 dark:border-slate-700/60">
                      <Link
                        to={m.link}
                        onClick={() => setIsOpen(false)}
                        className="inline-flex items-center gap-1 text-[11px] font-bold text-aqua-600 dark:text-aqua-400 hover:underline"
                      >
                        {m.linkLabel || "Explore related resource"}
                        <ChevronRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  )}
                </div>

                {/* Quick Chips below Bot Message */}
                {m.chips && m.sender === 'bot' && (
                  <div className="flex flex-wrap gap-1.5 mt-2 max-w-[90%]">
                    {m.chips.map((chip, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleChipClick(chip)}
                        className="px-2.5 py-1 rounded-full bg-slate-200/70 hover:bg-aqua-100 dark:bg-slate-800 dark:hover:bg-aqua-950/60 text-slate-700 dark:text-slate-300 hover:text-aqua-800 dark:hover:text-aqua-300 text-[10px] font-medium transition-colors border border-slate-300/40 dark:border-slate-700/60"
                      >
                        {chip}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input */}
          <form onSubmit={handleSend} className="p-3 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2">
            <input
              type="text"
              placeholder="Ask about water safety, boiling, tests..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 px-3.5 py-2 text-xs rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-aqua-500 text-slate-900 dark:text-white"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="p-2 rounded-xl bg-ocean-800 hover:bg-ocean-700 disabled:opacity-40 text-white transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}
    </>
  );
}
