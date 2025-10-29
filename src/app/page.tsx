import { ContactSection } from "../components/home/ContactSection";
import { CustomerReviewsSection } from "../components/home/CustomerReviewsSection";
import Destaque from "../components/home/Destaque";
import { FeaturesSection } from "../components/home/ExameSection";
import { HeroSection } from "../components/home/HeroSection";
import { LensTypesSection } from "../components/home/LensTypesSection";
import LentesFotossensiveisSection from "../components/home/LentesFotossensiveisSection";
import ProdutosSection from "../components/home/ProdutosSection";
import ServicosSection from "../components/home/ServicosSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <Destaque />
      <ServicosSection />
      <ProdutosSection />
      <LensTypesSection />
      <LentesFotossensiveisSection
        imagemAntes="/images/fotossensi.png"
        imagemDepois="/images/fotossensi2.png"
      />
      <CustomerReviewsSection />
      <ContactSection />
    </>
  );
}
