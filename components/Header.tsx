
import React from 'react';
import { BrainCircuitIcon } from './icons';

interface HeaderProps {
    onReset: () => void;
    showReset: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onReset, showReset }) => {
    return (
        <header className="container mx-auto flex items-center justify-between p-4 md:p-6">
            <div className="flex items-center space-x-3">
                <BrainCircuitIcon className="h-8 w-8 text-blue-500" />
                <div>
                    <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
                        Support Intelligence Hub
                    </h1>
                    <p className="text-sm text-slate-500">AI-Powered Log & Data Analysis</p>
                </div>
            </div>
            {showReset && (
                 <button 
                    onClick={onReset}
                    className="rounded-md bg-white px-3.5 py-2 text-sm font-semibold text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 hover:bg-slate-100 transition-colors"
                >
                    Analyze New File
                </button>
            )}
        </header>
    );
};