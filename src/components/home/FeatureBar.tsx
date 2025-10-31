import React from 'react';
import { CreditCard, Percent, ShieldCheck } from 'lucide-react';

interface FeatureItemProps {
  icon: React.ElementType;
  text: string;
}

const featureItemsData: FeatureItemProps[] = [
  {
    icon: CreditCard,
    text: 'Parcelamento em até 10x sem juros',
  },
  {
    icon: Percent,
    text: '5% de desconto no PIX',
  },
  {
    icon: ShieldCheck,
    text: 'Armação com 1 ano de garantia',
  },
  {
    icon: ShieldCheck,
    text: 'Lentes com 3 meses de garantia',
  },
];

const FeatureBar: React.FC = () => {
  return (
    <nav className="w-full bg-black backdrop-blur-[1px] text-gray-200 p-4 z-10">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-around items-center gap-4">
        {featureItemsData.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <item.icon className="h-5 w-5 shrink-0" />
            <span className="text-sm font-medium">{item.text}</span>
          </div>
        ))}
      </div>
    </nav>
  );
};

export default FeatureBar;