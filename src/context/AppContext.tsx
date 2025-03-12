import React, { createContext, useContext, useState } from "react";

interface AppContextType {
  isDbInitialized: boolean;
  setIsDbInitialized: (value: boolean) => void;
  isPreviewMode: boolean;
  togglePreviewMode: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isDbInitialized, setIsDbInitialized] = useState(false);
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  const togglePreviewMode = () => {
    setIsPreviewMode((prev) => !prev);
  };

  return (
    <AppContext.Provider
      value={{
        isDbInitialized,
        setIsDbInitialized,
        isPreviewMode,
        togglePreviewMode,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
