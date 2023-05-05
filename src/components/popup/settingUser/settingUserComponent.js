import styled from "styled-components";



export const HCreateRoom = styled.h2`
  color: #171B18;
  font-size: 20px;
  font-weight: 600;
  margin: 8px;
  margin-left: auto;
`;
export const PCreateRoom = styled.p`
  color: #171B18;
  font-size: 16px;
  font-weight: 600;
`;

export const InputCreateRoom = styled.input`
  width: 80%;
  font-size: 24px;
  font-weight: 600;
  margin-left: 16px;
  padding-left: 16px;
`;

export const SubmitUpdateUser = styled.input`
  border: 1px solid #171B18;
  color: #171B18;
  text-align: center;
  background-color: #F3EFE9;
  margin: 24px;
  height: 40px;
  width: 80%;
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

export const BackButton = styled.button`
  border: 1px solid #171B18;
  color: #171B18;
  text-align: center;
  background-color: #F3EFE9;
  margin: 24px;
  height: 40px;
  width: 40%;
  cursor: pointer;
  border-radius: 8px;
  font-size: 20px;
  margin-top: 4vh;
  &&:hover {
   transform: scale(1.05);
 }
 &&:active {
   background-color: #D86800;
 }
`;

export const DeleteUserButton = styled.button`
  border: 1px solid #171B18;
  color: #171B18;
  text-align: center;
  background-color: #F3EFE9;
  margin: 24px;
  height: 40px;
  width: 40%;
  cursor: pointer;
  border-radius: 8px;
  font-size: 20px;
  margin-top: 4vh;
  &&:hover {
   transform: scale(1.05);
 }
  &&:active {
    background-color: #D86800 ;
  }
`

export const BlockButton = styled.div`
  display:flex;
`
;

export const FormUpdateUser = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const BlockPassword = styled.div`
width:90%;

`
export const StyledEmail = styled.p`
  font-size: 24px;
  width: 90%;
  color: #888888;
  font-weight: 600;
`

export const ErrBlock=styled.div`
color: #BF002E;
width:36%;
margin-left: auto;
margin-right: auto;
font-size: 16px;

`
