
import { GoogleGenAI, Type } from "@google/genai";
import type { AnalysisResult } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const analysisSchema = {
    type: Type.OBJECT,
    properties: {
        summary: {
            type: Type.STRING,
            description: "A high-level summary of emerging patterns, trends, and overall health of the system based on the provided data."
        },
        anomalies: {
            type: Type.ARRAY,
            description: "A list of identified anomalies or outliers in the data.",
            items: {
                type: Type.OBJECT,
                properties: {
                    description: { 
                        type: Type.STRING,
                        description: "A clear and concise description of the anomaly." 
                    },
                    severity: { 
                        type: Type.STRING,
                        description: "The estimated severity of the anomaly. Can be 'Low', 'Medium', 'High', or 'Critical'."
                    },
                    implication: {
                        type: Type.STRING,
                        description: "The potential business or technical impact of this anomaly."
                    }
                },
                required: ["description", "severity", "implication"],
            }
        },
        rootCauses: {
            type: Type.ARRAY,
            description: "An analysis of the potential root causes for the identified anomalies.",
            items: {
                type: Type.OBJECT,
                properties: {
                    anomaly: { 
                        type: Type.STRING, 
                        description: "A short title for the anomaly this root cause relates to."
                    },
                    cause: { 
                        type: Type.STRING,
                        description: "The suspected root cause of the anomaly."
                    },
                    recommendation: {
                        type: Type.STRING,
                        description: "A suggested action or next step to validate the cause and resolve the issue."
                    }
                },
                required: ["anomaly", "cause", "recommendation"],
            }
        },
        chartSuggestion: {
            type: Type.OBJECT,
            description: "A suggestion for a chart to visualize a key trend or pattern in the data. This should be the most insightful visualization possible.",
            properties: {
                chartType: { 
                    type: Type.STRING,
                    description: "The suggested type of chart. Can be 'bar', 'line', or 'pie'."
                },
                title: {
                    type: Type.STRING,
                    description: "A descriptive title for the chart."
                },
                description: {
                    type: Type.STRING,
                    description: "A short explanation of what the chart shows and why it's useful."
                },
                data: {
                    type: Type.ARRAY,
                    description: "The data for the chart, formatted as an array of objects. Each object must have a 'name' (string for the label) and a 'value' (number for the measurement). For example: [{'name': 'Category A', 'value': 400}, ...].",
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            name: {
                                type: Type.STRING,
                                description: "The label for the data point (e.g., a category name on the x-axis or a pie slice)."
                            },
                            value: {
                                type: Type.NUMBER,
                                description: "The numerical value associated with the label."
                            }
                        },
                        required: ["name", "value"]
                    }
                }
            },
            required: ["chartType", "title", "description", "data"]
        }
    },
    required: ["summary", "anomalies", "rootCauses"]
};

export const analyzeCsvData = async (csvContent: string): Promise<AnalysisResult> => {
    const prompt = `
        You are a world-class support intelligence analyst AI. Your task is to analyze user-provided CSV data, which could be application logs, usage dumps, or error reports. Your goal is to proactively identify issues and provide actionable insights for a support team.

        Analyze the following CSV data:
        ---
        ${csvContent.substring(0, 20000)}
        ---

        Based on your analysis, provide the following in a structured JSON format:
        1.  **Summary**: A high-level summary of emerging patterns and overall data health.
        2.  **Anomalies**: A list of significant anomalies, outliers, or error patterns. For each, specify a description, severity ('Low', 'Medium', 'High', or 'Critical'), and the potential implication.
        3.  **Root Causes**: For the most critical anomalies, suggest potential root causes and recommended next steps for the support team.
        4.  **Chart Suggestion**: Propose ONE SINGLE, most insightful chart (bar, line, or pie) to visualize a key pattern. Provide the chart type, a title, a brief description, and the data formatted as an array of objects. The data keys must be 'name' and 'value'. Do not nest objects within the data array.
    `;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: 'application/json',
                responseSchema: analysisSchema,
            },
        });
        
        const jsonText = response.text.trim();
        const result = JSON.parse(jsonText);
        return result as AnalysisResult;

    } catch (error) {
        console.error("Error calling Gemini API:", error);
        throw new Error("Failed to get analysis from AI model.");
    }
};
