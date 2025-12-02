import React from 'react';
import { Sparkles, Cpu, Hammer, CheckCircle } from 'lucide-react';

interface StepIndicatorProps {
  currentStep: 'INPUT' | 'MODE_SELECT' | 'TYPE_SELECT' | 'RESULT';
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep }) => {
  const steps = [
    { id: 'INPUT', label: 'Concept', icon: Sparkles },
    { id: 'MODE_SELECT', label: 'Intelligence', icon: Cpu },
    { id: 'TYPE_SELECT', label: 'Artifact', icon: Hammer },
    { id: 'RESULT', label: 'Build', icon: CheckCircle },
  ];

  const getCurrentIndex = () => {
    switch (currentStep) {
      case 'INPUT': return 0;
      case 'MODE_SELECT': return 1;
      case 'TYPE_SELECT': return 2;
      case 'RESULT': return 3;
      default: return 0;
    }
  };

  const currentIndex = getCurrentIndex();

  return (
    <div className="flex items-center justify-between mb-8 px-4 w-full max-w-2xl mx-auto">
      {steps.map((step, index) => {
        const Icon = step.icon;
        const isActive = index === currentIndex;
        const isCompleted = index < currentIndex;

        return (
          <div key={step.id} className="flex flex-col items-center relative z-10">
            <div 
              className={`
                w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500
                ${isActive ? 'bg-builder-accent text-builder-bg scale-110 shadow-[0_0_15px_rgba(56,189,248,0.5)]' : ''}
                ${isCompleted ? 'bg-builder-surface border border-builder-accent text-builder-accent' : ''}
                ${!isActive && !isCompleted ? 'bg-builder-surface border border-builder-border text-builder-muted' : ''}
              `}
            >
              <Icon className="w-5 h-5" />
            </div>
            <span 
              className={`
                text-xs font-mono mt-2 transition-colors duration-300 absolute -bottom-6 w-max text-center
                ${isActive ? 'text-builder-accent font-bold' : 'text-builder-muted'}
              `}
            >
              {step.label}
            </span>
            
            {/* Connection Line */}
            {index < steps.length - 1 && (
              <div 
                className={`
                  absolute top-5 left-10 w-[calc(100%_-_2.5rem)] h-[2px] -z-10
                  ${index < currentIndex ? 'bg-builder-accent' : 'bg-builder-border'}
                `} 
                style={{ width: 'calc(100vw / 6)' }} // Rough approximation for responsive spacing
              />
            )}
          </div>
        );
      })}
    </div>
  );
};