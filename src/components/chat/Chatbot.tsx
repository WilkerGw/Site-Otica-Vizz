// Arquivo: src/components/chat/Chatbot.tsx (CORRIGIDO)

"use client";

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User, BrainCircuit  } from 'lucide-react';

type Message = {
  role: 'user' | 'model';
  parts: string;
};

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', parts: 'Olá! Sou o Dr. Vizz. Como posso ajudar com sua saúde ocular hoje?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', parts: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // <<< A CORREÇÃO ESTÁ AQUI >>>
      // Filtra o histórico para não enviar a primeira mensagem de boas-vindas do bot
      const historyForApi = messages.filter((msg, index) => index !== 0);

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          history: historyForApi, // Envia o histórico corrigido
          message: input
        })
      });
      // <<< FIM DA CORREÇÃO >>>

      if (!response.ok) {
        throw new Error('Falha ao obter resposta da IA.');
      }

      const data = await response.json();
      const modelMessage: Message = { role: 'model', parts: data.text };
      setMessages(prev => [...prev, modelMessage]);

    } catch (error) {
      console.error(error);
      const errorMessage: Message = { role: 'model', parts: 'Desculpe, estou com um problema técnico. Tente novamente mais tarde.' };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // ... O resto do seu código JSX (a parte visual) permanece exatamente o mesmo ...
  return (
    <>
      {/* Botão Flutuante */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-gray-800 rounded-full shadow-lg flex items-center justify-center text-gray-900"
        aria-label="Abrir chat com Dr. Vizz"
      >
        <BrainCircuit size={32} className='text-yellow-400'/>
      </motion.button>

      {/* Janela do Chat */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed bottom-24 right-6 z-50 w-[90vw] max-w-sm h-[70vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-200"
          >
            {/* Cabeçalho */}
            <header className="p-4 bg-gray-50 border-b flex justify-between items-center">
              <h3 className="font-bold text-gray-800">Fale com o Dr. Vizz</h3>
              <button onClick={() => setIsOpen(false)} className="p-1 rounded-full hover:bg-gray-200" aria-label="Fechar chat">
                <X size={20} />
              </button>
            </header>

            {/* Mensagens */}
            <div className="flex-1 p-4 overflow-y-auto bg-gray-100">
              <div className="space-y-4">
                {messages.map((msg, index) => (
                  <div key={index} className={`flex items-start gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}>
                    {msg.role === 'model' && <div className="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center flex-shrink-0"><Bot size={20} className="text-gray-900" /></div>}
                    <div className={`px-4 py-2 rounded-2xl max-w-xs ${msg.role === 'user' ? 'bg-blue-500 text-white rounded-br-none' : 'bg-gray-200 text-gray-800 rounded-bl-none'}`}>
                      <p className="text-sm" style={{ whiteSpace: 'pre-wrap' }}>{msg.parts}</p>
                    </div>
                     {msg.role === 'user' && <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center flex-shrink-0"><User size={20} className="text-gray-700" /></div>}
                  </div>
                ))}
                {isLoading && (
                   <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center flex-shrink-0"><Bot size={20} className="text-gray-900" /></div>
                      <div className="px-4 py-3 bg-gray-200 rounded-2xl rounded-bl-none">
                         <div className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-gray-500 rounded-full animate-pulse"></span>
                            <span className="w-2 h-2 bg-gray-500 rounded-full animate-pulse [animation-delay:0.2s]"></span>
                            <span className="w-2 h-2 bg-gray-500 rounded-full animate-pulse [animation-delay:0.4s]"></span>
                         </div>
                      </div>
                   </div>
                )}
                <div ref={chatEndRef} />
              </div>
            </div>

            {/* Input */}
            <footer className="p-4 border-t bg-white">
              <form onSubmit={handleSubmit} className="flex items-center gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Digite sua dúvida..."
                  className="flex-1 w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
                <button type="submit" className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center text-gray-900 flex-shrink-0 disabled:bg-gray-300" disabled={isLoading || !input.trim()}>
                  <Send size={20} />
                </button>
              </form>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}