import { formatWeekRange, formatShortWeekday, formatDisplayDate } from '@/lib/dateUtils';
import { WeekData } from '@/domain/habit/Habit';

describe('dateUtils', () => {
  describe('formatWeekRange', () => {
    it('should format a week range correctly', () => {
      const weekData: WeekData = {
        startDate: new Date(2025, 0, 6), // January 6, 2025 (Monday)
        endDate: new Date(2025, 0, 12),  // January 12, 2025 (Sunday)
        days: []
      };

      const result = formatWeekRange(weekData);

      expect(result).toBe('Jan 6 - Jan 12, 2025');
    });

    it('should handle cross-month week ranges', () => {
      const weekData: WeekData = {
        startDate: new Date(2025, 0, 27), // January 27, 2025
        endDate: new Date(2025, 1, 2),   // February 2, 2025
        days: []
      };

      const result = formatWeekRange(weekData);

      expect(result).toBe('Jan 27 - Feb 2, 2025');
    });

    it('should handle cross-year week ranges', () => {
      const weekData: WeekData = {
        startDate: new Date(2024, 11, 30), // December 30, 2024
        endDate: new Date(2025, 0, 5),     // January 5, 2025
        days: []
      };

      const result = formatWeekRange(weekData);

      expect(result).toBe('Dec 30 - Jan 5, 2025');
    });
  });

  describe('formatShortWeekday', () => {
    it('should format Monday correctly', () => {
      const monday = new Date(2025, 0, 6); // January 6, 2025 (Monday)
      
      const result = formatShortWeekday(monday);
      
      expect(result).toBe('Mon');
    });

    it('should format Sunday correctly', () => {
      const sunday = new Date(2025, 0, 12); // January 12, 2025 (Sunday)
      
      const result = formatShortWeekday(sunday);
      
      expect(result).toBe('Sun');
    });

    it('should format all weekdays correctly', () => {
      const dates = [
        { date: new Date(2025, 0, 6), expected: 'Mon' },  // Monday
        { date: new Date(2025, 0, 7), expected: 'Tue' },  // Tuesday
        { date: new Date(2025, 0, 8), expected: 'Wed' },  // Wednesday
        { date: new Date(2025, 0, 9), expected: 'Thu' },  // Thursday
        { date: new Date(2025, 0, 10), expected: 'Fri' }, // Friday
        { date: new Date(2025, 0, 11), expected: 'Sat' }, // Saturday
        { date: new Date(2025, 0, 12), expected: 'Sun' }, // Sunday
      ];

      dates.forEach(({ date, expected }) => {
        expect(formatShortWeekday(date)).toBe(expected);
      });
    });
  });

  describe('formatDisplayDate', () => {
    it('should format a date for display correctly', () => {
      const date = new Date(2025, 0, 15); // January 15, 2025
      
      const result = formatDisplayDate(date);
      
      expect(result).toBe('Jan 15, 2025');
    });

    it('should handle different months correctly', () => {
      const dates = [
        { date: new Date(2025, 0, 1), expected: 'Jan 1, 2025' },
        { date: new Date(2025, 11, 31), expected: 'Dec 31, 2025' },
        { date: new Date(2025, 5, 15), expected: 'Jun 15, 2025' },
      ];

      dates.forEach(({ date, expected }) => {
        expect(formatDisplayDate(date)).toBe(expected);
      });
    });
  });
}); 