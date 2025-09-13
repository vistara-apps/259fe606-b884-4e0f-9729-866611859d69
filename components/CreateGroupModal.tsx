'use client';

import { useState } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';
import { User } from '@/lib/types';
import { generateId } from '@/lib/utils';

interface CreateGroupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateGroup: (group: { name: string; description: string; members: User[] }) => void;
  currentUser: User;
}

export function CreateGroupModal({ isOpen, onClose, onCreateGroup, currentUser }: CreateGroupModalProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [members, setMembers] = useState<User[]>([currentUser]);
  const [newMemberName, setNewMemberName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && members.length > 1) {
      onCreateGroup({
        name: name.trim(),
        description: description.trim(),
        members
      });
      handleClose();
    }
  };

  const handleClose = () => {
    setName('');
    setDescription('');
    setMembers([currentUser]);
    setNewMemberName('');
    onClose();
  };

  const addMember = () => {
    if (newMemberName.trim()) {
      const newMember: User = {
        id: generateId(),
        name: newMemberName.trim(),
        address: `0x${Math.random().toString(16).substr(2, 40)}`,
        avatar: '👤'
      };
      setMembers([...members, newMember]);
      setNewMemberName('');
    }
  };

  const removeMember = (memberId: string) => {
    if (memberId !== currentUser.id) {
      setMembers(members.filter(m => m.id !== memberId));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Create Group</h2>
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
              Group Name *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input-field"
              placeholder="Enter group name"
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
              rows={3}
              placeholder="What's this group for?"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Members
            </label>
            
            <div className="space-y-2 mb-3">
              {members.map((member) => (
                <div key={member.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">{member.avatar}</span>
                    <span className="font-medium text-gray-900">{member.name}</span>
                    {member.id === currentUser.id && (
                      <span className="text-xs text-gray-500">(You)</span>
                    )}
                  </div>
                  
                  {member.id !== currentUser.id && (
                    <button
                      type="button"
                      onClick={() => removeMember(member.id)}
                      className="p-1 hover:bg-gray-200 rounded transition-colors duration-200"
                    >
                      <Trash2 className="w-4 h-4 text-gray-600" />
                    </button>
                  )}
                </div>
              ))}
            </div>

            <div className="flex space-x-2">
              <input
                type="text"
                value={newMemberName}
                onChange={(e) => setNewMemberName(e.target.value)}
                className="input-field flex-1"
                placeholder="Add member name"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addMember())}
              />
              <button
                type="button"
                onClick={addMember}
                className="btn-outline px-3"
                disabled={!newMemberName.trim()}
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
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
              disabled={!name.trim() || members.length < 2}
            >
              Create Group
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
