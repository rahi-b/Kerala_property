// types/crm.ts
export type RequirementType = 'Rent' | 'Sale' | 'Lease';
export type DealStage = 'Enquiry' | 'Site Visit' | 'Negotiation' | 'Agreement' | 'Closed';

export interface Customer {
  _id?: string;
  name: string;
  phone?: string;
  email?: string;
  whatsapp?: string;
  requirementType: RequirementType;
  propertyType: string;
  budgetMin?: number;
  budgetMax?: number;
  preferredLocations?: string[];
  furnishing?: string;
  notes?: string;
  createdAt?: string;
}

export interface Property {
  _id?: string;
  propertyId: string;
  owner?: string;
  transactionType: RequirementType;
  type: string;
  location: string;
  size?: number;
  priceOrRent: number;
  furnishing?: string;
  status?: 'Available' | 'Booked' | 'Closed';
  attachments?: { url: string; label?: string }[];
  createdAt?: string;
}

export interface Deal {
  _id?: string;
  customerId: string;
  propertyId: string;
  stage: DealStage;
  value?: number;
  assignedAgent?: string;
  followUpAt?: string;
  createdAt?: string;
}
