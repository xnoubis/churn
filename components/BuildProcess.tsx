import React from 'react';
import { Loader2 } from 'lucide-react';

interface BuildProcessProps {
  isBuilding: boolean;
}

export const BuildProcess: React.FC<BuildProcessProps> = ({ isBuilding }) => {
  if (!isBuilding) return null;

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-builder-bg/80 backdrop-blur-sm">
      <div className="flex flex-col items-center">
        <Loader2 className="w-16 h-16 text-builder-accent animate-spin mb-4" />
        <h3 className="text-xl font-bold text-builder-text tracking-widest uppercase">Building Artifact</h3>
        <p className="text-builder-muted mt-2">Invoking the Builder Pattern...</p>
      </div>
    </div>
  );
};