export interface User {
  id: string;
  name: string;
  address: string;
  avatar?: string;
}

export interface Group {
  id: string;
  name: string;
  description?: string;
  members: User[];
  createdAt: Date;
  totalExpenses: number;
  currency: string;
}

export interface Expense {
  id: string;
  groupId: string;
  title: string;
  description?: string;
  amount: number;
  currency: string;
  paidBy: User;
  splitBetween: User[];
  category: ExpenseCategory;
  date: Date;
  receipt?: string;
  settled: boolean;
}

export interface Settlement {
  id: string;
  groupId: string;
  from: User;
  to: User;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed';
  transactionHash?: string;
  createdAt: Date;
  settledAt?: Date;
}

export interface Balance {
  userId: string;
  groupId: string;
  amount: number;
  currency: string;
}

export type ExpenseCategory = 
  | 'food'
  | 'transport'
  | 'accommodation'
  | 'entertainment'
  | 'shopping'
  | 'utilities'
  | 'other';

export interface GroupSummary {
  group: Group;
  userBalance: number;
  totalOwed: number;
  totalOwing: number;
  recentExpenses: Expense[];
  pendingSettlements: Settlement[];
}
