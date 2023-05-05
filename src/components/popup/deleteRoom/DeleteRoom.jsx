import React from 'react'
import { Modal,ModalContent } from '../Modal'
import { useDispatch } from 'react-redux'
import {deleteRoom,fetchRooms} from "../../../store/roomsSlice"


import {
  HDeleteRoom,
  ButtonBackDeleteRoom,
  ButtonDeleteRoom,
  BlockButton
} from "./deleteRoom"

export const DeleteRoom = ({active,id,setActive,setSettingActive}) => {
  const dispatch =useDispatch()

  return (
    <Modal className={active ? "active" : ""} >
        <ModalContent>
<HDeleteRoom>Are you sure you want to delete this room? 
  This is an irreversible action.</HDeleteRoom>
  <BlockButton>
    <ButtonBackDeleteRoom
    onClick={()=>{
      setActive(false)
    }}
    >Back</ButtonBackDeleteRoom>
    <ButtonDeleteRoom
    onClick={()=>{
      dispatch(deleteRoom({id}))
      dispatch(fetchRooms());
      setActive(false)
      setSettingActive(false)

    }}
    >Delete</ButtonDeleteRoom>
  </BlockButton>
        </ModalContent>
    </Modal>

  )
}
