"use client";

import { useState } from "react";

export default function ConnectYoco() {
  const [key, setKey] = useState("");

  async function connect() {
    await fetch(`${process.env.NEXT_PUBLIC_API}/yoco/connect`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ secretKey: key }),
    });

    window.location.href = "/onboarding/success";
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Connect Yoco</h1>

      <input
        value={key}
        onChange={(e) => setKey(e.target.value)}
        placeholder="Yoco Secret Key"
        className="border p-2 w-full"
      />

      <button
        onClick={connect}
        className="mt-4 bg-green-500 text-white p-3 rounded"
      >
        Connect
      </button>
    </div>
  );
}
