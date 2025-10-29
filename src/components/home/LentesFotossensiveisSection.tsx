'use client';
// A CORREÇÃO ESTÁ NESTA LINHA: Importando os hooks necessários do React
import React, { useState, useRef, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { MoveHorizontal, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

interface LentesFotossensiveisSectionProps {
  imagemAntes: string;
  imagemDepois: string;
}

const LentesFotossensiveisSection: React.FC<LentesFotossensiveisSectionProps> = ({
  imagemAntes,
  imagemDepois,
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!isDragging || !containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percentage = (x / rect.width) * 100;
    setSliderPosition(percentage);
  }, [isDragging]);

  const handleMouseMove = useCallback((e: MouseEvent) => handleMove(e.clientX), [handleMove]);
  const handleTouchMove = useCallback((e: TouchEvent) => handleMove(e.touches[0].clientX), [handleMove]);

  const handleInteractionEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('mouseup', handleInteractionEnd);
      window.addEventListener('touchend', handleInteractionEnd);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('mouseup', handleInteractionEnd);
      window.removeEventListener('touchend', handleInteractionEnd);
    };
  }, [isDragging, handleMouseMove, handleTouchMove, handleInteractionEnd]);

  return (
    <section className="w-full bg-gray-50 py-20 overflow-hidden">
      <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Coluna de Texto */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center lg:text-left"
        >
          <h2 className="text-sm font-bold text-yellow-500 uppercase tracking-widest">
            Visão Inteligente
          </h2>
          <h1 className="mt-2 text-3xl md:text-4xl font-semibold text-gray-800 tracking-tight">
            Lentes que se Adaptam a Você
          </h1>
          <p className="mt-4 text-gray-600 max-w-xl mx-auto lg:mx-0">
            Experimente o conforto das lentes fotossensíveis. Elas escurecem
            automaticamente com a luz solar para proteger seus olhos e clareiam em
            ambientes internos, oferecendo uma visão nítida em qualquer situação.
          </p>

          <div className="mt-8 flex items-center gap-3 justify-center lg:justify-start">
            <ShieldCheck className="w-6 h-6 text-yellow-500" />
            <span className="text-gray-700 font-semibold">Proteção UV total e conforto visual.</span>
          </div>

           <p className="mt-8 text-sm text-gray-500 max-w-xl mx-auto lg:mx-0">
             <strong>Arraste a barra na imagem ao lado</strong> e veja a tecnologia em ação.
          </p>
        </motion.div>

        {/* Coluna do Comparador de Imagem */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
        >
          <div
            ref={containerRef}
            className="relative w-full max-w-xl mx-auto aspect-square select-none rounded-lg shadow-2xl cursor-ew-resize overflow-hidden"
            onMouseDown={() => setIsDragging(true)}
            onTouchStart={() => setIsDragging(true)}
          >
            {/* Imagem "Depois" (escura) - Fica no fundo */}
            <Image
              src={imagemDepois}
              alt="Modelo com lentes escuras (fotossensíveis ativadas)"
              layout="fill"
              objectFit="cover"
              priority
              draggable={false}
            />

            {/* Imagem "Antes" (clara) - Fica na frente e é cortada */}
            <div
              className="absolute top-0 left-0 w-full h-full"
              style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
            >
              <Image
                src={imagemAntes}
                alt="Modelo com lentes claras (fotossensíveis inativas)"
                layout="fill"
                objectFit="cover"
                priority
                draggable={false}
              />
            </div>
            
            {/* Divisor */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-white/80 pointer-events-none"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg">
                <MoveHorizontal className="text-gray-700" size={24} />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LentesFotossensiveisSection;