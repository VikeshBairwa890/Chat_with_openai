import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request) {
  const { prompt } = await request.json();

  if (!prompt) {
    return new Response(JSON.stringify({ error: 'Prompt is required' }), { status: 400 });
  }

  try {

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo', 
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 100,

    });

    return new Response(JSON.stringify({ text: response.choices[0].message.content }), { status: 200 });

  } catch (error) {
    
    console.error('Error with OpenAI API:', error);
    return new Response(JSON.stringify({ error: 'API error occurred' }), { status: 500 });
  }
}
