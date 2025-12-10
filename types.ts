export interface CalendarEvent {
  id: string;
  date: string; // ISO format YYYY-MM-DD
  title: string;
  color: 'blue' | 'green' | 'red' | 'yellow' | 'purple';
}

export const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export enum EventColor {
  Blue = 'blue',
  Green = 'green',
  Red = 'red',
  Yellow = 'yellow',
  Purple = 'purple'
}