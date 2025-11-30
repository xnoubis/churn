import React from 'react';
import { ArtifactType, ArtifactDefinition, GenerationMode } from '../types';
import { 
  Code, 
  FileText, 
  Terminal, 
  Layout, 
  Database, 
  Cpu, 
  Box,
  ArrowLeft,
  Hammer,
  Users,
  Layers,
  Zap,
  Globe,
  BrainCircuit,
  Fingerprint
} from 'lucide-react';

interface ArtifactSelectorProps {
  onSelect: (type: ArtifactType) => void;
  onBack: () => void;
  selectedMode: GenerationMode;
}

const ARTIFACT_OPTIONS: ArtifactDefinition[] = [
  {
    id: 'python',
    type: ArtifactType.CODE_PYTHON,
    title: 'Python Script',
    description: 'Algorithmic logic, data processing, or backend utilities.',
    icon: 'python',
    promptTemplate: ''
  },
  {
    id: 'js',
    type: ArtifactType.CODE_JS,
    title: 'Node.js Script',
    description: 'JavaScript logic, automation, or utility scripts.',
    icon: 'js',
    promptTemplate: ''
  },
  {
    id: 'troupe',
    type: ArtifactType.AGENT_TROUPE,
    title: 'Agent Troupe',
    description: 'Orchestrate multiple AI agents to solve complex problems.',
    icon: 'users',
    promptTemplate: ''
  },
  {
    id: 'recursive',
    type: ArtifactType.RECURSIVE_CAPABILITY,
    title: 'Recursive Capability',
    description: 'Generate self-improving capabilities at increasing depths.',
    icon: 'recursive',
    promptTemplate: ''
  },
  {
    id: 'psip',
    type: ArtifactType.PSIP_SIGNATURE,
    title: 'PSIP Signature',
    description: 'Compress content into privacy-preserving pattern signatures.',
    icon: 'psip',
    promptTemplate: ''
  },
  {
    id: 'doc',
    type: ArtifactType.DOCUMENT,
    title: 'Protocol / Doc',
    description: 'Process frameworks, decision protocols, or guides (Markdown).',
    icon: 'doc',
    promptTemplate: ''
  },
  {
    id: 'cli',
    type: ArtifactType.CLI_TOOL,
    title: 'CLI Tool',
    description: 'Interactive command-line interface tools.',
    icon: 'cli',
    promptTemplate: ''
  },
  {
    id: 'react',
    type: ArtifactType.REACT_COMPONENT,
    title: 'React Component',
    description: 'Visual UI component or interactive widget.',
    icon: 'react',
    promptTemplate: ''
  },
  {
    id: 'framework',
    type: ArtifactType.FRAMEWORK,
    title: 'Framework Schema',
    description: 'JSON/YAML definition of a system or structure.',
    icon: 'schema',
    promptTemplate: ''
  },
  {
    id: 'analysis',
    type: ArtifactType.ANALYSIS,
    title: 'Data Analysis',
    description: 'Scripts for modeling, calculating, or analyzing data.',
    icon: 'chart',
    promptTemplate: ''
  }
];

const getIcon = (iconName: string) => {
  switch (iconName) {
    case 'python': return <Code className="w-8 h-8 text-yellow-400" />;
    case 'js': return <Code className="w-8 h-8 text-yellow-200" />;
    case 'doc': return <FileText className="w-8 h-8 text-gray-300" />;
    case 'cli': return <Terminal className="w-8 h-8 text-green-400" />;
    case 'react': return <Layout className="w-8 h-8 text-sky-400" />;
    case 'schema': return <Box className="w-8 h-8 text-purple-400" />;
    case 'chart': return <Database className="w-8 h-8 text-red-400" />;
    case 'users': return <Users className="w-8 h-8 text-indigo-400" />;
    case 'recursive': return <Layers className="w-8 h-8 text-pink-400" />;
    case 'psip': return <Fingerprint className="w-8 h-8 text-emerald-400" />;
    default: return <Cpu className="w-8 h-8" />;
  }
};

const getModeBadge = (mode: GenerationMode) => {
  switch (mode) {
    case GenerationMode.FAST:
      return (
        <div className="flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono border border-yellow-400/30 bg-yellow-400/10 text-yellow-400">
          <Zap className="w-3 h-3" /> FAST MODE
        </div>
      );
    case GenerationMode.RESEARCH:
      return (
        <div className="flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono border border-sky-400/30 bg-sky-400/10 text-sky-400">
          <Globe className="w-3 h-3" /> RESEARCH MODE
        </div>
      );
    case GenerationMode.THINKING:
      return (
        <div className="flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono border border-purple-400/30 bg-purple-400/10 text-purple-400">
          <BrainCircuit className="w-3 h-3" /> THINKING MODE
        </div>
      );
  }
};

export const ArtifactSelector: React.FC<ArtifactSelectorProps> = ({ onSelect, onBack, selectedMode }) => {
  return (
    <div className="flex flex-col h-full animate-fade-in">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-builder-text mb-2 flex items-center gap-2">
            <Hammer className="w-6 h-6 text-builder-accent" />
            Select Artifact Type
          </h2>
          <div className="flex items-center gap-3">
            <p className="text-builder-muted">
              Determine the form of your crystallization.
            </p>
            {getModeBadge(selectedMode)}
          </div>
        </div>
        <button 
          onClick={onBack}
          className="text-builder-muted hover:text-builder-text transition-colors flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto pb-4 custom-scrollbar">
        {ARTIFACT_OPTIONS.map((opt) => (
          <button
            key={opt.id}
            onClick={() => onSelect(opt.type)}
            className="group flex flex-col items-start p-6 bg-builder-surface border border-builder-border rounded-xl hover:border-builder-accent hover:shadow-[0_0_20px_rgba(56,189,248,0.1)] transition-all text-left"
          >
            <div className="mb-4 p-3 bg-builder-bg rounded-lg border border-builder-border group-hover:border-builder-accent/50 transition-colors">
              {getIcon(opt.icon)}
            </div>
            <h3 className="text-lg font-bold text-builder-text mb-1 group-hover:text-builder-accent transition-colors">
              {opt.title}
            </h3>
            <p className="text-sm text-builder-muted leading-relaxed">
              {opt.description}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
};