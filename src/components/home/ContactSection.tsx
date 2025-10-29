"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Mail } from "lucide-react";

const contactDetails = [
  {
    icon: <MapPin className="w-6 h-6 text-yellow-500" />,
    title: "Nosso Endereço",
    info: "Av. Do Oratório, 4869 - Jd. Guairaca, São Paulo - SP",
  },
  {
    icon: <Phone className="w-6 h-6 text-yellow-500" />,
    title: "Telefone",
    info: "(11) 2362-8799",
  },
  {
    icon: <Mail className="w-6 h-6 text-yellow-500" />,
    title: "Email",
    info: "oticasvizz@gmail.com",
  },
];

export function ContactSection() {
  return (
    <section
      id="contato"
      className="w-full bg-white py-20 overflow-hidden"
    >
      <div className="container mx-auto px-4">
        {/* Cabeçalho da Seção */}
        <div className="text-center mb-12">
          <h2 className="text-sm font-bold text-yellow-500 uppercase tracking-widest">
            Entre em Contato
          </h2>
          <h1 className="mt-2 text-3xl md:text-4xl font-semibold text-gray-800 tracking-tight">
            Estamos Esperando por Você
          </h1>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Visite nossa loja para uma experiência de compra personalizada ou
            entre em contato conosco através de nossos canais de atendimento.
          </p>
        </div>

        {/* Grid Principal */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Coluna de Informações */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="space-y-8"
          >
            {contactDetails.map((detail, index) => (
              <div key={index} className="flex items-start gap-5">
                <div className="flex-shrink-0 w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  {detail.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {detail.title}
                  </h3>
                  <p className="text-gray-600">{detail.info}</p>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Coluna do Mapa */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="w-full h-96 rounded-lg overflow-hidden shadow-lg border border-gray-200"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3656.323594851211!2d-46.55184138487384!3d-23.59253406871095!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce5c5c0b1f7b09%3A0x6a005d5b1e9b1e9a!2sAv.%20do%20Orat%C3%B3rio%2C%204869%20-%20Jardim%20Guairaca%2C%20S%C3%A3o%20Paulo%20-%20SP%2C%2003221-300!5e0!3m2!1spt-BR!2sbr!4v1663363345862!5m2!1spt-BR!2sbr"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </motion.div>
        </div>
      </div>
    </section>
  );
}