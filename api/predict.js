
import { NextResponse } from 'next/server';
import { Configuration, OpenAIApi } from 'openai';

export const config = {
  runtime: 'edge',
};

export default async function handler(req) {
  const body = await req.json();
  const { match } = body;

  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const openai = new OpenAIApi(configuration);

  try {
    const prompt = `예측 전문가처럼 다음 경기의 승자를 예측해주세요:\n\n경기 정보: ${match}\n\n예측 결과:`;

    const chatCompletion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    const prediction = chatCompletion.data.choices[0].message.content;
    return NextResponse.json({ prediction });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
