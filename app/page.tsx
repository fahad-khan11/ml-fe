"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Home, 
  Layers, 
  Maximize, 
  Car, 
  Calendar, 
  Droplets, 
  Utensils, 
  Database, 
  RefreshCcw, 
  MapPin,
  Sparkles,
  ArrowRight
} from "lucide-react";
import PredictResult from "@/components/PredictResult";

export default function HousePredictionPage() {
  const [formData, setFormData] = useState({
    overallQuality: 5,
    totalSquareFootage: 2000,
    aboveGroundLivingArea: 1500,
    garageCarCapacity: 2,
    houseAge: 20,
    totalBathrooms: 2,
    kitchenQuality: 3,
    basementQuality: 3,
    yearsSinceRemodel: 10,
    isNorthridgeHeights: false,
  });

  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : Number(value),
    }));
  };

  const handleToggle = () => {
    setFormData((prev) => ({
      ...prev,
      isNorthridgeHeights: !prev.isNorthridgeHeights,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Map frontend camelCase to backend PascalCase as expected by HouseInput schema
    const payload = {
      OverallQual: formData.overallQuality,
      totalSF: formData.totalSquareFootage,
      GrLivArea: formData.aboveGroundLivingArea,
      GarageCars: formData.garageCarCapacity,
      HouseAge: formData.houseAge,
      TotalBathrooms: formData.totalBathrooms,
      KitchenQual: formData.kitchenQuality,
      BsmtQual: formData.basementQuality,
      YearsSinceRemod: formData.yearsSinceRemodel,
      Neighborhood_NridgHt: formData.isNorthridgeHeights ? 1 : 0,
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Backend Error Detail:", errorData);
        throw new Error("Prediction failed");
      }

      const data = await response.json();
      setPrediction(data.predicted_price);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error:", error);
      alert("Prediction API error. Check if backend is running and the fields match.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#020617] text-white p-6 md:p-12 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-neon-teal/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-neon-blue/10 rounded-full blur-[120px] pointer-events-none" />
      
      {/* Decorative Hero Image */}
      <div className="absolute right-[-10%] top-[10%] w-[500px] h-[500px] opacity-20 pointer-events-none hidden lg:block">
        <img src="/hero-bg.png" alt="AI House Background" className="w-full h-full object-contain mix-blend-lighten" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <header className="mb-12 text-center md:text-left">
          <div className="flex items-center gap-2 mb-4 justify-center md:justify-start">
            <div className="p-2 bg-neon-teal/20 rounded-lg border border-neon-teal/30">
              <Sparkles className="w-6 h-6 text-neon-teal" />
            </div>
            <span className="text-neon-teal font-medium tracking-widest uppercase text-sm">AI Real Estate Engine</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tight">
            Predict House <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-teal to-neon-blue">Market Value</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl">
            Input the property specifications below to receive an instant, AI-driven valuation powered by our neural networks.
          </p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Overall Quality */}
            <div className="glass-card p-6 space-y-4">
              <div className="flex items-center gap-3">
                <Layers className="w-5 h-5 text-neon-teal" />
                <label className="font-semibold">Overall Quality (1-10)</label>
              </div>
              <input
                type="range"
                name="overallQuality"
                min="1"
                max="10"
                step="1"
                value={formData.overallQuality}
                onChange={handleChange}
                className="w-full accent-neon-teal"
              />
              <div className="flex justify-between text-xs text-slate-500">
                <span>Poor</span>
                <span className="text-neon-teal font-bold text-lg">{formData.overallQuality}</span>
                <span>Excellent</span>
              </div>
            </div>

            {/* Square Footage */}
            <div className="glass-card p-6 space-y-4">
              <div className="flex items-center gap-3">
                <Maximize className="w-5 h-5 text-neon-teal" />
                <label className="font-semibold">Total Square Footage</label>
              </div>
              <input
                type="number"
                name="totalSquareFootage"
                value={formData.totalSquareFootage}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 rounded-lg p-3 outline-none focus:border-neon-teal/50 transition-all"
                placeholder="Enter total area (e.g. 2400 sq ft)"
              />
            </div>

            {/* Above Ground Living Area */}
            <div className="glass-card p-6 space-y-4">
              <div className="flex items-center gap-3">
                <Home className="w-5 h-5 text-neon-teal" />
                <label className="font-semibold">Living Area (Sq Ft)</label>
              </div>
              <input
                type="number"
                name="aboveGroundLivingArea"
                value={formData.aboveGroundLivingArea}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 rounded-lg p-3 outline-none focus:border-neon-teal/50 transition-all"
                placeholder="Enter living area (e.g. 1800 sq ft)"
              />
            </div>

            {/* Garage Capacity */}
            <div className="glass-card p-6 space-y-4">
              <div className="flex items-center gap-3">
                <Car className="w-5 h-5 text-neon-teal" />
                <label className="font-semibold">Garage Car Capacity</label>
              </div>
              <input
                type="number"
                name="garageCarCapacity"
                value={formData.garageCarCapacity}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 rounded-lg p-3 outline-none focus:border-neon-teal/50 transition-all"
                placeholder="Number of cars (e.g. 2)"
              />
            </div>

            {/* House Age */}
            <div className="glass-card p-6 space-y-4">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-neon-teal" />
                <label className="font-semibold">House Age (Years)</label>
              </div>
              <input
                type="number"
                name="houseAge"
                value={formData.houseAge}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 rounded-lg p-3 outline-none focus:border-neon-teal/50 transition-all"
                placeholder="Years since construction"
              />
            </div>

            {/* Bathrooms */}
            <div className="glass-card p-6 space-y-4">
              <div className="flex items-center gap-3">
                <Droplets className="w-5 h-5 text-neon-teal" />
                <label className="font-semibold">Total Bathrooms</label>
              </div>
              <input
                type="number"
                name="totalBathrooms"
                step="0.5"
                value={formData.totalBathrooms}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 rounded-lg p-3 outline-none focus:border-neon-teal/50 transition-all"
                placeholder="e.g. 2.5"
              />
            </div>

            {/* Kitchen Quality */}
            <div className="glass-card p-6 space-y-4">
              <div className="flex items-center gap-3">
                <Utensils className="w-5 h-5 text-neon-teal" />
                <label className="font-semibold">Kitchen Quality</label>
              </div>
              <select
                name="kitchenQuality"
                value={formData.kitchenQuality}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 rounded-lg p-3 outline-none focus:border-neon-teal/50 transition-all appearance-none"
              >
                <option value="5" className="bg-[#020617]">Excellent</option>
                <option value="4" className="bg-[#020617]">Good</option>
                <option value="3" className="bg-[#020617]">Average</option>
                <option value="2" className="bg-[#020617]">Fair</option>
                <option value="1" className="bg-[#020617]">Poor</option>
              </select>
            </div>

            {/* Basement Quality */}
            <div className="glass-card p-6 space-y-4">
              <div className="flex items-center gap-3">
                <Database className="w-5 h-5 text-neon-teal" />
                <label className="font-semibold">Basement Quality</label>
              </div>
              <select
                name="basementQuality"
                value={formData.basementQuality}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 rounded-lg p-3 outline-none focus:border-neon-teal/50 transition-all appearance-none"
              >
                <option value="5" className="bg-[#020617]">Excellent</option>
                <option value="4" className="bg-[#020617]">Good</option>
                <option value="3" className="bg-[#020617]">Average</option>
                <option value="2" className="bg-[#020617]">Fair</option>
                <option value="1" className="bg-[#020617]">Poor</option>
              </select>
            </div>

            {/* Years Since Remodel */}
            <div className="glass-card p-6 space-y-4">
              <div className="flex items-center gap-3">
                <RefreshCcw className="w-5 h-5 text-neon-teal" />
                <label className="font-semibold">Years Since Remodel</label>
              </div>
              <input
                type="number"
                name="yearsSinceRemodel"
                value={formData.yearsSinceRemodel}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 rounded-lg p-3 outline-none focus:border-neon-teal/50 transition-all"
                placeholder="Years since last remodel (e.g. 5)"
              />
            </div>

            {/* Neighborhood Toggle */}
            <div className="glass-card p-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-neon-teal" />
                <div>
                  <label className="font-semibold block">Northridge Heights</label>
                  <span className="text-xs text-slate-500">Premium Neighborhood?</span>
                </div>
              </div>
              <button
                type="button"
                onClick={handleToggle}
                className={`w-14 h-7 rounded-full transition-all relative ${
                  formData.isNorthridgeHeights ? "bg-neon-teal" : "bg-slate-700"
                }`}
              >
                <div
                  className={`absolute top-1 w-5 h-5 rounded-full bg-white transition-all ${
                    formData.isNorthridgeHeights ? "left-8" : "left-1"
                  }`}
                />
              </button>
            </div>

          </div>

          <div className="pt-8">
            <button
              type="submit"
              disabled={loading}
              className={`w-full group relative flex items-center justify-center gap-3 p-5 rounded-2xl font-bold text-xl transition-all ${
                loading ? "opacity-50 cursor-not-allowed" : "hover:shadow-[0_0_30px_rgba(45,212,191,0.4)]"
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-neon-teal to-neon-blue rounded-2xl" />
              {loading ? (
                <div className="flex items-center gap-4">
                  <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                  <span className="animate-pulse-neon">Analysing Market Data...</span>
                </div>
              ) : (
                <>
                  <span className="relative z-10">Generate Valuation</span>
                  <ArrowRight className="w-6 h-6 relative z-10 group-hover:translate-x-2 transition-transform" />
                </>
              )}
            </button>
          </div>
        </form>

        <footer className="mt-20 py-8 border-t border-white/5 text-center text-slate-500 text-sm">
          Powered by Advanced Regression Analysis & Deep Learning Frameworks
        </footer>
      </div>

      <PredictResult 
        price={prediction} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </main>
  );
}
