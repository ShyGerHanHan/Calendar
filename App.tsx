import React, { useState, useEffect } from 'react';
import CalendarHeader from './components/CalendarHeader';
import CalendarGrid from './components/CalendarGrid';
import EventModal from './components/EventModal';
import { CalendarEvent, EventColor } from './types';
import { formatDateKey } from './utils/dateHelpers';

const STORAGE_KEY = 'minimal_calendar_events';

function App() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDateStr, setSelectedDateStr] = useState<string>('');

  // Load events from localStorage on mount
  useEffect(() => {
    const savedEvents = localStorage.getItem(STORAGE_KEY);
    if (savedEvents) {
      try {
        setEvents(JSON.parse(savedEvents));
      } catch (e) {
        console.error("Failed to parse events", e);
      }
    }
  }, []);

  // Save events to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
  }, [events]);

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  const handleDayClick = (dateStr: string) => {
    setSelectedDateStr(dateStr);
    setIsModalOpen(true);
  };

  const handleSaveEvent = (title: string, color: EventColor) => {
    const newEvent: CalendarEvent = {
      id: crypto.randomUUID(),
      date: selectedDateStr,
      title,
      color,
    };
    setEvents([...events, newEvent]);
  };

  const handleDeleteEvent = (id: string) => {
    if (window.confirm('Delete this event?')) {
      setEvents(events.filter(e => e.id !== id));
    }
  };

  return (
    <div className="min-h-screen p-4 sm:p-8 max-w-6xl mx-auto">
      <CalendarHeader
        currentDate={currentDate}
        onPrevMonth={handlePrevMonth}
        onNextMonth={handleNextMonth}
        onToday={handleToday}
      />
      
      <main>
        <CalendarGrid
          currentDate={currentDate}
          events={events}
          onDayClick={handleDayClick}
          onDeleteEvent={handleDeleteEvent}
        />
      </main>

      <EventModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveEvent}
        selectedDate={selectedDateStr}
      />

      <footer className="mt-8 text-center text-slate-400 text-sm">
        <p>Pure Frontend Calendar • Data saved locally</p>
      </footer>
    </div>
  );
}

export default App;