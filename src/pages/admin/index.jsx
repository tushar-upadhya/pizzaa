import { useEffect, useState } from "react";
import Custom404 from "../404";

const sidesPriceOption = { single: "", double: "" };
const pizzaPriceOption = { regular: "", medium: "", large: "" };

const AdminPage = () => {
  const [mounted, setMounted] = useState(false);
  const [foodData, setFoodData] = useState({
    name: "",
    foodCategory: "",
    foodType: "",
    price: "",
    description: "",
    img: "",
  });

  const handleChange = (e) => {
    setFoodData((prevData) => {
      return { ...prevData, [e.target.name]: e.target.value };
    });
    if (e.target.name === "foodCategory") {
      if (e.target.value === "Pizza") {
        setFoodData((prevData) => {
          return { ...prevData, price: pizzaPriceOption };
        });
      } else if (e.target.value === "SIDES & BEVERAGES") {
        setFoodData((prevData) => {
          return { ...prevData, price: sidesPriceOption };
        });
      } else {
        setFoodData((prevData) => {
          return { ...prevData, price: e.target.value };
        });
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("api/createFoodData", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(foodData),
    });
    const result = await response.json();
    if (result.success) {
      alert("Food data created successfully");
    } else {
      alert("Failed to create");
    }
  };

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("isAdmin")) === true) {
      setMounted(true);
    }
  }, []);

  return (
    <>
      {mounted ? (
        <div
          style={{
            minHeight: "90vh",
            overflowY: "scroll",
            backgroundImage:
              'url("https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")',
            backgroundSize: "cover",
          }}
          className="flex items-center content-center justify-center py-10 "
        >
          <div className="container w-full max-w-md ">
            <form
              onSubmit={handleSubmit}
              className="px-8 pt-6 pb-8 mb-4 bg-gray-100 rounded-lg shadow-2xl dark:bg-gray-900 dark:text-gray-100 border-gradient"
            >
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-bold text-gray-700 dark:text-gray-300"
                >
                  Food Name
                </label>
                <input
                  placeholder="Food name"
                  name="name"
                  onChange={handleChange}
                  type="text"
                  required
                  className="w-full px-3 py-2 leading-tight text-gray-700 border border-gray-300 rounded shadow appearance-none focus:border-indigo-700 dark:text-gray-100 focus:outline-none focus:shadow-outline"
                  value={foodData.name}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="foodCategory"
                  className="block mb-2 text-sm font-bold text-gray-700 dark:text-gray-300"
                >
                  Food Category
                </label>
                <select
                  placeholder="Food Category"
                  name="foodCategory"
                  onChange={handleChange}
                  type="foodCategory"
                  required
                  style={{ "-webkit-appearance": "auto" }}
                  className="w-full px-3 py-2 leading-tight text-gray-700 border border-gray-300 rounded shadow appearance-none focus:border-indigo-700 dark:text-gray-100 focus:outline-none focus:shadow-outline"
                  value={foodData.foodCategory}
                >
                  <option value="">Select Food Category</option>
                  <option value="Pizza">PIZZA</option>
                  <option value="SIDES & BEVERAGES">SIDES & BEVERAGES</option>
                </select>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="foodType"
                  className="block mb-2 text-sm font-bold text-gray-700 dark:text-gray-300"
                >
                  Food Type
                </label>
                <select
                  onChange={handleChange}
                  name="foodType"
                  required
                  style={{ "-webkit-appearance": "auto" }}
                  className="w-full px-3 py-2 leading-tight text-gray-700 border border-gray-300 rounded shadow appearance-none focus:border-indigo-700 dark:text-gray-100 focus:outline-none focus:shadow-outline"
                  value={foodData.foodType}
                >
                  <option value="">Select food type</option>
                  <option value="Veg">Veg</option>
                  <option value="Non-Veg">Non-Veg</option>
                </select>
              </div>

              {foodData.foodCategory !== "" && (
                <div className="mb-4">
                  <label
                    htmlFor="geolocation"
                    className="block mb-2 text-sm font-bold text-gray-700 dark:text-gray-300"
                  >
                    Food Price
                  </label>
                  {foodData.price !== "" &&
                    Object.keys(foodData.price).map((key) => {
                      return (
                        <div key={key} className="mb-4 ml-4">
                          <label
                            className="block mb-2 text-sm font-bold text-gray-700 dark:text-gray-300"
                            htmlFor={key}
                          >
                            {key}
                          </label>
                          <input
                            key={key}
                            type="number"
                            name={key}
                            placeholder={`Price of ${key}`}
                            value={foodData?.price[key]}
                            onChange={(e) => {
                              setFoodData({
                                ...foodData,
                                price: {
                                  ...foodData.price,
                                  [key]: e.target.value,
                                },
                              });
                            }}
                            className="w-full px-3 py-2 leading-tight text-gray-700 border border-gray-300 rounded shadow appearance-none focus:border-indigo-700 dark:text-gray-100 focus:outline-none focus:shadow-outline"
                          />
                        </div>
                      );
                    })}
                </div>
              )}
              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="block mb-2 text-sm font-bold text-gray-700 dark:text-gray-300"
                >
                  Description
                </label>
                <textarea
                  rows={4}
                  placeholder="description"
                  name="description"
                  onChange={handleChange}
                  type="text"
                  required
                  className="w-full px-3 py-2 leading-tight text-gray-700 border border-gray-300 rounded shadow appearance-none focus:border-indigo-700 dark:text-gray-100 focus:outline-none focus:shadow-outline"
                  value={foodData.description}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="img"
                  className="block mb-2 text-sm font-bold text-gray-700 dark:text-gray-300"
                >
                  Food Image
                </label>
                <input
                  placeholder="img"
                  name="img"
                  onChange={handleChange}
                  type="url"
                  required
                  className="w-full px-3 py-2 leading-tight text-gray-700 border border-gray-300 rounded shadow appearance-none focus:border-indigo-700 dark:text-gray-100 focus:outline-none focus:shadow-outline"
                  value={foodData.img}
                />
              </div>
              <div className="flex items-center justify-between"></div>
              <button
                type="submit"
                className="p-2 mr-2 font-bold text-gray-900 border border-gray-900 rounded dark:text-gray-100 dark:border-gray-400 hover:bg-gradient-to-r from-indigo-700 via-violet-700 to-orange-700 hover:text-gray-100"
              >
                Create
              </button>
            </form>
          </div>
        </div>
      ) : (
        <Custom404 />
      )}
    </>
  );
};

export default AdminPage;
