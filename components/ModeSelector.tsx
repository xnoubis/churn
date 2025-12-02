import React from 'react';
import { Zap, Globe, BrainCircuit, ArrowLeft, Sparkles } from 'lucide-react';
import { GenerationMode } from '../types';

interface ModeSelectorProps {
  onSelect: (mode: GenerationMode) => void;
  onBack: () => void;
}

export const ModeSelector: React.FC<ModeSelectorProps> = ({ onSelect, onBack }) => {
  return (
    <div className="flex flex-col h-full animate-fade-in">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-builder-text mb-2 flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-builder-accent" />
            Select Intelligence Engine
          </h2>
          <p className="text-builder-muted">
            Choose the cognitive strategy for your artifact.
          </p>
        </div>
        <button 
          onClick={onBack}
          className="text-builder-muted hover:text-builder-text transition-colors flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1">
        {/* FAST MODE */}
        <button
          onClick={() => onSelect(GenerationMode.FAST)}
          className="group relative flex flex-col items-center justify-between p-8 rounded-2xl border border-builder-border bg-builder-surface hover:border-yellow-400/50 hover:bg-yellow-400/5 transition-all duration-300 shadow-lg hover:shadow-yellow-400/10 hover:-translate-y-1 h-full"
        >
          <div className="flex flex-col items-center w-full">
            <div className="w-16 h-16 rounded-full bg-yellow-400/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 ring-1 ring-yellow-400/20 group-hover:ring-yellow-400/50">
              <Zap className="w-8 h-8 text-yellow-400" />
            </div>
            <h3 className="text-xl font-bold text-builder-text mb-2">Fast Build</h3>
            <p className="text-center text-builder-muted text-sm mb-6 leading-relaxed">
              Rapid prototyping using <span className="text-yellow-400">Flash 2.5</span>. Ideal for simple scripts, scaffolding, and quick iterations where speed is priority.
            </p>
          </div>
          <span className="text-xs font-mono text-yellow-400/70 border border-yellow-400/20 px-3 py-1 rounded-full bg-yellow-400/5">
            LOW LATENCY
          </span>
        </button>

        {/* RESEARCH MODE */}
        <button
          onClick={() => onSelect(GenerationMode.RESEARCH)}
          className="group relative flex flex-col items-center justify-between p-8 rounded-2xl border border-builder-border bg-builder-surface hover:border-sky-400/50 hover:bg-sky-400/5 transition-all duration-300 shadow-lg hover:shadow-sky-400/10 hover:-translate-y-1 h-full"
        >
          <div className="flex flex-col items-center w-full">
            <div className="w-16 h-16 rounded-full bg-sky-400/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 ring-1 ring-sky-400/20 group-hover:ring-sky-400/50">
              <Globe className="w-8 h-8 text-sky-400" />
            </div>
            <h3 className="text-xl font-bold text-builder-text mb-2">Research Grounding</h3>
            <p className="text-center text-builder-muted text-sm mb-6 leading-relaxed">
              Connects to <span className="text-sky-400">Google Search</span>. Essential for up-to-date information, checking library versions, and fact-based content.
            </p>
          </div>
          <span className="text-xs font-mono text-sky-400/70 border border-sky-400/20 px-3 py-1 rounded-full bg-sky-400/5">
            WEB CONNECTED
          </span>
        </button>

        {/* THINKING MODE */}
        <button
          onClick={() => onSelect(GenerationMode.THINKING)}
          className="group relative flex flex-col items-center justify-between p-8 rounded-2xl border border-builder-border bg-builder-surface hover:border-purple-400/50 hover:bg-purple-400/5 transition-all duration-300 shadow-lg hover:shadow-purple-400/10 hover:-translate-y-1 h-full"
        >
          <div className="absolute top-4 right-4 animate-pulse-slow">
             <Sparkles className="w-4 h-4 text-purple-400 opacity-50" />
          </div>
          <div className="flex flex-col items-center w-full">
            <div className="w-16 h-16 rounded-full bg-purple-400/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 ring-1 ring-purple-400/20 group-hover:ring-purple-400/50">
              <BrainCircuit className="w-8 h-8 text-purple-400" />
            </div>
            <h3 className="text-xl font-bold text-builder-text mb-2">Deep Thinking</h3>
            <p className="text-center text-builder-muted text-sm mb-6 leading-relaxed">
              Uses <span className="text-purple-400">Gemini 3 Pro</span> with extended thinking budget. Best for complex logic, architecture, and novel problems.
            </p>
          </div>
          <span className="text-xs font-mono text-purple-400/70 border border-purple-400/20 px-3 py-1 rounded-full bg-purple-400/5">
            HIGH INTELLIGENCE
          </span>
        </button>
      </div>
    </div>
  );
};