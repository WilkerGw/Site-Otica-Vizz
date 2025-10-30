"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, Target, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type SubmenuLink = {
  label: string;
  href: string;
  target?: string; 
};

type SubmenuImage = {
  src: string;
  alt: string;
  href: string;
  target?: string; 
};

// ✅ NOVO TIPO: Definindo a estrutura completa para um item de menu
type MenuItem = {
  label: string;
  href: string;
  target?: string;
  isFeatured?: boolean; // Adicionado para corrigir o erro de build
  submenu?: {
    links: SubmenuLink[];
    images: SubmenuImage[];
  };
};

// ✅ APLICANDO O NOVO TIPO: Adicionei ": MenuItem[]"
const menuItems: MenuItem[] = [
  {
    label: "Armações",
    href: "https://oticasvizz.lojavirtualnuvem.com.br/armacoes/",
    target: "_blank",
    submenu: {
      links: [
        {
          label: "Quadrados",
          href: "https://oticasvizz.lojavirtualnuvem.com.br/armacoes/armacoes-quadradas/",
          target: "_blank",
        },
        {
          label: "Arredondados",
          href: "https://oticasvizz.lojavirtualnuvem.com.br/armacoes/armacoes-arredondadas/",
          target: "_blank",
        },
        {
          label: "Meio Aro",
          href: "https://oticasvizz.lojavirtualnuvem.com.br/armacoes/balgriff/",
          target: "_blank",
        },
        {
          label: "Balgriff (3 peças)",
          href: "https://oticasvizz.lojavirtualnuvem.com.br/armacoes/balgriff/",
          target: "_blank",
        },
      ] as SubmenuLink[],
      images: [
        {
          src: "/images/menu-imgs/grau.png",
          alt: "Óculos de Grau",
          href: "https://oticasvizz.lojavirtualnuvem.com.br/armacoes/",
          target: "_blank",
        },
      ] as SubmenuImage[],
    },
  },
  {
    label: "Óculos de Sol",
    href: "https://oticasvizz.lojavirtualnuvem.com.br/oculos-de-sol/",
    target: "_blank",
    submenu: {
      links: [
        {
          label: "Quadrados",
          href: "https://oticasvizz.lojavirtualnuvem.com.br/armacoes/armacoes-quadradas/",
          target: "_blank",
        },
        {
          label: "Arredondados",
          href: "https://oticasvizz.lojavirtualnuvem.com.br/armacoes/armacoes-arredondadas/",
          target: "_blank",
        },
        {
          label: "Meio Aro",
          href: "https://oticasvizz.lojavirtualnuvem.com.br/armacoes/balgriff/",
          target: "_blank",
        },
        {
          label: "Balgriff (3 peças)",
          href: "https://oticasvizz.lojavirtualnuvem.com.br/armacoes/balgriff/",
          target: "_blank",
        },
      ] as SubmenuLink[],
      images: [
        {
          src: "/images/menu-imgs/sol.png",
          alt: "Óculos de Grau",
          href: "https://oticasvizz.lojavirtualnuvem.com.br/armacoes/",
          target: "_blank",
        },
      ] as SubmenuImage[],
    },
  },
  {
    label: "Lentes",
    href: "#lentes",
    submenu: {
      links: [
        {
          label: "Multifocais",
          href: "#lentes",
          target: "_blank",
        },
        {
          label: "Visão Simples",
          href: "#lentes",
          target: "_blank",
        },
      ] as SubmenuLink[],
      images: [
        {
          src: "/images/menu-imgs/lente.png",
          alt: "Lentes de Contato",
          href: "/#",
        },
      ] as SubmenuImage[],
    },
  },
  {
    label: "Loja Virtual",
    href: "https://oticasvizz.lojavirtualnuvem.com.br/",
    target: "_blank",
  },
];

export function Header() {
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleMouseEnter = (label: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setActiveSubmenu(label);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveSubmenu(null);
    }, 200);
  };

  return (
    <header
      ref={menuRef}
      className="fixed top-0 left-0 z-50 w-full lg:bg-gray-950/70 lg:backdrop-blur-[1px] "
      onMouseLeave={handleMouseLeave}
    >
      <nav className="container mx-auto px-4 flex justify-between items-center h-16">
        <Link href="/" className="hidden md:block">
          <Image
            src="/images/logo-nova.png"
            alt="Logo Óticas Vizz"
            width={500}
            height={500}
            className="w-[3.5rem] h-auto"
          />
        </Link>

        <div className="hidden md:flex items-center gap-8 ">
          {menuItems.map((item) => (
            <div
              key={item.label}
              className="relative h-16 flex items-center "
              onMouseEnter={() => item.submenu && handleMouseEnter(item.label)}
            >
              <Link
                href={item.href}
                target={item.target}
                rel={item.target ? "noopener noreferrer" : undefined}
                className={`
                  text-sm font-light text-gray-100 transition-all duration-300
                  hover:text-yellow-500
                  ${activeSubmenu === item.label ? "text-yellow-500 font-semibold" : ""}
                  ${item.isFeatured ? "font-bold text-yellow-500" : ""}
                `}
              >
                {item.label}
              </Link>
            </div>
          ))}
        </div>

        <div className="md:hidden flex items-center bg-gray-950/70 backdrop-blur-[1px] p-2 rounded-lg">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Menu">
            {isMenuOpen ? (
              <X size={28} className="text-gray-100" />
            ) : (
              <Menu size={28} className="text-gray-100" />
            )}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {activeSubmenu && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 w-full bg-gray-950/70 backdrop-blur-[1px] shadow-lg border-t border-gray-100"
            onMouseEnter={() => handleMouseEnter(activeSubmenu)}
            onMouseLeave={handleMouseLeave}
          >
            <div className="container mx-auto px-8 py-6 flex justify-center items-center">
              <div className="flex items-center gap-16">
                <div>
                  <ul className="space-y-4">
                    {menuItems
                      .find((item) => item.label === activeSubmenu)
                      ?.submenu?.links.map((link) => (
                        <li key={link.label}>
                          <Link
                            href={link.href}
                            className="relative group text-gray-500 hover:text-yellow-500 transition-colors duration-200 text-lg whitespace-nowrap"
                            target={link.target}
                            rel={
                              link.target ? "noopener noreferrer" : undefined
                            }
                          >
                            <span>{link.label}</span>
                            <span className="absolute bottom-0 left-0 w-full h-[1px] bg-yellow-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-center"></span>
                          </Link>
                        </li>
                      ))}
                  </ul>
                </div>

                <div>
                  {menuItems
                    .find((item) => item.label === activeSubmenu)
                    ?.submenu?.images.map((image) => (
                      <Link
                        href={image.href}
                        key={image.alt}
                        className="block group w-64"
                      >
                        <div className="overflow-hidden rounded-lg">
                          <Image
                            src={image.src}
                            alt={image.alt}
                            width={300}
                            height={300}
                            className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      </Link>
                    ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-4 w-[50%] bg-gray-950/80 backdrop-blur-[1px] shadow-lg flex flex-col items-start justify-start p-4 gap-4 rounded-lg">
          {menuItems.map(({ href, label, target, isFeatured }) => (
            <Link
              key={label}
              href={href}
              target={target}
              rel={target ? "noopener noreferrer" : undefined}
              onClick={() => setIsMenuOpen(false)}
              className={`
                text-lg text-white transition-colors duration-300
                hover:text-yellow-500 text-center
                ${isFeatured ? "font-bold text-yellow-500" : ""}
              `}
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}