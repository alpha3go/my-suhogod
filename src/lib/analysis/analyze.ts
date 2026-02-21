/**
 * 메인 분석 함수
 * 八字와 수비학을 통합하여 분석 결과를 반환
 */

import { AnalysisResult } from '@/types/analysis';
import { UserInput } from '@/types/user';
import { analyzeSaju, ELEMENT_COLOR_HEX, GUARDIAN_COLOR_NAMES } from './saju';
import {
  calculateLifePathNumber,
  PERSONALITY_MAP,
  determineYinYang,
  calculateZodiacAnimal,
  calculateZodiacSign
} from './numerology';

/**
 * 사용자 입력 기반 종합 분석
 */
export function analyzeUserData(input: UserInput): AnalysisResult {
  const [year, month, day] = input.birthDate.split('-').map(Number);
  
  // 1. 八字 분석
  const sajuResult = analyzeSaju(input.birthDate, input.birthHour);
  
  // 2. 수비학 (Life Path Number)
  const lifePathNumber = calculateLifePathNumber(input.birthDate);
  const personality = PERSONALITY_MAP[lifePathNumber] || '평범한';
  
  // 3. 阴阳判断
  const yinYang = determineYinYang(year);
  
  // 4. 띠 계산
  const zodiacAnimal = calculateZodiacAnimal(year);
  
  // 5. 별자리
  const zodiacSign = calculateZodiacSign(month, day);
  
  return {
    fiveElements: sajuResult.fiveElements,
    deficientElement: sajuResult.deficientElement,
    guardianColor: sajuResult.guardianColor,
    lifePathNumber,
    personality,
    yinYang,
    zodiacAnimal,
    zodiacSign
  };
}

/**
 * 분석 결과를 설명 문자열로 변환
 */
export function formatAnalysisSummary(analysis: AnalysisResult): string {
  const elementNames: Record<string, string> = {
    wood: '목',
    fire: '화',
    earth: '土',
    metal: '금',
    water: '수'
  };
  
  const colorNames = GUARDIAN_COLOR_NAMES[analysis.guardianColor];
  
  return `
📊 분석 결과

🌳 오행: 목(${analysis.fiveElements.wood}) 
🔥 화: ${analysis.fiveElements.fire}
🌍 土: ${analysis.fiveElements.earth}
⚪ 금: ${analysis.fiveElements.metal}
💧 수: ${analysis.fiveElements.water}

🎨 부족한 오행: ${elementNames[analysis.deficientElement]} (${colorNames})
🔢 Life Path: ${analysis.lifePathNumber} (${analysis.personality})
☯️阴阳: ${analysis.yinYang === 'yang' ? '양' : '음'}
🐀 띠: ${analysis.zodiacAnimal}
♈ 별자리: ${analysis.zodiacSign}
  `.trim();
}
