"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';

type Review = {
  id: number; 
  name: string; 
  comment: string; 
  rating: number; 
  initials: string;
};

const reviews: Review[] = [
    { id: 1, name: 'Wilker Martins', comment: 'Melhor atendimento da cidade! Produtos de ótimas qualidade e modernos. Loja aconchegante e bonita!', rating: 5, initials: 'WM' },
    { id: 2, name: 'Debora Ap Ferreira', comment: 'Trabalho de excelência. Atendimento, pontualidade, preço justo e produtos de excelente qualidade. Super recomendo.', rating: 5, initials: 'DF' },
    { id: 3, name: 'Barbara Caroline', comment: 'Amei a ótica, com ampla variedade. Parabéns pelo atendimento e paciência em cada detalhe. Qualidade muito boa, recomendo.', rating: 5, initials: 'BC' },
    { id: 4, name: 'Yan Rocha', comment: 'Comprei meus óculos, ficaram prontos super rápido e atendimento excelente! Recomendo 💙', rating: 5, initials: 'YR' },
    { id: 5, name: 'Bruna Santos', comment: 'Super indico a Óticas Vizz, atendimento sensacional. Adquiri dois óculos, e estou amando a qualidade.', rating: 5, initials: 'BS' },
    { id: 6, name: 'Elem Fiuza', comment: 'Melhor atendimento que eu poderia receber. Óculos super em conta e os funcionários são uns gatos 😍', rating: 5, initials: 'EF' },
    { id: 7, name: 'Rafael Santos', comment: 'Super indico, os meninos me explicaram tudo sobre as lentes do meu óculos. As Armações são lindas, e muito acessível!', rating: 5, initials: 'RS' },
    { id: 8, name: 'Rodrigo Santos', comment: 'Atendimento nota 10. Fui pra comprar um óculos acabei saindo com dois kkkkk Eu amei ❤️', rating: 5, initials: 'RS' },
    { id: 9, name: 'Reginaldo Pereira', comment: 'Excelente atendimento, preço justo, e pontualidade na entrega. No meu caso foi entregue dois dias antes do prazo. Recomendo!', rating: 5, initials: 'RP' },
    { id: 10, name: 'Paulo Brandão', comment: 'A loja tem produtos excelentes e o atendimento é ótimo!! Recomendo dmais!!', rating: 5, initials: 'PB' },
];

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
  }),
};

export function CustomerReviewsSection() {
  const [[page, direction], setPage] = useState([0, 0]);

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  const reviewIndex = Math.abs(page % reviews.length);

  return (
    <section className="bg-gray-50 w-full py-20 overflow-hidden">
      <div className="container mx-auto px-4 text-center">
        {/* Cabeçalho da Seção */}
        <h2 className="text-sm font-bold text-yellow-500 uppercase tracking-widest">
          Depoimentos
        </h2>
        <h1 className="mt-2 text-3xl md:text-4xl font-semibold text-gray-800 tracking-tight">
          O que Nossos Clientes Dizem
        </h1>
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
          A satisfação de quem confia em nosso trabalho é a nossa maior inspiração.
        </p>

        {/* Carrossel de Depoimentos */}
        <div className="relative mt-12 h-80 flex items-center justify-center">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={page}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              className="absolute w-full max-w-2xl"
            >
              <div
                className="relative flex flex-col text-left p-8 bg-white border border-gray-200 rounded-xl shadow-lg"
              >
                <Quote className="absolute top-4 right-4 text-gray-100" size={48} />
                <div className="relative z-10 flex text-yellow-400 mb-4">
                  {[...Array(reviews[reviewIndex].rating)].map((_, i) => <Star key={i} fill="currentColor" />)}
                </div>
                <p className="relative z-10 text-gray-600 italic line-clamp-4 flex-grow mb-6 h-20">
                  "{reviews[reviewIndex].comment}"
                </p>
                <div className="relative z-10 flex items-center gap-4 mt-auto border-t border-gray-100 pt-4">
                  <div className="w-12 h-12 rounded-full bg-gray-800 text-white flex items-center justify-center font-bold text-lg">
                    {reviews[reviewIndex].initials}
                  </div>
                  <span className="font-semibold text-gray-700">{reviews[reviewIndex].name}</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Botões de Navegação */}
          <button
            onClick={() => paginate(-1)}
            aria-label="Anterior"
            className="absolute top-1/2 -translate-y-1/2 left-0 z-20 w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center text-gray-600 transition-all duration-300 hover:bg-gray-800 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronLeft />
          </button>
          <button
            onClick={() => paginate(1)}
            aria-label="Próximo"
            className="absolute top-1/2 -translate-y-1/2 right-0 z-20 w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center text-gray-600 transition-all duration-300 hover:bg-gray-800 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronRight />
          </button>
        </div>
      </div>
    </section>
  );
}