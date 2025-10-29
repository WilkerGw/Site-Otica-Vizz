"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check, MessageCircle } from "lucide-react";

// Informações das lentes
const lensInfo = {
  simple: {
    image: "/images/menu-imgs/lente.png",
    title: "Lentes de Visão Simples",
    description: "Ideal para corrigir um único campo de visão, seja para longe (miopia, hipermetropia, astigmatismo) ou para perto (presbiopia).",
    benefits: [
      "Amplo campo de visão",
      "Adaptação rápida e fácil",
      "Ideal para atividades específicas",
    ],
  },
  multifocal: {
    image: "/images/menu-imgs/lente-multifocal.png",
    title: "Lentes Multifocais",
    description: "Perfeitas para quem tem presbiopia (vista cansada), corrigem múltiplos campos de visão (perto, intermediário e longe) em uma única lente.",
    benefits: [
      "Visão nítida em todas as distâncias",
      "Elimina a necessidade de múltiplos óculos",
      "Transição suave entre os campos de visão",
    ],
  },
};

// --- CORREÇÃO APLICADA AQUI ---
// Logos dos parceiros com classes de tamanho individuais
const partners = [
  { src: "/images/parceiros/zeiss.png", alt: "Zeiss", className: "h-9" },
  { src: "/images/parceiros/hoya.png", alt: "Hoya", className: "h-6" },
  { src: "/images/parceiros/varilux-logo-0.png", alt: "Varilux", className: "h-7" },
  { src: "/images/parceiros/hb.png", alt: "HB", className: "h-9" },
];

export function LensTypesSection() {
  return (
    <section id="lentes" className="w-full bg-white py-20">
      
      <div className="container mx-auto px-4">
        {/* Cabeçalho da Seção */}
        <div className="text-center mb-12">
          <h2 className="text-sm font-bold text-yellow-500 uppercase tracking-widest">
            Soluções para Todos
          </h2>
          <h1 className="mt-2 text-3xl md:text-4xl font-semibold text-gray-800 tracking-tight">
            Encontre a Lente Certa para Você
          </h1>
        </div>

        {/* Container das Lentes */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Card de Visão Simples */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="flex-1 bg-gray-50 rounded-lg p-8 border border-gray-100 flex flex-col items-center text-center"
          >
            <Image
              src={lensInfo.simple.image}
              alt={lensInfo.simple.title}
              width={150}
              height={150}
              className="rounded-full w-32 h-32 object-cover border-4 border-white shadow-md"
            />
            <h3 className="mt-6 text-2xl font-semibold text-gray-800">
              {lensInfo.simple.title}
            </h3>
            <p className="mt-2 text-gray-600 max-w-sm">
              {lensInfo.simple.description}
            </p>
            <ul className="mt-6 space-y-3 text-left">
              {lensInfo.simple.benefits.map((benefit, i) => (
                <li key={i} className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-yellow-500 flex-shrink-0" />
                  <span className="text-gray-700">{benefit}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Card de Lentes Multifocais */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="flex-1 bg-gray-50 rounded-lg p-8 border border-gray-100 flex flex-col items-center text-center"
          >
            <Image
              src={lensInfo.multifocal.image}
              alt={lensInfo.multifocal.title}
              width={150}
              height={150}
              className="rounded-full w-32 h-32 object-cover border-4 border-white shadow-md"
            />
            <h3 className="mt-6 text-2xl font-semibold text-gray-800">
              {lensInfo.multifocal.title}
            </h3>
            <p className="mt-2 text-gray-600 max-w-sm">
              {lensInfo.multifocal.description}
            </p>
            <ul className="mt-6 space-y-3 text-left">
              {lensInfo.multifocal.benefits.map((benefit, i) => (
                <li key={i} className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-yellow-500 flex-shrink-0" />
                  <span className="text-gray-700">{benefit}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
        
        {/* Seção de Parceiros */}
        <div className="mt-16 text-center">
            <h4 className="text-gray-500 font-semibold">Trabalhamos com as melhores marcas</h4>
            <div className="mt-6 flex justify-center items-center gap-8 md:gap-12 flex-wrap">
                {/* --- CORREÇÃO APLICADA AQUI --- */}
                {partners.map((partner) => (
                    <Image
                        key={partner.alt}
                        src={partner.src}
                        alt={partner.alt}
                        width={120} // Aumentado para melhor qualidade
                        height={60}  // Aumentado para melhor qualidade
                        // A classe de tamanho agora é dinâmica
                        className={`${partner.className} w-auto object-contain grayscale opacity-60`}
                    />
                ))}
            </div>
        </div>

        {/* Botão Centralizado */}
        <div className="mt-16 text-center">
             <a
              href="https://wa.me/551123628799"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-3 justify-center px-8 py-3 rounded-xl bg-green-500 text-white font-semibold shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl overflow-hidden"
            >
              <MessageCircle size={20} />
              <span>Tire suas dúvidas com um de nossos consultores</span>
            </a>
        </div>
      </div>
    </section>
  );
}