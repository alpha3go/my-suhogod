/**
 * 최종 결과 타입 정의
 */

export interface GuardianName {
  hanja: string;    // 한자: 天木
  korean: string;   // 한글: 하늘나무
  english: string;  // 영어: Celestial Wood
}

export interface FortuneText {
  guardianName?: GuardianName;
  warning: string;
  encouragement: string[];
  luckyItems: string[];
  luckyColor: string;
}

export interface GuardianResult {
  id: string;
  shareId: string;
  
  // 사용자 정보
  userName: string;
  
  // 분석 결과
  analysis: {
    fiveElements: {
      wood: number;
      fire: number;
      earth: number;
      metal: number;
      water: number;
    };
    deficientElement: string;
    guardianColor: string;
    lifePathNumber: number;
    personality: string;
    yinYang: string;
    zodiacAnimal: string;
    zodiacSign: string;
  };
  
  // AI 생성 결과 - 한자, 한글, 영어 모두 포함
  guardianName: string;  // 한자 (하위 호환)
  guardianNameFull?: GuardianName;  // 전체 정보
  guardianImageUrl: string;
  fortune: FortuneText;
  
  // 메타
  createdAt: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
}
