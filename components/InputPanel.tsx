import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

interface InputPanelProps {
  value: string;
  onChange: (val: string) => void;
  onNext: () => void;
}

export const InputPanel: React.FC<InputPanelProps> = ({ value, onChange, onNext }) => {
  return (
    <div className="flex flex-col h-full animate-fade-in">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-builder-text mb-2 flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-builder-accent" />
          Crystallization Input
        </h2>
        <p className="text-builder-muted">
          Paste your concept, insight, or "make this real" request here.
          The Builder transforms this raw idea into a working artifact.
        </p>
      </div>

      <textarea
        className="flex-1 w-full bg-builder-surface border border-builder-border rounded-lg p-4 text-builder-text placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-builder-accent font-mono text-sm resize-none mb-6 transition-all"
        placeholder="e.g. A privacy filter that compresses user signatures without losing context..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />

      <div className="flex justify-end">
        <button
          onClick={onNext}
          disabled={!value.trim()}
          className={`
            flex items-center gap-2 px-6 py-3 rounded-lg font-bold transition-all
            ${!value.trim() 
              ? 'bg-builder-border text-gray-500 cursor-not-allowed' 
              : 'bg-builder-accent hover:bg-builder-accentHover text-builder-bg shadow-lg shadow-sky-900/20'}
          `}
        >
          Select Type <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};