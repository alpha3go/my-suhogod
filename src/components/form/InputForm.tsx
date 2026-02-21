'use client';

import { useState } from 'react';
import { Button, Input, Select, Card } from '@/components/ui';
import { UserInput } from '@/types/user';

// 한국 시/도 목록
const SIDO_OPTIONS = [
  { value: 'seoul', label: '서울특별시' },
  { value: 'busan', label: '부산광역시' },
  { value: 'daegu', label: '대구광역시' },
  { value: 'incheon', label: '인천광역시' },
  { value: 'gwangju', label: '광주광역시' },
  { value: 'daejeon', label: '대전광역시' },
  { value: 'ulsan', label: '울산광역시' },
  { value: 'sejong', label: '세종특별자치시' },
  { value: 'gyeonggi', label: '경기도' },
  { value: 'gangwon', label: '강원도' },
  { value: 'chungbuk', label: '충청북도' },
  { value: 'chungnam', label: '충청남도' },
  { value: 'jeonbuk', label: '전라북도' },
  { value: 'jeonnam', label: '전라남도' },
  { value: 'gyeongbuk', label: '경상북도' },
  { value: 'gyeongnam', label: '경상남도' },
  { value: 'jeju', label: '제주특별자치도' }
];

// 시/군/구 목록 (도별) - 시 단위까지 세분화
const SIGUNGU_OPTIONS: Record<string, { value: string; label: string }[]> = {
  seoul: [
    { value: 'gangnam-gu', label: '강남구' }, { value: 'seocho-gu', label: '서초구' }, { value: 'mapo-gu', label: '마포구' },
    { value: 'jongno-gu', label: '종로구' }, { value: 'junggu', label: '중구' }, { value: 'yongsan-gu', label: '용산구' },
    { value: 'dongdaemun-gu', label: '동대문구' }, { value: 'seongdong-gu', label: '성동구' }, { value: 'gwangjin-gu', label: '광진구' },
    { value: 'dongjak-gu', label: '동작구' }, { value: 'gwanak-gu', label: '관악구' }, { value: 'seo-gu', label: '서구' },
    { value: 'gangbuk-gu', label: '강북구' }, { value: 'dobong-gu', label: '도봉구' }, { value: 'nowon-gu', label: '노원구' },
    { value: 'eunpyeong-gu', label: '은평구' }, { value: 'seodaemun-gu', label: '서대문구' }, { value: 'etc', label: '기타' }
  ],
  busan: [
    { value: 'haeundae-gu', label: '해운대구' }, { value: 'sasang-gu', label: '사상구' }, { value: 'gijang-gun', label: '기장군' },
    { value: 'geumjeong-gu', label: '금정구' }, { value: 'gangseo-gu', label: '강서구' }, { value: 'yeonje-gu', label: '연제구' },
    { value: 'suyeong-gu', label: '수영구' }, { value: 'nam-gu', label: '남구' }, { value: 'buk-gu', label: '북구' },
    { value: 'dong-gu', label: '동구' }, { value: 'jung-gu', label: '중구' }, { value: 'seo-gu', label: '서구' },
    { value: 'etc', label: '기타' }
  ],
  daegu: [
    { value: 'seo-gu', label: '서구' }, { value: 'jung-gu', label: '중구' }, { value: 'dong-gu', label: '동구' },
    { value: 'buk-gu', label: '북구' }, { value: 'nam-gu', label: '남구' }, { value: 'suseong-gu', label: '수성구' },
    { value: 'dalseo-gu', label: '달서구' }, { value: 'dalsung-gun', label: '달성군' }, { value: 'etc', label: '기타' }
  ],
  incheon: [
    { value: 'jung-gu', label: '중구' }, { value: 'dong-gu', label: '동구' }, { value: 'michuhol-gu', label: '미추홀구' },
    { value: 'yeonsu-gu', label: '연수구' }, { value: 'namdong-gu', label: '남동구' }, { value: 'bupyeong-gu', label: '부평구' },
    { value: 'gyeyang-gu', label: '계양구' }, { value: 'seogu', label: '서구' }, { value: 'ganghwa-gun', label: '강화군' },
    { value: 'ongjin-gun', label: '옹진군' }, { value: 'etc', label: '기타' }
  ],
  gwangju: [
    { value: 'dong-gu', label: '동구' }, { value: 'seo-gu', label: '서구' }, { value: 'nam-gu', label: '남구' },
    { value: 'buk-gu', label: '북구' }, { value: 'gwangsan-gu', label: '광산구' }, { value: 'etc', label: '기타' }
  ],
  daejeon: [
    { value: 'dong-gu', label: '동구' }, { value: 'jung-gu', label: '중구' }, { value: 'seo-gu', label: '서구' },
    { value: 'yuseong-gu', label: '유성구' }, { value: 'daedeok-gu', label: '대덕구' }, { value: 'etc', label: '기타' }
  ],
  ulsan: [
    { value: 'jung-gu', label: '중구' }, { value: 'nam-gu', label: '남구' }, { value: 'dong-gu', label: '동구' },
    { value: 'buk-gu', label: '북구' }, { value: 'ulju-gun', label: '울주군' }, { value: 'etc', label: '기타' }
  ],
  gyeonggi: [
    { value: 'suwon-si', label: '수원시' }, { value: 'seongnam-si', label: '성남시' }, { value: 'goyang-si', label: '고양시' },
    { value: 'yongin-si', label: '용인시' }, { value: 'seongnam-si', label: '성남시' }, { value: 'ansan-si', label: '안산시' },
    { value: 'anyang-si', label: '안양시' }, { value: 'namyangju-si', label: '남양주시' }, { value: 'bucheon-si', label: '부천시' },
    { value: 'gwangmyeong-si', label: '광명시' }, { value: 'pyeongtaek-si', label: '평택시' }, { value: 'siheung-si', label: '시흥시' },
    { value: 'gunpo-si', label: '군포시' }, { value: 'uiwang-si', label: '의왕시' }, { value: 'hanam-si', label: '하남시' },
    { value: 'guri-si', label: '구리시' }, { value: 'pocheon-si', label: '포천시' }, { value: 'ichon-si', label: '이천시' },
    { value: 'anseong-si', label: '안성시' }, { value: 'osan-si', label: '오산시' }, { value: 'ucheon-si', label: '우주시' },
    { value: 'yaju-si', label: '양주시' }, { value: 'etc', label: '기타' }
  ],
  gangwon: [
    { value: 'chuncheon-si', label: '춘천시' }, { value: 'wonju-si', label: '원주시' }, { value: 'gangneung-si', label: '강릉시' },
    { value: 'donghae-si', label: '동해시' }, { value: 'taebaek-si', label: '태백시' }, { value: 'sokcho-si', label: '속초시' },
    { value: 'chuncheon-gun', label: '춘천군' }, { value: 'hoengseong-gun', label: '횡성군' }, { value: 'pyeongchang-gun', label: '평창군' },
    { value: 'jeongseon-gun', label: '정선군' }, { value: 'inje-gun', label: '인제군' }, { value: 'yanggu-gun', label: '양구군' },
    { value: 'hwacheon-gun', label: '화천군' }, { value: 'yangyang-gun', label: '양양군' }, { value: 'goseong-gun', label: '고성군' },
    { value: 'etc', label: '기타' }
  ],
  chungbuk: [
    { value: 'cheongju-si', label: '청주시' }, { value: 'jecheon-si', label: '제천시' }, { value: ' Chungdo-si', label: '충주시' },
    { value: 'goesan-gun', label: '괴산군' }, { value: 'boeun-gun', label: '보은군' }, { value: 'okcheon-gun', label: '옥천군' },
    { value: 'yeongdong-gun', label: '영동군' }, { value: 'jeompyeong-gun', label: '점평군' }, { value: 'jincheon-gun', label: '진천군' },
    { value: 'uoseong-gun', label: '우성군' }, { value: 'seowon-gun', label: '세원군' }, { value: 'etc', label: '기타' }
  ],
  chungnam: [
    { value: 'seosan-si', label: '서산시' }, { value: 'cheonan-si', label: '천안시' }, { value: 'gyeryong-si', label: '계룡시' },
    { value: 'nonsan-si', label: '논산시' }, { value: 'asan-si', label: '아산시' }, { value: 'dangjin-si', label: '당진시' },
    { value: 'geumsan-gun', label: '금산군' }, { value: 'buyeo-gun', label: '부여군' }, { value: 'seocheon-gun', label: '서천군' },
    { value: 'cheongyang-gun', label: '청양군' }, { value: 'hongseong-gun', label: '홍성군' }, { value: 'yesan-gun', label: '예산군' },
    { value: 'taean-gun', label: '태안군' }, { value: 'etc', label: '기타' }
  ],
  jeonbuk: [
    { value: 'jeonju-si', label: '전주시' }, { value: 'gunsan-si', label: '군산시' }, { value: 'ik-san-si', label: '익산시' },
    { value: 'jeongeup-si', label: '정읍시' }, { value: 'namwon-si', label: '남원시' }, { value: 'gimje-si', label: '김제시' },
    { value: 'wanju-gun', label: '완주군' }, { value: 'jinan-gun', label: '진안군' }, { value: 'muju-gun', label: '무주군' },
    { value: 'janggok-gun', label: '장수군' }, { value: 'imeung-gun', label: '임실군' }, { value: 'gochang-gun', label: '고창군' },
    { value: 'buan-gun', label: '부안군' }, { value: 'etc', label: '기타' }
  ],
  jeonnam: [
    { value: 'mokpo-si', label: '목포시' }, { value: 'yeosu-si', label: '여수시' }, { value: 'suncheon-si', label: '순천시' },
    { value: 'gwangyang-si', label: '광양시' }, { value: 'haenam-gun', label: '해남군' }, { value: 'yeongam-gun', label: '영암군' },
    { value: 'gangjin-gun', label: '강진군' }, { value: 'damyang-gun', label: '담양군' }, { value: 'gokseong-gun', label: '곡성군' },
    { value: 'jangseong-gun', label: '장성군' }, { value: 'wando-gun', label: '완도군' }, { value: 'jindo-gun', label: '진도군' },
    { value: 'heo-gyun-gun', label: '해변군' }, { value: 'bosal-gun', label: '보성군' }, { value: 'goheung-gun', label: '고흥군' },
    { value: 'naju-si', label: '나주시' }, { value: 'etc', label: '기타' }
  ],
  gyeongbuk: [
    { value: 'pohang-si', label: '포항시' }, { value: 'gyeongju-si', label: '경주시' }, { value: 'gumi-si', label: '구미시' },
    { value: 'gimcheon-si', label: '김천시' }, { value: 'andong-si', label: '안동시' }, { value: 'yeongju-si', label: '영주시' },
    { value: 'yeongcheon-si', label: '영천시' }, { value: 'Sangju-si', label: '상주시' }, { value: ' Mungyeong-si', label: '문경시' },
    { value: 'jesuite-gun', label: '예천군' }, { value: 'bonghwa-gun', label: '봉화군' }, { value: 'uljin-gun', label: '울진군' },
    { value: 'pheongdeok-gun', label: '평덕군' }, { value: 'sanggun-gun', label: '성주군' }, { value: 'gwalleung-gun', label: '울률군' },
    { value: 'yeongyang-gun', label: '영양군' }, { value: 'yeongdeok-gun', label: '영덕군' }, { value: 'etc', label: '기타' }
  ],
  gyeongnam: [
    { value: 'changwon-si', label: '창원시' }, { value: ' Jinju-si', label: '진주시' }, { value: 'tongyoung-si', label: '통영시' },
    { value: 'sacheon-si', label: '사천시' }, { value: 'gimhae-si', label: '김해시' }, { value: 'miryang-si', label: '밀양시' },
    { value: 'geochilsan-si', label: '거창시' }, { value: 'hapcheon-gun', label: '합천군' }, { value: 'changnyeong-gun', label: '창녕군' },
    { value: 'namhae-gun', label: '남해군' }, { value: 'hadong-gun', label: '하동군' }, { value: 'sancheong-gun', label: '산청군' },
    { value: 'hamyang-gun', label: '함양군' }, { value: 'geoje-si', label: '거제시' }, { value: 'goseong-gun', label: '고성군' },
    { value: 'etc', label: '기타' }
  ],
  jeju: [
    { value: 'jeju-si', label: '제주시' }, { value: 'seogwipo-si', label: '서귀포시' }, { value: 'etc', label: '기타' }
  ],
  sejong: [
    { value: 'sejong-si', label: '세종시' }, { value: 'etc', label: '기타' }
  ],
  default: [
    { value: 'jungang', label: '시/군 중심가' }, { value: 'etc', label: '기타' }
  ]
};

// 시간 옵션 (0-23시 + 모름)
const HOUR_OPTIONS = Array.from({ length: 24 }, (_, i) => ({
  value: String(i),
  label: `${i}시`
}));
HOUR_OPTIONS.push({ value: '99', label: '모름' });

// 분 옵션 (0-59분 + 모름)
const MINUTE_OPTIONS = Array.from({ length: 60 }, (_, i) => ({
  value: String(i),
  label: `${i}분`
}));
MINUTE_OPTIONS.push({ value: '99', label: '모름' });

interface InputFormProps {
  onSubmit: (data: UserInput) => void;
  isLoading?: boolean;
}

export function InputForm({ onSubmit, isLoading }: InputFormProps) {
  const [formData, setFormData] = useState<UserInput>({
    name: '',
    birthDate: '',
    birthHour: 12,
    birthMinute: 0,
    birthLocation: {
      sido: '',
      sigungu: ''
    },
    gender: 'male',
    calendarType: 'solar'
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = '이름을 입력해주세요';
    }
    
    if (!formData.birthDate) {
      newErrors.birthDate = '생년월일을 선택해주세요';
    }
    
    if (!formData.birthLocation.sido) {
      newErrors.sido = '시를 선택해주세요';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validate()) {
      onSubmit(formData);
    }
  };
  
  const handleChange = (field: keyof UserInput, value: string | number) => {
    if (field === 'birthLocation') {
      setFormData(prev => ({ 
        ...prev, 
        birthLocation: { ...prev.birthLocation, sido: value as string, sigungu: '' }
      }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };
  
  const handleSigunguChange = (value: string) => {
    setFormData(prev => ({ 
      ...prev, 
      birthLocation: { ...prev.birthLocation, sigungu: value }
    }));
  };
  
  // 시/도에 따른 시/군/구 목록
  const currentSigunguOptions = SIGUNGU_OPTIONS[formData.birthLocation.sido] || SIGUNGU_OPTIONS.default;
  
  return (
    <Card variant="elevated" className="p-6 md:p-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 이름 */}
        <Input
          label="이름"
          placeholder="당신의 이름을 알려주세요"
          value={formData.name}
          onChange={(e) => handleChange('name', e.target.value)}
          error={errors.name}
          maxLength={20}
        />
        
        {/* 생년월일 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            생년월일
          </label>
          <div className="flex gap-3">
            <input
              type="date"
              className={`
                flex-1 px-4 py-3 rounded-lg border-2 transition-all duration-200
                focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
                ${errors.birthDate ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-gray-300'}
              `}
              value={formData.birthDate}
              onChange={(e) => handleChange('birthDate', e.target.value)}
            />
            <Select
              options={[
                { value: 'solar', label: '양력' },
                { value: 'lunar', label: '음력' }
              ]}
              value={formData.calendarType}
              onChange={(e) => handleChange('calendarType', e.target.value)}
              className="w-28"
            />
          </div>
          {errors.birthDate && (
            <p className="mt-1 text-sm text-red-500">{errors.birthDate}</p>
          )}
        </div>
        
        {/* 태어난 시간 - 시/분 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            태어난 시간
          </label>
          <div className="flex gap-3">
            <Select
              options={HOUR_OPTIONS}
              value={String(formData.birthHour)}
              onChange={(e) => handleChange('birthHour', parseInt(e.target.value))}
              placeholder="시"
              className="flex-1"
            />
            <Select
              options={MINUTE_OPTIONS}
              value={String(formData.birthMinute)}
              onChange={(e) => handleChange('birthMinute', parseInt(e.target.value))}
              placeholder="분"
              className="flex-1"
            />
          </div>
        </div>
        
        {/* 태어난 장소 - 시/도 + 시/군/구 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            태어난 장소
          </label>
          <div className="space-y-3">
            <Select
              options={SIDO_OPTIONS}
              value={formData.birthLocation.sido}
              onChange={(e) => handleChange('birthLocation', e.target.value)}
              placeholder="시를 선택해주세요"
              error={errors.sido}
            />
            {formData.birthLocation.sido && (
              <Select
                options={currentSigunguOptions}
                value={formData.birthLocation.sigungu}
                onChange={(e) => handleSigunguChange(e.target.value)}
                placeholder="구/군을 선택해주세요 (선택)"
              />
            )}
          </div>
        </div>
        
        {/* 성별 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            성별
          </label>
          <div className="flex gap-4">
            <label className={`
              flex-1 flex items-center justify-center gap-2 p-4 rounded-lg border-2 cursor-pointer
              transition-all duration-200
              ${formData.gender === 'male' 
                ? 'border-purple-500 bg-purple-50 text-purple-700' 
                : 'border-gray-200 hover:border-gray-300'}
            `}>
              <input
                type="radio"
                name="gender"
                value="male"
                checked={formData.gender === 'male'}
                onChange={(e) => handleChange('gender', e.target.value)}
                className="sr-only"
              />
              <span className="text-2xl">👨</span>
              <span className="font-medium">남성</span>
            </label>
            <label className={`
              flex-1 flex items-center justify-center gap-2 p-4 rounded-lg border-2 cursor-pointer
              transition-all duration-200
              ${formData.gender === 'female' 
                ? 'border-purple-500 bg-purple-50 text-purple-700' 
                : 'border-gray-200 hover:border-gray-300'}
            `}>
              <input
                type="radio"
                name="gender"
                value="female"
                checked={formData.gender === 'female'}
                onChange={(e) => handleChange('gender', e.target.value)}
                className="sr-only"
              />
              <span className="text-2xl">👩</span>
              <span className="font-medium">여성</span>
            </label>
          </div>
        </div>
        
        {/* 제출 버튼 */}
        <Button
          type="submit"
          size="lg"
          className="w-full mt-8"
          isLoading={isLoading}
        >
          ✨ 수호천사 찾기
        </Button>
      </form>
    </Card>
  );
}
