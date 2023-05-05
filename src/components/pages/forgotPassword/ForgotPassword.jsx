import React from 'react'
import { FormField } from '../../elementInput/FormField'
import {newPasswordUser}from "../../../store/userSlice"
import { useDispatch } from 'react-redux'
import{
    Body,
    ForgotBody,
    TextBlock,
    TextContentBlock,
    Form,
    ButtonForgot,
    BackForgot
} from "./forgotPasswordComponents"
import { Logo } from '../../../icon/Logo'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const ForgotPassword = (props) => {
  // const [reset,setReset]=useState(false)
  const dispatch =useDispatch()
   const navigate=useNavigate()
    const[email,setEmail]=useState()
  return (
    <Body>
        <ForgotBody>
        <Logo width={350} />
        <TextBlock>
        Reset password
        </TextBlock>
        <TextContentBlock>
        Enter the email associated with your 
        account and we`ll send an email with your password
        </TextContentBlock>
        <Form
        onSubmit={(event)=>{
          event.preventDefault()
          dispatch(newPasswordUser(email)).then(res=>{
            const error = res?.error
            if(!error){
              props.setRest(true)
              navigate('/forgot-true')
            }
            console.log(res)})
        }}
        >
        <FormField
            type="text"
            label="Email"
            regExp={/^[a-zA-Z0-9!#$%&'*+/=?^_`{|}~.-]+@[a-z0-9-]+\.[a-z0-9-.]+$/gm}
           
            errorText="Email name no valid"

            value={email}
            cbFunc={e => setEmail(e.target.value)}
          />
          <ButtonForgot>Send password reset email</ButtonForgot>
        </Form>
 <BackForgot
 onClick={()=>navigate('/login')}
 >Back</BackForgot>
        </ForgotBody>
    </Body>
  )
}
