import React from 'react';
import { MONTH_NAMES } from '../types';

interface CalendarHeaderProps {
  currentDate: Date;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onToday: () => void;
}

const CalendarHeader: React.FC<CalendarHeaderProps> = ({ currentDate, onPrevMonth, onNextMonth, onToday }) => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between mb-8 px-2">
      <div className="mb-4 sm:mb-0 text-center sm:text-left">
        <h1 className="text-3xl font-bold text-slate-800">
          {MONTH_NAMES[currentDate.getMonth()]}
          <span className="text-slate-400 font-light ml-2">{currentDate.getFullYear()}</span>
        </h1>
        <p className="text-slate-500 text-sm mt-1">Organize your daily life</p>
      </div>

      <div className="flex items-center bg-white rounded-full p-1 shadow-sm border border-slate-200">
        <button
          onClick={onPrevMonth}
          className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-600"
          aria-label="Previous month"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        </button>
        
        <button
          onClick={onToday}
          className="mx-2 px-4 py-1 text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
        >
          Today
        </button>

        <button
          onClick={onNextMonth}
          className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-600"
          aria-label="Next month"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
        </button>
      </div>
    </div>
  );
};

export default CalendarHeader;