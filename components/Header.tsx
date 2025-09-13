'use client';

import { ArrowLeft, Plus, Settings } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface HeaderProps {
  title: string;
  showBack?: boolean;
  showAdd?: boolean;
  showSettings?: boolean;
  onAdd?: () => void;
  onSettings?: () => void;
}

export function Header({ 
  title, 
  showBack = false, 
  showAdd = false, 
  showSettings = false,
  onAdd,
  onSettings 
}: HeaderProps) {
  const router = useRouter();

  return (
    <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
      <div className="flex items-center space-x-3">
        {showBack && (
          <button
            onClick={() => router.back()}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
        )}
        <h1 className="text-xl font-bold text-gray-900">{title}</h1>
      </div>
      
      <div className="flex items-center space-x-2">
        {showAdd && (
          <button
            onClick={onAdd}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <Plus className="w-5 h-5 text-gray-600" />
          </button>
        )}
        {showSettings && (
          <button
            onClick={onSettings}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <Settings className="w-5 h-5 text-gray-600" />
          </button>
        )}
      </div>
    </header>
  );
}
