
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { FileUpload } from './components/FileUpload';
import { AnalysisDashboard } from './components/AnalysisDashboard';
import { Loader } from './components/Loader';
import { analyzeCsvData } from './services/geminiService';
import type { AnalysisResult } from './types';

function App() {
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [csvPreview, setCsvPreview] = useState<string[][] | null>(null);

  const parseCsvPreview = (csvContent: string, rowCount: number): string[][] => {
    const lines = csvContent.split('\n').slice(0, rowCount);
    return lines.map(line => line.split(','));
  };

  const handleFileAnalyze = useCallback(async (uploadedFile: File) => {
    if (!uploadedFile) return;

    setFile(uploadedFile);
    setIsLoading(true);
    setError(null);
    setAnalysisResult(null);
    setCsvPreview(null);

    const reader = new FileReader();
    reader.onload = async (event) => {
      const csvContent = event.target?.result as string;
      if (!csvContent) {
        setError("Could not read file content.");
        setIsLoading(false);
        return;
      }

      setCsvPreview(parseCsvPreview(csvContent, 10));

      try {
        const result = await analyzeCsvData(csvContent);
        setAnalysisResult(result);
      } catch (err) {
        console.error("Analysis failed:", err);
        setError("Failed to analyze the data. The AI model may be unavailable or the data format is unsupported.");
      } finally {
        setIsLoading(false);
      }
    };
    reader.onerror = () => {
        setError("Failed to read the file.");
        setIsLoading(false);
    }
    reader.readAsText(uploadedFile);
  }, []);

  const handleReset = () => {
    setAnalysisResult(null);
    setFile(null);
    setError(null);
    setIsLoading(false);
    setCsvPreview(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-slate-900 antialiased">
      <div className="relative isolate min-h-screen">
        <div className="absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:14px_24px]"></div>
        <div className="absolute left-1/2 right-0 top-0 -z-10 -ml-24 h-96 w-96 origin-top-right -translate-x-1/2 translate-y-20 rotate-12 transform-gpu blur-3xl sm:left-1/2 sm:-ml-48 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0" aria-hidden="true">
          <div className="aspect-[1108/632] w-[69.25rem] bg-gradient-to-tr from-[#1e40af] to-[#3b82f6] opacity-10" ></div>
        </div>
        
        <Header onReset={handleReset} showReset={!!file} />
        <main className="container mx-auto px-4 py-8 md:py-12">
          {error && (
            <div 
              data-testid="error-message"
              className="my-4 rounded-lg border border-red-300 bg-red-100 p-4 text-center text-red-700"
            >
              <p><strong>Error:</strong> {error}</p>
            </div>
          )}
          
          {!file && !isLoading && <FileUpload onFileAnalyze={handleFileAnalyze} />}
          {isLoading && <Loader />}
          
          {analysisResult && !isLoading && (
            <AnalysisDashboard result={analysisResult} csvPreview={csvPreview} fileName={file?.name || 'Uploaded Data'} />
          )}
        </main>
      </div>
    </div>
  );
}

export default App;