import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { TrustBadges } from "@/components/home/TrustBadges";
import { NewArrivals } from "@/components/home/NewArrivals";
import { CollectionBanner } from "@/components/home/CollectionBanner";
import { BestSellers } from "@/components/home/BestSellers";
import { AboutBrand } from "@/components/home/AboutBrand";
import { Testimonials } from "@/components/home/Testimonials";
import { InstagramGallery } from "@/components/home/InstagramGallery";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <TrustBadges />
        <NewArrivals />
        <CollectionBanner />
        <BestSellers />
        <AboutBrand />
        <Testimonials />
        <InstagramGallery />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
