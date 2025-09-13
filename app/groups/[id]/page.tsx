'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Header } from '@/components/Header';
import { BalanceCard } from '@/components/BalanceCard';
import { ExpenseCard } from '@/components/ExpenseCard';
import { SettlementCard } from '@/components/SettlementCard';
import { AddExpenseModal } from '@/components/AddExpenseModal';
import { mockGroups, mockUsers, mockExpenses, mockSettlements, getGroupSummary } from '@/lib/mock-data';
import { Group, User, Expense, Settlement, ExpenseCategory } from '@/lib/types';
import { Plus, Users, DollarSign, History } from 'lucide-react';
import { generateId, formatCurrency } from '@/lib/utils';

export default function GroupPage() {
  const params = useParams();
  const router = useRouter();
  const groupId = params.id as string;
  
  const [group, setGroup] = useState<Group | null>(null);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [settlements, setSettlements] = useState<Settlement[]>([]);
  const [showAddExpense, setShowAddExpense] = useState(false);
  const [currentUser] = useState<User>(mockUsers[0]);
  const [activeTab, setActiveTab] = useState<'expenses' | 'balances' | 'settlements'>('expenses');

  useEffect(() => {
    const foundGroup = mockGroups.find(g => g.id === groupId);
    if (foundGroup) {
      setGroup(foundGroup);
      setExpenses(mockExpenses.filter(e => e.groupId === groupId));
      setSettlements(mockSettlements.filter(s => s.groupId === groupId));
    } else {
      router.push('/');
    }
  }, [groupId, router]);

  const handleAddExpense = (expenseData: {
    title: string;
    description: string;
    amount: number;
    category: ExpenseCategory;
    paidBy: User;
    splitBetween: User[];
  }) => {
    const newExpense: Expense = {
      id: generateId(),
      groupId,
      title: expenseData.title,
      description: expenseData.description,
      amount: expenseData.amount,
      currency: 'ETH',
      paidBy: expenseData.paidBy,
      splitBetween: expenseData.splitBetween,
      category: expenseData.category,
      date: new Date(),
      settled: false
    };
    
    setExpenses([newExpense, ...expenses]);
    
    // Update group total
    if (group) {
      setGroup({
        ...group,
        totalExpenses: group.totalExpenses + expenseData.amount
      });
    }
  };

  const handleSettlePayment = (settlement: Settlement) => {
    // In a real app, this would trigger a blockchain transaction
    console.log('Settling payment:', settlement);
    
    // Mock settlement completion
    setSettlements(prev => 
      prev.map(s => 
        s.id === settlement.id 
          ? { ...s, status: 'completed' as const, settledAt: new Date(), transactionHash: '0x' + Math.random().toString(16).substr(2, 64) }
          : s
      )
    );
  };

  if (!group) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  const summary = getGroupSummary(groupId, currentUser.id);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        title={group.name}
        showBack={true}
        showAdd={true}
        onAdd={() => setShowAddExpense(true)}
      />
      
      <div className="p-4 space-y-6">
        {/* Group Info */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold text-gray-900">{group.name}</h2>
              {group.description && (
                <p className="text-gray-600 text-sm mt-1">{group.description}</p>
              )}
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">Total Expenses</div>
              <div className="font-semibold text-lg">{formatCurrency(group.totalExpenses)}</div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Users className="w-4 h-4" />
            <span>{group.members.length} members</span>
            <span>•</span>
            <span>{expenses.length} expenses</span>
          </div>
        </div>

        {/* Balance Overview */}
        {summary && (
          <BalanceCard
            balance={summary.userBalance}
            totalOwed={summary.totalOwed}
            totalOwing={summary.totalOwing}
          />
        )}

        {/* Tabs */}
        <div className="flex space-x-1 bg-gray-200 p-1 rounded-lg">
          <button
            onClick={() => setActiveTab('expenses')}
            className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors duration-200 ${
              activeTab === 'expenses'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Expenses
          </button>
          <button
            onClick={() => setActiveTab('balances')}
            className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors duration-200 ${
              activeTab === 'balances'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Balances
          </button>
          <button
            onClick={() => setActiveTab('settlements')}
            className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors duration-200 ${
              activeTab === 'settlements'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Settlements
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'expenses' && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Expenses</h3>
              <button
                onClick={() => setShowAddExpense(true)}
                className="btn-primary text-sm"
              >
                <Plus className="w-4 h-4 mr-1" />
                Add Expense
              </button>
            </div>
            
            {expenses.length === 0 ? (
              <div className="card text-center py-8">
                <div className="text-4xl mb-4">💸</div>
                <h4 className="font-medium text-gray-900 mb-2">No expenses yet</h4>
                <p className="text-gray-600 text-sm mb-4">
                  Add your first expense to start tracking
                </p>
                <button
                  onClick={() => setShowAddExpense(true)}
                  className="btn-primary"
                >
                  Add Expense
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {expenses.map((expense) => (
                  <ExpenseCard
                    key={expense.id}
                    expense={expense}
                    currentUserId={currentUser.id}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'balances' && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Member Balances</h3>
            <div className="space-y-3">
              {group.members.map((member) => {
                const memberSummary = getGroupSummary(groupId, member.id);
                const balance = memberSummary?.userBalance || 0;
                
                return (
                  <div key={member.id} className="card">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{member.avatar}</span>
                        <div>
                          <div className="font-medium text-gray-900">
                            {member.name}
                            {member.id === currentUser.id && (
                              <span className="text-sm text-gray-500 ml-2">(You)</span>
                            )}
                          </div>
                          <div className="text-sm text-gray-600">
                            {member.address.slice(0, 6)}...{member.address.slice(-4)}
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className={`font-semibold ${
                          balance > 0 ? 'text-success-600' : 
                          balance < 0 ? 'text-danger-600' : 'text-gray-500'
                        }`}>
                          {balance > 0 && '+'}
                          {formatCurrency(balance)}
                        </div>
                        <div className="text-xs text-gray-500">
                          {balance > 0 ? 'Gets back' : balance < 0 ? 'Owes' : 'Settled'}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'settlements' && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Settlements</h3>
            
            {settlements.length === 0 ? (
              <div className="card text-center py-8">
                <div className="text-4xl mb-4">💰</div>
                <h4 className="font-medium text-gray-900 mb-2">No settlements yet</h4>
                <p className="text-gray-600 text-sm">
                  Settlements will appear here when members pay each other
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {settlements.map((settlement) => (
                  <SettlementCard
                    key={settlement.id}
                    settlement={settlement}
                    currentUserId={currentUser.id}
                    onSettle={handleSettlePayment}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <AddExpenseModal
        isOpen={showAddExpense}
        onClose={() => setShowAddExpense(false)}
        onAddExpense={handleAddExpense}
        groupMembers={group.members}
        currentUser={currentUser}
      />
    </div>
  );
}
