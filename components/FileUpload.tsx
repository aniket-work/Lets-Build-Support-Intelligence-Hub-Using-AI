
import React, { useState, useCallback } from 'react';
import { UploadCloudIcon } from './icons';

interface FileUploadProps {
    onFileAnalyze: (file: File) => void;
}

export const FileUpload: React.FC<FileUploadProps> = ({ onFileAnalyze }) => {
    const [isDragging, setIsDragging] = useState(false);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            onFileAnalyze(event.target.files[0]);
        }
    };
    
    const handleDragEnter = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    }, []);
    
    const handleDragOver = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        e.stopPropagation();
    }, []);

    const handleDrop = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            onFileAnalyze(e.dataTransfer.files[0]);
        }
    }, [onFileAnalyze]);


    return (
        <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Unlock Insights from Your Support Data
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
                Upload user logs, usage dumps, or any CSV data. Our AI agent will automatically surface anomalies, uncover root causes, and summarize patterns.
            </p>

            <div className="mx-auto mt-10 max-w-xl">
                 <label 
                    htmlFor="file-upload"
                    data-testid="file-upload-area"
                    onDragEnter={handleDragEnter}
                    onDragLeave={handleDragLeave}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    className={`relative block w-full rounded-lg border-2 border-dashed border-slate-300 p-12 text-center hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-50 transition-colors ${isDragging ? 'border-blue-500 bg-blue-50' : ''}`}
                >
                    <UploadCloudIcon className="mx-auto h-12 w-12 text-slate-400"/>
                    <span className="mt-2 block text-sm font-semibold text-slate-700">
                        {isDragging ? 'Drop the file here' : 'Upload a CSV file or drag and drop'}
                    </span>
                    <span className="mt-1 block text-xs text-slate-500">
                        Max file size 10MB
                    </span>
                     <input id="file-upload" name="file-upload" type="file" accept=".csv" onChange={handleFileChange} className="sr-only" />
                </label>
            </div>
        </div>
    );
};