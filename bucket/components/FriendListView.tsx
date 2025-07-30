
import React from 'react';
import { BucketListItemType } from '../types';
import BucketList from './BucketList';

interface FriendListViewProps {
  items: (BucketListItemType & { owner_email: string })[];
  onBack: () => void;
}

const FriendListView: React.FC<FriendListViewProps> = ({ items, onBack }) => {
  const friendEmail = items[0]?.owner_email || 'a friend';

  return (
    <div className="mt-2">
      <div className="text-center p-6 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 mb-6 shadow-sm">
        <h2 className="text-xl font-bold text-slate-700 dark:text-slate-300">
          Viewing <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">{friendEmail}'s</span> List
        </h2>
        <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm">This is a read-only view. You cannot make any changes.</p>
        <button
          onClick={onBack}
          className="mt-4 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold py-2 px-4 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors text-sm"
        >
          &larr; Back to My List
        </button>
      </div>
      <BucketList
        items={items}
        onToggleComplete={() => {}}
        onDeleteItem={() => {}}
        isReadOnly={true}
      />
    </div>
  );
};

export default FriendListView;
