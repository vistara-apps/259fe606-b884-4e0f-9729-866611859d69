'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import { User, ExpenseCategory } from '@/lib/types';
import { expenseCategories } from '@/lib/utils';

interface AddExpenseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddExpense: (expense: {
    title: string;
    description: string;
    amount: number;
    category: ExpenseCategory;
    paidBy: User;
    splitBetween: User[];
  }) => void;
  groupMembers: User[];
  currentUser: User;
}

export function AddExpenseModal({ 
  isOpen, 
  onClose, 
  onAddExpense, 
  groupMembers, 
  currentUser 
}: AddExpenseModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<ExpenseCategory>('other');
  const [paidBy, setPaidBy] = useState<User>(currentUser);
  const [splitBetween, setSplitBetween] = useState<User[]>(groupMembers);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && amount && parseFloat(amount) > 0 && splitBetween.length > 0) {
      onAddExpense({
        title: title.trim(),
        description: description.trim(),
        amount: parseFloat(amount),
        category,
        paidBy,
        splitBetween
      });
      handleClose();
    }
  };

  const handleClose = () => {
    setTitle('');
    setDescription('');
    setAmount('');
    setCategory('other');
    setPaidBy(currentUser);
    setSplitBetween(groupMembers);
    onClose();
  };

  const toggleSplitMember = (member: User) => {
    setSplitBetween(prev => 
      prev.some(m => m.id === member.id)
        ? prev.filter(m => m.id !== member.id)
        : [...prev, member]
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Add Expense</h2>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Expense Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="input-field"
              placeholder="What was this expense for?"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="input-field resize-none"
              rows={2}
              placeholder="Add details (optional)"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Amount (ETH) *
            </label>
            <input
              type="number"
              step="0.0001"
              min="0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="input-field"
              placeholder="0.0000"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <div className="grid grid-cols-2 gap-2">
              {expenseCategories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setCategory(cat.id as ExpenseCategory)}
                  className={`p-3 rounded-lg border text-left transition-colors duration-200 ${
                    category === cat.id
                      ? 'border-primary-500 bg-primary-50 text-primary-700'
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">{cat.icon}</span>
                    <span className="text-sm font-medium">{cat.name}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Paid by
            </label>
            <div className="space-y-2">
              {groupMembers.map((member) => (
                <label key={member.id} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="paidBy"
                    checked={paidBy.id === member.id}
                    onChange={() => setPaidBy(member)}
                    className="text-primary-600 focus:ring-primary-500"
                  />
                  <span className="text-lg">{member.avatar}</span>
                  <span className="font-medium text-gray-900">{member.name}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Split between
            </label>
            <div className="space-y-2">
              {groupMembers.map((member) => (
                <label key={member.id} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={splitBetween.some(m => m.id === member.id)}
                    onChange={() => toggleSplitMember(member)}
                    className="text-primary-600 focus:ring-primary-500 rounded"
                  />
                  <span className="text-lg">{member.avatar}</span>
                  <span className="font-medium text-gray-900">{member.name}</span>
                </label>
              ))}
            </div>
            {splitBetween.length > 0 && (
              <p className="text-sm text-gray-500 mt-2">
                Each person pays: {amount ? (parseFloat(amount) / splitBetween.length).toFixed(4) : '0.0000'} ETH
              </p>
            )}
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="btn-secondary flex-1"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary flex-1"
              disabled={!title.trim() || !amount || parseFloat(amount) <= 0 || splitBetween.length === 0}
            >
              Add Expense
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
