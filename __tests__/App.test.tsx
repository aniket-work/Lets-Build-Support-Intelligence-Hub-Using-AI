/**
 * @jest-environment jsdom
 */
// Fix: Import Jest globals to resolve TypeScript errors for jest, describe, beforeEach, test, and expect.
import { jest, describe, beforeEach, test, expect } from '@jest/globals';
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';
import { analyzeCsvData } from '../services/geminiService';
import type { AnalysisResult } from '../types';

// Mock the geminiService to prevent actual API calls during tests
jest.mock('../services/geminiService');
const mockedAnalyzeCsvData = analyzeCsvData as jest.Mock;

const mockSuccessResult: AnalysisResult = {
  summary: 'Test summary',
  anomalies: [{ description: 'Test anomaly', severity: 'High', implication: 'Test implication' }],
  rootCauses: [{ anomaly: 'Test anomaly', cause: 'Test cause', recommendation: 'Test recommendation' }],
  chartSuggestion: {
    chartType: 'bar',
    title: 'Test Chart',
    description: 'A test chart',
    data: [{ name: 'A', value: 100 }],
  },
};

const mockError = new Error('Failed to analyze');

describe('Support Intelligence Hub - App Component', () => {

  beforeEach(() => {
    // Reset mocks before each test
    mockedAnalyzeCsvData.mockClear();
    // Mock FileReader
    // Fix: Use `globalThis` instead of `global` for better compatibility and to resolve type errors.
    Object.defineProperty(globalThis, 'FileReader', {
      writable: true,
      value: jest.fn().mockImplementation(() => ({
        readAsText: jest.fn(function(this: any) { this.onload({ target: { result: 'col1,col2\nval1,val2' } }); }),
        onload: jest.fn(),
        onerror: jest.fn(),
      })),
    });
  });

  test('renders the file upload component on initial load', () => {
    render(<App />);
    expect(screen.getByText(/Unlock Insights from Your Support Data/i)).toBeInTheDocument();
    expect(screen.getByTestId('file-upload-area')).toBeInTheDocument();
  });

  test('shows loader while analyzing a file and then displays the dashboard on success', async () => {
    mockedAnalyzeCsvData.mockResolvedValue(mockSuccessResult);
    render(<App />);

    const file = new File(['test,csv'], 'test.csv', { type: 'text/csv' });
    const fileUploadInput = screen.getByLabelText(/Upload a CSV file or drag and drop/i);
    
    fireEvent.change(fileUploadInput, { target: { files: [file] } });

    // Loader should be visible
    expect(screen.getByTestId('loader')).toBeInTheDocument();
    expect(screen.getByText(/Analyzing Data.../i)).toBeInTheDocument();

    // Wait for the dashboard to appear
    await waitFor(() => {
      expect(screen.getByTestId('analysis-dashboard')).toBeInTheDocument();
    });

    // Check if dashboard content is rendered
    expect(screen.getByText('Executive Summary')).toBeInTheDocument();
    expect(screen.getByText('Test summary')).toBeInTheDocument();
    expect(screen.getByText('Test anomaly')).toBeInTheDocument();
  });

  test('displays an error message if analysis fails', async () => {
    mockedAnalyzeCsvData.mockRejectedValue(mockError);
    render(<App />);

    const file = new File(['test,csv'], 'test.csv', { type: 'text/csv' });
    const fileUploadInput = screen.getByLabelText(/Upload a CSV file or drag and drop/i);

    fireEvent.change(fileUploadInput, { target: { files: [file] } });

    // Loader appears first
    expect(screen.getByTestId('loader')).toBeInTheDocument();

    // Wait for the error message to appear
    await waitFor(() => {
      expect(screen.getByTestId('error-message')).toBeInTheDocument();
    });

    expect(screen.getByText(/Failed to analyze the data/i)).toBeInTheDocument();
  });

  test('resets the application state when "Analyze New File" is clicked', async () => {
    mockedAnalyzeCsvData.mockResolvedValue(mockSuccessResult);
    render(<App />);

    // --- Upload and analyze first file ---
    const file = new File(['test,csv'], 'test.csv', { type: 'text/csv' });
    const fileUploadInput = screen.getByLabelText(/Upload a CSV file or drag and drop/i);
    fireEvent.change(fileUploadInput, { target: { files: [file] } });

    await waitFor(() => {
      expect(screen.getByTestId('analysis-dashboard')).toBeInTheDocument();
    });
    
    // --- Click reset button ---
    const resetButton = screen.getByRole('button', { name: /Analyze New File/i });
    fireEvent.click(resetButton);

    // --- Check if back to initial state ---
    expect(screen.getByTestId('file-upload-area')).toBeInTheDocument();
    expect(screen.queryByTestId('analysis-dashboard')).not.toBeInTheDocument();
    expect(screen.queryByTestId('error-message')).not.toBeInTheDocument();
  });
});