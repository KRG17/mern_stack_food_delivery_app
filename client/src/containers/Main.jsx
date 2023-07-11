import React, { useEffect } from "react";
import { Cart, FilterSection, Header, Home, HomeSlider } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../api";
import { setAllProducts } from "../context/actions/productActions";

const Main = () => {
  const products = useSelector((state) => state.products);
  const isCart = useSelector((state) => state.isCart);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!products) {
      getAllProducts().then((data) => {
        dispatch(setAllProducts(data));
      });
    }
  }, []);

  return (
      <main className="w-screen min-h-screen flex items-center justify-start flex-col bg-primary">
        <Header />
        <div className=" w-full flex flex-col items-start justify-center mt-40 px-6 md:px-24 2xl:px-96 gap-12 pb-24">
          <Home />
          <HomeSlider />
          <FilterSection />
        </div>

        {isCart && <Cart />}

        <footer className="bg-white rounded-lg shadow m-4 dark:bg-orange-500" >
        <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between gap-20">
          <span className="text-sm text-white sm:text-center dark:text-white">
            © 2023{" "}
            <span>
            YUM™
            </span>
            . All Rights Reserved.
          </span>
          <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-white dark:text-white sm:mt-0 gap-4">
            <li>
              <a href="#" className="mr-4 hover:underline md:mr-6 ">
                About
              </a>
            </li>
            <li>
              <a href="#" className="mr-4 hover:underline md:mr-6">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="mr-4 hover:underline md:mr-6">
                Licensing
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Contact
              </a>
            </li>
          </ul>
        </div>
      </footer>
      </main>
  );
};

export default Main;
