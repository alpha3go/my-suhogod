/**
 * Generate API - AI 이미지 및 텍스트 생성
 */

import { NextRequest, NextResponse } from 'next/server';
import { analyzeUserData } from '@/lib/analysis/analyze';
import { generateGuardianImage, generateFortuneText } from '@/lib/ai';
import { UserInput } from '@/types/user';

// 공유 ID 생성 (간단한 랜덤 문자열)
function generateShareId(): string {
  return Math.random().toString(36).substring(2, 10);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { input } = body as { input: UserInput };
    
    if (!input) {
      return NextResponse.json(
        { error: '입력 데이터가 필요합니다.' },
        { status: 400 }
      );
    }
    
    // 1. 분석 수행
    const analysis = analyzeUserData(input);
    
    // 2. AI 이미지 생성 (병렬 실행)
    const imagePromise = generateGuardianImage(analysis);
    
    // 3. AI 텍스트 생성 (병렬 실행)
    const textPromise = generateFortuneText(input.name, analysis);
    
    // 병렬로 기다리기
    const [imageUrl, fortune] = await Promise.all([imagePromise, textPromise]);
    
    // 4. 결과 생성
    const shareId = generateShareId();
    
    const result = {
      id: crypto.randomUUID(),
      shareId,
      userName: input.name,
      analysis: {
        fiveElements: analysis.fiveElements,
        deficientElement: analysis.deficientElement,
        guardianColor: analysis.guardianColor,
        lifePathNumber: analysis.lifePathNumber,
        personality: analysis.personality,
        yinYang: analysis.yinYang,
        zodiacAnimal: analysis.zodiacAnimal,
        zodiacSign: analysis.zodiacSign
      },
      guardianName: fortune.guardianName?.hanja || '天内',
      guardianNameFull: fortune.guardianName,
      guardianImageUrl: imageUrl,
      fortune,
      createdAt: new Date().toISOString(),
      status: 'completed'
    };
    
    // 실제 구현 시 Supabase에 저장
    // await supabase.from('readings').insert(result);
    
    return NextResponse.json(result);
    
  } catch (error) {
    console.error('Generate error:', error);
    
    return NextResponse.json(
      { error: '생성 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
