export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'not-interested' | 'converted';
export type LeadSource = 'website' | 'facebook' | 'google' | 'twitter' | 'referral' | 'walk-in' | 'event';

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  source: LeadSource;
  status: LeadStatus;
  interestedIn: string;
  budget: string;
  createdAt: string;
  lastContactedAt?: string;
  assignedTo?: string;
  notes: string[];
  priority: 'high' | 'medium' | 'low';
}

export const mockLeads: Lead[] = [
  {
    id: '1',
    name: 'Rahul Sharma',
    email: 'rahul.sharma@email.com',
    phone: '+91 98765 43210',
    source: 'website',
    status: 'new',
    interestedIn: 'Honda City 2024',
    budget: '₹15-18 Lakhs',
    createdAt: '2024-01-24T10:30:00',
    assignedTo: 'Priya Singh',
    notes: ['Interested in white color', 'Prefers automatic transmission'],
    priority: 'high',
  },
  {
    id: '2',
    name: 'Anita Patel',
    email: 'anita.patel@email.com',
    phone: '+91 87654 32109',
    source: 'facebook',
    status: 'contacted',
    interestedIn: 'Hyundai Creta',
    budget: '₹12-15 Lakhs',
    createdAt: '2024-01-23T14:20:00',
    lastContactedAt: '2024-01-24T09:00:00',
    assignedTo: 'Amit Kumar',
    notes: ['Called once, will follow up tomorrow', 'Looking for petrol variant'],
    priority: 'medium',
  },
  {
    id: '3',
    name: 'Vikram Reddy',
    email: 'vikram.r@email.com',
    phone: '+91 76543 21098',
    source: 'google',
    status: 'qualified',
    interestedIn: 'Maruti Suzuki Grand Vitara',
    budget: '₹18-22 Lakhs',
    createdAt: '2024-01-22T16:45:00',
    lastContactedAt: '2024-01-24T11:30:00',
    assignedTo: 'Priya Singh',
    notes: ['Very interested', 'Scheduled test drive for Saturday', 'Wants hybrid version'],
    priority: 'high',
  },
  {
    id: '4',
    name: 'Meera Krishnan',
    email: 'meera.k@email.com',
    phone: '+91 65432 10987',
    source: 'referral',
    status: 'converted',
    interestedIn: 'Tata Nexon EV',
    budget: '₹14-17 Lakhs',
    createdAt: '2024-01-20T09:15:00',
    lastContactedAt: '2024-01-23T15:00:00',
    assignedTo: 'Amit Kumar',
    notes: ['Purchased Nexon EV Max', 'Referred by existing customer', 'Very happy with service'],
    priority: 'high',
  },
  {
    id: '5',
    name: 'Sanjay Gupta',
    email: 'sanjay.g@email.com',
    phone: '+91 54321 09876',
    source: 'twitter',
    status: 'not-interested',
    interestedIn: 'Kia Seltos',
    budget: '₹16-20 Lakhs',
    createdAt: '2024-01-21T11:00:00',
    lastContactedAt: '2024-01-22T10:00:00',
    assignedTo: 'Priya Singh',
    notes: ['Budget constraints', 'May revisit in 6 months'],
    priority: 'low',
  },
  {
    id: '6',
    name: 'Deepika Nair',
    email: 'deepika.n@email.com',
    phone: '+91 43210 98765',
    source: 'event',
    status: 'new',
    interestedIn: 'Toyota Innova Crysta',
    budget: '₹22-28 Lakhs',
    createdAt: '2024-01-24T08:00:00',
    assignedTo: 'Amit Kumar',
    notes: ['Met at Auto Expo', 'Family of 6, needs spacious vehicle'],
    priority: 'high',
  },
  {
    id: '7',
    name: 'Arjun Mehta',
    email: 'arjun.m@email.com',
    phone: '+91 32109 87654',
    source: 'walk-in',
    status: 'contacted',
    interestedIn: 'Mahindra XUV700',
    budget: '₹20-25 Lakhs',
    createdAt: '2024-01-23T17:30:00',
    lastContactedAt: '2024-01-24T10:15:00',
    assignedTo: 'Priya Singh',
    notes: ['Walked in yesterday', 'Comparing with Tata Safari', 'Interested in AX7 variant'],
    priority: 'medium',
  },
  {
    id: '8',
    name: 'Kavitha Rao',
    email: 'kavitha.rao@email.com',
    phone: '+91 21098 76543',
    source: 'facebook',
    status: 'qualified',
    interestedIn: 'Skoda Kushaq',
    budget: '₹15-19 Lakhs',
    createdAt: '2024-01-19T12:00:00',
    lastContactedAt: '2024-01-23T14:30:00',
    assignedTo: 'Amit Kumar',
    notes: ['Ready to purchase', 'Negotiating on accessories', 'Wants Monte Carlo edition'],
    priority: 'high',
  },
];

export const teamMembers = [
  { id: '1', name: 'Priya Singh', role: 'Sales Executive', leadsAssigned: 12 },
  { id: '2', name: 'Amit Kumar', role: 'Senior Sales Executive', leadsAssigned: 15 },
  { id: '3', name: 'Neha Verma', role: 'Sales Manager', leadsAssigned: 8 },
];

export const sourceLabels: Record<LeadSource, string> = {
  website: 'Website',
  facebook: 'Facebook',
  google: 'Google Ads',
  twitter: 'Twitter',
  referral: 'Referral',
  'walk-in': 'Walk-in',
  event: 'Event',
};

export const statusLabels: Record<LeadStatus, string> = {
  new: 'New',
  contacted: 'Contacted',
  qualified: 'Qualified',
  'not-interested': 'Not Interested',
  converted: 'Converted',
};
