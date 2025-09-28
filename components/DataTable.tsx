
import React from 'react';

interface DataTableProps {
    data: string[][];
}

export const DataTable: React.FC<DataTableProps> = ({ data }) => {
    if (!data || data.length === 0) {
        return <p>No data to display.</p>;
    }

    const headers = data[0];
    const rows = data.slice(1);

    return (
        <div className="h-64 overflow-auto rounded-lg border border-slate-200">
            <table className="min-w-full divide-y divide-slate-200 text-sm">
                <thead className="bg-slate-100 sticky top-0">
                    <tr>
                        {headers.map((header, index) => (
                            <th key={index} scope="col" className="px-3 py-2 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white/50">
                    {rows.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {row.map((cell, cellIndex) => (
                                <td key={cellIndex} className="whitespace-nowrap px-3 py-2 text-slate-700">
                                    {cell}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};