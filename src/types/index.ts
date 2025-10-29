// src/types/index.ts

// Atualize o tipo Product para incluir preço e URL
export type Product = {
  id: number;
  name: string;
  images: string[];
  price: string;
  storeUrl: string; // URL para a loja virtual
  category: 'grau' | 'solar';
};