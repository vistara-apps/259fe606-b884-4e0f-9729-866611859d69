'use client';

import { Expense } from '@/lib/types';
import { formatCurrency, formatRelativeTime, getCategoryIcon, getCategoryName } from '@/lib/utils';
import { User } from 'lucide-react';

interface ExpenseCardProps {
  expense: Expense;
  currentUserId?: string;
  onClick?: () => void;
}

export function ExpenseCard({ expense, currentUserId, onClick }: ExpenseCardProps) {
  const splitAmount = expense.amount / expense.splitBetween.length;
  const userPaid = expense.paidBy.id === currentUserId;
  const userInvolved = expense.splitBetween.some(user => user.id === currentUserId);
  
  let userAmount = 0;
  if (userPaid) userAmount += expense.amount;
  if (userInvolved) userAmount -= splitAmount;

  return (
    <div 
      className={`expense-card ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
    >
      <div className="flex items-start space-x-3">
        <div className="text-2xl">{getCategoryIcon(expense.category)}</div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h4 className="font-medium text-gray-900 truncate">{expense.title}</h4>
              {expense.description && (
                <p className="text-sm text-gray-600 mt-1">{expense.description}</p>
              )}
              
              <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                <span>{getCategoryName(expense.category)}</span>
                <span>{formatRelativeTime(expense.date)}</span>
              </div>
              
              <div className="flex items-center space-x-2 mt-2">
                <div className="flex items-center space-x-1 text-sm text-gray-600">
                  <User className="w-3 h-3" />
                  <span>{expense.paidBy.name} paid</span>
                </div>
                <span className="text-gray-400">•</span>
                <span className="text-sm text-gray-600">
                  Split {expense.splitBetween.length} ways
                </span>
              </div>
            </div>
            
            <div className="text-right ml-4">
              <div className="font-semibold text-gray-900">
                {formatCurrency(expense.amount)}
              </div>
              
              {currentUserId && userInvolved && (
                <div className={`text-sm mt-1 ${
                  userAmount > 0 ? 'text-success-600' : 
                  userAmount < 0 ? 'text-danger-600' : 'text-gray-500'
                }`}>
                  {userAmount > 0 && '+'}
                  {formatCurrency(userAmount)}
                </div>
              )}
              
              {expense.settled && (
                <div className="text-xs text-success-600 mt-1 font-medium">
                  Settled
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
