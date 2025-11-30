import { GoogleGenAI } from "@google/genai";
import { ArtifactType, GenerationMode } from "../types";

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
    case ArtifactType.AGENT_TROUPE:
      return `Create a Python script implementing the 'Agent Troupe' pattern for the following concept. 
      The pattern should define a base Agent class, specific specialized Agent subclasses (e.g., Researcher, Critic, Builder) relevant to the concept, 
      and an Orchestrator/Troupe class that manages the flow of information between them. 
      Include a main execution block. Concept: ${concept}`;
    case ArtifactType.RECURSIVE_CAPABILITY:
      return `Create a Python script implementing the 'Recursive Capability' pattern for the following concept. 
      The pattern MUST use a dataclass named 'Capability' with fields: name (str), depth (int), and generates (Callable). 
      Implement a function 'recurse(max_depth)' that returns a list of Capabilities. 
      Each capability at depth 'n' should conceptually 'generate' the capability at depth 'n+1'. 
      Include a main execution block that demonstrates the recursion. Concept: ${concept}`;
    case ArtifactType.PSIP_SIGNATURE:
      return `Create a Python script implementing the 'PSIP' (Privacy/Pattern Signature) pattern for the following concept. 
      The script should include functions to 'compress' text into a signature (extracting patterns/essence while dropping private content) and 'validate' or 'restore' based on that signature. 
      Include a main execution block. Concept: ${concept}`;
    default:
      return `Build a working prototype for the following concept: ${concept}`;
  }
};

export const generateArtifact = async (
  concept: string, 
  type: ArtifactType,
  mode: GenerationMode = GenerationMode.FAST
): Promise<string> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const prompt = getPromptForType(type, concept);

    let model = 'gemini-2.5-flash';
    // Use 'any' for config to allow flexibility with tools and thinkingConfig which might not be fully typed in all SDK versions yet
    let config: any = {
      systemInstruction: getSystemInstruction(),
      temperature: 0.7, // Balance creativity with structure
    };

    if (mode === GenerationMode.THINKING) {
      model = 'gemini-3-pro-preview';
      // Enable thinking mode with max budget
      config.thinkingConfig = { thinkingBudget: 32768 };
      // Thinking mode should not have maxOutputTokens set generally, or set properly with thinkingBudget
      delete config.maxOutputTokens;
    } else if (mode === GenerationMode.RESEARCH) {
      model = 'gemini-2.5-flash';
      // Enable Google Search tool
      config.tools = [{ googleSearch: {} }];
    }

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config
    });

    let text = response.text || "// No output generated.";

    // If Research mode was used, append sources if available
    if (mode === GenerationMode.RESEARCH) {
      const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
      if (groundingChunks) {
        const sources = groundingChunks
          .map((chunk: any) => chunk.web ? `- [${chunk.web.title}](${chunk.web.uri})` : null)
          .filter(Boolean);
        
        if (sources.length > 0) {
          text += `\n\n/*\n * --- RESEARCH SOURCES ---\n * The following sources were consulted:\n${sources.map((s: string) => ` * ${s}`).join('\n')}\n */`;
        }
      }
    }

    return text;
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