import React, { useEffect, useState } from "react";
import { LoginBg, Logo } from "../assets";
import { LoginInput } from "../components";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { motion } from "framer-motion";
import { buttonClick } from "../animations";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUserDetails } from "../context/actions/userActions";

import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { app } from "../config/firebase.config";
import { validateUserJWTToken } from "../api";

const Login = () => {
  const [userEmail, setUserEmail] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirm_password] = useState("");

  //getting authentication info from our app
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

  //if logged in then if u try to acces login page then as soon as change in user is detected the user is navigated to home route
  useEffect(() => {
    if(user){
      navigate("/",{replace:true})
    }
  },[user])

  const loginWithGoogle = async () => {
    await signInWithPopup(firebaseAuth, provider).then((userCred) => {
      firebaseAuth.onAuthStateChanged((cred) => {
        if (cred) {
          cred.getIdToken().then((token) => {
            //create an api by using axios,then call our api endpoint to validate our token
            // console.log(token)
            validateUserJWTToken(token).then((data) => {
              // console.log(data);
              dispatch(setUserDetails(data));
            });
            navigate("/", { replace: true });
          });
        }
      });
    });
  };

  const signUpWithEmailPass = async () => {
    if (userEmail === "" || password === "" || confirm_password === "") {
      // console.log('They are empty')
      //alert message
    } else {
      if (password === confirm_password) {
        // we need to reset all the fields in our form after the token is validated
        setUserEmail("");
        setConfirm_password("");
        setPassword("");
        await createUserWithEmailAndPassword(
          firebaseAuth,
          userEmail,
          password
        ).then((userCred) => {
          firebaseAuth.onAuthStateChanged((cred) => {
            if (cred) {
              cred.getIdToken().then((token) => {
                validateUserJWTToken(token).then((data) => {
                  // console.log(data);
                  dispatch(setUserDetails(data));
                });
                navigate("/", { replace: true });
              });
            }
          });
        });
        // console.log('Equal')
      } else {
        // alert message
      }
    }
  };

  const signInWithEmailPass = async () => {
    if (userEmail !== "" && password !== "") {
      await signInWithEmailAndPassword(firebaseAuth, userEmail, password).then(
        (userCred) => {
          firebaseAuth.onAuthStateChanged((cred) => {
            if (cred) {
              cred.getIdToken().then((token) => {
                validateUserJWTToken(token).then((data) => {
                  // console.log(data);
                  dispatch(setUserDetails(data));
                });
                navigate("/", { replace: true });
              });
            }
          });
        }
      );
    } else {
      //alert message
    }
  };

  return (
    //flex direction is row direction
    <div className="w-screen h-screen relative overflow-hidden flex">
      {/* background image */}
      <img
        src={LoginBg}
        className="w-full h-full object-cover absolute top-0 left-0"
        alt=""
      />

      {/* content box */}
      <div className="flex flex-col items-center bg-LightOverlay w-[20%] md:w-307 h-full z-10 backdrop-blur-md p-4 px-4 py-10 gap-6">
        {/* Top Logo Section */}
        <div className="flex items-center justify-start gap-3 w-full">
          <img src={Logo} className="w-6" alt="" />
          <p className=" text-headingColor font-semibold text-xl">Noida</p>
        </div>

        {/* Welcome text */}
        <p className="text-xl font-semibold text-headingColor">Welcome Back</p>
        <p className="text-sm text-textColor -mt-6">
          {isSignup ? "Sign Up" : "Sign-in"} with following
        </p>

        {/* Input section */}
        <div className="w-full flex flex-col items-center justify-center gap-6 px-4 md:px-7 py-2">
          <LoginInput
            placeHolder={"Email Here"}
            icon={<FaEnvelope className="text-lg text-textColor" />}
            inputState={userEmail}
            inputStateFunc={setUserEmail}
            type="email"
            isSignup={isSignup}
          />

          <LoginInput
            placeHolder={"Password Here"}
            icon={<FaLock className="text-lg text-textColor" />}
            inputState={password}
            inputStateFunc={setPassword}
            type="password"
            isSignup={isSignup}
          />

          {isSignup && (
            <LoginInput
              placeHolder={"Confirm Password Here"}
              icon={<FaLock className="text-lg text-textColor" />}
              inputState={confirm_password}
              inputStateFunc={setConfirm_password}
              type="password"
              isSignup={isSignup}
            />
          )}

          {!isSignup ? (
            <p className="text-xs">
              Doesn't have an account:{" "}
              <motion.button
                {...buttonClick}
                className="text-red-400 underline cursor-pointer bg-transparent"
                onClick={() => setIsSignup(true)}
              >
                Create One
              </motion.button>
            </p>
          ) : (
            <p className="text-xs">
              Already have an account:{" "}
              <motion.button
                {...buttonClick}
                className="text-red-400 underline cursor-pointer bg-transparent"
                onClick={() => setIsSignup(false)}
              >
                Sign-in here
              </motion.button>
            </p>
          )}

          {/* button section */}
          {isSignup ? (
            <motion.button
              {...buttonClick}
              className="w-full px-2 py-1 rounded-md bg-red-400 cursor-pointer text-white text-base capitalize hover:bg-red-500 transition-all duration-150"
              onClick={signUpWithEmailPass}
            >
              Sign Up
            </motion.button>
          ) : (
            <motion.button
              {...buttonClick}
              className="w-full px-2 py-1 rounded-md bg-red-400 cursor-pointer text-white text-base capitalize hover:bg-red-500 transition-all duration-150"
              onClick={signInWithEmailPass}
            >
              Sign in
            </motion.button>
          )}
        </div>

        <div className="flex items-center justify-between gap-8">
          <div className="w-20 h-[1px] rounded-md bg-white"></div>
          <p className="text-white">or</p>
          <div className="w-20 h-[1px] rounded-md bg-white"></div>
        </div>

        <motion.div
          {...buttonClick}
          className="flex items-center justify-center px-8 py-1.5 bg-LightOverlay backdrop-blur-md cursor-pointer rounded-2xl gap-4"
          onClick={loginWithGoogle}
        >
          <FcGoogle className="text-2xl" />
          <p className="text-sm text-headingColor">Sign in with Google</p>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
