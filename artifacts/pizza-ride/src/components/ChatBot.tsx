import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Mic, MicOff, Volume2, VolumeX, Loader2 } from "lucide-react";

type Message = { role: "user" | "assistant"; content: string };

// Web Speech API types
interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
}
interface SpeechRecognitionInstance extends EventTarget {
  lang: string;
  interimResults: boolean;
  maxAlternatives: number;
  start(): void;
  stop(): void;
  onresult: ((e: SpeechRecognitionEvent) => void) | null;
  onerror: ((e: Event) => void) | null;
  onend: (() => void) | null;
}
declare const webkitSpeechRecognition: new () => SpeechRecognitionInstance;

const API_URL = `${window.location.origin}/api/chat`;

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Namaste! 🍕 Main PizzaBot hoon — Pizza Ride ka assistant! Menu, prices, location ya koi bhi sawaal poochho. Main har language mein jawab de sakta hoon! 😊",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);
  const [voiceOutput, setVoiceOutput] = useState(true);
  const [speakingIndex, setSpeakingIndex] = useState<number | null>(null);

  const bottomRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Focus input when opened
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 300);
  }, [open]);

  const speak = useCallback((text: string, index: number) => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95;
    utterance.pitch = 1;
    utterance.onstart = () => setSpeakingIndex(index);
    utterance.onend = () => setSpeakingIndex(null);
    utterance.onerror = () => setSpeakingIndex(null);
    window.speechSynthesis.speak(utterance);
  }, []);

  const stopSpeaking = useCallback(() => {
    window.speechSynthesis.cancel();
    setSpeakingIndex(null);
  }, []);

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || loading) return;

      const userMsg: Message = { role: "user", content: trimmed };
      const updatedMessages = [...messages, userMsg];
      setMessages(updatedMessages);
      setInput("");
      setLoading(true);

      try {
        const res = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: updatedMessages.map((m) => ({
              role: m.role,
              content: m.content,
            })),
          }),
        });

        const data = await res.json();
        const reply: string = data.reply ?? "Kuch problem ho gayi, dobara try karein! 🙏";
        const botMsg: Message = { role: "assistant", content: reply };
        const finalMessages = [...updatedMessages, botMsg];
        setMessages(finalMessages);

        if (voiceOutput) {
          speak(reply, finalMessages.length - 1);
        }
      } catch {
        const errMsg: Message = {
          role: "assistant",
          content: "Network error! Please check your connection. 🙏",
        };
        setMessages((prev) => [...prev, errMsg]);
      } finally {
        setLoading(false);
      }
    },
    [messages, loading, voiceOutput, speak]
  );

  const startListening = useCallback(() => {
    const SpeechRecognition =
      typeof webkitSpeechRecognition !== "undefined"
        ? webkitSpeechRecognition
        : null;

    if (!SpeechRecognition) {
      alert("Voice input is not supported in this browser. Please use Chrome.");
      return;
    }

    stopSpeaking();
    const recognition = new SpeechRecognition();
    recognition.lang = ""; // auto-detect language
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (e: SpeechRecognitionEvent) => {
      const transcript = e.results[0][0].transcript;
      setInput(transcript);
      setListening(false);
      sendMessage(transcript);
    };

    recognition.onerror = () => setListening(false);
    recognition.onend = () => setListening(false);

    recognitionRef.current = recognition;
    recognition.start();
    setListening(true);
  }, [sendMessage, stopSpeaking]);

  const stopListening = useCallback(() => {
    recognitionRef.current?.stop();
    setListening(false);
  }, []);

  return (
    <>
      {/* Floating button */}
      <motion.button
        onClick={() => setOpen((o) => !o)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.93 }}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-primary text-primary-foreground shadow-2xl flex items-center justify-center"
        aria-label="Open chatbot"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X size={26} />
            </motion.span>
          ) : (
            <motion.span
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="text-2xl"
            >
              🍕
            </motion.span>
          )}
        </AnimatePresence>

        {/* Pulse ring */}
        {!open && (
          <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-30 pointer-events-none" />
        )}
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 32, scale: 0.93 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 32, scale: 0.93 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="fixed bottom-28 right-6 z-50 w-[340px] sm:w-[380px] bg-background border border-border rounded-3xl shadow-2xl flex flex-col overflow-hidden"
            style={{ maxHeight: "calc(100vh - 180px)" }}
          >
            {/* Header */}
            <div className="bg-primary text-primary-foreground px-5 py-4 flex items-center gap-3 shrink-0">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-xl shrink-0">
                🍕
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-base leading-tight">PizzaBot</p>
                <p className="text-primary-foreground/75 text-xs">
                  Pizza Ride Assistant • Online
                </p>
              </div>
              <div className="flex gap-2 items-center">
                {/* Voice output toggle */}
                <button
                  onClick={() => {
                    if (voiceOutput) stopSpeaking();
                    setVoiceOutput((v) => !v);
                  }}
                  className="w-8 h-8 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center transition-colors"
                  title={voiceOutput ? "Mute voice replies" : "Unmute voice replies"}
                >
                  {voiceOutput ? <Volume2 size={15} /> : <VolumeX size={15} />}
                </button>
                <button
                  onClick={() => setOpen(false)}
                  className="w-8 h-8 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center transition-colors"
                >
                  <X size={15} />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 min-h-0">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.role === "assistant" && (
                    <div className="w-7 h-7 bg-primary/10 rounded-full flex items-center justify-center text-sm shrink-0 mt-1">
                      🍕
                    </div>
                  )}
                  <div
                    className={`max-w-[78%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground rounded-br-sm"
                        : "bg-card border border-border text-foreground rounded-bl-sm"
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{msg.content}</p>
                    {msg.role === "assistant" && (
                      <button
                        onClick={() =>
                          speakingIndex === i ? stopSpeaking() : speak(msg.content, i)
                        }
                        className="mt-1.5 text-muted-foreground hover:text-primary transition-colors"
                        title={speakingIndex === i ? "Stop" : "Listen"}
                      >
                        {speakingIndex === i ? (
                          <VolumeX size={13} />
                        ) : (
                          <Volume2 size={13} />
                        )}
                      </button>
                    )}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex gap-2 justify-start">
                  <div className="w-7 h-7 bg-primary/10 rounded-full flex items-center justify-center text-sm shrink-0 mt-1">
                    🍕
                  </div>
                  <div className="bg-card border border-border rounded-2xl rounded-bl-sm px-4 py-3">
                    <div className="flex gap-1 items-center">
                      <span className="w-2 h-2 bg-primary/50 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-2 h-2 bg-primary/50 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-2 h-2 bg-primary/50 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="px-3 py-3 border-t border-border shrink-0 bg-background">
              {listening && (
                <div className="text-center text-xs text-primary font-medium mb-2 flex items-center justify-center gap-1.5">
                  <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                  Bol rahe ho... (Speaking...)
                </div>
              )}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  sendMessage(input);
                }}
                className="flex gap-2 items-center"
              >
                {/* Voice input button */}
                <button
                  type="button"
                  onClick={listening ? stopListening : startListening}
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all shrink-0 ${
                    listening
                      ? "bg-red-500 text-white animate-pulse"
                      : "bg-secondary/15 text-foreground hover:bg-primary/10"
                  }`}
                  title={listening ? "Stop listening" : "Voice input"}
                >
                  {listening ? <MicOff size={17} /> : <Mic size={17} />}
                </button>

                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Kuch bhi poochho... (Any language)"
                  className="flex-1 bg-card border border-border rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
                  disabled={loading || listening}
                />

                <button
                  type="submit"
                  disabled={!input.trim() || loading}
                  className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition-colors disabled:opacity-40 shrink-0"
                >
                  {loading ? (
                    <Loader2 size={17} className="animate-spin" />
                  ) : (
                    <Send size={17} />
                  )}
                </button>
              </form>
              <p className="text-center text-[10px] text-muted-foreground mt-2">
                🎤 Voice input • 🔊 Voice reply • 🌐 Any language
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
