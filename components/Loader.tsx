
import React from 'react';

export const Loader: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center space-y-4 py-20" data-testid="loader">
            <div className="relative h-16 w-16">
                <div className="absolute h-full w-full animate-spin rounded-full border-4 border-dashed border-blue-500"></div>
                <div className="absolute h-full w-full animate-ping rounded-full border-4 border-transparent border-t-blue-400 opacity-75"></div>
            </div>
            <p className="text-lg font-semibold text-slate-900">Analyzing Data...</p>
            <p className="text-slate-600">The AI is surfacing insights, please wait a moment.</p>
        </div>
    );
};