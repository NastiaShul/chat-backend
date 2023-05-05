import React, { useEffect } from "react";
import { FormField } from "../../elementInput/FormField";
import {
  DeleteRoom,
  SubmitCreateRoom,
  BackCreateRoom,
  Form,
  BlockButton,
} from "./settingUserRoomComponent";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editRooms, fetchRooms } from "../../../store/roomsSlice";
// import {getRoom} from "../../store/chatSlice"
import { Modal, ModalContent } from "../Modal";

export const SettingUserRoom = ({
  id,
  token,
  active,
  setActive,
  setDeleteRoomActive,
}) => {
  const dispatch = useDispatch();
  const room = useSelector(state => state.rooms.roomCore);

  const [topic, setTopic] = useState("");
  const [body, setBody] = useState("");

  useEffect(
    () => {
      if (room) {
        // console.log(room);
        setTopic(room.name);
        setBody(room.description);
      }
    },
    [room]
  );
  const handleSubmit = async () => {
    await dispatch(editRooms({ id, topic, body }));
    await dispatch(fetchRooms());
    setActive(false);
  };

  return (
    <Modal className={active ? "active" : ""}>
      <ModalContent>
        <Form
          onSubmit={event => {
            event.preventDefault();
            handleSubmit();
          }}
        >
           <FormField
           required
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
            <SubmitCreateRoom type={"submit"} value={"Save"} />

        </Form>
        <BlockButton>
          <DeleteRoom
            onClick={() => {
              setDeleteRoomActive(true);
            }}
          >
            Delete a room
          </DeleteRoom>
          <BackCreateRoom
            onClick={() => {
              setActive(false);
            }}
          >
            Back
          </BackCreateRoom>
        </BlockButton>
      </ModalContent>
    </Modal>
  );
};
