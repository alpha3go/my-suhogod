/**
 * OpenAI Client - Edge Runtime Compatible (Fetch API)
 */

export async function callOpenAI(prompt: string, isImage: boolean = false): Promise<string> {
  const apiKey = process.env.OPENAI_API_KEY;
  
  if (!apiKey) {
    throw new Error('OPENAI_API_KEY is not set');
  }
  
  if (isImage) {
    // DALL-E 3 image generation
    const response = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'dall-e-3',
        prompt: prompt,
        size: '1024x1024',
        quality: 'standard',
        n: 1
      })
    });
    
    const data = await response.json();
    return data.data?.[0]?.url || '';
  } else {
    // GPT-4o text generation
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: '당신은 사용자의 운세를 담당하는 수호천사입니다. 친근하고 위로가 되는 톤으로 작성해주세요.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        response_format: { type: 'json_object' },
        temperature: 0.8,
        max_tokens: 1000
      })
    });
    
    const data = await response.json();
    return data.choices?.[0]?.message?.content || '';
  }
}
