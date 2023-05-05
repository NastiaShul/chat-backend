import { useNavigate } from "react-router-dom";
import React from "react";
import { useDispatch } from "react-redux";
import { setAuth } from "../store/userSlice";
import styled from "styled-components";

const StyledButton = styled.button`
   position: absolute;
   right: 11%;
   border: none;
   background-color: transparent;

   &:hover {
      transform: scale(1.05);
   }
`;

export const LogOutIcon = ({ width }) => {
   const navigate = useNavigate();
   const dispatch = useDispatch();

   return (
      <StyledButton
         onClick={
            () => {
               localStorage.clear()
               dispatch(setAuth(false))
               navigate("/login");
            }
         }
      >
         <svg
            version="1.0"
            xmlns="http://www.w3.org/2000/svg"
            width={`${width}`}
            height={`${width * 1.5}`}
            viewBox="0 0 48.000000 48.000000"
         >
            <g
               transform="translate(0.000000,48.000000) scale(0.100000,-0.100000)"
               fill="#171B18"
               stroke="none"
            >
               <path d="M90 240 l0 -211 148 3 147 3 3 48 c2 37 0 47 -12 47 -12 0 -16 -10
-16 -35 l0 -35 -120 0 -120 0 0 180 0 180 119 0 120 0 3 -37 c4 -54 23 -42 23
15 l0 47 -147 3 -148 3 0 -211z" />
               <path d="M360 303 c0 -3 7 -15 17 -25 15 -17 13 -18 -55 -18 -73 0 -102 -6
-102 -21 0 -5 38 -9 85 -9 84 0 99 -6 70 -30 -8 -7 -15 -16 -15 -21 0 -19 28
-7 60 26 l34 35 -34 35 c-31 32 -60 46 -60 28z" />
            </g>
         </svg>
      </StyledButton>
   );
};