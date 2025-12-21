import Image from "next/image";
import { HeroBanner } from "@/components/HomeComponents/Banner";
import { AboutSection } from "@/components/HomeComponents/Aboutus";
import { AllProducts } from "@/components/HomeComponents/AllProducts";
import { Features } from "@/components/HomeComponents/Features";

export default function Home() {
  return (
    <>
      <HeroBanner />
      <AboutSection />
      <AllProducts />
      <HeroBanner />
      <Features />
    </>
  );
}


