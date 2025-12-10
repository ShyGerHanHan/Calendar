import React from 'react';
import { WEEKDAYS, CalendarEvent } from '../types';
import { getDaysInMonth, getFirstDayOfMonth, formatDateKey, isSameDay } from '../utils/dateHelpers';

interface CalendarGridProps {
  currentDate: Date;
  events: CalendarEvent[];
  onDayClick: (dateStr: string) => void;
  onDeleteEvent: (id: string) => void;
}

const CalendarGrid: React.FC<CalendarGridProps> = ({ currentDate, events, onDayClick, onDeleteEvent }) => {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  const today = new Date();

  // Create empty slots for days before the 1st of the month
  const blanks = Array.from({ length: firstDay }, (_, i) => i);
  // Create array for days in the month
  const monthDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const getEventsForDay = (day: number) => {
    const dateKey = formatDateKey(year, month, day);
    return events.filter(e => e.date === dateKey);
  };

  const getEventColorClass = (color: string) => {
     switch (color) {
      case 'blue': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'green': return 'bg-green-100 text-green-700 border-green-200';
      case 'red': return 'bg-red-100 text-red-700 border-red-200';
      case 'yellow': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'purple': return 'bg-purple-100 text-purple-700 border-purple-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      {/* Weekday Headers */}
      <div className="grid grid-cols-7 border-b border-slate-200 bg-slate-50">
        {WEEKDAYS.map(day => (
          <div key={day} className="py-3 text-center text-xs font-semibold text-slate-500 uppercase tracking-wider">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Days */}
      <div className="grid grid-cols-7 auto-rows-fr">
        {blanks.map(blank => (
          <div key={`blank-${blank}`} className="min-h-[120px] bg-slate-50/50 border-b border-r border-slate-100" />
        ))}

        {monthDays.map(day => {
          const dateKey = formatDateKey(year, month, day);
          const dayEvents = getEventsForDay(day);
          const isToday = isSameDay(new Date(year, month, day), today);

          return (
            <div
              key={`day-${day}`}
              onClick={() => onDayClick(dateKey)}
              className={`min-h-[120px] p-2 border-b border-r border-slate-100 transition-colors hover:bg-blue-50/30 cursor-pointer group relative flex flex-col gap-1 ${
                isToday ? 'bg-blue-50/50' : 'bg-white'
              }`}
            >
              <div className="flex justify-between items-start">
                <span
                  className={`text-sm font-medium w-7 h-7 flex items-center justify-center rounded-full ${
                    isToday
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-slate-700 group-hover:text-blue-600'
                  }`}
                >
                  {day}
                </span>
                {dayEvents.length > 0 && (
                   <span className="text-[10px] text-slate-400 font-medium sm:hidden">
                     {dayEvents.length}
                   </span>
                )}
              </div>

              <div className="flex-1 flex flex-col gap-1 mt-1 overflow-y-auto max-h-[90px] no-scrollbar">
                {dayEvents.map(event => (
                  <div
                    key={event.id}
                    className={`text-[10px] sm:text-xs px-2 py-1 rounded border truncate font-medium flex justify-between items-center group/event ${getEventColorClass(event.color)}`}
                    title={event.title}
                  >
                    <span className="truncate">{event.title}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteEvent(event.id);
                      }}
                      className="opacity-0 group-hover/event:opacity-100 hover:text-red-600 ml-1 p-0.5 rounded transition-opacity"
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
              
              {/* Add hint on hover */}
              <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shadow-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarGrid;