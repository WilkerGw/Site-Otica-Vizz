// src/components/home/ProdutoCard.tsx

"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, ShoppingCart } from 'lucide-react';
import { Product } from '../../types';
import { motion } from 'framer-motion';

interface ProdutoCardProps {
  produto: Product;
  onImageClick: (produto: Product, index: number) => void;
}

const ProdutoCard: React.FC<ProdutoCardProps> = ({ produto, onImageClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = (e: React.MouseEvent) => {
    e.stopPropagation();
    const isFirstImage = currentIndex === 0;
    const newIndex = isFirstImage ? produto.images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    const isLastImage = currentIndex === produto.images.length - 1;
    const newIndex = isLastImage ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="relative group bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 flex flex-col"
    >
      {/* Imagem e Carrossel */}
      <div
        className="relative w-full aspect-square cursor-pointer"
        onClick={() => onImageClick(produto, currentIndex)}
      >
        <Image
          src={produto.images[currentIndex]}
          alt={`Imagem de ${produto.name}`}
          layout="fill"
          objectFit="contain"
          className="transition-transform duration-300 group-hover:scale-105"
        />

        {/* Controles do Carrossel */}
        {produto.images.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute top-1/2 left-2 -translate-y-1/2 bg-white/80 rounded-full p-1.5 shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:scale-110 hover:bg-white"
              aria-label="Imagem anterior"
            >
              <ChevronLeft size={20} className="text-gray-700" />
            </button>
            <button
              onClick={goToNext}
              className="absolute top-1/2 right-2 -translate-y-1/2 bg-white/80 rounded-full p-1.5 shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:scale-110 hover:bg-white"
              aria-label="Próxima imagem"
            >
              <ChevronRight size={20} className="text-gray-700" />
            </button>
          </>
        )}
      </div>

      {/* Informações do Produto */}
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-semibold text-gray-800 truncate">{produto.name}</h3>
        <p className="text-xl font-bold text-gray-900 mt-1">{produto.price}</p>
        <Link href={produto.storeUrl} target="_blank" className="mt-auto">
          <button className="w-full mt-4 flex items-center justify-center gap-2 bg-gray-800 text-white font-semibold py-2.5 px-4 rounded-lg hover:bg-gray-700 transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50">
            <ShoppingCart size={18} />
            Ver na Loja
          </button>
        </Link>
      </div>
    </motion.div>
  );
};

export default ProdutoCard;