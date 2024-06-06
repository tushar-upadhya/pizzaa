import Image from "next/image";
import { useState } from "react";

const Card = ({ foodData }) => {
  const priceOptions = Object.keys(foodData.price);

  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState(priceOptions[0]);

  const handleQuality = (e) => {
    setQuantity(e.target.value);
  };
  const handleSize = (e) => {
    setSize(e.target.value);
  };

  let finalPrice = quantity * parseInt(foodData.price[size]); //foodData.price[size]

  return (
    <div className="box">
      <div className="bg-white rounded-lg w-80 border-gradient dark:bg-black ">
        <div className="relative w-full h-80">
          <Image
            src={foodData.img}
            layout="fill"
            objectFit="cover"
            alt="image"
          />
        </div>
        <div className="p-4">
          <div className="mb-2 text-xl font-bold uppercase">
            {foodData.name}
          </div>
          <p className="text-base text-gray-700 short_description dark:text-gray-400">
            {foodData.description}
          </p>
        </div>
      </div>

      <div className="flex justify-between px-4">
        <select
          onChange={handleQuality}
          className="p-1 font-semibold text-black border border-black rounded cursor-pointer h-100 hover:font-bold dark:text-gray-300 dark:border-gray-400"
        >
          {Array.from(Array(6), (e, i) => {
            return (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            );
          })}
        </select>

        <select
          onChange={handleSize}
          className="p-1 font-semibold text-black border border-black rounded cursor-pointer h-100 hover:font-bold dark:text-gray-300 dark:border-gray-400"
        >
          {priceOptions.map((options) => {
            return (
              <option className="uppercase" key={options} value={options}>
                {options}
              </option>
            );
          })}
        </select>
      </div>
      <div className="flex justify-between p-4 font-bold">
        <button
          // onClick={handleAddToCart}
          className="p-2 border border-gray-900 rounded dark:border-gray-400 hover:bg-gradient-to-r from-indigo-700 via-violet-700 to-orange-700 hover:text-gray-100 "
        >
          Add to cart
        </button>
        <p className="p-2 text-xl">₹ {finalPrice}/-</p>
      </div>
    </div>
  );
};

export default Card;
