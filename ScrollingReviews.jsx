// Horizontal infinite scrolling reviews strip component
export function ScrollingReviews() {
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