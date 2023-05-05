import  { useMemo } from "react";
import {io} from "socket.io-client"
import { useLocation } from "react-router-dom";

export const useSocket = () => {
  const { state } = useLocation();
  const socket = useMemo(() => {
    const token = state?.content.token;

    console.log('render')
    if (token) {
       console.log(process.env.API_URL)
      const newSocket = io('https://chat-p33m.onrender.com', {
        extraHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });

      newSocket.on("user-joined", ({ message }) => {
        console.log("connect");
      });

      newSocket.on("user-left", ({ message }) => {
        console.log("disconnect");
      });
      
      newSocket.on("join-rooms", ({ message }) => {
        console.log("user Joine");
      });
      return newSocket;
    } else {
      return null;
    }
  }, [state?.content.token]);

  return socket
};
