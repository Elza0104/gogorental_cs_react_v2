import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import MobileMainPage from "./pages/MobileMainPage";
import MobileCtrDetailPage from "./pages/MobileCtrDetailPage"
import PasswordChaegePage from './pages/PasswordChaegePage';
import MobileBikeReturnPage from './pages/MobileBikeReturnPage';

function App() {
  function setScreenSize(){
    let vh = window.innerHeight*0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }
  useEffect(() => {
    setScreenSize();
  })

  return (
      <Routes>
        <Route path='main' element={<MainPage/>}></Route>
        <Route path='/' element={<LoginPage/>}></Route>
        <Route path='mobile' element={<MobileMainPage/>}></Route>
        <Route path='mobile/ctrdetail' element={<MobileCtrDetailPage/>}></Route>
        <Route path='pwchange' element={<PasswordChaegePage/>}></Route>
        <Route path='mobile/ctrdetail/return' element={<MobileBikeReturnPage/>}></Route>
      </Routes>
  )
}

export default App;
