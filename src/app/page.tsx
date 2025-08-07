"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [isWrongPassword, setIsWrongPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate a brief loading delay for better UX
    await new Promise((resolve) => setTimeout(resolve, 800));

    if (password === "upm2025") {
      setIsAuthenticated(true);
    } else {
      setIsWrongPassword(true);
      setTimeout(() => setIsWrongPassword(false), 3000);
    }
    setIsLoading(false);
    setPassword("");
  };

  // Show a simple loading state during hydration
  if (!isMounted) {
    return (
      <div className="w-full h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Power BI Embed - Only show when authenticated */}
      {isAuthenticated && (
        <iframe
          title="iRice Decision Support System"
          className="w-full h-full border-0"
          src="https://app.powerbi.com/reportEmbed?reportId=a0e27e8d-3f0f-4a1c-9cb6-0e6e3b6f83e2&autoAuth=true&ctid=1f551aeb-7ea1-472c-9ac0-09de9bf33051"
          allowFullScreen
        />
      )}

      {/* Password Overlay */}
      <div
        className={`absolute inset-0 flex items-center justify-center transition-all duration-1000 ease-out ${
          isAuthenticated
            ? "opacity-0 pointer-events-none"
            : "opacity-100"
        }`}
        style={{
          background:
            "linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 58, 138, 0.9) 50%, rgba(15, 23, 42, 0.95) 100%)",
        }}
      >
        <div className="relative">
          {/* Glassmorphism Card */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 shadow-2xl max-w-md w-full mx-4 transform transition-all duration-500">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-white mb-2">
                iRice Decision Support
              </h1>
              <p className="text-white/70 text-sm">
                Enter password to access the dashboard
              </p>
            </div>

            {/* Password Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className={`w-full px-4 py-4 bg-white/10 border rounded-2xl text-white placeholder-white/50 focus:outline-none focus:ring-2 transition-all duration-300 ${
                    isWrongPassword
                      ? "border-red-400 focus:ring-red-400 animate-pulse"
                      : "border-white/30 focus:ring-blue-400 focus:border-white/50"
                  }`}
                  disabled={isLoading}
                />
                {isWrongPassword && (
                  <p className="text-red-300 text-sm mt-2 animate-fade-in">
                    Incorrect password. Please try again.
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading || !password.trim()}
                className="w-full py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-2xl shadow-lg hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Authenticating...</span>
                  </div>
                ) : (
                  "Access Dashboard"
                )}
              </button>
            </form>

            {/* Footer */}
            <div className="mt-6 text-center">
              <p className="text-white/40 text-xs">Powered by Power BI</p>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute -top-20 -left-20 w-40 h-40 bg-gradient-to-br from-blue-400/20 to-purple-500/20 rounded-full blur-xl"></div>
          <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-gradient-to-br from-purple-400/20 to-pink-500/20 rounded-full blur-xl"></div>
        </div>
      </div>
    </div>
  );
}
