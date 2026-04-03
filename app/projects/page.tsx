"use client";

import { useState } from "react";
import { Sidebar } from "@/components/layout/sidebar";

export default function ProjectsPage() {
  const [idea, setIdea] = useState("");
  const [result, setResult] = useState("Generate a full project plan from your SaaS idea.");
  const [loading, setLoading] = useState(false);

  async function generate() {
    setLoading(true);
    const res = await fetch("/api/projects/generate", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ idea })
    });

    const data = await res.json();
    setResult(JSON.stringify(data.result, null, 2));
    setLoading(false);
  }

  return (
    <div className="md:flex">
      <Sidebar />
      <main className="flex-1 p-6">
        <h1 className="mb-4 text-2xl font-semibold">AI Project Generator</h1>
        <div className="card mb-4">
          <textarea
            className="input min-h-24"
            placeholder="I want to build a SaaS for..."
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
          />
          <button className="button mt-3" onClick={generate} disabled={loading || !idea.trim()}>
            Generate project
          </button>
        </div>
        <pre className="card overflow-x-auto text-xs text-zinc-300">{result}</pre>
      </main>
    </div>
  );
}
