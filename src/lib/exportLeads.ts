import { Lead, sourceLabels, statusLabels } from '@/data/mockLeads';

const headers = [
  'Name',
  'Email',
  'Phone',
  'Interested In',
  'Budget',
  'Source',
  'Status',
  'Priority',
  'Assigned To',
  'Created At',
];

function escapeCell(value: string): string {
  if (/[",\n]/.test(value)) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

export function leadsToCsv(leads: Lead[]): string {
  const rows = leads.map((lead) =>
    [
      lead.name,
      lead.email,
      lead.phone,
      lead.interestedIn,
      lead.budget,
      sourceLabels[lead.source],
      statusLabels[lead.status],
      lead.priority,
      lead.assignedTo ?? '',
      lead.createdAt,
    ]
      .map((cell) => escapeCell(String(cell)))
      .join(',')
  );
  return [headers.join(','), ...rows].join('\n');
}

export function exportLeadsToCsv(leads: Lead[], filename = 'leads.csv'): void {
  const csv = leadsToCsv(leads);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
