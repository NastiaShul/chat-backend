import { LogoSetting } from "../../../icon/LogoSetting";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { getRoom } from "../../../store/roomsSlice";
// import { chatRoom } from "../../../store/chatSlice";
import {
   BlockMyRooms,
   Room,
   RoomName,
   RoomSating,
} from "./myRoomsBlockComponent";

export function MyRoomsBlock({ setId, setActive, setContentBody }) {
   const rooms = useSelector(state => state.rooms.rooms);

   const dispatch = useDispatch();
   const clickHandler = (event, element) => {
      event.preventDefault();
      setId(element);
      setActive(true);
   };

   return (
      <BlockMyRooms>
         {rooms.map(elem => {
            return (
               <Room key={uuidv4()}>
                  <RoomName
                     onClick={() => {
                        const idRoom = elem._id;
                        setContentBody(idRoom);
                     }}
                  >
                     {elem.name}
                  </RoomName>
                  <RoomSating
                     onClick={event => {
                        clickHandler(event, elem._id);
                        const id = elem._id;

                        dispatch(getRoom({ id }));
                     }}
                  >
                     <LogoSetting
                        width={24}
                        onClick={event => {
                           event.stopPropagation();
                        }}
                     />
                  </RoomSating>
               </Room>
            );
         })}
      </BlockMyRooms>
   );
}
