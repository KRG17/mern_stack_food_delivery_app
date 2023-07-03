import { getAuth } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Login, Main } from './containers'
import { app } from './config/firebase.config';
import { validateUserJWTToken } from './api';
import { useDispatch, useSelector } from 'react-redux';
import { setUserDetails } from './context/actions/userActions';
import { fadeInOut } from './animations';
import { motion } from "framer-motion";
import { Alert, MainLoader } from './components';

const App = () => {
  const firebaseAuth = getAuth(app);
  const [isLoading, setIsLoading] = useState(false)
  const alert = useSelector(state => state.alert)

  const dispatch = useDispatch()

  //spinner or laoding animation while its taking tym to check for authentication
  
  useEffect(() => {
    setIsLoading(true);
    firebaseAuth.onAuthStateChanged((cred) => {
      if (cred) {
        cred.getIdToken().then((token) => {
          validateUserJWTToken(token).then((data) => {
            // console.log(data);
            dispatch(setUserDetails(data))
          });
        });
      }
      setInterval(() => {
        setIsLoading(false)
      }, 3000);
    });
  }, [])

  return (
    // <div className='text-blue-500 font-semibold'>App</div>
    // w-screen(width screen):100% viewport screen, min-h-screen:maintain min 100% screen size, h-auto:it can go up to max height acc. to our content 
    <div className='w-screen min-h-screen h-auto flex flex-col items-center justify-center'>
      {/* we enable the isloading state here, we need to keep it at the top of the layer,inset-0 -> should be pinned to every single corner*/}
      {isLoading && (
        <motion.div {...fadeInOut} className="fixed z-50 inset-0 bg-LightOverlay backdrop-blur-md flex items-center justify-center w-full">
          <MainLoader />
        </motion.div>
      )}
      <Routes>
        <Route path="/*" element={<Main />} />
        <Route path="/Login" element={<Login />} />
      </Routes>
      
      {alert?.type && <Alert type={alert?.type} message={alert?.message}/> }
    </div>
  )
}

export default App