"use client";

import React from "react";
// CORREÇÃO: Importando o tipo 'Variants' do framer-motion
import { motion, Variants } from "framer-motion";
import { Eye, Wrench, UserCheck } from "lucide-react";

// Array com os dados dos serviços para facilitar a manutenção
const servicos = [
  {
    icon: <Eye className="w-10 h-10 text-yellow-500" />,
    title: "Exame de Vista Gratuito",
    description: "Cuidamos da sua saúde ocular com precisão, usando o que há de mais moderno em aparelhos optométricos.",
  },
  {
    icon: <Wrench className="w-10 h-10 text-yellow-500" />,
    title: "Óculos de Grau Personalizados",
    description: "Criamos óculos sob medida para você! Escolha a armação perfeita e conte com lentes adaptadas às suas necessidades.",
  },
  {
    icon: <UserCheck className="w-10 h-10 text-yellow-500" />,
    title: "Consultoria com Especialistas",
    description: "Nossa equipe de Optometristas está pronta para te ajudar a escolher o melhor óculos para seu estilo e conforto.",
  },
];

// CORREÇÃO: Aplicando o tipo 'Variants'
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.2 },
  },
};

// CORREÇÃO: Aplicando o tipo 'Variants'
const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 100 },
  },
};


export default function ServicosSection() {
  return (
    <section id="servicos" className="w-full bg-white py-20">
      <div className="container mx-auto px-4 text-center">
        {/* Cabeçalho da Seção */}
        <h2 className="text-sm font-bold text-yellow-500 uppercase tracking-widest">
          Nossos Diferenciais
        </h2>
        <h1 className="mt-2 text-3xl md:text-4xl font-semibold text-gray-800 tracking-tight">
          Serviços Completos para Sua Visão
        </h1>
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
          Oferecemos um atendimento completo e personalizado para garantir a melhor
          experiência e a solução ideal para a sua saúde ocular.
        </p>

        {/* Grid de Serviços */}
        <motion.div
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          {servicos.map((servico, index) => (
            <motion.div
              key={index}
              className="bg-gray-50 p-8 rounded-lg border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-2 transition-transform duration-300"
              variants={itemVariants}
            >
              <div className="flex justify-center items-center h-16 w-16 bg-yellow-400/10 rounded-full mx-auto">
                {servico.icon}
              </div>
              <h3 className="mt-6 text-xl font-semibold text-gray-800">
                {servico.title}
              </h3>
              <p className="mt-2 text-gray-600">
                {servico.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};