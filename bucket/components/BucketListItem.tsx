
import React from 'react';
import { BucketListItemType } from '../types';

interface BucketListItemProps {
  item: BucketListItemType;
  onToggleComplete: (id: number, completed: boolean) => void;
  onDeleteItem: (id: number) => void;
  isReadOnly?: boolean;
}

const BucketListItem: React.FC<BucketListItemProps> = ({ item, onToggleComplete, onDeleteItem, isReadOnly = false }) => {
  return (
    <div
      className={`
        flex items-center p-4 rounded-lg transition-all duration-300
        ${item.completed 
          ? 'bg-white/60 dark:bg-slate-800/50' 
          : 'bg-white dark:bg-slate-800 shadow-md'
        }
        ${!isReadOnly && !item.completed ? 'hover:shadow-lg' : ''}
      `}
    >
      <input
        type="checkbox"
        checked={item.completed}
        onChange={() => !isReadOnly && onToggleComplete(item.id, item.completed)}
        className={`h-6 w-6 rounded border-gray-300 text-teal-500 focus:ring-teal-500 flex-shrink-0 ${isReadOnly ? 'cursor-not-allowed opacity-70' : 'cursor-pointer'}`}
        aria-label={`Mark item as ${item.completed ? 'incomplete' : 'complete'}: ${item.text}`}
        disabled={isReadOnly}
      />
      <span
        className={`
          flex-grow mx-4
          ${item.completed 
            ? 'line-through text-slate-400 dark:text-slate-500' 
            : 'text-slate-700 dark:text-slate-300'
          }
        `}
      >
        {item.text}
      </span>
      <button
        onClick={() => !isReadOnly && onDeleteItem(item.id)}
        className={`text-slate-400 dark:text-slate-600 transition-colors duration-300 flex-shrink-0 ${isReadOnly ? 'opacity-50 cursor-not-allowed' : 'hover:text-red-500 dark:hover:text-red-400'}`}
        aria-label={`Delete item: ${item.text}`}
        disabled={isReadOnly}
      >
        <i className="fas fa-trash-alt"></i>
      </button>
    </div>
  );
};

export default BucketListItem;
