import Image from "next/image";
import { Inter } from "next/font/google";
import CarouselComponent from "@/components/CarouselComponent";
import Card from "@/components/Card";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <CarouselComponent />
      <Card />
    </>
  );
}
