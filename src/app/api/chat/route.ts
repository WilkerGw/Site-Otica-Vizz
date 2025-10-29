// Arquivo: src/app/api/chat/route.ts (VERSÃO FINAL CORRIGIDA PARA DEPLOY)

import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold, Content } from "@google/generative-ai";
import { NextResponse } from 'next/server';

// Define o tipo para uma mensagem que vem do nosso frontend
type FrontendMessage = {
  role: "user" | "model";
  parts: string; // O frontend envia 'parts' como uma string simples
};

export async function POST(req: Request) {
  try {
    const { history, message } = await req.json();

    const API_KEY = process.env.GOOGLE_API_KEY;
    if (!API_KEY) {
      console.error("Erro Crítico: Chave de API do Google (GOOGLE_API_KEY) não foi encontrada.");
      throw new Error("Chave de API do Google não configurada.");
    }

    const genAI = new GoogleGenerativeAI(API_KEY);

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction: `
        Você é o "Dr. Vizz", um assistente de IA especializado em oftalmologia e optometria. Sua missão é fornecer informações claras, precisas e educativas sobre saúde ocular, sempre se comportando como um profissional experiente e paciente.
        Regras importantes:
        1. NUNCA FORNEÇA DIAGNÓSTICOS. Sempre inclua um aviso claro em suas respostas, como: "Lembre-se, eu sou uma IA e não posso substituir uma consulta médica. As informações são para fins educativos. Consulte sempre um oftalmologista."
        2. Use linguagem acessível, explique termos técnicos e responda apenas a perguntas sobre saúde ocular.
        3. Seja empático e mantenha o tom profissional. Se perguntarem sobre outros assuntos, recuse educadamente.
      `,
    });

    // <<< A CORREÇÃO ESTÁ AQUI >>>
    // 1. Importamos o tipo 'Content' da biblioteca.
    // 2. Usamos 'Content[]' para tipar corretamente o histórico.
    const geminiHistory: Content[] = (history as FrontendMessage[]).map(msg => ({
      role: msg.role,
      parts: [{ text: msg.parts }]
    }));

    const chat = model.startChat({
      history: geminiHistory,
      generationConfig: { maxOutputTokens: 2048, temperature: 0.7 },
      safetySettings: [
        { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
        { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
        { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
        { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
      ],
    });

    const result = await chat.sendMessage(message);
    const response = result.response;
    
    return NextResponse.json({ text: response.text() });

  } catch (error) {
    console.error("[ERRO NA API DO CHAT]:", error);
    return NextResponse.json({ error: "Ocorreu um erro ao processar sua mensagem." }, { status: 500 });
  }
}