import styled from "styled-components";

export const HDeleteRoom = styled.h2`
  color: #171B18;
  font-size: 16px;
  font-weight: 600;
  margin: 8px;
  margin-left: auto;
`;
export const ButtonBackDeleteRoom = styled.button`
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
export const ButtonDeleteRoom = styled.button`
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
export const BlockButton = styled.div`
  display:flex;
`;