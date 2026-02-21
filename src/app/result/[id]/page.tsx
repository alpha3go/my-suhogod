'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { GNB, Footer, AdSlot } from '@/components/layout';
import { GuardianImage, FortuneTextComponent, ShareButtons } from '@/components/result';
import { SummoningAnimation } from '@/components/loading';
import { Card } from '@/components/ui';
import { GuardianResult, GuardianName } from '@/types/result';

export default function ResultPage() {
  const params = useParams();
  const shareId = params.id as string;
  
  const [result, setResult] = useState<GuardianResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [origin, setOrigin] = useState('');
  
  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);
  
  useEffect(() => {
    async function fetchResult() {
      try {
        // 실제 구현 시에는 API에서 조회
        // const response = await fetch(`/api/result/${shareId}`);
        
        // 테스트를 위해 딜레이 후 더미 데이터
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Mock 데이터
        setResult({
          id: '1',
          shareId: shareId,
          userName: '사용자',
          analysis: {
            fiveElements: { wood: 2, fire: 1, earth: 1, metal: 1, water: 1 },
            deficientElement: 'water',
            guardianColor: 'blue',
            lifePathNumber: 7,
            personality: '지혜와 내면의 성장을 추구하는',
            yinYang: 'yang',
            zodiacAnimal: '용',
            zodiacSign: '사자자리'
          },
          guardianName: '天内',
          guardianNameFull: {
            hanja: '天内',
            korean: '하늘의 물 수호자',
            english: 'Guardian of Water'
          },
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
          status: 'completed'
        });
      } catch (err) {
        setError('결과를 불러오는데 실패했습니다.');
      } finally {
        setIsLoading(false);
      }
    }
    
    if (shareId) {
      fetchResult();
    }
  }, [shareId]);
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
        <GNB />
        <main className="pt-20 pb-8 px-4">
          <div className="max-w-xl mx-auto">
            <Card variant="elevated" className="p-6 md:p-8">
              <SummoningAnimation />
            </Card>
          </div>
        </main>
      </div>
    );
  }
  
  if (error || !result) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
        <GNB />
        <main className="pt-20 pb-8 px-4">
          <div className="max-w-xl mx-auto text-center py-20">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              결과를 찾을 수 없습니다
            </h1>
            <Link href="/" className="text-purple-600 hover:text-purple-700">
              ← 메인으로 돌아가기
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <GNB />
      
      <main className="pt-20 pb-8 px-4">
        <div className="max-w-xl mx-auto">
          {/* 상단 광고 */}
          <AdSlot position="top" className="mb-6" />
          
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
              <Link href="/" className="text-purple-600 hover:text-purple-700 font-medium">
                ← 다시 만들기
              </Link>
            </div>
          </Card>
          
          {/* 하단 광고 */}
          <AdSlot position="bottom" className="mt-6" />
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
