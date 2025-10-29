"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Award, Calendar, CheckCircle, Eye } from "lucide-react";

const benefits = [
  {
    icon: <Eye size={24} className="text-yellow-400" />,
    text: "Exame de vista completo e gratuito.",
  },
  {
    icon: <CheckCircle size={24} className="text-yellow-400" />,
    text: "Tecnologia de ponta para um diagnóstico preciso.",
  },
  {
    icon: <Award size={24} className="text-yellow-400" />,
    text: "Na compra das lentes, a armação é por nossa conta!",
  },
];

export function FeaturesSection() {
  return (
    <section id="exame" className="relative w-full bg-white overflow-hidden pt-8">
      <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Coluna de Texto */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className="text-center lg:text-left"
        >
          <h2 className="text-sm font-bold text-yellow-500 uppercase tracking-widest">
            Sua Visão em Foco
          </h2>
          <h1 className="mt-2 text-3xl md:text-4xl font-semibold text-gray-800 tracking-tight">
            Cuidado completo e gratuito para seus olhos.
          </h1>
          <p className="mt-4 text-gray-600 max-w-xl mx-auto lg:mx-0">
            Na Óticas Vizz, sua saúde ocular é nossa prioridade. Oferecemos um
            exame de vista completo, realizado por especialistas com
            equipamentos de última geração, sem custo algum.
          </p>

          <ul className="mt-8 space-y-4 flex flex-col items-start">
            {benefits.map((benefit, index) => (
              <li
                key={index}
                className="flex items-center gap-3 justify-center lg:justify-start"
              >
                {benefit.icon}
                <span className="text-gray-700 text-start">{benefit.text}</span>
              </li>
            ))}
          </ul>

          <div className="mt-10">
            <Link
              href="/agendamento"
              className="group relative inline-flex items-center gap-4 justify-center px-8 py-4 rounded-xl bg-gradient-to-r from-gray-800 to-gray-600 text-white font-semibold shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl overflow-hidden"
            >
              <div className="absolute top-0 -left-full h-full w-full skew-x-[-25deg] bg-white/20 transition-all duration-700 group-hover:left-full"></div>
              <Calendar size={24} />
              <span>Agende seu Exame Gratuito</span>
            </Link>
          </div>
        </motion.div>
        {/* Coluna da Imagem */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative flex justify-center items-center"
        >
          <div className="absolute w-full h-full bg-gray-100 rounded-full blur-3xl -z-10"></div>
          <Image
            src="/images/optometrista.png"
            alt="Optometrista profissional da Óticas Vizz"
            width={500}
            height={700}
            className="w-full max-w-sm lg:max-w-md object-contain"
          />
        </motion.div>
      </div>
    </section>
  );
}
