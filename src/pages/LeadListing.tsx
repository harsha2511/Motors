import { useState, useMemo } from 'react';
import { Download, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LeadFilters } from '@/components/leads/LeadFilters';
import { LeadTable } from '@/components/leads/LeadTable';
import { LeadDetailSheet } from '@/components/leads/LeadDetailSheet';
import { AddLeadDialog } from '@/components/leads/AddLeadDialog';
import { Lead, LeadStatus, LeadSource } from '@/data/mockLeads';
import { useLeads } from '@/context/LeadsContext';
import { exportLeadsToCsv } from '@/lib/exportLeads';
import { toast } from '@/hooks/use-toast';

export default function LeadListing() {
  const { leads } = useLeads();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<LeadStatus | 'all'>('all');
  const [sourceFilter, setSourceFilter] = useState<LeadSource | 'all'>('all');
  const [selectedLeads, setSelectedLeads] = useState<string[]>([]);
  const [selectedLeadId, setSelectedLeadId] = useState<string | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const matchesSearch = 
        lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.phone.includes(searchQuery);
      
      const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
      const matchesSource = sourceFilter === 'all' || lead.source === sourceFilter;

      return matchesSearch && matchesStatus && matchesSource;
    });
  }, [leads, searchQuery, statusFilter, sourceFilter]);

  const handleSelectLead = (id: string) => {
    setSelectedLeads(prev => 
      prev.includes(id) 
        ? prev.filter(leadId => leadId !== id)
        : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedLeads.length === filteredLeads.length) {
      setSelectedLeads([]);
    } else {
      setSelectedLeads(filteredLeads.map(lead => lead.id));
    }
  };

  const handleViewLead = (lead: Lead) => {
    setSelectedLeadId(lead.id);
    setSheetOpen(true);
  };

  const handleExport = () => {
    const toExport =
      selectedLeads.length > 0
        ? filteredLeads.filter((lead) => selectedLeads.includes(lead.id))
        : filteredLeads;
    exportLeadsToCsv(toExport);
    toast({
      title: 'Export started',
      description: `Exporting ${toExport.length} lead${toExport.length === 1 ? '' : 's'} to CSV.`,
    });
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Lead Listing</h1>
          <p className="text-muted-foreground mt-1">
            Manage and track all your leads in one place
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline">
            <Upload className="w-4 h-4 mr-2" /> Import
          </Button>
          <Button variant="outline" onClick={handleExport}>
            <Download className="w-4 h-4 mr-2" /> Export
          </Button>
          <AddLeadDialog />
        </div>
      </div>

      {/* Filters */}
      <LeadFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        sourceFilter={sourceFilter}
        onSourceChange={setSourceFilter}
      />

      {/* Stats Summary */}
      <div className="flex items-center gap-6 mb-6 text-sm">
        <span className="text-muted-foreground">
          Showing <span className="font-semibold text-foreground">{filteredLeads.length}</span> of {leads.length} leads
        </span>
        {selectedLeads.length > 0 && (
          <span className="text-primary font-medium">
            {selectedLeads.length} selected
          </span>
        )}
      </div>

      {/* Table */}
      <LeadTable
        leads={filteredLeads}
        selectedLeads={selectedLeads}
        onSelectLead={handleSelectLead}
        onSelectAll={handleSelectAll}
        onViewLead={handleViewLead}
      />

      {/* Lead Detail Sheet */}
      <LeadDetailSheet
        leadId={selectedLeadId}
        open={sheetOpen}
        onOpenChange={setSheetOpen}
      />
    </div>
  );
}
