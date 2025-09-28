
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import type { ChartSuggestion } from '../types';

interface AnalysisChartProps {
    chartData: ChartSuggestion;
}

const COLORS = ['#0ea5e9', '#6366f1', '#a855f7', '#ec4899', '#f97316'];

export const AnalysisChart: React.FC<AnalysisChartProps> = ({ chartData }) => {
    
    const renderChart = () => {
        switch (chartData.chartType) {
            case 'bar':
                return (
                    <BarChart data={chartData.data}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 0, 0, 0.1)" />
                        <XAxis dataKey="name" stroke="#475569" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="#475569" fontSize={12} tickLine={false} axisLine={false} />
                        <Tooltip contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', color: '#1e293b' }} cursor={{fill: 'rgba(100, 116, 139, 0.1)'}}/>
                        <Legend wrapperStyle={{fontSize: "12px"}}/>
                        <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                    </BarChart>
                );
            case 'line':
                return (
                    <LineChart data={chartData.data}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 0, 0, 0.1)" />
                        <XAxis dataKey="name" stroke="#475569" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="#475569" fontSize={12} tickLine={false} axisLine={false} />
                        <Tooltip contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', color: '#1e293b' }} cursor={{fill: 'rgba(100, 116, 139, 0.1)'}}/>
                        <Legend wrapperStyle={{fontSize: "12px"}}/>
                        <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                    </LineChart>
                );
            case 'pie':
                return (
                    <PieChart>
                        <Pie
                            data={chartData.data}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            nameKey="name"
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                            {chartData.data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', color: '#1e293b' }} />
                        <Legend wrapperStyle={{fontSize: "12px"}}/>
                    </PieChart>
                );
            default:
                return <p>Unsupported chart type: {chartData.chartType}</p>;
        }
    };

    return (
        <div className="h-80 w-full">
            <h4 className="font-semibold text-slate-900">{chartData.title}</h4>
            <p className="text-sm text-slate-500 mb-4">{chartData.description}</p>
            <ResponsiveContainer width="100%" height="100%">
                {renderChart()}
            </ResponsiveContainer>
        </div>
    );
};