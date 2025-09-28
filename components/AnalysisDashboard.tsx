
import React from 'react';
import type { AnalysisResult } from '../types';
import { ResultCard } from './ResultCard';
import { DataTable } from './DataTable';
import { AnalysisChart } from './AnalysisChart';
import { AlertTriangleIcon, HelpCircleIcon, ListChecksIcon, BarChartIcon } from './icons';

interface AnalysisDashboardProps {
    result: AnalysisResult;
    csvPreview: string[][] | null;
    fileName: string;
}

export const AnalysisDashboard: React.FC<AnalysisDashboardProps> = ({ result, csvPreview, fileName }) => {

    const getSeverityClass = (severity: string) => {
        switch (severity?.toLowerCase()) {
            case 'critical': return 'border-red-400 bg-red-100 text-red-800';
            case 'high': return 'border-orange-400 bg-orange-100 text-orange-800';
            case 'medium': return 'border-yellow-400 bg-yellow-100 text-yellow-800';
            case 'low': return 'border-blue-400 bg-blue-100 text-blue-800';
            default: return 'border-slate-300 bg-slate-100 text-slate-700';
        }
    };
    
    return (
        <div className="space-y-8 animate-fade-in" data-testid="analysis-dashboard">
            <ResultCard title="Executive Summary" icon={<ListChecksIcon />}>
                <p className="text-slate-600">{result.summary}</p>
            </ResultCard>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                 {result.chartSuggestion && (
                    <ResultCard title="Visualized Trend" icon={<BarChartIcon />}>
                       <AnalysisChart chartData={result.chartSuggestion} />
                    </ResultCard>
                 )}
                 {csvPreview && (
                    <ResultCard title={`Data Preview: ${fileName}`} icon={<ListChecksIcon />}>
                        <DataTable data={csvPreview} />
                    </ResultCard>
                )}
            </div>

            <ResultCard title="Detected Anomalies" icon={<AlertTriangleIcon />}>
                <div className="space-y-4">
                    {result.anomalies.map((anomaly, index) => (
                        <div key={index} className={`rounded-md border p-4 ${getSeverityClass(anomaly.severity)}`}>
                            <div className="flex items-center justify-between">
                                <p className="font-semibold">{anomaly.description}</p>
                                <span className="text-xs font-medium rounded-full px-2 py-0.5">{anomaly.severity}</span>
                            </div>
                            <p className="mt-2 text-sm text-slate-600"><strong>Implication:</strong> {anomaly.implication}</p>
                        </div>
                    ))}
                </div>
            </ResultCard>

            <ResultCard title="Root Cause Analysis & Recommendations" icon={<HelpCircleIcon />}>
                <div className="space-y-4">
                    {result.rootCauses.map((cause, index) => (
                         <div key={index} className="rounded-md border border-slate-200 bg-slate-100/50 p-4">
                             <p className="font-semibold text-blue-600">{cause.anomaly}</p>
                             <p className="mt-2 text-sm text-slate-700"><strong className="text-slate-500">Suspected Cause:</strong> {cause.cause}</p>
                             <p className="mt-2 text-sm text-slate-700"><strong className="text-slate-500">Recommendation:</strong> {cause.recommendation}</p>
                         </div>
                    ))}
                </div>
            </ResultCard>

        </div>
    );
};