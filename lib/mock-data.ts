import { Group, User, Expense, Settlement, GroupSummary } from './types';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Alice',
    address: '0x1234567890123456789012345678901234567890',
    avatar: '👩‍💼'
  },
  {
    id: '2',
    name: 'Bob',
    address: '0x2345678901234567890123456789012345678901',
    avatar: '👨‍💻'
  },
  {
    id: '3',
    name: 'Charlie',
    address: '0x3456789012345678901234567890123456789012',
    avatar: '👨‍🎨'
  },
  {
    id: '4',
    name: 'Diana',
    address: '0x4567890123456789012345678901234567890123',
    avatar: '👩‍🔬'
  }
];

export const mockGroups: Group[] = [
  {
    id: '1',
    name: 'Weekend Trip',
    description: 'Our amazing weekend getaway',
    members: [mockUsers[0], mockUsers[1], mockUsers[2]],
    createdAt: new Date('2024-01-15'),
    totalExpenses: 0.45,
    currency: 'ETH'
  },
  {
    id: '2',
    name: 'Dinner Squad',
    description: 'Regular dinner meetups',
    members: [mockUsers[0], mockUsers[1], mockUsers[3]],
    createdAt: new Date('2024-01-10'),
    totalExpenses: 0.28,
    currency: 'ETH'
  },
  {
    id: '3',
    name: 'House Expenses',
    description: 'Shared apartment costs',
    members: mockUsers,
    createdAt: new Date('2024-01-01'),
    totalExpenses: 1.2,
    currency: 'ETH'
  }
];

export const mockExpenses: Expense[] = [
  {
    id: '1',
    groupId: '1',
    title: 'Hotel Booking',
    description: 'Two nights at Mountain Resort',
    amount: 0.3,
    currency: 'ETH',
    paidBy: mockUsers[0],
    splitBetween: [mockUsers[0], mockUsers[1], mockUsers[2]],
    category: 'accommodation',
    date: new Date('2024-01-16'),
    settled: false
  },
  {
    id: '2',
    groupId: '1',
    title: 'Gas Money',
    description: 'Road trip fuel costs',
    amount: 0.08,
    currency: 'ETH',
    paidBy: mockUsers[1],
    splitBetween: [mockUsers[0], mockUsers[1], mockUsers[2]],
    category: 'transport',
    date: new Date('2024-01-15'),
    settled: false
  },
  {
    id: '3',
    groupId: '1',
    title: 'Dinner at Restaurant',
    description: 'Italian place downtown',
    amount: 0.07,
    currency: 'ETH',
    paidBy: mockUsers[2],
    splitBetween: [mockUsers[0], mockUsers[1], mockUsers[2]],
    category: 'food',
    date: new Date('2024-01-16'),
    settled: false
  },
  {
    id: '4',
    groupId: '2',
    title: 'Pizza Night',
    description: 'Large pizzas for everyone',
    amount: 0.05,
    currency: 'ETH',
    paidBy: mockUsers[0],
    splitBetween: [mockUsers[0], mockUsers[1], mockUsers[3]],
    category: 'food',
    date: new Date('2024-01-18'),
    settled: true
  },
  {
    id: '5',
    groupId: '2',
    title: 'Movie Tickets',
    description: 'Latest blockbuster',
    amount: 0.04,
    currency: 'ETH',
    paidBy: mockUsers[1],
    splitBetween: [mockUsers[0], mockUsers[1], mockUsers[3]],
    category: 'entertainment',
    date: new Date('2024-01-17'),
    settled: false
  }
];

export const mockSettlements: Settlement[] = [
  {
    id: '1',
    groupId: '1',
    from: mockUsers[1],
    to: mockUsers[0],
    amount: 0.08,
    currency: 'ETH',
    status: 'pending',
    createdAt: new Date('2024-01-18')
  },
  {
    id: '2',
    groupId: '2',
    from: mockUsers[3],
    to: mockUsers[0],
    amount: 0.03,
    currency: 'ETH',
    status: 'completed',
    transactionHash: '0xabcdef1234567890',
    createdAt: new Date('2024-01-17'),
    settledAt: new Date('2024-01-17')
  }
];

// Helper function to get group summary
export function getGroupSummary(groupId: string, currentUserId: string): GroupSummary | null {
  const group = mockGroups.find(g => g.id === groupId);
  if (!group) return null;

  const groupExpenses = mockExpenses.filter(e => e.groupId === groupId);
  const groupSettlements = mockSettlements.filter(s => s.groupId === groupId);
  
  // Calculate user balance (simplified)
  let userBalance = 0;
  groupExpenses.forEach(expense => {
    if (expense.paidBy.id === currentUserId) {
      userBalance += expense.amount;
    }
    if (expense.splitBetween.some(user => user.id === currentUserId)) {
      userBalance -= expense.amount / expense.splitBetween.length;
    }
  });

  return {
    group,
    userBalance,
    totalOwed: Math.max(userBalance, 0),
    totalOwing: Math.max(-userBalance, 0),
    recentExpenses: groupExpenses.slice(0, 3),
    pendingSettlements: groupSettlements.filter(s => s.status === 'pending')
  };
}
