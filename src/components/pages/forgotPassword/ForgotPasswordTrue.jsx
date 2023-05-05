import React from "react";

import {
  Body,
  ForgotBody,
  TextBlock,
  TextContentBlock,
  BackForgot,
} from "./forgotPasswordComponents";
import { Logo } from "../../../icon/Logo";

import { useNavigate } from "react-router-dom";

export const ForgotPasswordTrue = (props) => {
  const navigate = useNavigate();

  return (
    <Body>
      <ForgotBody>
        <Logo width={350} />
        <TextBlock>Check your email</TextBlock>
        <TextContentBlock>
          A new password has been sent to the specified email address
        </TextContentBlock>

        <BackForgot
          onClick={() => {
            props.setRest(false);
            navigate("/login");

          }}
        >
          Back to Log in
        </BackForgot>
      </ForgotBody>
    </Body>
  );
};
