import styled from "styled-components";
export const Body = styled.div`
  background-color: #F3EFE9;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
`;
export const ForgotBody = styled.div`
  width: 30%;
  border: 1px solid #171B18;
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
  @media (max-width: 960px) {
    width: 50%;
  }
  @media (max-width: 768px) {
    width: 70%;
    
  }
  @media (max-width: 576px) {
    width: 90%;
  }
`;
export const TextBlock = styled.h2`
color: #171B18;

`
export const TextContentBlock = styled.p`
color: #171B18;
width:70%;

`
export const Form = styled.form`
display: flex;
align-items: center;
justify-content:start;
text-align: center;
flex-direction: column;
width: 90%;

`
export const ButtonForgot = styled.button`
border: 1px solid #171B18;
color: #171B18;
text-align: center;
background-color: #F3EFE9;
margin: 24px;
height: 40px;
width: 70%;
cursor: pointer;
border-radius: 8px;
font-size: 16px;
margin-top: 4vh;
&&:hover {
   transform: scale(1.05);
 }
&&:active {
  background-color: #D86800ж
}
`;
export const BackForgot = styled.button`
  border: 1px solid #171B18;
  color: #171B18;
  text-align: center;
  background-color: #F3EFE9;
  margin: 24px;
  height: 40px;
  width: 63%;
  cursor: pointer;
  border-radius: 8px;
  font-size: 24px;
  margin-top: 4vh;
  &&:hover {
   transform: scale(1.05);
 }
  &&:active {
    background-color: #D86800;
  }
`;