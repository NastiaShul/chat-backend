import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FormField } from "../../elementInput/FormField";
import {
  HCreateRoom,
  DeleteUserButton,
  BlockButton,
  BackButton,
  SubmitUpdateUser,
  FormUpdateUser,
  StyledEmail,
 ErrBlock
} from "./settingUserComponent";
import { Modal, ModalContent } from "../Modal";
import { pathUser ,getUser} from "../../../store/userSlice";

export const SettingUser = ({
  id,
  active,
  setActive,
  user,
  setDeleteActive,
  setUsName
}) => {

console.log(user);
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [err ,setErr]=useState('')
  const handleSubmit = ({ id, username, email, password }) => {
    if (password === confirmPassword) {
      setErr('')
      dispatch(pathUser({ id, username, email, password }))
      .then(()=>{

        dispatch(getUser(id))
        .then(()=>{
          setUsName(username)
          setActive(false)
        });
      })

    }else{
      setErr('Password and confirm password do not match')
      return
    }
  };

  useEffect(
    () => {
      if (user) {
        setUsername(user.username);
        setEmail(user.email);

      }

    },
    [user, setActive]
  );

  return (
    <Modal className={active ? "active" : ""}>
      <ModalContent>
        <HCreateRoom>Edit a user profile</HCreateRoom>

        <FormUpdateUser
          onSubmit={event => {
            event.preventDefault();
            handleSubmit({ id, username, email, password });


          }}
        >
          <StyledEmail>
            {email}
          </StyledEmail>
          <FormField
            type="text"
            label="User name"
            regExp={/^[a-zA-Z]+$/gm}
            errorText="User name no valid"
            value={username}
            cbFunc={e => setUsername(e.target.value)}
          />
          <FormField
            type="password"
            label="New password"
            regExp={
              /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]/gm
            }
            errorText="password no valid"
            value={password}
            cbFunc={e => setPassword(e.target.value)}
          />
          <FormField
            type="password"
            label="Confirm password"
            regExp={
              /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]/gm
            }
            errorText="password no valid"
            value={confirmPassword}
            cbFunc={e => setConfirmPassword(e.target.value)}
          />
          <ErrBlock> {err}</ErrBlock>

          <SubmitUpdateUser type={"submit"} value={"Save"} />
        </FormUpdateUser>
        <BlockButton>
          <DeleteUserButton
            onClick={() => {
              setDeleteActive(true);
            }}
          >
            Delete user
          </DeleteUserButton>
          <BackButton
            onClick={() => {
              setActive(false);
            }}
          >
            Back
          </BackButton>
        </BlockButton>
      </ModalContent>
    </Modal>
  );
};
