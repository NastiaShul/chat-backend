import styled from "styled-components";
import { PasswordInput } from "@skbkontur/react-ui";
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
export const PInputUserLogin = styled.p`
  color: #171B18;
  font-size: 16px;
  font-weight: 600;
  margin: 8px;
  margin-left: -45%;
`;
export const InputUserLogin = styled.input`
  width: 50%;
  font-size: 24px;
  font-weight: 600;
  padding-left: 16px;
`;
export const LabelUserLogin = styled.label`
  display: flex;
  align-items: center;
  justify-content:center;
  text-align: center;
  flex-direction: column;
`;

export const ButtonUserLogin = styled.button`
border: 1px solid #171B18;
color: #171B18;
text-align: center;
background-color: #F3EFE9;
margin: 24px;
height: 40px;
width: 70%;
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
export const ErrBlock = styled.div`
color: #BF002E;
width: 36%;
margin-left: auto;
margin-right: auto;
font-size: 16px;

`
export const PInputUserRegister = styled.p`
color: #171B18;
font-size: 16px;
font-weight: 600;
margin: 8px;
text-align: left;
`;
export const HInputUserRegister = styled.p`
color: #171B18;
font-size: 36px;
font-weight: 600;
margin: 8px;
`;
export const Form = styled.form`
display: flex;
align-items: center;
justify-content:start;
text-align: center;
flex-direction: column;
width: 90%;

`
export const BlockPassword = styled.div`
margin-left:auto;
margin-right:auto;

`

export const Password = ({ name, value, cbFunc }) => {
   return (
      <BlockPassword>
         <PasswordInput
            name={name}
            value={value}
            onChange={cbFunc}
         />
      </BlockPassword>
   )
}