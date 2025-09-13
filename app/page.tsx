'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { GroupCard } from '@/components/GroupCard';
import { CreateGroupModal } from '@/components/CreateGroupModal';
import { mockGroups, mockUsers, getGroupSummary } from '@/lib/mock-data';
import { Group, User } from '@/lib/types';
import { Plus, Wallet } from 'lucide-react';
import { useOnchainKit } from '@coinbase/onchainkit';

export default function HomePage() {
  const [groups, setGroups] = useState<Group[]>(mockGroups);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [currentUser] = useState<User>(mockUsers[0]); // Mock current user
  const onchainKit = useOnchainKit();

  const handleCreateGroup = (groupData: { name: string; description: string; members: User[] }) => {
    const newGroup: Group = {
      id: Math.random().toString(36).substr(2, 9),
      name: groupData.name,
      description: groupData.description,
      members: groupData.members,
      createdAt: new Date(),
      totalExpenses: 0,
      currency: 'ETH'
    };
    setGroups([newGroup, ...groups]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        title="Splitwise on Base" 
        showAdd={true}
        onAdd={() => setShowCreateModal(true)}
      />
      
      <div className="p-4 space-y-6">
        {/* Welcome Section */}
        <div className="card bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <div className="flex items-center space-x-3">
            <div className="text-2xl">👋</div>
            <div>
              <h2 className="text-lg font-semibold">
                Welcome, {currentUser.name}!
              </h2>
              <p className="text-blue-100 text-sm">
                Split bills and settle payments with friends on Base
              </p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setShowCreateModal(true)}
            className="card text-center hover:shadow-md transition-shadow duration-200"
          >
            <Plus className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <span className="font-medium text-gray-900">Create Group</span>
          </button>

          <button className="card text-center hover:shadow-md transition-shadow duration-200">
            <Wallet className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <span className="font-medium text-gray-900">My Wallet</span>
          </button>
        </div>

        {/* Groups Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Your Groups</h3>
            <span className="text-sm text-gray-500">{groups.length} groups</span>
          </div>
          
          {groups.length === 0 ? (
            <div className="card text-center py-8">
              <div className="text-4xl mb-4">👥</div>
              <h4 className="font-medium text-gray-900 mb-2">No groups yet</h4>
              <p className="text-gray-600 text-sm mb-4">
                Create your first group to start splitting expenses
              </p>
              <button
                onClick={() => setShowCreateModal(true)}
                className="btn-primary"
              >
                Create Group
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {groups.map((group) => {
                const summary = getGroupSummary(group.id, currentUser.id);
                return (
                  <GroupCard
                    key={group.id}
                    group={group}
                    userBalance={summary?.userBalance || 0}
                  />
                );
              })}
            </div>
          )}
        </div>

        {/* Recent Activity */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="card text-center py-8">
            <div className="text-4xl mb-4">📊</div>
            <h4 className="font-medium text-gray-900 mb-2">No recent activity</h4>
            <p className="text-gray-600 text-sm">
              Your recent expenses and settlements will appear here
            </p>
          </div>
        </div>
      </div>

      <CreateGroupModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCreateGroup={handleCreateGroup}
        currentUser={currentUser}
      />
    </div>
  );
}
