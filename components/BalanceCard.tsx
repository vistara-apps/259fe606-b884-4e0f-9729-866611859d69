'use client';

import { formatCurrency, getBalanceColor } from '@/lib/utils';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface BalanceCardProps {
  balance: number;
  totalOwed: number;
  totalOwing: number;
  currency?: string;
}

export function BalanceCard({ 
  balance, 
  totalOwed, 
  totalOwing, 
  currency = 'ETH' 
}: BalanceCardProps) {
  const getBalanceIcon = () => {
    if (balance > 0) return <TrendingUp className="w-5 h-5 text-green-600" />;
    if (balance < 0) return <TrendingDown className="w-5 h-5 text-red-600" />;
    return <Minus className="w-5 h-5 text-gray-500" />;
  };

  const getBalanceMessage = () => {
    if (balance > 0) return 'You are owed';
    if (balance < 0) return 'You owe';
    return 'You are settled up';
  };

  return (
    <div className="card bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
      <div className="text-center">
        <div className="flex items-center justify-center mb-2">
          {getBalanceIcon()}
        </div>
        
        <div className={`text-2xl font-bold mb-1 ${getBalanceColor(balance)}`}>
          {formatCurrency(Math.abs(balance), currency)}
        </div>
        
        <p className="text-sm text-gray-600 mb-4">
          {getBalanceMessage()}
        </p>
        
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="text-center">
            <div className="font-semibold text-green-600">
              {formatCurrency(totalOwed, currency)}
            </div>
            <div className="text-gray-500">You are owed</div>
          </div>

          <div className="text-center">
            <div className="font-semibold text-red-600">
              {formatCurrency(totalOwing, currency)}
            </div>
            <div className="text-gray-500">You owe</div>
          </div>
        </div>
      </div>
    </div>
  );
}
