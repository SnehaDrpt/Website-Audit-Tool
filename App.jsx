import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Horizontal infinite scrolling reviews strip component
function ScrollingReviews() {
  const reviews = [
    "Amazing audit tool! - Sneha A.",
    "Helped us fix major security holes. Highly recommend. - Anagha S.",
    "Fast, clear reports and easy to use. - Spoorthi P.",
    "Excellent support and great UI experience. - Sneha A.",
    "Improved our SEO rankings within weeks. - Anagha S.",
  ];

  // Duplicate reviews for seamless scrolling
  const allReviews = [...reviews, ...reviews];

  return (
    <div className="overflow-hidden whitespace-nowrap py-4 bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 rounded-lg shadow-lg mx-auto max-w-5xl">
      <div
        className="inline-block animate-marquee"
        style={{ paddingLeft: "100%" }}
      >
        {allReviews.map((review, idx) => (
          <span
            key={idx}
            className="inline-block mr-16 text-white font-semibold text-lg"
          >
            {review}
          </span>
        ))}
      </div>

      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: inline-block;
          white-space: nowrap;
          animation: marquee 20s linear infinite;
        }
      `}</style>
    </div>
  );
}

// Features list with fade-in animation
function Features() {
  const features = [
    "Comprehensive security scan",
    "Performance bottleneck detection",
    "SEO optimization recommendations",
    "Accessibility compliance checks",
    "User-friendly report generation",
    "Real-time audit with animations",
  ];

  return (
    <section className="max-w-4xl mx-auto p-6 my-8 rounded-lg bg-gradient-to-r from-blue-400 to-cyan-500 text-white shadow-lg">
      <h2 className="text-3xl font-extrabold mb-6 drop-shadow-lg">Key Features</h2>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {features.map((feature, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15, duration: 0.5 }}
            className="bg-white bg-opacity-20 rounded-lg p-4 shadow-md text-lg font-semibold"
          >
            {feature}
          </motion.li>
        ))}
      </ul>
    </section>
  );
}

// Audit categories listing component
function Category({ title, items }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="mb-6 p-4 rounded-lg shadow bg-white text-gray-800"
    >
      <h3 className="text-xl font-bold mb-2 capitalize">{title}</h3>
      {items.length > 0 ? (
        <ul className="list-disc list-inside">
          {items.map((item, idx) => (
            <li key={idx} className={title === "security" ? "text-red-600" : ""}>
              {item}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-green-600 font-semibold">No issues found</p>
      )}
    </motion.div>
  );
}

export default function App() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState(null);
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setReport(null);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("url", url);
      const response = await fetch("http://localhost:5000/audit", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) throw new Error("Failed to fetch audit report");
      const data = await response.json();
      setReport(data);
    } catch (err) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-tr from-purple-700 via-pink-600 to-indigo-700 font-sans p-6 text-white">
      {/* Header */}
      <header className="text-center mb-6">
        <img
          src="/sas_logo.png"
          alt="SAS Logo"
          className="mx-auto w-24 h-24 rounded-full shadow-lg mb-2"
        />
        <h1 className="text-5xl font-extrabold drop-shadow-lg">
          SAS Website Audit Tool
        </h1>
        <p className="italic">Sneha Anagha Spoorthi</p>
      </header>

      {/* Reviews scrolling carousel */}
      <ScrollingReviews />

      {/* Audit Form and Results */}
      <main className="max-w-3xl mx-auto bg-white bg-opacity-20 rounded-xl p-8 shadow-lg text-gray-900">
        <form onSubmit={handleSubmit} className="flex mb-6 space-x-4">
          <input
            type="url"
            placeholder="Enter website URL"
            disabled={loading}
            value={url}
            required
            onChange={(e) => setUrl(e.target.value)}
            className="flex-grow px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-purple-600 hover:bg-purple-800 text-white px-6 rounded-lg font-semibold"
          >
            {loading ? "Auditing..." : "Audit"}
          </button>
        </form>

        {error && (
          <p className="text-red-600 mb-4 font-semibold text-center">{error}</p>
        )}

        <AnimatePresence>
          {report && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
            >
              {/* Overall threat banner */}
              {report.overall_threat && (
                <div
                  className={`mb-6 p-4 rounded font-bold text-center text-white ${
                    {
                      No: "bg-green-600",
                      Low: "bg-yellow-500 text-gray-900",
                      Medium: "bg-orange-500",
                      High: "bg-red-600",
                    }[report.overall_threat]
                  }`}
                >
                  Overall Threat Level: {report.overall_threat}
                </div>
              )}

              {/* Audit categories */}
              {["security", "performance", "seo", "accessibility"].map((cat) => (
                <Category key={cat} title={cat} items={report[cat]} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Features Section */}
      <Features />
    </div>
  );
}