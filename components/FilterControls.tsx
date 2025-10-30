import React from 'react';
import { FilterType } from '../types';

interface FilterControlsProps {
  filter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

const FilterControls: React.FC<FilterControlsProps> = ({ filter, onFilterChange }) => {
  const filters: { key: FilterType, label: string }[] = [
    { key: 'all', label: 'الكل' },
    { key: 'active', label: 'النشطة' },
    { key: 'completed', label: 'المكتملة' },
  ];

  return (
    <div className="flex justify-center space-x-4 space-x-reverse">
      {filters.map(({ key, label }) => (
        <button
          key={key}
          onClick={() => onFilterChange(key)}
          className={`transition-colors ${
            filter === key
              ? 'text-blue-500 dark:text-blue-400 font-bold'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default FilterControls;