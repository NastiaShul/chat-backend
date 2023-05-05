import React from "react";

import { Logo } from "../../../icon/Logo";
import{BtnLink ,PLogin,Body,LoginBody}from "./firstPageComponent"
import { useNavigate } from "react-router-dom";

export const FirstPage = () => {
  const navigate =useNavigate()
  return (
    <Body>
      <LoginBody>
        <Logo width={350}/>
        <PLogin>Are you here for the first time or do you have an account?</PLogin>


  
           <BtnLink
           onClick={()=>{
            navigate('/Login')
           }}
           > Sing in</BtnLink>

      
     

        <BtnLink
          onClick={()=>{
            navigate('/register')
           }}
        > Create account </BtnLink>   



      </LoginBody>
    </Body>
  );
};


