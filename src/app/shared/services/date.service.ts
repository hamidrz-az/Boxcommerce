import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class DateService {
  currentDate!: string;
  currentTime!: string;
  constructor() {}

  getCurrentDate(separator: string): string {
    const now = new Date();
    const currentDay = now.getDate();
    const currentMonth = now.getMonth() + 1;
    const currentYear = now.getFullYear();
    this.currentDate = [currentDay, currentMonth, currentYear]
      .map(DateService.toTwoDigits)
      .join(separator);

    return this.currentDate;
  }

  static toTwoDigits(givenNumber: number) {
    return givenNumber > 9 ? `${givenNumber}` : `0${givenNumber}`;
  }

  getCurrentTime(separator: string): string {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const currentSecond = now.getSeconds();
    this.currentTime = [currentHour, currentMinute, currentSecond]
        .map(DateService.toTwoDigits)
        .join(separator);
    return this.currentTime;
}
}
