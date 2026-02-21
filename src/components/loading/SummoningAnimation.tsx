'use client';

import { useState, useEffect } from 'react';

const steps = [
  '생년월일을 분석하고 있습니다...',
  '수호천사 이미지를 그리고 있습니다...',
  '마지막 메시지를 작성하고 있습니다...'
];

export function SummoningAnimation() {
  const [currentStep, setCurrentStep] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % steps.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="flex flex-col items-center justify-center py-12">
      {/* Rotating halo */}
      <div className="relative w-32 h-32 mb-8">
        <div className="absolute inset-0 rounded-full border-4 border-purple-200 animate-ping" />
        <div className="absolute inset-2 rounded-full border-4 border-purple-300 animate-pulse" />
        <div className="absolute inset-4 rounded-full border-4 border-purple-400 animate-spin" style={{ animationDuration: '3s' }}>
          {/* Inner glow */}
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-yellow-300 rounded-full shadow-lg shadow-yellow-200" />
        </div>
        
        {/* Angel icon in center */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-5xl animate-bounce">👼</span>
        </div>
      </div>
      
      {/* Text */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-purple-700 animate-pulse">
          수호천사를 소환 중...
        </h2>
        <p className="text-gray-500">
          {steps[currentStep]}
        </p>
      </div>
      
      {/* Progress dots */}
      <div className="flex gap-2 mt-6">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full transition-colors ${
              i <= currentStep ? 'bg-purple-500' : 'bg-gray-200'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
