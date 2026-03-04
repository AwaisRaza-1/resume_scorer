"use client";

import { createContext, useContext, useState } from "react";

const AnalysisContext = createContext();

export function AnalysisProvider({ children }) {
    const [analysisInput, setAnalysisInput] = useState(null);

    return (
        <AnalysisContext.Provider value={{ analysisInput, setAnalysisInput }}>
            {children}
        </AnalysisContext.Provider>
    );
}

export function useAnalysis() {
    const context = useContext(AnalysisContext);
    if (!context) {
        throw new Error("useAnalysis must be used within an AnalysisProvider");
    }
    return context;
}
