"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface ImageModalProps {
  images: string[];
  selectedImageIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export function ImageModal({
  images,
  selectedImageIndex,
  onClose,
  onPrev,
  onNext,
}: ImageModalProps) {
  if (selectedImageIndex === null) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        // Adicionado padding para afastar a imagem das bordas no mobile
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        {/* --- CORREÇÃO APLICADA AQUI --- */}
        {/* Botão de Fechar com posicionamento ajustado */}
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1, transition: { delay: 0.2 } }}
          exit={{ scale: 0, opacity: 0 }}
          className="absolute top-3 right-3 md:top-4 md:right-4 text-white bg-black/50 rounded-full p-2 hover:bg-black/80 transition-colors z-50"
          onClick={onClose}
          aria-label="Fechar modal"
        >
          <X size={28} />
        </motion.button>

        {/* --- CORREÇÃO APLICADA AQUI --- */}
        {/* Botão Anterior com posicionamento ajustado */}
        <motion.button
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1, transition: { delay: 0.2 } }}
          exit={{ x: -50, opacity: 0 }}
          className="absolute left-1 md:left-4 text-white bg-black/50 rounded-full p-2 hover:bg-black/80 transition-colors z-50"
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          aria-label="Imagem anterior"
        >
          <ChevronLeft size={32} />
        </motion.button>

        {/* Imagem Principal */}
        <motion.div
          key={selectedImageIndex}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          // A imagem agora ocupa o espaço dentro do padding
          className="relative w-full h-full max-w-4xl max-h-4xl"
          onClick={(e) => e.stopPropagation()}
        >
          <Image
            src={images[selectedImageIndex]}
            alt="Imagem do produto em destaque"
            layout="fill"
            objectFit="contain"
            className="rounded-lg"
          />
        </motion.div>

        {/* --- CORREÇÃO APLICADA AQUI --- */}
        {/* Botão Próximo com posicionamento ajustado */}
        <motion.button
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1, transition: { delay: 0.2 } }}
          exit={{ x: 50, opacity: 0 }}
          className="absolute right-1 md:right-4 text-white bg-black/50 rounded-full p-2 hover:bg-black/80 transition-colors z-50"
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          aria-label="Próxima imagem"
        >
          <ChevronRight size={32} />
        </motion.button>
      </motion.div>
    </AnimatePresence>
  );
}