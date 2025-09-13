'use client';

import { Group } from '@/lib/types';
import { formatCurrency, getBalanceColor } from '@/lib/utils';
import { Users, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface GroupCardProps {
  group: Group;
  userBalance?: number;
}

export function GroupCard({ group, userBalance = 0 }: GroupCardProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/groups/${group.id}`);
  };

  return (
    <div 
      className="card hover:shadow-md transition-shadow duration-200 cursor-pointer"
      onClick={handleClick}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 mb-1">{group.name}</h3>
          {group.description && (
            <p className="text-sm text-gray-600 mb-2">{group.description}</p>
          )}
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <Users className="w-4 h-4" />
              <span>{group.members.length} members</span>
            </div>
            
            <div className="text-sm">
              <span className="text-gray-500">Total: </span>
              <span className="font-medium">{formatCurrency(group.totalExpenses)}</span>
            </div>
          </div>
          
          {userBalance !== 0 && (
            <div className={`text-sm mt-2 ${getBalanceColor(userBalance)}`}>
              {userBalance > 0 
                ? `You are owed ${formatCurrency(Math.abs(userBalance))}`
                : `You owe ${formatCurrency(Math.abs(userBalance))}`
              }
            </div>
          )}
        </div>
        
        <ChevronRight className="w-5 h-5 text-gray-400 ml-3" />
      </div>
    </div>
  );
}
