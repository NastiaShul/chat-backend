import React from "react";
import { FormField } from "../../elementInput/FormField";
import {
   HCreateRoom,
   SubmitCreateRoom,
   BackCreateRoom,
   FormCreateRoom,
   ErrBlock
} from "./createRoomComponent";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createRoom } from "../../../store/roomsSlice";
import { Modal, ModalContent } from "../Modal";


export const CreateRoom = ({ active, setActive }) => {
   const [topic, setTopic] = useState("");
   const [body, setBody] = useState("");
   const [value, setValue] = useState()
   const dispatch = useDispatch();


   return (
      <Modal className={active ? "active" : ""}>
         <ModalContent>
            <HCreateRoom>Create a new room</HCreateRoom>

            <FormCreateRoom
               onSubmit={event => {
                  event.preventDefault();
                  if (!topic) {
                     setValue("Some fields are not filled");
                     return
                  } else {
                     dispatch(createRoom({ topic, body, setActive }));
                     setTopic("");
                     setBody("");
                  }
               }}
            >
               <FormField
                  type={"text"}
                  value={topic}
                  label="Room name"
                  cbFunc={event => setTopic(event.target.value)}
               />
               <FormField
                  type={"textarea"}
                  value={body}
                  label="Description (optional)"
                  cbFunc={event => setBody(event.target.value)}
               />
               <ErrBlock>{value}</ErrBlock>
               <SubmitCreateRoom type={"submit"} value={"Create"} />
            </FormCreateRoom>
            <BackCreateRoom
               onClick={() => {
                  setActive(false);
               }}
            >
               Back
            </BackCreateRoom>
         </ModalContent>
      </Modal>
   );
};
