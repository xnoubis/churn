import React, { useState } from 'react';
import { 
  Copy, 
  Download, 
  RefreshCw, 
  ArrowLeft, 
  CheckCircle2,
  Play
} from 'lucide-react';
import { ArtifactType, GenerationMode } from '../types';

interface ResultPanelProps {
  artifact: string;
  type: ArtifactType;
  mode: GenerationMode;
  onRefine: (instruction: string) => void;
  onBack: () => void;
  isRefining: boolean;
}

export const ResultPanel: React.FC<ResultPanelProps> = ({ 
  artifact, 
  type, 
  mode,
  onRefine, 
  onBack,
  isRefining 
}) => {
  const [refineInput, setRefineInput] = useState('');
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(artifact);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([artifact], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    
    // Determine extension
    let ext = 'txt';
    if (type === ArtifactType.CODE_PYTHON || type === ArtifactType.ANALYSIS || type === ArtifactType.CLI_TOOL) ext = 'py';
    if (type === ArtifactType.CODE_JS) ext = 'js';
    if (type === ArtifactType.REACT_COMPONENT) ext = 'tsx';
    if (type === ArtifactType.DOCUMENT) ext = 'md';
    if (type === ArtifactType.FRAMEWORK) ext = 'json';

    element.download = `artifact_v1.${ext}`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleRefineSubmit = () => {
    if (refineInput.trim()) {
      onRefine(refineInput);
      setRefineInput('');
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-4">
        <button 
            onClick={onBack}
            className="text-builder-muted hover:text-builder-text transition-colors flex items-center gap-2"
        >
            <ArrowLeft className="w-4 h-4" /> New Build
        </button>
        <div className="flex gap-2">
            <button 
                onClick={handleCopy}
                className="flex items-center gap-2 px-3 py-1.5 rounded bg-builder-surface border border-builder-border text-sm hover:border-builder-accent transition-colors text-builder-text"
            >
                {copied ? <CheckCircle2 className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copied' : 'Copy'}
            </button>
            <button 
                onClick={handleDownload}
                className="flex items-center gap-2 px-3 py-1.5 rounded bg-builder-surface border border-builder-border text-sm hover:border-builder-accent transition-colors text-builder-text"
            >
                <Download className="w-4 h-4" /> Download
            </button>
        </div>
      </div>

      {/* Artifact Viewer */}
      <div className="flex-1 overflow-hidden rounded-xl border border-builder-border bg-builder-surface flex flex-col shadow-2xl">
        <div className="bg-[#0b1221] px-4 py-2 flex items-center gap-2 border-b border-builder-border justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
            <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
            <span className="ml-2 text-xs text-builder-muted font-mono opacity-50">
              {type.toLowerCase()}_artifact.gen
            </span>
          </div>
          <div className="text-[10px] font-mono text-builder-muted uppercase border border-builder-border px-2 rounded opacity-70">
            {mode}
          </div>
        </div>
        <pre className="flex-1 overflow-auto p-6 font-mono text-sm text-builder-text custom-scrollbar">
          <code>{artifact}</code>
        </pre>
      </div>

      {/* Iteration/Refinement Bar */}
      <div className="mt-4 flex gap-2">
        <input
            type="text"
            value={refineInput}
            onChange={(e) => setRefineInput(e.target.value)}
            placeholder="Describe changes to refine this artifact..."
            className="flex-1 bg-builder-surface border border-builder-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-builder-accent focus:ring-1 focus:ring-builder-accent text-builder-text"
            onKeyDown={(e) => e.key === 'Enter' && handleRefineSubmit()}
        />
        <button
            onClick={handleRefineSubmit}
            disabled={isRefining || !refineInput.trim()}
            className={`
                px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-all
                ${!refineInput.trim() || isRefining
                    ? 'bg-builder-border text-gray-500' 
                    : 'bg-builder-accent text-builder-bg hover:bg-builder-accentHover'}
            `}
        >
            {isRefining ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
            Refine
        </button>
      </div>
    </div>
  );
};