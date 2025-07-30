
import React from 'react';
import { BucketListItemType } from '../types';
import BucketListItem from './BucketListItem';
import EmptyState from './EmptyState';

interface BucketListProps {
  items: BucketListItemType[];
  onToggleComplete: (id: number, completed: boolean) => void;
  onDeleteItem: (id: number) => void;
  isReadOnly?: boolean;
}

const BucketList: React.FC<BucketListProps> = ({ items, onToggleComplete, onDeleteItem, isReadOnly = false }) => {
  if (items.length === 0) {
    return <EmptyState />;
  }
  
  const incompleteItems = items.filter(item => !item.completed);
  const completedItems = items.filter(item => item.completed);

  return (
    <div className="space-y-4">
      {incompleteItems.map(item => (
        <BucketListItem
          key={item.id}
          item={item}
          onToggleComplete={onToggleComplete}
          onDeleteItem={onDeleteItem}
          isReadOnly={isReadOnly}
        />
      ))}
      {completedItems.length > 0 && incompleteItems.length > 0 && (
         <div className="flex items-center">
            <div className="flex-grow border-t border-slate-300 dark:border-slate-700"></div>
            <span className="flex-shrink mx-4 text-slate-400 dark:text-slate-500">Completed</span>
            <div className="flex-grow border-t border-slate-300 dark:border-slate-700"></div>
          </div>
      )}
      {completedItems.map(item => (
        <BucketListItem
          key={item.id}
          item={item}
          onToggleComplete={onToggleComplete}
          onDeleteItem={onDeleteItem}
          isReadOnly={isReadOnly}
        />
      ))}
    </div>
  );
};

export default BucketList;
