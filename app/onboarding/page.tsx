"use client";

export default function Onboarding() {
  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Restaurant Onboarding</h1>

      <a
        href={`${process.env.NEXT_PUBLIC_API}/lightspeed/oauth/start`}
        className="block mt-4 bg-blue-500 text-white p-3 rounded"
      >
        Connect Lightspeed
      </a>

      <a
        href="/onboarding/yoco"
        className="block mt-4 bg-green-500 text-white p-3 rounded"
      >
        Connect Yoco
      </a>
    </div>
  );
}
