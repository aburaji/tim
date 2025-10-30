import React, { useState, useRef, useEffect } from 'react';
import { Task } from '../types';
import { PencilIcon, TrashIcon } from './Icons';

interface TaskItemProps {
  task: Task;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number, newText: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    if (editText.trim() !== '') {
      onEdit(task.id, editText.trim());
    } else {
      setEditText(task.text); // revert if empty
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      setEditText(task.text);
      setIsEditing(false);
    }
  };

  return (
    <li className="group flex items-center p-4 transition-colors duration-200 hover:bg-slate-50 dark:hover:bg-slate-700">
      <div className="flex-shrink-0">
        <label htmlFor={`task-${task.id}`} className="flex items-center cursor-pointer">
          <input
            id={`task-${task.id}`}
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggle(task.id)}
            className="hidden"
          />
          <span className={`w-6 h-6 border-2 rounded-full flex items-center justify-center transition-all duration-300 ${
            task.completed
              ? 'bg-blue-500 border-blue-500'
              : 'border-slate-300 dark:border-slate-600 group-hover:border-blue-400'
          }`}>
            {task.completed && (
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            )}
          </span>
        </label>
      </div>

      <div className="flex-grow mx-4">
        {isEditing ? (
          <input
            ref={inputRef}
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onBlur={handleSave}
            onKeyDown={handleKeyDown}
            className="w-full bg-transparent border-b border-blue-500 focus:outline-none focus:ring-0 text-slate-800 dark:text-slate-200"
          />
        ) : (
          <p
            onDoubleClick={handleEdit}
            className={`cursor-pointer transition-all duration-300 ${
              task.completed ? 'line-through text-slate-400 dark:text-slate-500' : 'text-slate-700 dark:text-slate-300'
            }`}
          >
            {task.text}
          </p>
        )}
      </div>

      <div className="flex items-center space-x-2 space-x-reverse opacity-0 group-hover:opacity-100 transition-opacity">
        <button onClick={handleEdit} aria-label="تعديل المهمة" className="p-2 text-slate-400 hover:text-blue-500 dark:hover:text-blue-400">
          <PencilIcon className="w-5 h-5" />
        </button>
        <button onClick={() => onDelete(task.id)} aria-label="حذف المهمة" className="p-2 text-slate-400 hover:text-red-500 dark:hover:text-red-400">
          <TrashIcon className="w-5 h-5" />
        </button>
      </div>
    </li>
  );
};

export default TaskItem;