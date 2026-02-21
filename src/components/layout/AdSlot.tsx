'use client';

interface AdSlotProps {
  position: 'top' | 'bottom' | 'sidebar';
  className?: string;
}

export function AdSlot({ position, className = '' }: AdSlotProps) {
  // 실제 AdSense/AdFit 적용 시 해당 广告 단위ID로 교체
  const adUnitIds = {
    top: 'ca-pub-xxxxx/abc123',
    bottom: 'ca-pub-xxxxx/abc456',
    sidebar: 'ca-pub-xxxxx/abc789'
  };
  
  return (
    <div className={`${className} flex items-center justify-center bg-gray-50 rounded-lg min-h-[50px] overflow-hidden`}>
      {/* 실제 광고 적용 시 아래 주석 해제
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID}
        data-ad-slot={adUnitIds[position]}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
      */}
      <div className="text-center py-3 px-4">
        <span className="text-xs text-gray-400">[광고]</span>
        <p className="text-xs text-gray-500 mt-1">Advertisement Slot</p>
      </div>
    </div>
  );
}
