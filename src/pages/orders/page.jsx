import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const OrdersPage = () => {
  const [ordersData, setOrdersData] = useState([]);
  const fetchData = async () => {
    await fetch("api/myOrdersData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: localStorage.getItem("userEmail") }),
    }).then(async (res) => {
      let response = await res.json();
      setOrdersData(response?.order_data?.order_data);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {ordersData.length > 0 ? (
        <div className="container mx-auto my-4">
          {ordersData?.map((orders) => {
            return (
              <>
                {orders.map((data) => {
                  return (
                    <>
                      {data.order_date ? (
                        <div className="mb-2 text-xl font-bold">
                          {" "}
                          {data.order_date} <hr />{" "}
                        </div>
                      ) : (
                        <div className="p-4 my-4 border-black rounded-lg w-96 border-gradient dark:border-white">
                          <div className="relative w-full rounded-lg h-72">
                            <Image
                              src={data.img}
                              layout="fill"
                              objectFit="cover"
                              className="rounded-lg"
                              alt="pizza"
                            />
                          </div>
                          <div className="text-xl font-bold">{data.name}</div>
                          <div className="flex items-center justify-between">
                            <div>{data.qty}</div>
                            <div>{data.size}</div>
                            <div className="font-semibold">{data.price}/-</div>
                          </div>
                        </div>
                      )}
                    </>
                  );
                })}
              </>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center w-screen h-screen">
          <h1 className="text-4xl font-bold"> No previous Orders 😅</h1>
          {/* <p className="mt-4 text-gray-600">No previous Orders 😅</p> */}
          <Link
            href="/"
            className="mt-8 text-xl text-violet-500 hover:font-bold"
          >
            Go back to the home
          </Link>
        </div>
      )}
    </>
  );
};

export default OrdersPage;
