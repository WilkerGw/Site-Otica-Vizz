// components/PromotionalCarousel.tsx

import React, { useState, useEffect, useCallback } from "react";

// 1. Definição do Tipo da Promoção
// Usamos TypeScript para garantir que os dados das promoções sigam este formato.
interface Promotion {
  id: number;
  imageUrl: string;
  titleText: string;
  aPartirDe: string;
  price: string;
}

// 2. Dados Fictícios das Promoções
// Você pode substituir estes caminhos de imagem por URIs reais (URLs ou caminhos em /public)
const PROMOTIONS: Promotion[] = [
  {
    id: 1,
    imageUrl: "/images/banner/1.Webp",
    titleText: "Óculos de grau Completo",
    aPartirDe: "a partir de",
    price: "R$ 149,99",
  },
  {
    id: 2,
    imageUrl: "/images/banner/2.Webp",
    titleText: "Lentes Multifocais",
    aPartirDe: "a partir de",
    price: "R$ 399,99",
  },
  {
    id: 3,
    imageUrl: "/images/banner/3.Webp",
    titleText: "Lentes com Filtro de Luz Azul",
    aPartirDe: "a partir de",
    price: "R$ 299,99",
  },
  {
    id: 4,
    imageUrl: "/images/banner/4.Webp",
    titleText: "Lentes Fotossensíveis",
    aPartirDe: "a partir de",
    price: "R$ 799,99",
  },
  {
    id: 5,
    imageUrl: "/images/banner/5.Webp",
    titleText: "Liquidação de Óculos de Sol",
    aPartirDe: "a partir de",
    price: "R$ 79,99",
  },
];

/**
 * @component PromotionalCarousel
 * @description Componente de carrossel automático de 5 imagens.
 * Desliza automaticamente da direita para a esquerda com transição suave (Tailwind CSS).
 */
const PromotionalCarousel: React.FC = () => {
  // Estado para rastrear o índice da imagem que está visível
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalPromotions = PROMOTIONS.length;

  // Lógica para ir para o próximo slide
  // É envolvida em useCallback para otimizar e usar no useEffect
  const goToNext = useCallback(() => {
    // Se for a última imagem, volta para a primeira (índice 0). Senão, avança 1.
    setCurrentIndex((prevIndex) =>
      prevIndex === totalPromotions - 1 ? 0 : prevIndex + 1
    );
  }, [totalPromotions]);

  // 3. Efeito para Deslizamento Automático
  // Este useEffect cria um timer que chama a função goToNext a cada 4 segundos.
  useEffect(() => {
    const slideInterval = setInterval(goToNext, 4000); // 4000ms = 4 segundos

    // A função de 'cleanup' é essencial para parar o intervalo quando o componente for desmontado
    // (para evitar vazamento de memória e bugs).
    return () => clearInterval(slideInterval);
  }, [goToNext]); // Dependência em goToNext garante que o efeito seja re-executado se a função mudar (neste caso, é estável)

  // O valor do 'transform: translateX' em %
  // Move o contêiner de imagens para a esquerda (negativo) pela porcentagem
  // ex: Se currentIndex é 1, move -100% (o 2º banner aparece)
  const transformValue = `translateX(-${currentIndex * 100}%)`;

  return (
    <div className="relative w-full h-[17rem] overflow-hidden rounded-lg z-9 lg:my-20">
      {/* Container Principal do Carrossel (Visor) */}
      <div className="flex">
        {/*
          4. O Contêiner das Imagens (Sliding Track)
          - flex: Organiza as imagens em linha.
          - w-full: Ocupa a largura total.
          - transition-transform: Aplica a transição na propriedade 'transform'.
          - duration-700: Transição suave de 700 milissegundos.
          - ease-in-out: Curva de velocidade padrão suave.
        */}
        <div
          className="flex w-full lg:h-full transition-transform duration-700 ease-in-out"
          style={{ transform: transformValue }}
        >
          {PROMOTIONS.map((promo) => (
            <div
              key={promo.id}
              // 5. Item do Carrossel (Image Slide)
              // - w-full: Cada item ocupa 100% da largura do contêiner PAI (o Sliding Track).
              //   Como o Sliding Track é movido, isso garante que apenas um banner é visível de cada vez.
              // - flex-shrink-0: Garante que o item não se comprima (muito importante).
              className="w-full flex-shrink-0 relative"
            >
              {/*
                6. Imagem (Next/Image seria melhor, mas para simplificar, usamos <img>)
                - object-cover: Garante que a imagem preencha o espaço sem distorção.
              */}
              <img
                src={promo.imageUrl}
                alt={promo.titleText}
                className="w-[12rem] h-auto lg:w-[15rem] mx-auto object-contain mt-4"
              />
              {/* Exemplo de overlay de texto (opcional) */}
              <div className="inset-0 flex items-center flex-col justify-center">
                <p className="text-white text-2xl font-bold p-4 text-center">
                  {promo.titleText}
                </p>
                <p>{promo.aPartirDe}</p>
                <p className="font-bold text-yellow-500 text-[2rem]">{promo.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 7. Navegação (Dot Indicators) - Opcional, mas útil para UX */}
      <div className="absolute bottom-1 py-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {PROMOTIONS.map((_, index) => (
          <button
            key={index}
            aria-label={`Ir para a imagem ${index + 1}`}
            onClick={() => setCurrentIndex(index)}
            className={`
              w-3 h-3 rounded-full transition-colors duration-300
              ${
                currentIndex === index
                  ? "bg-white shadow-md"
                  : "bg-gray-400 bg-opacity-70 hover:bg-white/80"
              }
            `}
          />
        ))}
      </div>
    </div>
  );
};

export default PromotionalCarousel;
