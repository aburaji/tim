
import React from 'react';
import { Task } from '../types';
import TaskItem from './TaskItem';
import { ClipboardListIcon } from './Icons';

interface TaskListProps {
  tasks: Task[];
  onToggleTask: (id: number) => void;
  onDeleteTask: (id: number) => void;
  onEditTask: (id: number, newText: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onToggleTask, onDeleteTask, onEditTask }) => {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-16 px-4">
        <ClipboardListIcon className="w-16 h-16 mx-auto text-slate-400 dark:text-slate-500" />
        <p className="mt-4 text-slate-500 dark:text-slate-400">لا توجد مهام لعرضها. أضف مهمة جديدة لتبدأ!</p>
      </div>
    );
  }

  return (
    <ul className="divide-y divide-slate-200 dark:divide-slate-700">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggleTask}
          onDelete={onDeleteTask}
          onEdit={onEditTask}
        />
      ))}
    </ul>
  );
};

export default TaskList;
   