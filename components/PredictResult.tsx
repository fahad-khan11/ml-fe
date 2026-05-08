"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, TrendingUp, DollarSign } from "lucide-react";

interface PredictResultProps {
  price: number | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function PredictResult({ price, isOpen, onClose }: PredictResultProps) {
  if (!isOpen) return null;

  const formattedPrice = price ? new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(price) : "$0";

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      >
        <motion.div
          initial={{ scale: 0.9, y: 20, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.9, y: 20, opacity: 0 }}
          className="relative w-full max-w-md glass-card p-8 neon-border flex flex-col items-center"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="w-16 h-16 rounded-full bg-neon-teal/20 flex items-center justify-center mb-6 neon-border">
            <TrendingUp className="w-8 h-8 text-neon-teal" />
          </div>

          <h2 className="text-2xl font-bold mb-2 text-white">Estimated Value</h2>
          <p className="text-slate-400 mb-8 text-center">
            Based on our AI model's analysis of the house features.
          </p>

          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-neon-teal to-neon-blue rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative glass px-8 py-5 border border-neon-teal/30 rounded-xl flex items-center gap-3">
              <span className="text-4xl md:text-5xl font-black text-neon-teal tracking-tight">
                {formattedPrice}
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="mt-10 w-full neon-glow-btn"
          >
            Done
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
