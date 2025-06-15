
export interface Customer {
  phone: string;
  name: string;
  visits: number;
  points: number;
  lastVisit: string;
  totalSpent: number;
}

export interface AutomatedMessage {
  customer: Customer;
  message: string;
  reason: string;
  priority: "High" | "Medium" | "Low";
}

export interface AutomatedAIMessagingProps {
  customers: Customer[];
  businessName: string;
}
