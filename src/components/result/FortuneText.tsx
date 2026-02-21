'use client';

import { Card } from '@/components/ui';
import { FortuneText, GuardianName } from '@/types/result';

interface FortuneTextProps {
  guardianName: GuardianName | string;
  fortune: FortuneText;
}

export function FortuneTextComponent({ guardianName, fortune }: FortuneTextProps) {
  // guardianName이 문자열인지 객체인지 확인
  const name = typeof guardianName === 'string' 
    ? { hanja: guardianName, korean: guardianName, english: guardianName }
    : guardianName;
  
  return (
    <div className="space-y-6">
      {/* 수호천사 이름 - 한자, 한글, 영어 */}
      <div className="text-center">
        <p className="text-sm text-gray-500 mb-2">당신의 수호천사</p>
        <h2 className="text-4xl font-bold text-purple-700 mb-1">{name.hanja}</h2>
        <p className="text-xl font-medium text-purple-600 mb-1">{name.korean}</p>
        <p className="text-sm text-purple-400">{name.english}</p>
      </div>
      
      {/* 조심해야 할 것 */}
      <Card className="p-5 bg-red-50 border-red-100">
        <h3 className="text-sm font-semibold text-red-600 mb-2">⚠️ 오늘의 주의사항</h3>
        <p className="text-gray-700">{fortune.warning}</p>
      </Card>
      
      {/* 힘이 되는 말 */}
      <Card className="p-5 bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-100">
        <h3 className="text-sm font-semibold text-purple-600 mb-3">💬 {name.korean}의 말씀</h3>
        <div className="space-y-2">
          {fortune.encouragement.map((text, index) => (
            <p key={index} className="text-gray-700 leading-relaxed">
              "{text}"
            </p>
          ))}
        </div>
      </Card>
      
      {/* 행운 */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="p-4 text-center">
          <h3 className="text-sm font-semibold text-gray-500 mb-2">🍀 행운의 컬러</h3>
          <div className="flex items-center justify-center gap-2">
            <div 
              className="w-8 h-8 rounded-full border-2 border-gray-200"
              style={{ backgroundColor: fortune.luckyColor }}
            />
            <span className="text-lg font-medium">{fortune.luckyColor}</span>
          </div>
        </Card>
        
        <Card className="p-4 text-center">
          <h3 className="text-sm font-semibold text-gray-500 mb-2">✨ 행운의 아이템</h3>
          <ul className="text-sm">
            {fortune.luckyItems.slice(0, 2).map((item, index) => (
              <li key={index} className="text-gray-700">{item}</li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}
