
import React, { useState } from 'react';

interface AddItemFormProps {
  onAddItem: (text: string) => void;
}

const AddItemForm: React.FC<AddItemFormProps> = ({ onAddItem }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAddItem(text);
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-8">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new dream..."
        className="flex-grow p-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-teal-400 focus:outline-none transition duration-300"
      />
      <button
        type="submit"
        className="bg-gradient-to-r from-teal-400 to-blue-500 text-white font-bold py-3 px-6 rounded-lg hover:from-teal-500 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 dark:focus:ring-offset-slate-900 transition-all duration-300 transform hover:scale-105"
      >
        Add
      </button>
    </form>
  );
};

export default AddItemForm;
