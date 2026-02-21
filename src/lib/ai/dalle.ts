/**
 * DALL-E Image Generation - Edge Runtime Compatible
 */

import { callOpenAI } from './openai';
import { AnalysisResult } from '@/types/analysis';

// 색상별 hex 코드 매핑
const COLOR_HEX: Record<string, string> = {
  green: '#4ADE80',
  red: '#F87171', 
  yellow: '#FACC15',
  white: '#F8FAFC',
  blue: '#60A5FA'
};

/**
 * DALL-E 이미지 프롬프트 생성
 */
export function generateImagePrompt(analysis: AnalysisResult): string {
  const colorHex = COLOR_HEX[analysis.guardianColor] || '#8B5CF6';
  
  const baseStyle = "High-quality 3D render, cute guardian angel character, soft pastel colors, Pixar-like, minimalist, friendly expression, white flowing robes, gentle aura, centered composition";
  
  // 부족한 오행에 따른 개인화 요소
  const personalizedElements: Record<string, string> = {
    wood: "surrounded by nature elements, leaves, branches, forest vibes, green aura",
    fire: "warm glowing aura, flame-like golden halo, passionate energy, orange glow",
    earth: "stable ground beneath feet, mountain backdrop, grounding presence, golden aura",
    metal: "metallic shimmer, celestial silver crown, pure white wings, silver aura",
    water: "floating gently, water droplets, calm ocean backdrop, blue aura"
  };
  
  // Life Path Number에 따른 아이템
  const personalityItems: Record<number, string> = {
    1: "holding a golden scepter with crown, leadership presence",
    2: "holding hands in gesture of peace, gentle dove nearby",
    3: "playing with musical notes, artistic aura, paintbrush",
    4: "holding geometric shapes, building blocks, stable foundation",
    5: "floating on clouds, freedom wings spread wide, adventure vibe",
    6: "holding a heart, caring expression, family symbolizes",
    7: "holding mystical crystal ball, ancient wisdom book",
    8: "holding scales of justice, successful business aura",
    9: "helping hands extended, humanitarian mission",
    11: "glowing intuitive eyes, spiritual awakening aura",
    22: "holding architectural blueprint, master builder energy",
    33: "radiant light emanating, teaching presence"
  };
  
  const item = personalityItems[analysis.lifePathNumber] || personalityItems[1];
  
  // 최종 프롬프트 조합
  const prompt = `${baseStyle}, ${personalizedElements[analysis.deficientElement]}, ${item}, dominant color theme: ${colorHex}, soft natural lighting, professional photography, 1024x1024`;
  
  return prompt;
}

/**
 * DALL-E 3로 이미지 생성
 */
export async function generateGuardianImage(analysis: AnalysisResult): Promise<string> {
  const prompt = generateImagePrompt(analysis);
  
  console.log('DALL-E Prompt:', prompt);
  
  const imageUrl = await callOpenAI(prompt, true);
  
  if (!imageUrl) {
    throw new Error('Failed to generate image');
  }
  
  return imageUrl;
}
