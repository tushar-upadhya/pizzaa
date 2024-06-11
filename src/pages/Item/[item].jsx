import { baseUrl } from "@/utils/baseUrl";
import Image from "next/image";
import Link from "next/link";

const ItemPage = ({ data }) => {
  console.log();
  return (
    <div className="min-h-screen px-10">
      <Link href={"/"}>
        <div className="container flex items-center justify-center max-w-md mx-auto my-6 cursor-pointer hover:scale-125 ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-12 h-12"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
      </Link>

      <div className="container flex flex-col items-center justify-center max-w-md p-6 mx-auto mb-16 space-y-4 border-gradient md:p-8">
        <div className="relative w-full rounded-lg h-96 lg:w-96">
          <Image
            src={data.img}
            className="rounded-lg"
            layout="fill"
            objectFit="cover"
            alt="item image"
          />
        </div>

        <div className="mb-2 text-base font-extrabold uppercase md:text-2xl ">
          {data.name}
        </div>
        <div className="max-w-sm text-base text-gray-700 md:text-lg dark:text-gray-400">
          {data.description}
        </div>
      </div>
    </div>
  );
};

export default ItemPage;

export async function getServerSideProps(context) {
  const { item } = context.query;
  // Fetch data from external API
  const res = await fetch(baseUrl + "api/getDataById", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ item: item }),
  });
  const data = await res.json();
  // Pass data to the page via props
  return { props: { data: data.data } };
}
