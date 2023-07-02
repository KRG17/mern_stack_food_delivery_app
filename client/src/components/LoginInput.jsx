import React, { useState } from "react";
import { motion } from "framer-motion";
import { fadeInOut } from "../animations";

const LoginInput = ({
  placeHolder,
  icon,
  inputState,
  inputStateFunc,
  type,
  isSignup,
}) => {
  const [isFocus, setisFocus] = useState(false);
  return (
    <motion.div
      {...fadeInOut}
      className={`flex items-center justify-center gap-3 bg-LightOverlay backdrop-blur-md rounded-md  w-full px-3.5 py-1.5 
    ${isFocus ? "shadow-md shadow-red-400" : "shadow-none"} `}
    >
      {icon}
      <input
        type={type}
        placeholder={placeHolder}
        className=" w-full h-full bg-transparent text-headingColor text-xs font-semibold border-none outline-none"
        value={inputState}
        onChange={(e) => inputStateFunc(e.target.value)}
        onFocus={() => setisFocus(true)}
        onBlur={() => setisFocus(false)}
      />
    </motion.div>
  );
};

export default LoginInput;
