'use client';

import { useState, useEffect } from 'react';
import { Button, Card } from '@/components/ui';

interface ShareButtonsProps {
  shareUrl?: string;
  guardianName: string;
}

export function ShareButtons({ shareUrl = '', guardianName }: ShareButtonsProps) {
  const [currentUrl, setCurrentUrl] = useState('');
  
  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);
  
  const handleKakaoShare = () => {
    // Kakao SDK 연동 필요
    console.log('Kakao share clicked');
  };
  
  const handleInstagramShare = () => {
    // Instagram은 직접 링크 공유만 가능
    window.open('https://www.instagram.com/', '_blank');
  };
  
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl || currentUrl);
      alert('링크가 복사되었습니다!');
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };
  
  return (
    <div className="space-y-4">
      <p className="text-center text-gray-500 text-sm">결과를 친구와 공유해보세요</p>
      
      <div className="flex justify-center gap-3">
        {/* KakaoTalk */}
        <Button
          variant="secondary"
          className="!bg-[#FEE500] !text-[#391500] hover:!bg-[#EBD700]"
          onClick={handleKakaoShare}
        >
          <span className="mr-2">💬</span>
          카톡
        </Button>
        
        {/* Instagram */}
        <Button
          variant="secondary"
          className="!bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] !text-white hover:opacity-90"
          onClick={handleInstagramShare}
        >
          <span className="mr-2">📸</span>
          인스타
        </Button>
        
        {/* Link Copy */}
        <Button
          variant="outline"
          onClick={handleCopyLink}
        >
          <span className="mr-2">🔗</span>
          링크
        </Button>
      </div>
    </div>
  );
}
