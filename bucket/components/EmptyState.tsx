
import React from 'react';

const EmptyState: React.FC = () => {
  return (
    <div className="text-center p-10 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-lg">
      <div className="text-5xl text-slate-400 dark:text-slate-600 mb-4">
        <i className="far fa-map"></i>
      </div>
      <h3 className="text-xl font-semibold text-slate-600 dark:text-slate-400">Your list is empty</h3>
      <p className="text-slate-500 dark:text-slate-500 mt-1">Add your first adventure or goal to get started!</p>
    </div>
  );
};

export default EmptyState;
