
import React from 'react';

interface ResultCardProps {
    title: string;
    icon: React.ReactNode;
    children: React.ReactNode;
}

export const ResultCard: React.FC<ResultCardProps> = ({ title, icon, children }) => {
    return (
        <section className="rounded-xl border border-slate-200 bg-white/60 p-6 shadow-lg backdrop-blur-sm">
            <div className="flex items-center space-x-3 mb-4">
                <div className="text-blue-500">
                    {icon}
                </div>
                <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
            </div>
            <div className="prose prose-sm max-w-none text-slate-600">
                {children}
            </div>
        </section>
    );
};