/**
 * 사용자 입력 타입 정의
 */

export interface UserInput {
  name: string;
  birthDate: string;           // YYYY-MM-DD
  birthHour: number;           // 0-23 (99 = 모름)
  birthMinute: number;         // 0-59 (99 = 모름)
  birthLocation: {
    sido: string;               // 시/도
    sigungu: string;           // 시/군/구
  };
  gender: 'male' | 'female';
  calendarType: 'solar' | 'lunar';
}

export type CalendarType = 'solar' | 'lunar';
export type Gender = 'male' | 'female';
