import React from "react";
import { NavLink } from "react-router-dom";
import { Logo } from "../assets";
import { isActiveStyles, isNotActiveStyles } from "../utils/styles";

const DBLeftSection = () => {
  return (
    <div className="h-full py-12 flex flex-col bg-LightOverlay backdrop-blur-md shadow-md min-w-210 w-300 gap-3">
      <NavLink to={"/"} className="flex items-center justify-start px-6 gap-4">
        <img src={Logo} className="h-20 w-20" />
        <p className="font-semibold text-2xl">YUM</p>
      </NavLink>

      <hr />

      <ul className="flex flex-col gap-4 pr-16 pl-4">
        <NavLink
          to={"/dashboard/home"}
          className={({ isActive }) =>
            isActive
              ? `${isActiveStyles} hover:text-stone-50 px-16 py-2 border-l-8 border-orange-400 bg-orange-400 rounded-md text-stone-50`
              : isNotActiveStyles
          }
        >
          Home
        </NavLink>
        <NavLink
          to={"/dashboard/users"}
          className={({ isActive }) =>
            isActive
              ? `${isActiveStyles} hover:text-stone-50 px-16 py-2 border-l-8 border-orange-400 bg-orange-400 rounded-md text-stone-50`
              : isNotActiveStyles
          }
        >
          Users
        </NavLink>
        <NavLink
          to={"/dashboard/orders"}
          className={({ isActive }) =>
            isActive
              ? `${isActiveStyles} hover:text-stone-50 px-14 py-2 border-l-8 border-orange-400 bg-orange-400 rounded-md text-stone-50`
              : isNotActiveStyles
          }
        >
          Orders
        </NavLink>
        <NavLink
          to={"/dashboard/items"}
          className={({ isActive }) =>
            isActive
              ? `${isActiveStyles} hover:text-stone-50 px-16 py-2 border-l-8 border-orange-400 bg-orange-400 rounded-md text-stone-50`
              : isNotActiveStyles
          }
        >
          Items
        </NavLink>
        <NavLink
          to={"/dashboard/newItem"}
          className={({ isActive }) =>
            isActive
              ? `${isActiveStyles}  hover:text-stone-50 px-10 py-2 border-l-8 border-orange-400 bg-orange-400 rounded-md text-stone-50`
              : isNotActiveStyles
          }
        >
          Add Item
        </NavLink>
      </ul>
      <div className="w-full items-center justify-center flex h-225 mt-auto px-2 ">
        <div className="w-full h-full rounded-md bg-orange-400 flex items-center justify-center flex-col gap-3 px-3">
          <div className="w-12 h-12 borde bg-white rounded-full flex items-center justify-center">
            <p className="text-2xl font-bold text-red-500">?</p>
          </div>
          <p className="text-xl text-primary font-semibold">Help Center</p>
          <p className="text-base text-gray-300 text-center">
            Having trouble in Yum. Please contact us for more questions
          </p>
          <p className="px-4 py-2 rounded-full bg-primary text-red-400 cursor-pointer">
            Get in touch
          </p>
        </div>
      </div>
    </div>
  );
};

export default DBLeftSection;
