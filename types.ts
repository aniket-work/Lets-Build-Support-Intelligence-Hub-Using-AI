
export interface Anomaly {
  description: string;
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  implication: string;
}

export interface RootCause {
  anomaly: string;
  cause: string;
  recommendation: string;
}

export interface ChartSuggestion {
  chartType: 'bar' | 'line' | 'pie';
  title: string;
  description: string;
  data: any[];
}

export interface AnalysisResult {
  anomalies: Anomaly[];
  rootCauses: RootCause[];
  summary: string;
  chartSuggestion?: ChartSuggestion;
}
