import { GoogleGenAI } from "@google/genai";
import { ArtifactType } from "../types";

const getSystemInstruction = () => `
You are The Builder. Your purpose is to implement, not plan. You take insights from the user and make them real through code, documents, or prototypes immediately. 
You value working artifacts over perfect designs.

Protocol:
1. Rapid Comprehension: Identify the core mechanism.
2. Build Fast: Output the requested artifact immediately.
3. No Fluff: Do not include conversational filler like "Here is your code". Just provide the artifact content.
4. Completeness: Ensure the code or document is self-contained and runnable/readable.

If the user asks for Code: Provide a working script (Python/JS).
If the user asks for a Document: Provide a structured Markdown file.
If the user asks for a Framework: Provide valid JSON or YAML.
If the user asks for a React Component: Provide a complete .tsx component.

Current Phase: Artifact Creation.
Goal: A working prototype.
`;

const getPromptForType = (type: ArtifactType, concept: string): string => {
  switch (type) {
    case ArtifactType.CODE_PYTHON:
      return `Create a standalone Python script that implements the following concept. Include a main execution block. Concept: ${concept}`;
    case ArtifactType.CODE_JS:
      return `Create a standalone Node.js script that implements the following concept. Concept: ${concept}`;
    case ArtifactType.DOCUMENT:
      return `Create a Markdown document outlining the process/protocol for the following concept. Structure it with Quick Start, Core Concept, and How To Use. Concept: ${concept}`;
    case ArtifactType.FRAMEWORK:
      return `Create a schema definition (JSON or YAML) that crystallizes the following concept into a framework. Concept: ${concept}`;
    case ArtifactType.ANALYSIS:
      return `Create a Python data analysis script (using pandas/numpy) to analyze or model the following concept. Concept: ${concept}`;
    case ArtifactType.REACT_COMPONENT:
      return `Create a single-file React Functional Component (using Tailwind CSS) that visualizes or implements the following concept. Concept: ${concept}`;
    case ArtifactType.CLI_TOOL:
      return `Create a Python CLI tool using argparse that implements the following concept as an interactive utility. Concept: ${concept}`;
    default:
      return `Build a working prototype for the following concept: ${concept}`;
  }
};

export const generateArtifact = async (concept: string, type: ArtifactType): Promise<string> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const prompt = getPromptForType(type, concept);

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: getSystemInstruction(),
        temperature: 0.7, // Balance creativity with structure
      }
    });

    return response.text || "// No output generated.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return `// Error generating artifact: ${error instanceof Error ? error.message : String(error)}`;
  }
};

export const refineArtifact = async (currentArtifact: string, instructions: string): Promise<string> => {
    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const prompt = `
Original Artifact:
${currentArtifact}

Refinement Instructions:
${instructions}

Apply the changes and return the full updated artifact. Do not explain changes, just return the code/doc.
        `;
    
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
          config: {
            systemInstruction: getSystemInstruction(),
          }
        });
    
        return response.text || currentArtifact;
      } catch (error) {
        console.error("Gemini API Error:", error);
        return currentArtifact + `\n\n// Error refining artifact: ${error instanceof Error ? error.message : String(error)}`;
      }
}