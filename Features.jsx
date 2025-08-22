import { motion } from "framer-motion";

export function Features() {
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