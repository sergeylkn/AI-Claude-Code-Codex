"use client";

import { useState } from "react";

type Message = { role: "user" | "assistant"; content: string };

export function ChatPanel({ lessonId }: { lessonId: string | null }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendMessage() {
    if (!input.trim()) return;
    const value = input;
    setInput("");
    setMessages((m) => [...m, { role: "user", content: value }]);
    setLoading(true);

    const chatRes = await fetch("/api/ai/chat", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ message: value, lessonId })
    });

    if (!chatRes.ok) {
      const err = await chatRes.json();
      setMessages((m) => [...m, { role: "assistant", content: err.error ?? "Failed to connect." }]);
      setLoading(false);
      return;
    }

    const data = await chatRes.json();
    const text = typeof data.response === "string" ? data.response : JSON.stringify(data.response);
    setMessages((m) => [...m, { role: "assistant", content: text }]);
    setLoading(false);
  }

  return (
    <div className="card flex h-[420px] flex-col">
      <h3 className="mb-2 text-sm font-semibold">AI Assistant</h3>
      <div className="mb-3 flex-1 space-y-2 overflow-y-auto rounded-lg border border-zinc-800 p-3">
        {messages.length === 0 ? <p className="text-sm text-zinc-400">Ask about this lesson.</p> : null}
        {messages.map((msg, index) => (
          <div key={index} className={msg.role === "user" ? "text-zinc-100" : "text-indigo-300"}>
            <span className="mr-2 text-xs uppercase">{msg.role}:</span>
            <span className="text-sm">{msg.content}</span>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input className="input" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask Claude..." />
        <button onClick={sendMessage} disabled={loading} className="button">
          Send
        </button>
      </div>
    </div>
  );
}
