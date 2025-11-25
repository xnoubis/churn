import React from 'react';
import { ArtifactType, ArtifactDefinition } from '../types';
import { 
  Code, 
  FileText, 
  Terminal, 
  Layout, 
  Database, 
  Cpu, 
  Box,
  ArrowLeft,
  Hammer
} from 'lucide-react';

interface ArtifactSelectorProps {
  onSelect: (type: ArtifactType) => void;
  onBack: () => void;
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
    default: return <Cpu className="w-8 h-8" />;
  }
};

export const ArtifactSelector: React.FC<ArtifactSelectorProps> = ({ onSelect, onBack }) => {
  return (
    <div className="flex flex-col h-full">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-builder-text mb-2 flex items-center gap-2">
            <Hammer className="w-6 h-6 text-builder-accent" />
            Select Artifact Type
          </h2>
          <p className="text-builder-muted">
            Determine the form of your crystallization.
          </p>
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