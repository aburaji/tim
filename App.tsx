import React, { useState, useEffect, useMemo } from 'react';
import { Task, FilterType } from './types';
import Header from './components/Header';
import TaskInputForm from './components/TaskInputForm';
import TaskList from './components/TaskList';
import FilterControls from './components/FilterControls';
import TaskStats from './components/TaskStats';
import { useTheme } from './hooks/useTheme';

const App: React.FC = () => {
  const [theme, toggleTheme] = useTheme();
  const [tasks, setTasks] = useState<Task[]>(() => {
    try {
      const localTasks = window.localStorage.getItem('tasks');
      return localTasks ? JSON.parse(localTasks) : [];
    } catch (error) {
      console.error("Error reading tasks from localStorage", error);
      return [];
    }
  });

  const [filter, setFilter] = useState<FilterType>('all');

  useEffect(() => {
    try {
      window.localStorage.setItem('tasks', JSON.stringify(tasks));
    } catch (error) {
      console.error("Error writing tasks to localStorage", error);
    }
  }, [tasks]);

  const addTask = (text: string) => {
    if (text.trim() === '') return;
    const newTask: Task = {
      id: Date.now(),
      text,
      completed: false,
    };
    setTasks(prevTasks => [newTask, ...prevTasks]);
  };

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const editTask = (id: number, newText: string) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, text: newText } : task
    ));
  };
  
  const clearCompleted = () => {
    setTasks(tasks.filter(task => !task.completed));
  }

  const filteredTasks = useMemo(() => {
    switch (filter) {
      case 'active':
        return tasks.filter(task => !task.completed);
      case 'completed':
        return tasks.filter(task => task.completed);
      default:
        return tasks;
    }
  }, [tasks, filter]);

  return (
    <div className="min-h-screen font-sans text-slate-800 dark:text-slate-200 transition-colors duration-500">
      <div className="absolute top-0 left-0 w-full h-72 bg-gradient-to-br from-cyan-500 to-blue-600 dark:from-cyan-800 dark:to-blue-900 rounded-b-3xl -z-10"></div>
      <main className="max-w-xl mx-auto px-4 py-8 md:py-16">
        <Header theme={theme} toggleTheme={toggleTheme} />
        <TaskInputForm onAddTask={addTask} />
        
        <div className="mt-8 bg-white dark:bg-slate-800 rounded-lg shadow-lg overflow-hidden">
          <TaskList
            tasks={filteredTasks}
            onToggleTask={toggleTask}
            onDeleteTask={deleteTask}
            onEditTask={editTask}
          />
          <div className="p-4 flex justify-between items-center text-sm text-slate-500 dark:text-slate-400 border-t border-slate-200 dark:border-slate-700">
            <TaskStats tasks={tasks} />
            <div className="hidden sm:block">
              <FilterControls filter={filter} onFilterChange={setFilter} />
            </div>
            <button
              onClick={clearCompleted}
              className="hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
            >
              مسح المكتمل
            </button>
          </div>
        </div>
        
        <div className="mt-4 sm:hidden bg-white dark:bg-slate-800 rounded-lg shadow-lg p-3">
          <FilterControls filter={filter} onFilterChange={setFilter} />
        </div>
        
        <footer className="text-center mt-16 text-slate-500 dark:text-slate-400 text-sm">
          <p>صُمم لإنجاز مهامك اليومية بكفاءة.</p>
        </footer>
      </main>
    </div>
  );
};

export default App;