import React, { useState } from 'react';
import { EventColor } from '../types';

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (title: string, color: EventColor) => void;
  selectedDate: string;
}

const EventModal: React.FC<EventModalProps> = ({ isOpen, onClose, onSave, selectedDate }) => {
  const [title, setTitle] = useState('');
  const [color, setColor] = useState<EventColor>(EventColor.Blue);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onSave(title, color);
      setTitle('');
      setColor(EventColor.Blue);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 transform transition-all scale-100">
        <h3 className="text-xl font-bold text-slate-800 mb-4">
          Add Event for {selectedDate}
        </h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">Event Title</label>
            <input
              autoFocus
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              placeholder="e.g., Meeting with Team"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-2">Color Label</label>
            <div className="flex gap-3">
              {Object.values(EventColor).map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setColor(c)}
                  className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 ${
                    color === c ? 'border-slate-800 scale-110' : 'border-transparent'
                  }`}
                  style={{ backgroundColor: getColorHex(c) }}
                  aria-label={`Select ${c} color`}
                />
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!title.trim()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Save Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const getColorHex = (color: string): string => {
  switch (color) {
    case 'blue': return '#3b82f6';
    case 'green': return '#22c55e';
    case 'red': return '#ef4444';
    case 'yellow': return '#eab308';
    case 'purple': return '#a855f7';
    default: return '#cbd5e1';
  }
};

export default EventModal;