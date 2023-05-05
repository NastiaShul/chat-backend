export const room = {
   "/rooms": {
      post: {
         tags: ["Room"],
         description: "User can create room",
         summary: "Create room here",
         operationId: "createRoom",
         security: [
            {
               "bearerAuth": [],
            }
         ],
         requestBody: {
            content: {
               "application/json": {
                  schema: {
                     $ref: "#/components/schemas/CreateRoomInput",
                  },
               },
            },
         },
         responses: {
            200: {
               description: "Room successfully created",
            },
            403: {
               description: "User is not authenticated",
            },
         }
      }
   },
   "/rooms/": {
      get: {
         tags: ["Room"],
         description: "Get rooms of other users",
         summary: "Get rooms of other users here",
         operationId: "getRooms",
         security: [
            {
               "bearerAuth": [],
            }
         ],
         responses: {
            200: {
               description: "Rooms of other users",
            },
            403: {
               description: "User is not authenticated",
            },
         }
      }
   },
   "/rooms/own": {
      get: {
         tags: ["Room"],
         description: "Get all your own rooms",
         summary: "Get all your own rooms here",
         operationId: "getRooms",
         security: [
            {
               "bearerAuth": [],
            }
         ],
         responses: {
            200: {
               description: "Your own rooms",
            },
            403: {
               description: "User is not authenticated",
            },
         }
      }
   },
   "/rooms/{idRoom}": {
      get: {
         tags: ["Room"],
         description: "Get room by Id",
         summary: "Get room by Id here",
         operationId: "getRoom",
         security: [
            {
               "bearerAuth": [],
            }
         ],
         parameters: [
            {
               $ref: "#/components/parameters/idRoom",
            },
         ],
         responses: {
            200: {
               description: "Rooms information",
            },
            403: {
               description: "User is not authenticated",
            },
         }
      }
   },
   "/rooms/{roomId}": {
      patch: {
         tags: ["Room"],
         description: "Room settings",
         summary: "Update your room here",
         operationId: "updateRoom",
         security: [
            {
               "bearerAuth": [],
            }
         ],
         parameters: [
            {
               $ref: "#/components/parameters/RoomId",
            },
         ],
         requestBody: {
            content: {
               "application/json": {
                  schema: {
                     $ref: "#/components/schemas/UpdateRoomInput",
                  }
               }
            }
         },
         responses: {
            200: {
               description: "Room successfully updated",
            },
            403: {
               description: "User does not own this room",
            },
         }
      }
   },
   "/rooms/{roomId}/": {
      delete: {
         tags: ["Room"],
         description: "Delete room",
         summary: "Delete your room here",
         operationId: "deleteRoom",
         security: [
            {
               "bearerAuth": [],
            }
         ],
         parameters: [
            {
               $ref: "#/components/parameters/RoomId",
            },
         ],
         responses: {
            200: {
               description: "Room successfully deleted",
            },
            403: {
               description: "User does not own this room",
            },
         }
      }
   },

}