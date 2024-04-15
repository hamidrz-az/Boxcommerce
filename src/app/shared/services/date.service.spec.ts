import { TestBed } from '@angular/core/testing';
import { DateService } from './date.service';

describe('DateService', () => {
  let service: DateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DateService]
    });
    service = TestBed.inject(DateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getCurrentDate', () => {
    it('should return the current date in the specified format', () => {
      const separator = '/';
      const currentDate = service.getCurrentDate(separator);
      const expectedDate = getCurrentDate(separator);
      expect(currentDate).toEqual(expectedDate);
    });
  });

  describe('getCurrentTime', () => {
    it('should return the current time in the specified format', () => {
      const separator = ':';
      const currentTime = service.getCurrentTime(separator);
      const expectedTime = getCurrentTime(separator);
      expect(currentTime).toEqual(expectedTime);
    });
  });
});

// Helper functions for getting expected date and time
function getCurrentDate(separator: string): string {
  const now = new Date();
  const currentDay = now.getDate();
  const currentMonth = now.getMonth() + 1;
  const currentYear = now.getFullYear();
  return [currentDay, currentMonth, currentYear]
    .map(toTwoDigits)
    .join(separator);
}

function getCurrentTime(separator: string): string {
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  const currentSecond = now.getSeconds();
  return [currentHour, currentMinute, currentSecond]
    .map(toTwoDigits)
    .join(separator);
}

function toTwoDigits(givenNumber: number): string {
  return givenNumber > 9 ? `${givenNumber}` : `0${givenNumber}`;
}
