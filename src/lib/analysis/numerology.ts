/**
 * 수비학 (Life Path Number) 분석 로직
 */

// 마스터 숫자
const MASTER_NUMBERS = [11, 22, 33];

/**
 * Life Path Number 계산
 * 생년월일의 각 자리수를 합산하여 한 자리수가 될 때까지 반복
 */
export function calculateLifePathNumber(birthDate: string): number {
  // '-' 제거하고 숫자만 추출
  const digits = birthDate.replace(/-/g, '').split('').map(Number);
  
  let sum = digits.reduce((a, b) => a + b, 0);
  
  // 마스터 숫자 처리
  while (!MASTER_NUMBERS.includes(sum) && sum > 9) {
    sum = sum.toString().split('').map(Number).reduce((a, b) => a + b, 0);
  }
  
  return sum;
}

/**
 * Life Path Number별 성격 특성
 */
export const PERSONALITY_MAP: Record<number, string> = {
  1: '독립적이고 리더십을 가진 창조자',
  2: '협조적이고 조화를 추구하는 평화주의자',
  3: '창의적이고 표현력이 풍부한 예술가',
  4: '질서와 안정감을 추구하는 현실主义者',
  5: '자유의 영혼이자 모험을 즐기는 탐험가',
  6: '가족과 사랑을 중시하는 돌봄꾼',
  7: '지혜와 내면의 성장을 추구하는 성찰자',
  8: '권력과 성취를 추구하는 사업가',
  9: '인류애와 Humanitarian 정신을 가진 이상주의자',
  11: '직관력과 영적 깨달음을 가진 영감提供者',
  22: '대업을 달성하는 마스터 빌더',
  33: '영적 가르침을 전하는 마스터'
};

/**
 * Life Path Number별 수호천사 아이템
 */
export const PERSONALITY_ITEMS: Record<number, string[]> = {
  1: ['금관', '황금 열쇠', '리더의 지팡이'],
  2: ['평화 비둘기', '하얀 비둘기', '조화 风铃'],
  3: ['음악 악기', '페인트 붓', '창작의 붓'],
  4: ['건축 모형', '역사의 책', '안정의 돌'],
  5: ['날개', '구름', '자유의 깃털'],
  6: ['심장', '가족 사진', '사랑의 꽃'],
  7: ['수정 구슬', '신비의 책', '지혜의 결정'],
  8: ['저울', '승리의 깃발', '성취의 표식'],
  9: ['하트', '세계 지도', '봉사의 손'],
  11: ['크리스탈', '직감의 눈', '영적 눈'],
  22: ['건설 헬멧', '대업의 도구'],
  33: ['빛의']
};

/**
 * Life Path Number별 수호천사 성격
 */
export const GUARDIAN_PERSONALITIES: Record<number, string> = {
  1: '용감하고 헌신적인',
  2: '부드럽고 Caring한',
  3: '밝고 Hopeful한',
  4: '신중하고 Steady한',
  5: '자유롭고 adventurous한',
  6: '따뜻하고 protective한',
  7: '깊이 있고 wise한',
  8: '강력하고 empowering한',
  9: '포괄적이고 compassionate한',
  11: '영적이고 intuitive한',
  22: '위대하고 ambitious한',
  33: '헌신적이고 enlightened한'
};

/**
 *阴阳 判断
 */
export function determineYinYang(year: number): 'yin' | 'yang' {
  // 홀수 연도는 Yang, 짝수 연도는 Yin
  // 전통적으로:
  // - Yang:奇수 연도 (갑, 병, 무, 경, 임)
  // - Yin: 짝수 연도 (을, 정, 기, 신, 계)
  return year % 2 === 0 ? 'yin' : 'yang';
}

/**
 * 국내 zzodal (띠) 계산
 */
export function calculateZodiacAnimal(year: number): string {
  const animals = ['원숭이', '닭', '개', '돼지', '쥐', '소', '호랑이', '토끼', '용', '뱀', '말', '양'];
  const startYear = 1900; // 쥐년
  
  const index = (year - startYear) % 12;
  return animals[index];
}

/**
 * 별자리 계산 (간단한版本)
 */
export function calculateZodiacSign(month: number, day: number): string {
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return '양자리';
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return '황소자리';
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return '쌍둥이자리';
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return '게자리';
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return '사자자리';
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return '처녀자리';
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return '천칭자리';
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return '전갈자리';
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return '사수자리';
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return '염소자리';
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return '물병자리';
  return '물고기자리';
}
