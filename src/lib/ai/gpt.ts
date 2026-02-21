/**
 * GPT-4o Text Generation for Fortune
 */

import { callOpenAI } from './openai';
import { AnalysisResult } from '@/types/analysis';
import { FortuneText, GuardianName } from '@/types/result';

// 오행별 한자 이름 매핑
const GUARDIAN_NAMES: Record<string, { hanja: string; korean: string; english: string }> = {
  wood: { hanja: '天木', korean: '하늘의 나무 수호자', english: 'Guardian of Wood' },
  fire: { hanja: '天火', korean: '하늘의 불 수호자', english: 'Guardian of Fire' },
  earth: { hanja: '天土', korean: '하늘의 땅 수호자', english: 'Guardian of Earth' },
  metal: { hanja: '天金', korean: '하늘의 금 수호자', english: 'Guardian of Metal' },
  water: { hanja: '天水', korean: '하늘의 물 수호자', english: 'Guardian of Water' }
};

/**
 * GPT-4o 텍스트 프롬프트 생성
 */
function generateTextPrompt(
  userName: string,
  analysis: AnalysisResult
): string {
  const elementInfo = GUARDIAN_NAMES[analysis.deficientElement] || GUARDIAN_NAMES.water;
  
  return `
당신은 ${userName}님의 수호천사입니다.

${userName}님의 정보:
- 부족한 오행: ${analysis.deficientElement} (${analysis.guardianColor}색)
- Life Path Number: ${analysis.lifePathNumber} (${analysis.personality})
-阴阳: ${analysis.yinYang === 'yang' ? '양' : '음'}
- 별자리: ${analysis.zodiacSign}

다음 JSON 형태로 작성해주세요. 다른 텍스트는 포함하지 마세요. 모든 guardianName 필드는 반드시 객체 형태로写出:

{
  "guardianName": {
    "hanja": "${elementInfo.hanja}",
    "korean": "${elementInfo.korean}",
    "english": "${elementInfo.english}"
  },
  "warning": "오늘 조심해야 할 것 1문장 (八字的 조언, 최대 50자)",
  "encouragement": ["힘이 되는 말 1", "힘이 되는 말 2", "힘이 되는 말 3"],
  "luckyItems": ["행운 아이템 1", "행운 아이템 2", "행운 아이템 3"],
  "luckyColor": "행운의 컬러 (hex 코드, 예: #8B5CF6)"
}

${analysis.deficientElement} 오행이 부족하므로, ${analysis.deficientElement}를 보완하는 방향의 조언을 해주세요.
Life Path Number ${analysis.lifePathNumber}에 맞는 맞춤형 메시지를 작성해주세요.
`;
}

/**
 * GPT-4o로 운세 텍스트 생성
 */
export async function generateFortuneText(
  userName: string,
  analysis: AnalysisResult
): Promise<FortuneText> {
  const prompt = generateTextPrompt(userName, analysis);
  
  console.log('GPT Prompt:', prompt);
  
  const content = await callOpenAI(prompt, false);
  
  if (!content) {
    throw new Error('Failed to generate fortune text');
  }
  
  try {
    const result = JSON.parse(content) as FortuneText;
    
    // guardianName이 문자열이면 객체로 변환, 객체면 필드 확인
    let guardianName: GuardianName;
    const defaultName = GUARDIAN_NAMES['water'];
    
    if (!result.guardianName) {
      // guardianName이 없으면 기본값 사용
      guardianName = defaultName;
    } else if (typeof result.guardianName === 'string') {
      // 문자열이면 객체로 변환
      guardianName = {
        hanja: result.guardianName,
        korean: '수호천사',
        english: 'Guardian Angel'
      };
    } else {
      // 객체인 경우 필드 확인
      const gn = result.guardianName;
      guardianName = {
        hanja: gn.hanja || defaultName.hanja,
        korean: gn.korean || defaultName.korean,
        english: gn.english || defaultName.english
      };
    }
    
    // 기본값 제공
    return {
      guardianName,
      warning: result.warning || '오늘도 화목하게 지내세요.',
      encouragement: result.encouragement?.length > 0 
        ? result.encouragement 
        : ['당신은 훌륭합니다.', '오늘도 수고하셨어요.', '당신을 응원합니다.'],
      luckyItems: result.luckyItems?.length > 0 
        ? result.luckyItems 
        : ['행운의 부적', '행운의 색깔'],
      luckyColor: result.luckyColor || '#8B5CF6'
    };
  } catch (error) {
    console.error('Failed to parse GPT response:', error);
    
    // 파싱 실패 시 기본값 반환
    return {
      guardianName: {
        hanja: '天内',
        korean: '하늘의 수호자',
        english: 'Celestial Guardian'
      },
      warning: '오늘도 평화로운 하루가 되길 바랍니다.',
      encouragement: ['당신의努力는 의미가 있습니다.', '오늘도 화이팅!', '네가 할 수 있어!'],
      luckyItems: ['크리스탈', '보라색 아이템', '은색 팔찌'],
      luckyColor: '#8B5CF6'
    };
  }
}
