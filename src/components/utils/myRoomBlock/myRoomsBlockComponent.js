import styled from "styled-components";
export const BlockMyRooms = styled.div`

  width: 88%;
  border: 1px solid #171B18;
  border-radius:16px;
  overflow: scroll;
  height: 120px;
  background-color: #F3EFE9;
  color: #171B18;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  align-items: left;
  padding-left: 16px;
  justify-content: top;
  flex-direction: column;
  &&:last-child{
    margin-top: 16px;
}
  }

  &::-webkit-scrollbar {
    width: 0px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #F3EFE9;
    border-radius: 5px;
  }

  &::-webkit-scrollbar-track {
    background-color: #F3EFE9;
  }
`;
export const Room = styled.div`
  width: 80%;
  margin-top: 16px;
  display: flex;
  cursor: pointer;
`;
export const RoomName = styled.div`
  border: 1px solid #171B18;
  color: #171B18;
  border-radius: 8px;
  display: flex;
  align-items: center;
  width: 70%;
  padding: 4px;
  font-size: 16px;
  border-radius: 8px;
  &&:hover {
   transform: scale(1.05);
 }
`;
export const RoomSating = styled.button`
margin-left: 8px;
background-color: #F3EFE9;
border: 1px solid #171B18;
border-radius: 8px;
cursor: pointer;
&&:hover {
   transform: scale(1.05);
 }
 &&:active {
   background-color: #D86800;
 }
`;
