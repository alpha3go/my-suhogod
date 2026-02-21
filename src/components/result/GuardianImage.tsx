'use client';

import Image from 'next/image';

interface GuardianImageProps {
  imageUrl: string;
  guardianName: string;
}

export function GuardianImage({ imageUrl, guardianName }: GuardianImageProps) {
  return (
    <div className="relative">
      <div className="relative aspect-square max-w-[400px] mx-auto rounded-2xl overflow-hidden shadow-2xl">
        <Image
          src={imageUrl}
          alt={guardianName}
          fill
          className="object-cover"
          unoptimized
        />
        {/*Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
      </div>
      
      {/* Glow effect */}
      <div className="absolute -inset-4 bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 rounded-[30px] blur-2xl opacity-30 -z-10" />
    </div>
  );
}
