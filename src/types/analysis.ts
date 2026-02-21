/**
 * 분석 결과 타입 정의
 */

export interface FiveElements {
  wood: number;    // 목
  fire: number;   // 화
  earth: number;  // 土
  metal: number;  // 금
  water: number;  // 수
}

export type DeficientElement = 'wood' | 'fire' | 'earth' | 'metal' | 'water';
export type GuardianColor = 'green' | 'red' | 'yellow' | 'white' | 'blue';
export type YinYang = 'yin' | 'yang';

export interface AnalysisResult {
  // 八字 분석
  fiveElements: FiveElements;
  deficientElement: DeficientElement;
  guardianColor: GuardianColor;
  
  // 수비학
  lifePathNumber: number;
  personality: string;
  
  //阴阳
  yinYang: YinYang;
  
  // 추가 정보
  zodiacAnimal: string;     // 해당하는 동물
  zodiacSign: string;      // 별자리
}
