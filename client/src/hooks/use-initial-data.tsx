import React, { createContext, useContext } from 'react';

const InitialDataContext = createContext<Record<string, any>>({});

export function InitialDataProvider({ children, data }: { children: React.ReactNode, data: Record<string, any> }) {
  // On the client, if no data is provided via props, try to get it from the window
  const finalData = typeof window !== 'undefined' && !data 
    ? (window as any).__INITIAL_DATA__ || {} 
    : data || {};

  return (
    <InitialDataContext.Provider value={finalData}>
      {children}
    </InitialDataContext.Provider>
  );
}

export function useInitialData() {
  return useContext(InitialDataContext);
}
