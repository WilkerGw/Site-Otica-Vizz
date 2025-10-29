import type { Metadata } from 'next'
// Importe a fonte Poppins
import { Poppins } from 'next/font/google' 
import './globals.css'
import { Header } from '../components/layout/Header'
import { Footer } from '../components/layout/Footer'

// Configure a fonte Poppins com os pesos desejados
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '600', '700'], // Pesos para parágrafos e títulos
})

export const metadata: Metadata = {
  title: 'Óticas Vizz - Sua Visão em Primeiro Lugar',
  description: 'Encontre as melhores armações, óculos de sol e lentes de grau. Agende seu exame de vista conosco.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className="h-full">
      {/* Aplique a classe da fonte Poppins ao body */}
      <body className={`${poppins.className} bg-white flex flex-col min-h-full`}>
        <div className="flex flex-col flex-grow">
          <Header />
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}