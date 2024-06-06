import Card from "@/components/Card";
import CarouselComponent from "@/components/CarouselComponent";
import cardData from "@/store/cardData.json";
import { Inter } from "next/font/google";
import { useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  // console.log(cardData);
  let categories = new Set();

  const foodData = [];

  const handleData = () => {
    cardData.map((data) => {
      return foodData.push(data), categories.add(data.category);
    });
    // console.log("foodData:", foodData);
    // console.log("categories:", categories);
  };

  // useEffect(() => {
  handleData();
  // }, []);

  const categoryArray = [...categories];

  return (
    <>
      <CarouselComponent />
      <div className="container mx-auto">
        {categoryArray.map((category) => {
          return (
            <>
              <div
                key={category}
                className="mt-10 mb-3 text-4xl font-bold uppercase"
              >
                {category}
              </div>

              <hr />

              <div className="flex flex-col items-center justify-center">
                <div className="grid grid-cols-1 mx-auto md:grid-cols-2 lg:grid-cols-3">
                  {foodData
                    .filter((fooData) => category === fooData.category)
                    .map((data) => {
                      return <Card key={data.name} foodData={data} />;
                    })}
                </div>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
}
