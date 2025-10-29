import Image from "next/image";
import { AppointmentForm } from "../../components/agendamento/AppointmentForm";
import { Clock, Gift, Award } from "lucide-react";

export default function AgendamentoPage() {
  return (
    <div className="flex flex-col md:flex-row min-h-screen py-16 md:py-2 bg-gray-50">
      {/* Coluna da Esquerda: Informações e Imagem */}
      <div className="w-full md:w-1/2 bg-gray-100 p-8 md:p-12 flex flex-col justify-center items-center md:items-start text-center md:text-left">
        <div className="max-w-md">
          <h1 className="text-3xl md:text-3xl font-bold text-gray-600 leading-tight md:py-8">
            Agende seu Exame de Vista Gratuito
          </h1>
          <p className="mt-4 text-gray-500">
            Aproveite nossa data especial para cuidar da sua saúde ocular! O
            exame é rápido, completo e realizado por profissionais
            qualificados.
          </p>

          <div className="mt-8 space-y-4 text-gray-500">
            <div className="flex items-center gap-4">
              <Clock className="w-8 h-8 text-yellow-500 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-600">Próxima Data Disponível</h3>
                <p className="text-sm">
                  Sábado, 06 de Setembro de 2025 - Das 11:00 às 16:00.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Gift className="w-8 h-8 text-yellow-500 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-600">Ganhe um Brinde Exclusivo</h3>
                <p className="text-sm">
                  Todos que realizarem o agendamento ganham um brinde
                  especial.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Award className="w-8 h-8 text-yellow-500 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-600">Armação de Brinde</h3>
                <p className="text-sm">
                  Clientes agendados que adquirirem as lentes levam a armação
                  de brinde.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Coluna da Direita: Formulário */}
      <div className="w-full md:w-1/2 p-8 md:p-12 flex items-center justify-center bg-gray-100">
        <AppointmentForm />
      </div>
    </div>
  );
}