'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { GNB, Footer, AdSlot } from '@/components/layout';
import { InputForm } from '@/components/form';
import { SummoningAnimation } from '@/components/loading';
import { GuardianImage, FortuneTextComponent, ShareButtons } from '@/components/result';
import { UserInput } from '@/types/user';
import { analyzeUserData } from '@/lib/analysis/analyze';
import { Card } from '@/components/ui';
import { GuardianName } from '@/types/result';

// 더미 데이터 - 실제로는 API 호출로 대체
const _MOCK_RESULT = {
  id: '1',
  shareId: 'abc123',
  userName: '사용자',
  guardianName: '天内',
  guardianNameFull: {
    hanja: '天内',
    korean: '하늘의 물 수호자',
    english: 'Guardian of Water'
  } as GuardianName,
  guardianImageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800',
  fortune: {
    guardianName: {
      hanja: '天内',
      korean: '하늘의 물 수호자',
      english: 'Guardian of Water'
    },
    warning: '오늘은 특히 감정적인 변화가 있을 수 있습니다. 마음의 평화를 유지하세요.',
    encouragement: [
      '네가 가진 작은 노력도 모두 의미가 있어.',
      '지금 네가 걷고 있는 길은 정확한 곳으로 이어지고 있어.',
      '힘들 때면 나를 생각해줘. 언제나 네 곁에 있을게.'
    ],
    luckyItems: ['크리스탈', '보라색 열쇠', '은색 팔찌'],
    luckyColor: '#8B5CF6'
  },
  createdAt: new Date().toISOString(),
  status: 'completed' as const
};

export default function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<typeof _MOCK_RESULT | null>(null);
  const [origin, setOrigin] = useState('');
  
  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);
  
  const handleSubmit = async (data: UserInput) => {
    setIsLoading(true);
    
    try {
      // API 호출로 결과 생성
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ input: data })
      });
      
      if (!response.ok) {
        throw new Error('Failed to generate');
      }
      
      const resultData = await response.json();
      setResult(resultData);
      
      // 결과 페이지로 이동
      router.push(`/result/${resultData.shareId}`);
    } catch (error) {
      console.error('Error:', error);
      alert('오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <GNB />
      
      <main className="pt-20 pb-8 px-4">
        <div className="max-w-xl mx-auto">
          {/* 상단 광고 */}
          <AdSlot position="top" className="mb-6" />
          
          {/* 메인 콘텐츠 */}
          {result ? (
            <div className="space-y-8 animate-fade-in">
              {/* 결과 카드 */}
              <Card variant="elevated" className="p-6 md:p-8">
                <GuardianImage
                  imageUrl={result.guardianImageUrl}
                  guardianName={result.guardianNameFull?.korean || result.guardianName}
                />
                
                <div className="mt-8">
                  <FortuneTextComponent
                    guardianName={result.fortune.guardianName || result.guardianNameFull || result.guardianName}
                    fortune={result.fortune}
                  />
                </div>
                
                <div className="mt-8 pt-6 border-t border-gray-100">
                  <ShareButtons
                    shareUrl={`${origin}/result/${result.shareId}`}
                    guardianName={result.guardianNameFull?.korean || result.guardianName}
                  />
                </div>
                
                <div className="mt-6 text-center">
                  <button
                    onClick={() => setResult(null)}
                    className="text-purple-600 hover:text-purple-700 font-medium"
                  >
                    ← 다시 만들기
                  </button>
                </div>
              </Card>
            </div>
          ) : isLoading ? (
            <Card variant="elevated" className="p-6 md:p-8">
              <SummoningAnimation />
            </Card>
          ) : (
            <div className="space-y-6">
              {/* Hero */}
              <div className="text-center py-8">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
                  나만의 <span className="text-purple-600">수호천사</span>를 찾아보세요
                </h1>
                <p className="text-gray-500">
                  생년월일과 시간을 분석하여 당신만을 위한 수호천사를 만듭니다
                </p>
              </div>
              
              {/* 입력 폼 */}
              <InputForm onSubmit={handleSubmit} isLoading={isLoading} />
            </div>
          )}
          
          {/* 하단 광고 */}
          <AdSlot position="bottom" className="mt-6" />
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
