export enum ArtifactType {
  CODE_PYTHON = 'CODE_PYTHON',
  CODE_JS = 'CODE_JS',
  DOCUMENT = 'DOCUMENT',
  FRAMEWORK = 'FRAMEWORK',
  ANALYSIS = 'ANALYSIS',
  REACT_COMPONENT = 'REACT_COMPONENT',
  CLI_TOOL = 'CLI_TOOL'
}

export interface ArtifactDefinition {
  id: string;
  type: ArtifactType;
  title: string;
  description: string;
  icon: string;
  promptTemplate: string;
}

export interface BuildSession {
  concept: string;
  selectedType: ArtifactType | null;
  output: string;
  isBuilding: boolean;
  version: number;
}