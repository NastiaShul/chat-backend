import { Eye } from "../../icon/Eye";
import { EyeOff } from "../../icon/EyeOff";
import {
   InputStyle,
   LabelStyle,
   NameBlockStyle,
   ErrorBlockStyle,
   ButtonPasswordStyle,
   BlockPasswordStyle,
   DescriptionRoom
} from "./elementInput";
import { useState } from "react";
export const FormField = props => {
   const [error, setError] = useState(null)
   const [text, setText] = useState('password')
   const [pwd, setPwd] = useState(<EyeOff width={40} />)

   if (props.type === "text") {
      return (
         <LabelStyle>
            <NameBlockStyle>
               {props.label}
            </NameBlockStyle>

            <InputStyle

               type={props.type}
               value={props.value}
               placeholder={props.placeholder}
               onChange={props.cbFunc}
               onBlur={event => {
                  event.preventDefault();
                  if (event.target.value.match(props.regExp) !== null || event.target.value === '') {
                     setError('')
                     event.target.style.border = "1px solid #171B18";
                  } else {
                     event.target.style.border = "2px solid #BF002E";
                     setError(props.errorText)
                  }
               }}
            />
            <ErrorBlockStyle>{error} </ErrorBlockStyle>
         </LabelStyle>

      );
   }
   if (props.type === "textarea") {
      return (
         <LabelStyle>
            <NameBlockStyle>
               {props.label}
            </NameBlockStyle>

            <DescriptionRoom

               type={props.type}
               placeholder={props.placeholder}
               value={props.value}
               onChange={props.cbFunc}
               onInput={event => {
                  event.preventDefault();
                  if (event.target.value.match(props.regExp) !== null || event.target.value === '') {
                     event.target.style.border = "1px solid #171B18";
                     setError('')
                  } else {
                     event.target.style.border = "2px solid #BF002E";
                     setError(props.errorText)
                  }
               }}
            />
            <ErrorBlockStyle>{error} </ErrorBlockStyle>
         </LabelStyle>

      );
   }
   if (props.type === "password") {
      return (
         <LabelStyle>
            <NameBlockStyle>
               {props.label}
            </NameBlockStyle>
            <BlockPasswordStyle>
               <InputStyle

                  type={text}
                  placeholder={props.placeholder}
                  onChange={props.cbFunc}
                  onBlur={event => {
                     event.preventDefault();
                     if (event.target.value.match(props.regExp) !== null || event.target.value === '') {
                        setError('')
                        event.target.style.border = "1px solid #171B18";
                     } else {
                        event.target.style.border = "2px solid #BF002E";
                        setError(props.errorText)
                     }
                  }}
               />
               <ButtonPasswordStyle

                  onClick={(event) => {
                     event.preventDefault()
                     if (text === 'password') {
                        setText('text')
                        setPwd(<Eye width={40} />)
                     } else {
                        setText('password')
                        setPwd(<EyeOff width={40} />)
                     }
                  }}
               >{pwd}</ButtonPasswordStyle>
            </BlockPasswordStyle>
            <ErrorBlockStyle>{error} </ErrorBlockStyle>
         </LabelStyle>

      );
   }
};
