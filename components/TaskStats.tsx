import React from 'react';
import { Task } from '../types';

interface TaskStatsProps {
  tasks: Task[];
}

const TaskStats: React.FC<TaskStatsProps> = ({ tasks }) => {
  const incompleteTasks = tasks.filter(task => !task.completed).length;

  const getArabicPlural = (count: number) => {
    if (count === 0) return 'لا توجد مهام';
    if (count === 1) return 'مهمة واحدة متبقية';
    if (count === 2) return 'مهمتان متبقيتان';
    if (count >= 3 && count <= 10) return `${count} مهام متبقية`;
    return `${count} مهمة متبقية`;
  }

  return (
    <span>{getArabicPlural(incompleteTasks)}</span>
  );
};

export default TaskStats;