import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

interface LeadFormContextType {
  showDropdownForm: boolean;
  setShowDropdownForm: (show: boolean) => void;
}

const LeadFormContext = createContext<LeadFormContextType | undefined>(undefined);

export const LeadFormProvider = ({ children }: { children: ReactNode }) => {
  const [showDropdownForm, setShowDropdownForm] = useState(false);

  return (
    <LeadFormContext.Provider value={{ showDropdownForm, setShowDropdownForm }}>
      {children}
    </LeadFormContext.Provider>
  );
};

export const useLeadForm = () => {
  const context = useContext(LeadFormContext);
  if (!context) {
    throw new Error('useLeadForm must be used within a LeadFormProvider');
  }
  return context;
};