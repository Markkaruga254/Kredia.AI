export interface Transaction {
  id: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  timestamp: string;
  rawText: string;
}

export interface BehavioralInsights {
  consistencyScore: number; // 0-100
  stabilityRating: 'Stable' | 'Volatile' | 'Fluctuating';
  riskLevel: 'Low' | 'Medium' | 'High';
  spendingPattern: string;
  earningFrequency: string;
}

export interface CreditProfile {
  score: number; // 300-850
  riskLevel: 'Low' | 'Medium' | 'High';
  stabilityRating: string;
  explanation: string;
  insights: BehavioralInsights;
  transactions: Transaction[];
}
