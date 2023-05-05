import styled from "styled-components";

export const BtnLink = styled.button`
  border: 1px solid #171B18;
  font-size: 20px;
  color: #171B18;
  text-align: center;
  background-color: #F3EFE9;
  margin: 24px;
  height: 32px;
  width: 80%;
  cursor: pointer;
  border-radius: 8px;
  &&:hover {
   transform: scale(1.05);
 }
`;
export const PLogin = styled.p`
  width: 80%;
  color: #171B18;
  font-size: 24px;
  font-weight: 600;
  margin: 24px;
  display: block;
  margin-left: auto;
  margin-right: auto;
`;
export const Body = styled.div`
  background-color: #F3EFE9;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
 
`;
export const LoginBody = styled.div`
  width: 30%;
  border: 1px solid white;
  color: #171B18;
  margin-left: auto;
  margin-right: auto;
  border-radius: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  @media (max-width: 1280px) {
    width: 40%;
  }
  @media (maxWidth: 960px) {
    width: 50%;
  }
  @media (max-maxWidth: 768px) {
    width: 70%;
    
  }
  @media (max-width: 576px) {
    width: 90%;
  }
`;