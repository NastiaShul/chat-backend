
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Modal ,ModalContent} from '../Modal'
import {deleteUser}from "../../../store/userSlice"
import {
    HDeleteUser,
    ButtonDeleteUser,
    ButtonBackDeleteUser,
    BlockButton
}from "./deleteUserComponent"
import { useDispatch } from "react-redux";
export const DeleteUser = ({active,setActive}) => {
    const token =localStorage.getItem('token');
    const id = JSON.parse(atob(token.split(".")[1])).userId;

    const navigate=useNavigate()
  const  dispatch=useDispatch()
  const handleDelete = (id) => {
    dispatch(deleteUser(id))
      .then((data) => {
        console.log(data);
        navigate('/login');

      })
      .catch((error) => {
        console.log(error);

      });
  }
  
  return (
    <Modal className={active ? "active" : ""}>
        <ModalContent>
<HDeleteUser>
Are you sure you want to delete your profile? This is 
an irreversible action. Note that all of your rooms will 
also be deleted.
</HDeleteUser>
<BlockButton>
    <ButtonBackDeleteUser
    onClick={()=>{

        setActive(false)
    }}
    >Back</ButtonBackDeleteUser>
    <ButtonDeleteUser
    onClick={()=>{
        handleDelete(id)
        // dispatch(deleteUser(id))
        // navigate('/login')
    }}
    >Delete</ButtonDeleteUser>
</BlockButton>
        </ModalContent>
        
</Modal>
  )
}
