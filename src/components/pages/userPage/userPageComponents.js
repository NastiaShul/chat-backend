import styled from "styled-components";

export const Body = styled.div`
   background-color: #F3EFE9;
   width: 100%;
   height: 100%;
   display: flex;
   align-items: center;
   justify-content: center;
`;


export const Header = styled.div`
   align-items: center;
   display: flex;
   background-color: #C2BFBA;
   border-bottom: 1px solid #171B18;
   width: 100%;
   color: #171B18;
   margin-left: auto;
   margin-right: auto;
   border-top-left-radius: 24px;
   border-top-right-radius: 24px;
   @media (max-width: 768px) {
      height: 60px;
   }
   `;

export const ChatBody = styled.div`
   width: 100%;
   display: flex;
   padding-top: 4vh;
   @media (max-width: 768px) {
      flex-direction:column;
      align-items: center;
      justify-content: center;
   }
`;
export const ToolsBlock = styled.div`
box-sizing: border-box;
   width: 40%;
   background-color: #F3EFE9;
   border: 1px solid #171B18;
   border-radius: 24px;
   display: flex;
   flex-direction: column;
   align-items: center;
   text-align: center;
   justify-content: center;
   padding-bottom: 32px;
   margin: 16px;
   margin-top: -1%;
   @media (max-width: 768px) {
      width: 100%;
      background-color: #F3EFE9;
   }
`;
export const ContentBlock = styled.div`
   width: 60%;
   padding: 2vh;
   @media (max-width: 768px) {
      width: 100%;
   }
`;
export const SearchUser = styled.input`
   width: 70%;
   font-size: 24px;
   font-weight: 600;
   padding-left: 16px;
   border-radius: 24px;
   margin-top: 24px;
`;
export const ButtonCreateRoom = styled.button`
   border: 1px solid #171B18;
   color: #171B18;
   text-align: center;
   background-color: #F3EFE9;
   margin-bottom: 4vh;
   height: 40px;
   width: 80%;
   cursor: pointer;
   border-radius: 8px;
   font-size: 24px;
   margin-top: 16px;
   margin-bottom: 16px;
   &&:hover {
      transform: scale(1.05);
   }
   &&:active {
      background-color: #D86800;
   }
`;

export const ButtonSettingUser = styled.button`
@media (min-width: 768px) {
   position: absolute;
   width: 15%;
   right: 16%;
}
   height: 40px;
   border: 1px solid #171B18;
   border-radius: 8px;
   color: #171B18;
   text-align: center;
   background-color: transparent;
   cursor: pointer;
   border-radius: 8px;
   font-size: 24px;
   padding: 8px;
   display: flex;
   justify-content: space-between;
   align-items: center;
   &&:hover {
      transform: scale(1.05);
   }
   &&:active {
      background-color: #D86800;
   }
`;

export const Block = styled.div`
   width: 80%;
   border: 1px solid #171B18;
   color: #171B18;
   margin-left: auto;
   margin-right: auto;
   border-radius: 24px;
   margin-top:0;
`;
export const BlockButtonSetting = styled.div`
   width: 40%;
   border: 1px solid #171B18;
   color: #171B18;
   margin-left: auto;
   margin-right: auto;
   border-radius: 24px;
   margin-top: 32px;
   display: flex;
   justify-content: center;
   align-items: center;
`;
export const NameBlock = styled.h4`
   color: #171B18;
`