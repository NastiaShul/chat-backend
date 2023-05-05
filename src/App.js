import "./App.css";
import { LoginPage } from "./components/pages/loginPage/LoginPage";
import { RegisterPage } from "./components/pages/registerPage/RegisterPage";
import { Routes, Route} from "react-router-dom";
import { FirstPage } from "./components/pages/firstPage/FirstPage";
import { UserPage } from "./components/pages/userPage/UserPage";
import {ForgotPassword} from "./components/pages/forgotPassword/ForgotPassword";
import { ForgotPasswordTrue } from "./components/pages/forgotPassword/ForgotPasswordTrue";
// import { useSelector } from "react-redux";
import { useState } from "react";
// import { useEffect } from "react";

// import { PrivateRouter } from "./components/utils/PrivateRouter";

function App() {
  const [rest,setRest]=useState(false)
//   const navigate = useNavigate()
//   const isAppLoaded= useSelector(state => state.app.isAppLoaded)
//   useEffect(()=>{
// if(isAppLoaded){
//  navigate('/user')
// }
//   },[isAppLoaded])
  return (
    <>
      <Routes>
        <Route path="/" element={<FirstPage />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="/login" element={<LoginPage  rest={rest} />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot" element={<ForgotPassword setRest={setRest}/>} />
        <Route path="/forgot-true" element={<ForgotPasswordTrue setRest={setRest}/>} />
      </Routes>
    </>
  );
}

export default App;
