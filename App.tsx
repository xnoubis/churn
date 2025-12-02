import React, { useState } from 'react';
import { InputPanel } from './components/InputPanel';
import { ModeSelector } from './components/ModeSelector';
import { ArtifactSelector } from './components/ArtifactSelector';
import { ResultPanel } from './components/ResultPanel';
import { BuildProcess } from './components/BuildProcess';
import { StepIndicator } from './components/StepIndicator';
import { ArtifactType, GenerationMode } from './types';
import { generateArtifact, refineArtifact } from './services/geminiService';
import { Hammer } from 'lucide-react';

enum Step {
  INPUT = 'INPUT',
  MODE_SELECT = 'MODE_SELECT',
  TYPE_SELECT = 'TYPE_SELECT',
  RESULT = 'RESULT'
}

export default function App() {
  const [step, setStep] = useState<Step>(Step.INPUT);
  const [concept, setConcept] = useState('');
  const [selectedMode, setSelectedMode] = useState<GenerationMode>(GenerationMode.FAST);
  const [selectedType, setSelectedType] = useState<ArtifactType | null>(null);
  const [artifact, setArtifact] = useState('');
  const [isBuilding, setIsBuilding] = useState(false);
  const [version, setVersion] = useState(1);

  // -- Handlers --

  const handleInputNext = () => {
    setStep(Step.MODE_SELECT);
  };

  const handleModeSelect = (mode: GenerationMode) => {
    setSelectedMode(mode);
    setStep(Step.TYPE_SELECT);
  };

  const handleTypeSelect = async (type: ArtifactType) => {
    setSelectedType(type);
    setIsBuilding(true);
    setVersion(1); // Reset version for new artifact
    
    // Call generation with the previously selected mode and new type
    const result = await generateArtifact(concept, type, selectedMode);
    
    setArtifact(result);
    setStep(Step.RESULT);
    setIsBuilding(false);
  };

  const handleRebuild = async () => {
    if (!selectedType) return;
    setIsBuilding(true);
    
    // Call generation with current settings
    const result = await generateArtifact(concept, selectedType, selectedMode);
    
    setArtifact(result);
    setVersion(prev => prev + 1); // Increment version on rebuild
    setIsBuilding(false);
  };

  const handleRefine = async (instructions: string) => {
    setIsBuilding(true);
    const refined = await refineArtifact(artifact, instructions);
    setArtifact(refined);
    setVersion(prev => prev + 1); // Increment version on refinement
    setIsBuilding(false);
  };

  const handleReset = () => {
    setStep(Step.INPUT);
    setConcept('');
    setSelectedType(null);
    setArtifact('');
    setVersion(1);
  };

  const handleBack = () => {
    if (step === Step.MODE_SELECT) setStep(Step.INPUT);
    if (step === Step.TYPE_SELECT) setStep(Step.MODE_SELECT);
    if (step === Step.RESULT) handleReset();
  };

  return (
    <div className="min-h-screen bg-builder-bg text-builder-text font-sans flex flex-col">
      {/* Header */}
      <header className="border-b border-builder-border bg-builder-bg/50 backdrop-blur sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-builder-accent rounded flex items-center justify-center text-builder-bg">
              <Hammer className="w-5 h-5" />
            </div>
            <h1 className="font-mono font-bold text-lg tracking-tight">
              INTERACTIVE_BUILDER <span className="text-builder-accent text-xs align-top">v0.3</span>
            </h1>
          </div>
          <div className="text-xs font-mono text-builder-muted hidden md:block">
            WORKING BEATS ELEGANT // SHIP FAST
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl mx-auto w-full p-6 flex flex-col relative">
        <BuildProcess isBuilding={isBuilding} />
        
        {/* Progress Stepper */}
        <div className="mb-6">
          <StepIndicator currentStep={step} />
        </div>
        
        <div className="flex-1 bg-builder-surface/30 border border-builder-border rounded-2xl p-8 shadow-2xl backdrop-blur-sm transition-all duration-300">
          {step === Step.INPUT && (
            <InputPanel 
              value={concept} 
              onChange={setConcept} 
              onNext={handleInputNext} 
            />
          )}

          {step === Step.MODE_SELECT && (
            <ModeSelector 
              onSelect={handleModeSelect}
              onBack={handleBack}
            />
          )}

          {step === Step.TYPE_SELECT && (
            <ArtifactSelector 
              onSelect={handleTypeSelect} 
              onBack={handleBack} 
              selectedMode={selectedMode}
            />
          )}

          {step === Step.RESULT && selectedType && (
            <ResultPanel 
              artifact={artifact} 
              type={selectedType}
              mode={selectedMode}
              version={version}
              onRefine={handleRefine}
              onRebuild={handleRebuild}
              onBack={handleReset}
              isRefining={isBuilding}
            />
          )}
        </div>
      </main>

      {/* Footer / Status Bar */}
      <footer className="border-t border-builder-border py-4 bg-builder-bg text-xs font-mono text-builder-muted">
        <div className="max-w-6xl mx-auto px-6 flex justify-between">
          <span>STATUS: {isBuilding ? 'BUILDING...' : 'OPERATIONAL'}</span>
          <span>PROTOCOL: GENIE_MYCELIAL</span>
        </div>
      </footer>
    </div>
  );
}