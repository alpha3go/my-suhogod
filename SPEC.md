# MY SUHOGOD - AI 수호천사 서비스 기술 명세서

## 1. 프로젝트 개요

### 1.1 서비스 개요
**MY SUHOGOD**는 사용자의 생년월일시와 수비학 데이터를 분석하여, 개인 맞춤형 '수호천사' 이미지와 위로의 메시지를 제공하는 힐링 웹앱 서비스입니다.

### 1.2 핵심 가치
- 사용자의 八字(사주) 기반 오행 분석으로 개인화된 수호천사 색상 도출
- 수비학(Life Path Number)을 활용한 성격 특성 매핑
- DALL-E 3로 생성되는 高品質 3D 수호천사 이미지
- GPT-4o로 작성되는 맞춤형 운세 메시지

### 1.3 대상 사용자
- 자신의 미래와 운명에 대해 관심이 있는 사용자
- 힐링과 위로의 메시지를 원하는 사용자
- 트렌디한 AI 콘텐츠를 경험하고 싶은 사용자

---

## 2. 기술 스택 아키텍처

### 2.1 기술 스택

| 구분 | 기술 | 버전 | 용도 |
|------|------|------|------|
| Frontend | Next.js | 14+ | 메타 태그 관리, SSR/SSG |
| Styling | Tailwind CSS | 4.x | 반응형 UI 구축 |
| Backend | Supabase | - | DB, Auth, Edge Functions |
| AI Image | DALL-E 3 | - | 수호천사 이미지 생성 |
| AI Text | GPT-4o | - | 운세 텍스트 생성 |
| Deployment | Vercel | - | 호스팅 및 CI/CD |
| Ads | AdSense/AdFit | - | 수익화 |

### 2.2 아키텍처 다이어그램

```
┌─────────────────────────────────────────────────────────┐
│                        Client                           │
│  ┌─────────┐  ┌─────────┐  ┌─────────────────────────┐  │
│  │ Mobile  │  │   PC    │  │ SNS (Kakao, Instagram) │  │
│  └────┬────┘  └────┬────┘  └───────────┬─────────────┘  │
│       │            │                    │                │
│       └────────────┼────────────────────┘                │
│                    ▼                                     │
│         ┌────────────────────┐                          │
│         │   Next.js App      │                          │
│         │   (Vercel)         │                          │
│         └─────────┬──────────┘                          │
│                   │                                       │
│    ┌──────────────┼──────────────┐                       │
│    ▼              ▼              ▼                       │
│ ┌──────┐   ┌───────────┐   ┌─────────┐                  │
│ │ Supa-│   │  OpenAI   │   │  Ads    │                  │
│ │ base │   │(DALL-E,   │   │(AdSense/│                  │
│ │ DB   │   │ GPT-4o)   │   │ AdFit)  │                  │
│ └──────┘   └───────────┘   └─────────┘                  │
└─────────────────────────────────────────────────────────┘
```

### 2.3 프로젝트 구조

```
my-suhogod/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # 메인 페이지 (입력 폼)
│   │   ├── loading.tsx         # 로딩 페이지
│   │   ├── result/
│   │   │   └── [id]/
│   │   │       └── page.tsx    # 결과 페이지
│   │   ├── api/
│   │   │   ├── analyze/        # 사주/수비학 분석 API
│   │   │   ├── generate/       # AI 생성 API
│   │   │   └── share/          # 공유 관련 API
│   │   └── globals.css
│   ├── components/
│   │   ├── ui/                 # 기본 UI 컴포넌트
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Select.tsx
│   │   │   └── Card.tsx
│   │   ├── form/               # 입력 폼 관련
│   │   │   ├── InputForm.tsx
│   │   │   ├── DatePicker.tsx
│   │   │   └── TimeSelector.tsx
│   │   ├── result/             # 결과 표시
│   │   │   ├── GuardianImage.tsx
│   │   │   ├── FortuneText.tsx
│   │   │   └── ShareButtons.tsx
│   │   ├── layout/             # 레이아웃
│   │   │   ├── GNB.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── AdSlot.tsx
│   │   └── loading/
│   │       └── SummoningAnimation.tsx
│   ├── lib/
│   │   ├── analysis/
│   │   │   ├── saju.ts         # 八字 분석 로직
│   │   │   ├── numerology.ts  # 수비학 로직
│   │   │   └── prompt.ts       # AI 프롬프트 생성
│   │   ├── ai/
│   │   │   ├── openai.ts       # OpenAI API 클라이언트
│   │   │   ├── dalle.ts        # DALL-E 이미지 생성
│   │   │   └── gpt.ts          # GPT-4o 텍스트 생성
│   │   ├── supabase/
│   │   │   ├── client.ts       # Supabase 클라이언트
│   │   │   └── server.ts       # Server-side Supabase
│   │   └── utils/
│   │       └── helpers.ts     # 유틸리티 함수
│   └── types/
│       ├── user.ts             # 사용자 입력 타입
│       ├── analysis.ts         # 분석 결과 타입
│       └── result.ts           # 최종 결과 타입
├── supabase/
│   └── migrations/             # DB 마이그레이션
├── public/
│   ├── images/                 # 정적 이미지
│   └── fonts/                 # 폰트 파일
├── .env.example                # 환경 변수 예시
├── next.config.ts
├── tailwind.config.ts
└── package.json
```

---

## 3. 데이터 모델 (Supabase)

### 3.1 테이블 설계

#### users 테이블
```sql
-- 사용자 기본 정보 (익명 사용자 지원)
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- 사용자 식별자 (anon 또는 auth.uid)
  auth_id UUID REFERENCES auth.users(id),
  is_anon BOOLEAN DEFAULT true,
  
  -- 선택적: 나중에 인증 추가 시 사용
  email TEXT,
  name TEXT
);
```

#### readings 테이블 (운세 결과)
```sql
-- 운세 읽기 결과 저장
CREATE TABLE readings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- 입력 데이터 (JSON으로 저장)
  input_data JSONB NOT NULL,
  
  -- 분석 결과
  analysis_data JSONB NOT NULL,
  
  -- AI 생성 결과
  guardian_name TEXT,
  guardian_image_url TEXT,
  fortune_text JSONB,
  
  -- 생성 상태
  status TEXT DEFAULT 'pending',  -- pending, processing, completed, failed
  processing_time_ms INTEGER,
  
  -- 공유용short ID
  share_id TEXT UNIQUE
);

-- 인덱스
CREATE INDEX idx_readings_user_id ON readings(user_id);
CREATE INDEX idx_readings_share_id ON readings(share_id);
CREATE INDEX idx_readings_status ON readings(status);
```

### 3.2 타입 정의 (TypeScript)

```typescript
// src/types/user.ts
export interface UserInput {
  name: string;
  birthDate: string;        // YYYY-MM-DD
  birthTime: number;        // 0-23 (99 = 모름)
  birthLocation: string;    // 시/도
  gender: 'male' | 'female';
  calendarType: 'solar' | 'lunar';
}

// src/types/analysis.ts
export interface AnalysisResult {
  // 八字 분석
  fiveElements: {
    wood: number;    // 목
    fire: number;    // 화
    earth: number;   // 土
    metal: number;   // 금
    water: number;   // 수
  };
  deficientElement: 'wood' | 'fire' | 'earth' | 'metal' | 'water';
  guardianColor: string;
  
  // 수비학
  lifePathNumber: number;
  personality: string;
  
  //阴阳
  yinYang: 'yin' | 'yang';
}

// src/types/result.ts
export interface FortuneText {
  warning: string;
  encouragement: string[];
  luckyItems: string[];
  luckyColor: string;
}

export interface GuardianResult {
  id: string;
  shareId: string;
  
  // 사용자 정보
  userName: string;
  
  // 분석 결과
  analysis: AnalysisResult;
  
  // AI 생성 결과
  guardianName: string;
  guardianImageUrl: string;
  fortune: FortuneText;
  
  // 메타
  createdAt: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
}
```

---

## 4. API 엔드포인트

### 4.1 분석 API (`POST /api/analyze`)

사용자 입력을 기반으로 八字와 수비학 분석을 수행합니다.

**Request:**
```typescript
{
  name: string;
  birthDate: string;
  birthTime: number;
  birthLocation: string;
  gender: 'male' | 'female';
  calendarType: 'solar' | 'lunar';
}
```

**Response:**
```typescript
{
  fiveElements: { wood, fire, earth, metal, water },
  deficientElement: string,
  guardianColor: string,
  lifePathNumber: number,
  personality: string,
  yinYang: 'yin' | 'yang'
}
```

### 4.2 생성 API (`POST /api/generate`)

분석 결과를 기반으로 AI 이미지와 텍스트를 생성합니다.

**Request:**
```typescript
{
  userId?: string;
  input: UserInput;
  analysis: AnalysisResult;
}
```

**Response:**
```typescript
{
  id: string;
  shareId: string;
  guardianName: string;
  guardianImageUrl: string;
  fortune: FortuneText;
  status: 'completed'
}
```

### 4.3 결과 조회 API (`GET /api/result/[shareId]`)

공유 ID로 결과를 조회합니다.

**Response:**
```typescript
{
  id: string;
  shareId: string;
  userName: string;
  guardianName: string;
  guardianImageUrl: string;
  fortune: FortuneText;
  createdAt: string;
}
```

---

## 5. 분석 알고리즘

### 5.1 八字(사주) 분석 로직

#### 기본 원리
- 천간(天干): 갑을(목), 병정(화), 무기(土), 경신(金), 임수(水)
- 지장(地支): 이하(목), 사오(화), 진미(金), 신유(水), 축술(土)
- 생년월일시 각柱에서 오행 추출

#### 오행 점수 계산
```typescript
// Simplified 오행 계산 (실제론 더 복잡한 양력/음력 변환 필요)
function calculateFiveElements(birthDate: string, birthTime: number): FiveElements {
  const year = parseInt(birthDate.split('-')[0]);
  const month = parseInt(birthDate.split('-')[1]);
  const day = parseInt(birthDate.split('-')[2]);
  
  // 간략화된 오행 배분 (실제 구현 시 사주 전문 로직 필요)
  const elements = ['wood', 'fire', 'earth', 'metal', 'water'];
  
  // 연도 기반 오행
  const yearElement = elements[(year - 4) % 10 % 5];
  
  // 월 기반 오행
  const monthElement = elements[(month + 1) % 5];
  
  // 일 기반 오행
  const dayElement = elements[day % 5];
  
  // 시 기반 오행
  const hourElement = elements[birthTime % 5];
  
  // ...
  return { wood, fire, earth, metal, water };
}
```

#### 부족한 오행 판단
```typescript
function findDeficientElement(elements: FiveElements): DeficientElement {
  const total = elements.wood + elements.fire + elements.earth + elements.metal + elements.water;
  const avg = total / 5;
  
  // 평균 이하인 오행 중 가장 낮은 것
  const elementScores = [
    { element: 'wood', score: elements.wood },
    { element: 'fire', score: elements.fire },
    { element: 'earth', score: elements.earth },
    { element: 'metal', score: elements.metal },
    { element: 'water', score: elements.water },
  ];
  
  const deficient = elementScores.sort((a, b) => a.score - b.score)[0];
  return deficient.element as DeficientElement;
}
```

#### 색상 매핑
```typescript
const GUARDIAN_COLORS: Record<DeficientElement, string> = {
  wood: 'green',      // 초록색 - 성장, 생명력
  fire: 'red',       // 붉은색 - 열정, 에너지
  earth: 'yellow',   // 노란색 - 안정, 신뢰
  metal: 'white',    // 흰색 - 순수, 성실
  water: 'blue'      // 파란색 - 평화, 지혜
};
```

### 5.2 수비학 (Life Path Number) 계산

#### 계산 공식
```
Life Path Number = 생년월일 각 자리수의 합 (한 자리수가 될 때까지 반복)
```

#### 예시
- 생년월일: 1995-03-15
- 계산: 1+9+9+5+0+3+1+5 = 33
- 33은 마스터 숫자이므로 그대로 사용
- Life Path Number: 33

```typescript
function calculateLifePathNumber(birthDate: string): number {
  const digits = birthDate.replace(/-/g, '').split('').map(Number);
  let sum = digits.reduce((a, b) => a + b, 0);
  
  // 마스터 숫자 (11, 22, 33) 처리
  while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
    sum = sum.toString().split('').map(Number).reduce((a, b) => a + b, 0);
  }
  
  return sum;
}
```

#### 성격 특성 매핑
```typescript
const PERSONALITY_MAP: Record<number, string> = {
  1: '리더십과 독립성을 가진 창조자',
  2: '협력과 조화를 추구하는 평화주의자',
  3: '창의力和 표현力을 갖춘 예술가',
  4: '질서와 안정감을 추구하는 현실主义者',
  5: '자유의 영혼이자 모험가',
  6: '가족과 사랑을 중시하는 돌봄꾼',
  7: '지혜와 내면의 성장을 추구하는 ',
  8: '권력과 성취를 추구하는 사업가',
  9: '인류애와 Humanitarian 정신의 ',
  11: ' 直感力과 영적 깨달음을 가진 ',
  22: '대업을 달성하는 마스터 빌더',
  33: '영적 가르침을 전하는 마스터'
};
```

---

## 6. AI 프롬프트 전략

### 6.1 DALL-E 3 이미지 프롬프트

#### 기본 스타일 가이드
```
"High-quality 3D render, cute and minimalist style, soft lighting, 
Pixar-like character design, pastel color palette, friendly facial expression"
```

#### 개인화 요소 추가
```typescript
function generateImagePrompt(
  analysis: AnalysisResult,
  personality: string
): string {
  const colorHex = GUARDIAN_COLORS_HEX[analysis.guardianColor];
  
  const baseStyle = "High-quality 3D render, cute guardian angel character, soft pastel colors, Pixar-like, minimalist, friendly expression, white flowing robes, gentle aura";
  
  const personalizedElements = {
    wood: "surrounded by nature elements, leaves, branches, forest vibes",
    fire: "warm glowing aura, flame-like halo, passionate energy",
    earth: "stable ground beneath feet, mountain backdrop, grounding presence",
    metal: "metallic shimmer, celestial crown, pure white wings",
    water: "floating gently, water droplets, calm ocean backdrop"
  };
  
  const personalityItems = {
    1: "holding a golden scepter, crown",
    2: "holding hands in a gesture of peace, dove",
    3: "playing with musical notes, paintbrush",
    4: "holding building blocks, geometric shapes",
    5: "flying on clouds, freedom wings",
    6: "holding a heart, caring expression",
    7: "holding a crystal ball, mystical book",
    8: "holding scales of justice, successful aura",
    9: "helping hands, humanitarian aura"
  };
  
  return `${baseStyle}, ${personalizedElements[analysis.deficientElement]}, ${personalityItems[analysis.lifePathNumber]}, dominant color: ${colorHex}, soft lighting, blur background`;
}
```

### 6.2 GPT-4o 텍스트 프롬프트

#### 운세 텍스트 생성 프롬프트
```typescript
function generateTextPrompt(
  userName: string,
  analysis: AnalysisResult,
  lifePathPersonality: string
): string {
  return `
당신은 ${userName}님의 수호천사입니다.

${userName}님의基本信息:
- 부족한 오행: ${analysis.deficientElement} (${analysis.guardianColor}색)
- Life Path Number: ${analysis.lifePathNumber} (${lifePathPersonality})

다음 항목들을json 형태로 작성해주세요:

1. "guardianName": ${userName}님의 오행에 맞는 수호천사 이름 (2-4자, 한자로 된古典 느낌)
2. "warning": 오늘 조심해야 할 것 1문장 (八字的 조언)
3. "encouragement": 힘이 되는 말 2-3문장 (수호천사 第一人称)
4. "luckyItems": 행운의 아이템 3가지 (오행에 맞는 것)
5. "luckyColor": 행운의 컬러 (hex 코드)

형식: 순수 JSON만 출력
`;
}
```

---

## 7. UI/UX 설계

### 7.1 반응형 레이아웃

#### 모바일 (max-width: 767px)
```
┌─────────────────────┐
│     GNB (고정)       │ 60px
├─────────────────────┤
│   [광고 슬롯 1]      │ 50px
├─────────────────────┤
│                     │
│    메인 콘텐츠       │
│   (입력 폼/결과)     │  flexible
│                     │
├─────────────────────┤
│   [광고 슬롯 2]      │ 50px
├─────────────────────┤
│   공유 버튼들        │ 60px
├─────────────────────┤
│      Footer          │ 80px
└─────────────────────┘
```

#### PC (min-width: 768px)
```
┌─────┬─────────────────────┬─────┐
│ 광고 │                     │ 광고 │
│      │   600px 중앙       │     │
│ 스카 │   컨테이너         │ 스카 │
│ 이스 │                     │ 이스 │
│ 크래 │   메인 콘텐츠       │ 크래 │
│ 이퍼 │                     │ 이퍼 │
├─────┼─────────────────────┼─────┤
│     │   공유 버튼들       │     │
│     │      Footer         │     │
└─────┴─────────────────────┴─────┘
```

### 7.2 컴포넌트Hierarchy

```
App
├── GNB (Navigation)
│   └── Logo
│   └── Menu Button
├── AdSlot (top)
├── Main Content
│   ├── HomePage (/)
│   │   ├── Hero Section
│   │   └── InputForm
│   │       ├── NameInput
│   │       ├── DatePicker
│   │       ├── TimeSelector
│   │       ├── LocationSelect
│   │       └── GenderSelect
│   │
│   └── ResultPage (/result/[id])
│       ├── GuardianImage
│       ├── GuardianInfo
│       │   └── GuardianName
│       └── FortuneText
│           ├── Warning
│           ├── Encouragement
│           └── LuckyItems
├── AdSlot (bottom)
├── ShareButtons
└── Footer
```

### 7.3 페이지 플로우

```
[메인 페이지] → [입력 완료] → [로딩 화면] → [결과 페이지]
                  │                │               │
                  │                │               │
            POST /api/generate  "수호천사    GET /result/[id]
                                 를 소환 중
                                 입니다..."
```

### 7.4 주요 화면 설계

#### 메인 페이지
- Hero: "나의 수호천사는 누구일까?" 타이틀
- 입력 폼: 이름, 생년월일, 시간, 장소, 성별
- CTA 버튼: "수호천사 찾기"

#### 로딩 페이지
- 애니메이션: 천사 날개 또는光环 효과
- 텍스트: "수호천사를 소환 중입니다..."
- 진행률: 분석 중 → 이미지 생성 중 → 마지막 mensagem 작성 중

#### 결과 페이지
- 수호천사 이미지 (1024x1024)
- 수호천사 이름 (가온、中央 배치)
- 운세 텍지
- 공유 버튼 (카카오, 인스타, 링크 복사)
- "다시 찾기" 버튼

---

## 8. 환경 변수

### 8.1 필수 환경 변수 (.env)

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# OpenAI
OPENAI_API_KEY=your_openai_api_key

# Ads (선택)
NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-xxxxx
NEXT_PUBLIC_KAKAO_ADFIT_CLIENT_ID=your_kakao_adfit_id

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 8.2 Supabase 설정

1. **Authentication**: 익명 사용자 활성화 (anon)
2. **Database**:前述 테이블 생성
3. **Storage**: 결과 이미지 저장 버킷 생성
4. **Edge Functions**: 필요시 AI API 키 보호용

---

## 9. 구현 로드맵

### Phase 1: MVP Core (1-2주)
| 작업 | 설명 |
|------|------|
| 프로젝트 세팅 | Next.js + Tailwind + Supabase 초기화 |
| UI 컴포넌트 | Button, Input, Select, Card 기본 컴포넌트 |
| 입력 폼 | 이름, 생년월일, 시간, 장소, 성별 입력 폼 |
| 분석 로직 | 八字 + 수비학 계산 함수 구현 |
| 결과 페이지 | 분석 결과 표시 페이지 |
| DB 연동 | Supabase에 결과 저장 |

### Phase 2: AI Integration (2-3주)
| 작업 | 설명 |
|------|------|
| OpenAI 연동 | DALL-E 3 + GPT-4o API 클라이언트 |
| 이미지 생성 | 프롬프트 생성 → DALL-E 호출 → URL 반환 |
| 텍스트 생성 | 운세 텍스트 생성 프롬프트 최적화 |
| 로딩 UX | "수호천사 소환 중" 애니메이션 |
| 에러 처리 | API 실패 시 fallback 메시지 |

### Phase 3: Engagement (1-2주)
| 작업 | 설명 |
|------|------|
| SNS 공유 | Kakao SDK, Instagram, 링크 복사 |
| OG 태그 | 공유 시 나타날 메타 이미지 |
| 광고 배치 | AdSense/AdFit 슬롯 추가 |
| 공유 페이지 | 결과 페이지 랜딩 최적화 |

### Phase 4: UX Polish (1주)
| 작업 | 설명 |
|------|------|
| 로딩 애니메이션 | 부드러운 전환 효과 |
| 결과 갤러리 | 내 결과 목록 (auth 추가 시) |
| 성능 최적화 | 이미지 캐싱, lazy loading |
| 접근성 | 키보드 네비게이션, 스크린 리더 |

---

## 10. 주의사항

### 10.1 비용 관리
- **OpenAI**: DALL-E 3 ($0.04/이미지), GPT-4o ($0.002-0.008/1K 토큰)
- **Supabase**: 무료 티어 사용량 내 운영
- **Vercel**: 프로젝트당 무료 할당량

### 10.2 보안
- Supabase Service Role Key는 서버 측에서만 사용
- 사용자 입력 sanitization
- Rate limiting (API Abuse 방지)

### 10.3 성능
- AI 생성 시간 고려 (5-15초 소요)
- 이미지 결과 캐싱 (동일 입력 재사용)
- Streaming response로UX 개선

---

## 11. 검증 체크리스트

### 기능 검증
- [ ] 모든 입력 필드 정상 작동
- [ ] 八자 분석 결과 정확
- [ ] Life Path Number 계산 정확
- [ ] DALL-E 이미지 생성 성공
- [ ] GPT-4o 텍스트 생성 성공
- [ ] 결과 저장 및 조회 가능
- [ ] 공유 링크 정상 작동

### UX 검증
- [ ] 모바일/PC 반응형 정상
- [ ] 로딩 애니메이션 부드럽게 동작
- [ ] 광고 슬롯 콘텐츠 가리지 않음
- [ ] 페이지 로딩 속도 만족

### 보안 검증
- [ ] 환경 변수 안전하게 관리
- [ ] 입력값 검증
- [ ] API rate limiting 적용

---

*문서 버전: 1.0*
*최종 업데이트: 2026-02-21*
