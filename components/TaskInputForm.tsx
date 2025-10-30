
import React, { useState } from 'react';
import { PlusIcon } from './Icons';

interface TaskInputFormProps {
  onAddTask: (text: string) => void;
}

const TaskInputForm: React.FC<TaskInputFormProps> = ({ onAddTask }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddTask(text);
    setText('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center bg-white dark:bg-slate-800 rounded-lg shadow-md p-2">
      <button
        type="submit"
        aria-label="إضافة مهمة"
        className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-blue-500 hover:bg-blue-600 text-white transition-colors"
      >
        <PlusIcon className="w-6 h-6" />
      </button>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="أضف مهمة جديدة..."
        className="w-full bg-transparent border-none px-4 text-slate-700 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:ring-0"
      />
    </form>
  );
};

export default TaskInputForm;
   