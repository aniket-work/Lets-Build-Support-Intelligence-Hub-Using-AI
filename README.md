# Real-Time Support Intelligence Hub

![Dashboard View](results/dashboard-view.png)

An AI-powered agent that analyzes CSV support data (like logs or usage dumps) to automatically surface anomalies, uncover root causes, and summarize emerging patterns before they require escalation.

---

## ✨ Key Features

-   **Seamless CSV Upload**: A simple drag-and-drop interface to upload your data files.
-   **AI-Powered Analysis**: Leverages the Google Gemini API to perform a deep analysis of the data, going beyond simple metrics.
-   **Automated Anomaly Detection**: Automatically identifies and flags unusual patterns, errors, or outliers, with severity ratings (Low, Medium, High, Critical).
-   **Root Cause Suggestions**: Provides potential root causes for critical anomalies and recommends actionable next steps for support teams.
-   **Intelligent Summarization**: Generates a high-level executive summary of the data's overall health and trends.
-   **Dynamic Visualization**: Suggests and renders the most insightful chart (bar, line, or pie) to visually represent key findings.
-   **Instant Data Preview**: Displays a preview of the uploaded data for quick reference.

---

## 🚀 Workflow Demo

1.  **Upload Screen**: The user is greeted with a clean interface to upload a CSV file.
    ![Upload Screen](results/upload-screen.png)

2.  **AI Analysis in Progress**: A clear loading state indicates that the AI is processing the data.
    ![Loading Screen](results/loading-screen.png)

3.  **Analysis Dashboard**: The results are presented in a comprehensive dashboard with summaries, charts, anomalies, and root cause analysis.
    ![Dashboard View](results/dashboard-view.png)

---

## 🛠️ Technology Stack

-   **Frontend**: [React](https://reactjs.org/) & [TypeScript](https://www.typescriptlang.org/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **AI Model**: [Google Gemini API](https://ai.google.dev/)
-   **Charting**: [Recharts](https://recharts.org/)
-   **Testing**: [Jest](https://jestjs.io/) & [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) (example tests provided)

---

## ⚙️ Getting Started

This project is designed to run in a modern browser without a complex build setup, using ES modules and an import map.

### Prerequisites

-   A modern web browser (Chrome, Firefox, Safari, Edge).
-   A Google Gemini API Key. You can obtain one from [Google AI Studio](https://aistudio.google.com/app/apikey).

### Configuration

The application requires the Gemini API key to be available as an environment variable named `API_KEY`. This project does not use a `.env` file directly in the browser for security reasons.

You must run this in an environment that can securely provide this variable to the application context. For local development, you can use a simple static server that injects the variable, or host it on a platform that supports environment variable management (e.g., Vercel, Netlify, Google Cloud).

**Example using a simple Node.js server (optional):**
1. Install `express`: `npm install express`
2. Create a `server.js` file to serve your static files and inject the key.

_Note: The core application code (`index.html`, `index.tsx`, etc.) does not need a build step to run._

### Running the Application

1.  Clone the repository:
    ```bash
    git clone <repository-url>
    ```
2.  Navigate to the project directory:
    ```bash
    cd support-intelligence-hub
    ```
3.  Serve the `index.html` file using a local web server of your choice. A simple one can be run with Python:
    ```bash
    python -m http.server
    ```
    Or using the VS Code "Live Server" extension.

4.  Ensure your `API_KEY` is correctly configured in your deployment environment.

---

## 📖 Usage

1.  Open the application in your browser.
2.  Drag and drop a CSV file onto the designated area, or click to open the file selector.
3.  Wait for the AI to analyze the data. The loading indicator will show the progress.
4.  Once complete, the Analysis Dashboard will appear.
5.  Review the **Executive Summary** for a quick overview.
6.  Examine the **Visualized Trend** chart for a graphical representation of a key insight.
7.  Inspect the **Detected Anomalies**, paying attention to the severity levels.
8.  Read the **Root Cause Analysis** for actionable recommendations on how to address the most critical issues.

---

## ✅ Testing

This project includes example test cases written using the **Jest** framework and **React Testing Library**. The test files are located in the `__tests__` directory.

To run these tests, you would need to set up a Node.js environment with Jest and its related dependencies (`@testing-library/react`, `jest-environment-jsdom`, etc.).

**Example Test (`__tests__/App.test.tsx`):**
```typescript
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';
import '@testing-library/jest-dom';

// Mocks the Gemini Service to avoid actual API calls during tests
jest.mock('../services/geminiService');

describe('Support Intelligence Hub', () => {
  it('renders the file upload component on initial load', () => {
    render(<App />);
    expect(screen.getByTestId('file-upload-area')).toBeInTheDocument();
  });

  // ... more tests
});
```

This setup provides a foundation for building a robust test suite to ensure application reliability.

---

## 🗂️ Project Structure

```
.
├── __tests__/
│   └── App.test.tsx      # Example tests for the main App component
├── components/
│   ├── AnalysisChart.tsx # Chart rendering component
│   ├── AnalysisDashboard.tsx # Main results dashboard
│   ├── DataTable.tsx     # CSV data preview table
│   ├── FileUpload.tsx    # Drag-and-drop file upload UI
│   ├── Header.tsx        # Application header
│   ├── icons.tsx         # SVG icon components
│   ├── Loader.tsx        # Loading animation component
│   └── ResultCard.tsx    # Reusable card for displaying results
├── results/
│   ├── dashboard-view.png  # (Placeholder) Screenshot of the final dashboard
│   ├── loading-screen.png  # (Placeholder) Screenshot of the loading state
│   └── upload-screen.png   # (Placeholder) Screenshot of the initial upload screen
├── services/
│   └── geminiService.ts  # Logic for interacting with the Gemini API
├── App.tsx               # Main application component
├── index.html            # Main HTML file
├── index.tsx             # React app entry point
├── metadata.json         # Application metadata
├── README.md             # This file
└── types.ts              # TypeScript type definitions
```

---
## 🤝 Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for bugs, feature requests, or improvements.

## 📄 License

This project is licensed under the MIT License.
