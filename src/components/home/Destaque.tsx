"use client";

import React from "react";
import { motion } from "framer-motion";
import { Shield, Layers, Gem, Sun, Sparkles } from "lucide-react";

// Dados dos cards de lentes para facilitar a manutenção
const lensFeatures = [
  {
    icon: <Shield className="w-8 h-8 text-yellow-400" />,
    title: "Filtro de Luz Azul",
    description: "Proteja seus olhos da luz azul nociva emitida por telas digitais, reduzindo a fadiga ocular e melhorando a qualidade do sono.",
  },
  {
    icon: <Layers className="w-8 h-8 text-yellow-400" />,
    title: "Lentes Multifocais",
    description: "Visão nítida para perto, meia e longa distância em uma única lente, eliminando a necessidade de múltiplos óculos.",
  },
  {
    icon: <Gem className="w-8 h-8 text-yellow-400" />,
    title: "Afinamento de Lentes",
    description: "Lentes mais finas e leves, mesmo para graus mais elevados, proporcionando maior conforto e uma estética superior.",
  },
  {
    icon: <Sparkles className="w-8 h-8 text-yellow-400" />,
    title: "Tratamento Antirreflexo",
    description: "Reduz os reflexos indesejados, oferecendo uma visão mais clara e nítida, além de tornar suas lentes quase invisíveis.",
  },
  {
    icon: <Sun className="w-8 h-8 text-yellow-400" />,
    title: "Lentes Fotossensíveis",
    description: "Adaptam-se automaticamente à luminosidade do ambiente, escurecendo sob o sol para o máximo conforto visual.",
  },
];

// Variantes de animação para o container e para os itens
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15, // Atraso entre a animação de cada card
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const Destaque = () => {
  return (
    <section id="destaque" className="w-full bg-gray-50 py-20 overflow-hidden">
      <div className="container mx-auto px-4 flex flex-col items-center">
        {/* Coluna de Conteúdo e Cards - Agora Centralizada */}
        <div className="text-center max-w-4xl">
          <h2 className="text-sm font-bold text-yellow-500 uppercase tracking-widest">
            Tecnologia e Cuidado
          </h2>
          <h1 className="mt-2 text-3xl md:text-4xl font-semibold text-gray-800 tracking-tight">
            As Lentes Perfeitas para Sua Necessidade
          </h1>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Oferecemos uma gama completa de tratamentos e tipos de lentes para
            garantir o máximo de conforto, proteção e nitidez para sua visão.
          </p>

          <motion.div
            className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {lensFeatures.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md border border-gray-100 text-left"
                variants={itemVariants}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <div className="flex items-center gap-4">
                  {feature.icon}
                  <h3 className="font-semibold text-gray-800 text-lg">
                    {feature.title}
                  </h3>
                </div>
                <p className="mt-3 text-sm text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Destaque;