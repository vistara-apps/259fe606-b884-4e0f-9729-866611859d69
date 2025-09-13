import { User, Expense, Balance } from './types';

export function formatCurrency(amount: number, currency: string = 'ETH'): string {
  if (currency === 'ETH') {
    return `${amount.toFixed(4)} ETH`;
  }
  return `$${amount.toFixed(2)}`;
}

export function calculateUserBalance(expenses: Expense[], userId: string): number {
  let balance = 0;
  
  expenses.forEach(expense => {
    // If user paid for the expense
    if (expense.paidBy.id === userId) {
      balance += expense.amount;
    }
    
    // If user is part of the split
    if (expense.splitBetween.some(user => user.id === userId)) {
      const splitAmount = expense.amount / expense.splitBetween.length;
      balance -= splitAmount;
    }
  });
  
  return balance;
}

export function calculateGroupBalances(expenses: Expense[], users: User[]): Balance[] {
  return users.map(user => ({
    userId: user.id,
    groupId: expenses[0]?.groupId || '',
    amount: calculateUserBalance(expenses, user.id),
    currency: 'ETH'
  }));
}

export function getBalanceColor(amount: number): string {
  if (amount > 0) return 'balance-positive';
  if (amount < 0) return 'balance-negative';
  return 'balance-zero';
}

export function getBalanceText(amount: number): string {
  if (amount > 0) return `You are owed ${formatCurrency(Math.abs(amount))}`;
  if (amount < 0) return `You owe ${formatCurrency(Math.abs(amount))}`;
  return 'You are settled up';
}

export function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(date);
}

export function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
  
  if (diffInHours < 1) return 'Just now';
  if (diffInHours < 24) return `${Math.floor(diffInHours)}h ago`;
  if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
  return formatDate(date);
}

export const expenseCategories = [
  { id: 'food', name: 'Food & Drinks', icon: '🍽️' },
  { id: 'transport', name: 'Transport', icon: '🚗' },
  { id: 'accommodation', name: 'Accommodation', icon: '🏠' },
  { id: 'entertainment', name: 'Entertainment', icon: '🎬' },
  { id: 'shopping', name: 'Shopping', icon: '🛍️' },
  { id: 'utilities', name: 'Utilities', icon: '💡' },
  { id: 'other', name: 'Other', icon: '📝' },
] as const;

export function getCategoryIcon(category: string): string {
  const cat = expenseCategories.find(c => c.id === category);
  return cat?.icon || '📝';
}

export function getCategoryName(category: string): string {
  const cat = expenseCategories.find(c => c.id === category);
  return cat?.name || 'Other';
}
