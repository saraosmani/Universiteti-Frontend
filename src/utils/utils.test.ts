import { formatDate } from './utils';

describe('formatDate Utility', () => {
    
    test('it should format a valid date string from YYYY-MM-DD to DD/MM/YYYY', () => {
        const input = '2001-05-15';
        const expected = '15/05/2001';
        expect(formatDate(input)).toBe(expected);
    });

    test('it should return "N/A" when the input is undefined', () => {
        expect(formatDate(undefined)).toBe('N/A');
    });

    test('it should return "N/A" when the input is an empty string', () => {
        expect(formatDate('')).toBe('N/A');
    });

    test('it should handle single-digit days and months by padding with zero', () => {
        const input = '2024-01-05'; // Jan 5th
        const expected = '05/01/2024';
        expect(formatDate(input)).toBe(expected);
    });

    test('it should return "NaN/NaN/NaN" for completely invalid date strings', () => {
        expect(formatDate('not-a-date')).toBe('NaN/NaN/NaN');
    });
});