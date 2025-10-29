"use client";

import { useState, useEffect } from "react"; // Adicionado useEffect
import Link from "next/link";
import Image from "next/image";
import {
  Instagram,
  Facebook,
  MessageCircle,
  Calendar,
  ClipboardList,
  Filter,
} from "lucide-react";
import { motion } from "framer-motion";
import PromotionalCarousel from "./PromotionalCarousel";
import Filtro from "./Filtro";

// 1. Array com os caminhos das imagens
const carouselImages = ["/images/1.Webp", "/images/2.Webp", "/images/3.Webp"];
const SLIDE_DURATION = 5000; // 5 segundos

export function HeroSection() {
  const [searchQuery, setSearchQuery] = useState("");
  // 2. Estado para o índice da imagem
  const [currentSlide, setCurrentSlide] = useState(0);

  // 3. Autoplay do Carousel
  useEffect(() => {
    // Configura um intervalo para mudar o slide
    const slideInterval = setInterval(() => {
      // Calcula o próximo slide. Se for o último, volta para o primeiro (0).
      setCurrentSlide((prev) =>
        prev === carouselImages.length - 1 ? 0 : prev + 1
      );
    }, SLIDE_DURATION);

    // Limpa o intervalo quando o componente for desmontado (boa prática!)
    return () => clearInterval(slideInterval);
  }, []); // O array de dependências vazio garante que o efeito rode apenas uma vez

  const socialLinks = [
    {
      name: "Instagram",
      href: "https://www.instagram.com/vizzotica/",
      icon: Instagram,
    },
    {
      name: "Facebook",
      href: "https://www.facebook.com/profile.php?id=61580033646888",
      icon: Facebook,
    },
    {
      name: "WhatsApp",
      href: "https://wa.me/551123628799",
      icon: MessageCircle,
    },
  ];

  // ... (Variantes do framer-motion e handleSearch - Sem alteração) ...
  const socialListVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.5,
      },
    },
  };

  const socialItemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    alert(`Buscando por: ${searchQuery}`);
  };

  return (
    <section className="relative flex flex-col lg:flex-row items-center justify-center min-h-screen px-4 pt-16 text-gray-100 overflow-hidden max-w-[1600px] mx-auto">
      {/* NOVO: CAROUSEL DE IMAGENS */}
      <Filtro/>
      <div className="absolute inset-0 z-0 h-full w-full overflow-hidden">
        {/* Container que se move horizontalmente */}
        <div
          className="flex h-full transition-transform duration-1000 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }} // 4. Estilização: Move o container interno
        >
          {carouselImages.map((src, index) => (
            <div key={index} className="flex-shrink-0 w-full h-full relative">
              <Image
                src={src}
                alt={`Banner ${index + 1} Óticas Vizz`}
                fill
                priority={index === 0} // Apenas a primeira imagem é priority
                quality={100}
                className="object-cover object-center w-full h-full"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Conteúdo principal (Logo, Social, CTAs) - Manter z-20 para ficar acima do carousel */}
      <div className="absolute top-5 left-1/2 -translate-x-1/2 z-20 lg:top-1/2 lg:left-0 lg:-translate-y-1/2 lg:translate-x-0 flex flex-col items-center justify-center text-center w-full lg:w-[auto] lg:pl-4 pt-12 lg:pt-0">
        {/* Animação de fade-in para o logo */}
        <div className="flex flex-col items-center justify-center gap-1">
          <motion.div
            className="pb-2"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <Image
              src="/images/logo-nova.png"
              alt="Logo Óticas Vizz"
              width={500}
              height={500}
              className="w-[10rem]"
            />
          </motion.div>
          {/* Ícones sociais */}
          <div className="flex flex-col items-center gap-3 w-full rounded-l">
            <motion.div
              className="flex justify-center gap-8 p-2 "
              variants={socialListVariants}
              initial="hidden"
              animate="visible"
            >
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="text-white transition-all duration-300 ease-in-out hover:text-gray-600 hover:scale-110"
                  variants={socialItemVariants}
                >
                  <social.icon size={22} />
                </motion.a>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Call-to-Actions */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 mt-4">
          {/* CTA Principal: Orçamento */}
          <a
            href="https://wa.me/551123628799"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 w-full max-w-sm md:w-auto justify-center px-6 py-3 rounded-xl border-2 border-gray-500/20 text-white font-semibold shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:bg-black hover:border-gray-30 backdrop-blur-[5px]"
          >
            <div className="absolute top-0 -left-full h-full w-3/4 skew-x-[-25deg] transition-all duration-700 group-hover:left-full"></div>
            <ClipboardList size={24} className="text-yellow-400" />
            <div className="flex flex-col items-start text-left">
              <span className="text-base leading-tight">
                Solicite seu orçamento
              </span>
              <small className="text-xs font-normal opacity-90">
                Rápido, pelo WhatsApp
              </small>
            </div>
          </a>

          {/* CTA Secundário: Agendamento */}
          <Link
            href="https://oticasvizz.lojavirtualnuvem.com.br/"
            target="_blank"
            className="flex items-center gap-4 w-full max-w-sm md:w-auto justify-center px-6 py-3 rounded-xl border-2 border-gray-500/20 text-gray-500 font-semibold shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:bg-black hover:border-gray-30 backdrop-blur-[5px]"
          >
            <Calendar size={24} className="text-yellow-400" />
            <div className="flex flex-col items-start text-left text-white">
              <span className="leading-tight">Visite nossa Loja Virtual</span>
              <small className="text-xs font-normal opacity-90">
                Compre sem sair de casa.
              </small>
            </div>
          </Link>
        </div>
      </div>
      <div className="absolute bottom-0 lg:bottom-1/4 lg:-translate-y-1/4 rounded-lg  lg:right-4 w-[90%] lg:w-[30rem] h-[19rem] mb-6 lg:mb-0 z-10">
        <p><PromotionalCarousel/></p>
      </div>
    </section>
  );
}
