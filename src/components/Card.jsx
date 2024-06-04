import Image from "next/image";

const Card = () => {
  return (
    <div className="box">
      <div className="bg-white rounded-lg w-80 border-gradient dark:bg-black ">
        <div className="relative w-full h-80">
          <Image src={""} layout="fill" objectFit="cover" alt="image" />
        </div>
        <div className="p-4">
          <div className="mb-2 text-xl font-bold uppercase">Pizza Name</div>
          <p className="text-base text-gray-700 short_description dark:text-gray-400">
            Description
          </p>
        </div>
      </div>
      <div className="flex justify-between px-4">
        <select className="p-1 font-semibold text-black border border-black rounded cursor-pointer h-100 hover:font-bold dark:text-gray-300 dark:border-gray-400">
          {Array.from(Array(6), (e, i) => {
            return (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            );
          })}
        </select>
        <select className="p-1 font-semibold text-black border border-black rounded cursor-pointer h-100 hover:font-bold dark:text-gray-300 dark:border-gray-400">
          {Array.from(Array(6), (e, i) => {})}
        </select>
      </div>
    </div>
  );
};

export default Card;
