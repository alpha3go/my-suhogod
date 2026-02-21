/**
 * 八字(사주) 분석 로직
 */

import { FiveElements, DeficientElement, GuardianColor } from '@/types/analysis';

// 천간 (天干) - 10개
const HEAVENLY_STEMS = ['갑', '을', '병', '정', '무', '기', '경', '신', '임', '계'];

// 지지 (地支) - 12개
const EARTHLY_BRANCHES = ['자', '축', '인', '토', '진', '사', '오', '미', '신', '유', '술', '해'];

// 천간별 오행
const STEM_ELEMENTS: Record<string, string> = {
  갑: 'wood', 을: 'wood',
  병: 'fire', 정: 'fire',
  무: 'earth', 기: 'earth',
  경: 'metal', 신: 'metal',
  임: 'water', 계: 'water'
};

// 지지별 오행 (중복 含意)
const BRANCH_ELEMENTS: Record<string, string> = {
  자: 'water', 축: 'earth', 인: 'wood', '토': 'wood',
  진: 'metal', 사: 'fire', 오: 'fire', 미: 'earth',
  신: 'metal', 유: 'metal', 술: 'water', 해: 'water'
};

/**
 * 간략화된 八字 분석
 * 실제 구현에서는 양력/음력 변환이 필요합니다
 */
export function analyzeSaju(birthDate: string, birthTime: number): {
  fiveElements: FiveElements;
  deficientElement: DeficientElement;
  guardianColor: GuardianColor;
} {
  const [year, month, day] = birthDate.split('-').map(Number);
  
  // 연도에서 天干 찾기
  const yearStemIndex = (year - 4) % 10;
  const yearStem = HEAVENLY_STEMS[yearStemIndex];
  
  // 연도에서 地支 찾기
  const yearBranchIndex = (year - 4) % 12;
  const yearBranch = EARTHLY_BRANCHES[yearBranchIndex];
  
  // 월간
  const monthStemIndex = ((year % 100 - 4 + 19) * 12 + month + 2) % 10;
  const monthStem = HEAVENLY_STEMS[monthStemIndex];
  
  // 일간 (간략화)
  const dayStemIndex = ((year - 1900) * 5 + (month - 1) * 40 + day * 3) % 10;
  const dayStem = HEAVENLY_STEMS[dayStemIndex];
  
  //时辰 (시간대)
  const hourBranchIndex = Math.floor((birthTime + 1) / 2) % 12;
  const hourBranch = EARTHLY_BRANCHES[hourBranchIndex];
  
  // 오행 집계
  const fiveElements = calculateFiveElements(
    yearStem, monthStem, dayStem, hourBranch
  );
  
  // 부족한 오행 찾기
  const deficientElement = findDeficientElement(fiveElements);
  
  // 수호천사 색상 결정
  const guardianColor = elementToColor(deficientElement);
  
  return {
    fiveElements,
    deficientElement,
    guardianColor
  };
}

/**
 * 오행 계산
 */
function calculateFiveElements(
  yearStem: string,
  monthStem: string,
  dayStem: string,
  hourBranch: string
): FiveElements {
  const counts: FiveElements = {
    wood: 0,
    fire: 0,
    earth: 0,
    metal: 0,
    water: 0
  };
  
  // 천간 오행 추가
  const stemElement = STEM_ELEMENTS[yearStem];
  if (stemElement) counts[stemElement as keyof FiveElements]++;
  
  const monthElement = STEM_ELEMENTS[monthStem];
  if (monthElement) counts[monthElement as keyof FiveElements]++;
  
  const dayElement = STEM_ELEMENTS[dayStem];
  if (dayElement) counts[dayElement as keyof FiveElements]++;
  
  // 지지 오행 추가
  const branchElement = BRANCH_ELEMENTS[hourBranch];
  if (branchElement) counts[branchElement as keyof FiveElements]++;
  
  // 기본 오행 분포
  const yearElement = STEM_ELEMENTS[yearStem];
  if (yearElement) counts[yearElement as keyof FiveElements]++;
  
  return counts;
}

/**
 * 부족한 오행 찾기
 */
function findDeficientElement(elements: FiveElements): DeficientElement {
  const entries = Object.entries(elements) as [keyof FiveElements, number][];
  
  // 가장 점수가 낮은 오행 찾기
  const sorted = entries.sort((a, b) => a[1] - b[1]);
  
  return sorted[0][0] as DeficientElement;
}

/**
 * 오행별 색상 매핑
 */
export const GUARDIAN_COLORS: Record<DeficientElement, GuardianColor> = {
  wood: 'green',
  fire: 'red',
  earth: 'yellow',
  metal: 'white',
  water: 'blue'
};

/**
 * 오행 → 색상 (hex 코드)
 */
export const ELEMENT_COLOR_HEX: Record<GuardianColor, string> = {
  green: '#4ADE80',   // 초록색
  red: '#F87171',     // 붉은색
  yellow: '#FACC15',  // 노란색
  white: '#F8FAFC',   // 흰색
  blue: '#60A5FA'     // 파란색
};

/**
 * 오행 → 색상명
 */
function elementToColor(element: DeficientElement): GuardianColor {
  return GUARDIAN_COLORS[element];
}

/**
 * 색상名的英文명
 */
export const GUARDIAN_COLOR_NAMES: Record<GuardianColor, string> = {
  green: 'Green',
  red: 'Red',
  yellow: 'Yellow',
  white: 'White',
  blue: 'Blue'
};
