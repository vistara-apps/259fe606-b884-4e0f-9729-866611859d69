'use client';

import { Settlement } from '@/lib/types';
import { formatCurrency, formatRelativeTime } from '@/lib/utils';
import { ArrowRight, Clock, CheckCircle, XCircle } from 'lucide-react';

interface SettlementCardProps {
  settlement: Settlement;
  currentUserId?: string;
  onSettle?: (settlement: Settlement) => void;
}

export function SettlementCard({ settlement, currentUserId, onSettle }: SettlementCardProps) {
  const isFromCurrentUser = settlement.from.id === currentUserId;
  const isToCurrentUser = settlement.to.id === currentUserId;

  const getStatusIcon = () => {
    switch (settlement.status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-success-600" />;
      case 'failed':
        return <XCircle className="w-4 h-4 text-danger-600" />;
      default:
        return <Clock className="w-4 h-4 text-warning-600" />;
    }
  };

  const getStatusColor = () => {
    switch (settlement.status) {
      case 'completed':
        return 'text-success-600';
      case 'failed':
        return 'text-danger-600';
      default:
        return 'text-warning-600';
    }
  };

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3 flex-1">
          <div className="text-lg">{settlement.from.avatar || '👤'}</div>
          
          <div className="flex items-center space-x-2 flex-1">
            <span className="font-medium text-gray-900">
              {isFromCurrentUser ? 'You' : settlement.from.name}
            </span>
            <ArrowRight className="w-4 h-4 text-gray-400" />
            <span className="font-medium text-gray-900">
              {isToCurrentUser ? 'You' : settlement.to.name}
            </span>
          </div>
          
          <div className="text-right">
            <div className="font-semibold text-gray-900">
              {formatCurrency(settlement.amount)}
            </div>
            <div className={`text-xs flex items-center space-x-1 ${getStatusColor()}`}>
              {getStatusIcon()}
              <span className="capitalize">{settlement.status}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-3 flex items-center justify-between text-sm text-gray-500">
        <span>{formatRelativeTime(settlement.createdAt)}</span>
        
        {settlement.status === 'pending' && isFromCurrentUser && onSettle && (
          <button
            onClick={() => onSettle(settlement)}
            className="text-primary-600 hover:text-primary-700 font-medium"
          >
            Settle Now
          </button>
        )}
        
        {settlement.transactionHash && (
          <a
            href={`https://basescan.org/tx/${settlement.transactionHash}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-600 hover:text-primary-700 font-medium"
          >
            View Transaction
          </a>
        )}
      </div>
    </div>
  );
}
