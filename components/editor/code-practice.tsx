"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

const Monaco = dynamic(() => import("@monaco-editor/react"), { ssr: false });

export function CodePractice({ task }: { task: string }) {
  const [code, setCode] = useState("function solution() {\n  return 'hello';\n}");
  const [feedback, setFeedback] = useState<string>("Run AI review for feedback.");

  async function review() {
    const res = await fetch("/api/ai/review", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ code, taskContext: task })
    });
    const data = await res.json();
    setFeedback(JSON.stringify(data.review, null, 2));
  }

  return (
    <div className="card">
      <h3 className="mb-3 text-sm font-semibold">Code Practice</h3>
      <div className="overflow-hidden rounded-lg border border-zinc-800">
        <Monaco
          height="240px"
          defaultLanguage="typescript"
          value={code}
          onChange={(val) => setCode(val ?? "")}
          theme="vs-dark"
        />
      </div>
      <div className="mt-3 flex justify-end">
        <button className="button" onClick={review}>
          Review with AI
        </button>
      </div>
      <pre className="mt-3 overflow-x-auto rounded-lg border border-zinc-800 bg-zinc-950 p-3 text-xs text-zinc-300">{feedback}</pre>
    </div>
  );
}
