import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from "react-redux";

import io from 'socket.io-client';

import Message from "../../particles/Message/Message";

import { File } from "../../../icon/File";
import { Close } from "../../../icon/Close";

import "./Chat.scss";
import { api } from "../../../store/api";

const FILE_STRING = "Attach file"

export const Chat = ({ id, idRoom }) => {
   const [messages, setMessages] = useState([]);
   const [fileName, setFileName] = useState(FILE_STRING);
   const [roomName, setRoomName] = useState("Loading room name...");
   const [roomDescription, setRoomDescription] = useState("");


   const bodyRef = useRef();
   const textField = useRef();
   const fileField = useRef();

   const user = useSelector(state => state.users.editUser);

   const token = localStorage.getItem('token');

   const socket = io(process.env.REACT_APP_API_URL, {
      extraHeaders: {
         Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
   });

   const getRoomMessages = async () => {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/rooms/${idRoom}/messages`, {
         headers: {
            Authorization: `Bearer ${token}`,
         },
      });
      const messages = await response.json();

      setMessages(messages);
   };

   const joinRooms = async (rooms) => {
      await getRoomMessages();
      await new Promise((resolve) => socket.emit('join-rooms', { rooms }, resolve));
   };

   const leaveRooms = async (rooms) => {
      await new Promise((resolve) => socket.emit('leave-rooms', { rooms }, resolve));
   };

   const sendMessage = async (author, message, room, file) => {
      await new Promise((resolve) =>
         socket.emit("send-message", { author, message: message || '', room, filePath: file }, resolve)
      );

   };

   const uploadFile = async ({ file }) => {
      try {
         const body = new FormData()
         body.append('file', file)

         const response = await fetch(`${process.env.REACT_APP_API_URL}/upload`, {
            method: 'POST',
            body,
            headers: {
               Authorization: `Bearer ${token}`
            }
         })

         if (!response.ok) throw response

         const pathToFile = await response.json()

         return pathToFile
      } catch (e) {
         throw e
      }
   }


   useEffect(() => {
      joinRooms([idRoom]);

      api.get(`/rooms/${idRoom}`)
         .then((res) => {
            const { data } = res;

            setRoomName(data?.name);
            setRoomDescription(data?.description);
         })

      return () => {
         leaveRooms([idRoom]);
         socket.disconnect();
      };
   }, [idRoom]);


   useEffect(() => {
      socket.on('new-message', (message) => {

         console.log('message', message);
         setMessages(prevState => [...prevState, { _id: new Date().getTime(), isAdmin: false, author: { username: message.author.username, id: user._id }, createdAt: message.createdAt, message: message.message.message, filePath: message.message.filePath }])
      });

      socket.on('user-joined', ({ message }) => {
         setMessages(prevState => [...prevState, { _id: new Date().getTime(), isAdmin: true, message }])
      });

      socket.on('user-left', ({ message }) => {
         setMessages(prevState => [...prevState, { _id: new Date().getTime(), isAdmin: true, message }])
      });
   }, [idRoom]);

   useEffect(() => {
      const block = bodyRef.current;
      block.scrollTop = block.scrollHeight;

   }, [messages])

   const handleSendMessage = async (event) => {
      event.preventDefault();

      const room = idRoom;
      const author = user.username;
      const message = textField.current.value;

      const file = fileField.current.files[0];

      let path = "";

      if (message !== "") {
         if (file) {
            path = await uploadFile({ file });

            resetFile();
         }

         textField.current.value = '';

         await sendMessage(author, message, room, path);
      }
   };

   const setFile = (e) => {
      setFileName(fileField.current.files[0] ? fileField.current.files[0].name : 'Attach file')
   }

   const resetFile = (e) => {
      if (e) {
         e.stopPropagation();
      }

      setFileName(FILE_STRING);

      fileField.current.value = '';
   }

   return (
      <section className="chat">
         <div className="chat__top">
            <h2>
               {roomName}
            </h2>

            <p>
               {roomDescription}
            </p>
         </div>

         <div
            ref={bodyRef}
            className="chat__body"
         >
            {messages.map(message =>
               message.isAdmin ? (
                  <Message
                     key={message._id}
                     isAdmin={message.isAdmin}
                     message={message.message}
                  />
               )
                  : (
                     <Message
                        key={message._id}
                        message={message.message}
                        filePath={message.filePath}
                        isSelf={message.author.id === user._id}
                        author={message.author}
                        createdAt={message.createdAt}
                     />
                  )
            )}
         </div>

         <form
            className="chat__tools"
            onSubmit={handleSendMessage}
         >
            <input
               className="chat__field"
               defaultValue=""
               ref={textField}
               placeholder="Type your message..."
               autoComplete="off"
            />

            <div className="chat__file">
               <p
                  className="chat__attach"
                  onClick={() => fileField.current.click()}
               >
                  {fileName === FILE_STRING
                     ? <File />
                     : <Close onClick={resetFile} />
                  }

                  <span>{fileName}</span>
               </p>

               <input ref={fileField} onChange={setFile} type="file" id="file-input" />
            </div>

            <div className="chat__controls">
               <button
                  className="chat__button"
                  type="submit"
               >
                  Send
               </button>
            </div>
         </form>
      </section>
   );
}