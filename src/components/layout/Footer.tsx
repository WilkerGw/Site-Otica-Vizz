"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Instagram, Facebook, MessageCircle } from 'lucide-react';

// Dados para os links de navegação e redes sociais
const navLinks = [
  { href: "#home", label: "Início" },
  { href: "#servicos", label: "Serviços" },
  { href: "#destaques", label: "Destaques" },
  { href: "#contato", label: "Contato" },
];

const socialLinks = [
  { name: 'Instagram', href: 'https://www.instagram.com/vizzotica/', icon: Instagram },
  { name: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61580033646888', icon: Facebook },
  { name: 'WhatsApp', href: 'https://wa.me/551123628799', icon: MessageCircle },
];


export function Footer() {
  return (
    <footer className="bg-white text-gray-500 pt-16">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr_1fr] gap-12 text-center md:text-left">
          
          <div className="flex flex-col items-center md:items-start">
            <Link href="#home" className="mb-4">
              <Image
                src="/images/logo-cinza.png"
                alt="Logo Óticas Vizz"
                width={128}
                height={128}
                className="w-32 h-auto"
              />
            </Link>
            <p className="text-sm leading-relaxed max-w-xs">
              Cuidando da sua visão com tecnologia, estilo e um preço justo.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-lg text-gray-500 mb-6 relative">
              Navegação
              <span className="absolute -bottom-2 left-1/2 md:left-0 -translate-x-1/2 md:translate-x-0 w-10 h-0.5 bg-yellow-400 rounded-full"></span>
            </h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-gray-400 hover:text-yellow-400 hover:pl-1 transition-all duration-300">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-lg text-gray-500 mb-6 relative">
              Contato
               <span className="absolute -bottom-2 left-1/2 md:left-0 -translate-x-1/2 md:translate-x-0 w-10 h-0.5 bg-yellow-400 rounded-full"></span>
            </h4>
            <div className="space-y-2 text-sm">
              <p>Av. Do Oratório, 4869</p>
              <p>Vila Industrial, São Paulo - SP</p>
              <p>(11) 2362-8799</p>
            </div>
            <div className="flex gap-6 mt-6">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="text-gray-400 hover:text-yellow-400 hover:-translate-y-1 transition-all duration-300"
                >
                  <social.icon size={28} />
                </a>
              ))}
            </div>
          </div>

        </div>

        <div className="mt-12 border-t border-gray-200 py-6 flex flex-col md:flex-row justify-between items-center text-center gap-4 text-sm">
          <p>&copy; {new Date().getFullYear()} Ótica Vizz. Todos os direitos reservados.</p>
          <a href="https://portfolio-wilker-frontend.vercel.app/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-300">
            Desenvolvido por Wilker Martins
          </a>
        </div>
      </div>
    </footer>
  );
}