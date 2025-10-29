"use client";

import React, { useState, useMemo } from "react";
import ProdutoCard from "./ProdutoCard";
import { Product } from "../../types";
import { ImageModal } from "../ui/ImageModal";
import { motion, AnimatePresence } from "framer-motion";

// Dados de exemplo atualizados com preço e URL
const mockProdutos: Product[] = [
  {
    id: 5,
    name: "Armação de Grau Vizz Metal Fio de Nylon Esportiva Azul Marinho",
    images: [
      "/images/destaques/dest-cinco/01.Webp",
      "/images/destaques/dest-cinco/02.Webp",
      "/images/destaques/dest-cinco/03.Webp",
      "/images/destaques/dest-cinco/04.Webp",
      "/images/destaques/dest-cinco/05.Webp",
    ],
    price: "R$ 249,99",
    storeUrl:
      "https://oticasvizz.lojavirtualnuvem.com.br/produtos/armacao-vizz-fio-de-nylon-esportiva-azul-marinho/",
    category: "grau",
  },
  {
    id: 1,
    name: "Óculos de Grau Vizz Hexagonal Arredondado Cristal",
    images: [
      "/images/destaques/dest-um/01.Webp",
      "/images/destaques/dest-um/02.Webp",
      "/images/destaques/dest-um/03.Webp",
      "/images/destaques/dest-um/04.Webp",
      "/images/destaques/dest-um/05.Webp",
    ],
    price: "R$ 159,99",
    storeUrl:
      "https://oticasvizz.lojavirtualnuvem.com.br/produtos/armacao-geometrica-vizz-cinza-translucido/",
    category: "grau",
  },
  {
    id: 2,
    name: "Armação de Grau Vizz Redonda Retrô com Efeito Degradê",
    images: [
      "/images/destaques/dest-dois/01.Webp",
      "/images/destaques/dest-dois/02.Webp",
      "/images/destaques/dest-dois/03.Webp",
      "/images/destaques/dest-dois/04.Webp",
      "/images/destaques/dest-dois/05.Webp",
    ],
    price: "R$ 149,99",
    storeUrl:
      "https://oticasvizz.lojavirtualnuvem.com.br/produtos/armacao-vizz-redonda-retro-efeito-degrade/",
    category: "grau",
  },
  {
    id: 3,
    name: "Armação de Grau Vizz Metal Meio Aro Esportiva",
    images: [
      "/images/destaques/dest-tres/01.Webp",
      "/images/destaques/dest-tres/02.Webp",
      "/images/destaques/dest-tres/03.Webp",
    ],
    price: "R$ 279,90",
    storeUrl: "https://oticasvizz.lojavirtualnuvem.com.br/",
    category: "grau",
  },
  {
    id: 4,
    name: "Armação de Grau Vizz Metal Meio Aro Esportiva",
    images: [
      "/images/destaques/dest-quatro/01.Webp",
      "/images/destaques/dest-quatro/02.Webp",
      "/images/destaques/dest-quatro/03.Webp",
    ],
    price: "R$ 399,90",
    storeUrl: "https://oticasvizz.lojavirtualnuvem.com.br/",
    category: "grau",
  },
  {
    id: 6,
    name: "Armação de Grau Vizz Gatinho Fio de Nylon Preto e Rosé",
    images: [
      "/images/destaques/dest-seis/01.Webp",
      "/images/destaques/dest-seis/02.Webp",
      "/images/destaques/dest-seis/03.Webp",
      "/images/destaques/dest-seis/04.Webp",
      "/images/destaques/dest-seis/05.Webp",
    ],
    price: "R$ 179,99",
    storeUrl: "https://oticasvizz.lojavirtualnuvem.com.br/",
    category: "grau",
  },
  {
    id: 7,
    name: "Armação de Grau Vizz Redonda Retrô com Efeito Degradê Rosa Cristal",
    images: [
      "/images/destaques/dest-sete/01.Webp",
      "/images/destaques/dest-sete/02.Webp",
      "/images/destaques/dest-sete/03.Webp",
      "/images/destaques/dest-sete/04.Webp",
    ],
    price: "R$ 159,99",
    storeUrl:
      "https://oticasvizz.lojavirtualnuvem.com.br/produtos/armacao-vizz-redonda-retro-degrade-rosa-cristal/",
    category: "grau",
  },
  {
    id: 8,
    name: "Óculos de Grau Vizz Browline Retrô Misto Grafite Mesclado",
    images: [
      "/images/destaques/dest-oito/01.Webp",
      "/images/destaques/dest-oito/02.Webp",
      "/images/destaques/dest-oito/03.Webp",
      "/images/destaques/dest-oito/04.Webp",
    ],
    price: "R$ 159,99",
    storeUrl:
      "https://oticasvizz.lojavirtualnuvem.com.br/produtos/armacao-estilo-clubmaster-vizz-tartaruga-cinza/",
    category: "grau",
  },
];

const PRODUTOS_INICIAIS = 4;
type CategoryFilter = "todos" | "grau" | "solar";

const ProdutosSection: React.FC = () => {
  const [mostrarTodos, setMostrarTodos] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>("todos");

  // Filtra os produtos com base na categoria ativa
  const filteredProdutos = useMemo(() => {
    if (activeFilter === "todos") {
      return mockProdutos;
    }
    return mockProdutos.filter((p) => p.category === activeFilter);
  }, [activeFilter]);

  const produtosParaExibir = mostrarTodos
    ? filteredProdutos
    : filteredProdutos.slice(0, PRODUTOS_INICIAIS);

  const handleImageClick = (produto: Product, index: number) => {
    setSelectedProduct(produto);
    setSelectedImageIndex(index);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  const handlePrevImage = () => {
    if (selectedProduct) {
      setSelectedImageIndex((prevIndex) =>
        prevIndex === 0 ? selectedProduct.images.length - 1 : prevIndex - 1
      );
    }
  };

  const handleNextImage = () => {
    if (selectedProduct) {
      setSelectedImageIndex((prevIndex) =>
        prevIndex === selectedProduct.images.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  return (
    <>
      <section id="destaques" className="w-full bg-white py-20">
        <div className="container mx-auto px-4">
          {/* Cabeçalho da Seção */}
          <div className="text-center mb-12">
            <h2 className="text-sm font-bold text-yellow-500 uppercase tracking-widest">
              Nossa Coleção
            </h2>
            <h1 className="mt-2 text-3xl md:text-4xl font-semibold text-gray-800 tracking-tight">
              Lançamentos e Destaques
            </h1>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              Explore nossas armações mais recentes e encontre o estilo perfeito
              para você.
            </p>
          </div>

          {/* Filtros de Categoria */}
          <div className="flex justify-center items-center gap-4 mb-10">
            <button
              onClick={() => setActiveFilter("todos")}
              className={`px-6 py-2 rounded-full font-semibold transition-colors duration-300 ${activeFilter === "todos" ? "bg-gray-800 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
            >
              Todos
            </button>
            <button
              onClick={() => setActiveFilter("grau")}
              className={`px-6 py-2 rounded-full font-semibold transition-colors duration-300 ${activeFilter === "grau" ? "bg-gray-800 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
            >
              Óculos de Grau
            </button>
            <button
              onClick={() => setActiveFilter("solar")}
              className={`px-6 py-2 rounded-full font-semibold transition-colors duration-300 ${activeFilter === "solar" ? "bg-gray-800 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
            >
              Óculos de Sol
            </button>
          </div>

          {/* Grade de Produtos com Animação */}
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            <AnimatePresence>
              {produtosParaExibir.map((produto) => (
                <motion.div
                  key={produto.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <ProdutoCard
                    produto={produto}
                    onImageClick={handleImageClick}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Botão "Ver mais" */}
          {!mostrarTodos && filteredProdutos.length > PRODUTOS_INICIAIS && (
            <div className="mt-12 text-center">
              <button
                onClick={() => setMostrarTodos(true)}
                className="bg-gray-800 text-white font-semibold py-3 px-8 rounded-lg hover:bg-gray-700 transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
              >
                Ver mais destaques
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Modal de Imagem (sem alterações) */}
      {selectedProduct && (
        <ImageModal
          images={selectedProduct.images}
          selectedImageIndex={selectedImageIndex}
          onClose={handleCloseModal}
          onPrev={handlePrevImage}
          onNext={handleNextImage}
        />
      )}
    </>
  );
};

export default ProdutosSection;
