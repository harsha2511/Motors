import { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { mockLeads, Lead, LeadStatus } from '@/data/mockLeads';

export type NewLeadInput = Omit<
  Lead,
  'id' | 'createdAt' | 'notes' | 'lastContactedAt'
> & {
  notes?: string[];
};

interface LeadsContextValue {
  leads: Lead[];
  addLead: (input: NewLeadInput) => Lead;
  updateLeadStatus: (id: string, status: LeadStatus) => void;
  addNote: (id: string, note: string) => void;
  updateLead: (id: string, patch: Partial<Lead>) => void;
  getLead: (id: string) => Lead | undefined;
}

const LeadsContext = createContext<LeadsContextValue | undefined>(undefined);

export function LeadsProvider({ children }: { children: ReactNode }) {
  const [leads, setLeads] = useState<Lead[]>(mockLeads);

  const addLead = useCallback((input: NewLeadInput) => {
    const lead: Lead = {
      ...input,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      notes: input.notes ?? [],
    };
    setLeads((prev) => [lead, ...prev]);
    return lead;
  }, []);

  const updateLead = useCallback((id: string, patch: Partial<Lead>) => {
    setLeads((prev) =>
      prev.map((lead) => (lead.id === id ? { ...lead, ...patch } : lead))
    );
  }, []);

  const updateLeadStatus = useCallback(
    (id: string, status: LeadStatus) => {
      const patch: Partial<Lead> = { status };
      if (status === 'contacted' || status === 'qualified') {
        patch.lastContactedAt = new Date().toISOString();
      }
      updateLead(id, patch);
    },
    [updateLead]
  );

  const addNote = useCallback((id: string, note: string) => {
    const trimmed = note.trim();
    if (!trimmed) return;
    setLeads((prev) =>
      prev.map((lead) =>
        lead.id === id ? { ...lead, notes: [...lead.notes, trimmed] } : lead
      )
    );
  }, []);

  const getLead = useCallback(
    (id: string) => leads.find((lead) => lead.id === id),
    [leads]
  );

  return (
    <LeadsContext.Provider
      value={{ leads, addLead, updateLeadStatus, addNote, updateLead, getLead }}
    >
      {children}
    </LeadsContext.Provider>
  );
}

export function useLeads() {
  const ctx = useContext(LeadsContext);
  if (!ctx) {
    throw new Error('useLeads must be used within a LeadsProvider');
  }
  return ctx;
}
