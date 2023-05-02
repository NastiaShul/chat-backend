export const components = {
   components: {
      schemas: {
         UserRegistrationInput: {
            type: "object",
            properties: {
               username: {
                  type: "string",
                  description: "username for a user",
                  example: "Username",
                  required: true,
               },
               email: {
                  type: "string",
                  description: "email for a user",
                  example: "email@email.com",
                  required: true,
               },
               password: {
                  type: "string",
                  description: "password for a user",
                  example: "12345Qw!",
                  required: true,
               },
            },
         },
         UserRegistrationResponse: {
            type: "object",
            properties: {
               id: {
                  type: "string",
                  description: "ID for a user",
                  example: "FDSrw43r4e2c35h6j765hgre",
               },
               username: {
                  type: "string",
                  description: "username for a use",
                  example: "Username",
               },
               email: {
                  type: "string",
                  description: "email for a user",
                  example: "email@email.com",
               },
               password: {
                  type: "string",
                  description: "password for a user",
                  example: "12345Qw!",
               },
            },
         },
         UserLoginInput: {
            type: "object",
            properties: {
               email: {
                  type: "string",
                  description: "email for a user",
                  example: "email@email.com",
                  required: true,
               },
               password: {
                  type: "string",
                  description: "password for a user",
                  example: "12345Qw!",
                  required: true,
               },
            },
         },
         UserLoginResponse: {
            type: "object",
            properties: {
               id: {
                  type: "string",
                  description: "ID for a user",
                  example: "FDSrw43r4e2c35h6j765hgre",
               },
               username: {
                  type: "string",
                  description: "username for a use",
                  example: "Username",
               },
               email: {
                  type: "string",
                  description: "email for a user",
                  example: "email@email.com",
               },
               password: {
                  type: "string",
                  description: "password for a user",
                  example: "12345Qw!",
               },
               rooms: {
                  type: "array",
                  description: "user's room",
                  example: [],
               }
            },
         },
         UpdateUserProfileInput: {
            type: "object",
            properties: {
               username: {
                  type: "string",
                  description: "username for a user",
                  example: "Username",
               },
               email: {
                  type: "string",
                  description: "email for a user",
                  example: "email@email.com",
               },
               password: {
                  type: "string",
                  description: "password for a user",
                  example: "12345Qw!",
               },
            },
         },
         UpdateUserProfileResponse: {
            type: "object",
            properties: {
               id: {
                  type: "string",
                  description: "ID for a user",
                  example: "FDSrw43r4e2c35h6j765hgre",
               },
               username: {
                  type: "string",
                  description: "username for a use",
                  example: "Username",
               },
               email: {
                  type: "string",
                  description: "email for a user",
                  example: "email@email.com",
               },
               password: {
                  type: "string",
                  description: "password for a user",
                  example: "12345Qw!",
               },
               rooms: {
                  type: "array",
                  description: "user's room",
                  example: [],
               }
            },
         },
         CreateRoomInput: {
            type: "object",
            properties: {
               name: {
                  type: "string",
                  description: "name for a room",
                  example: "The room name",
                  required: true,
               },
               description: {
                  type: "string",
                  description: "description of a room",
                  example: "Description of a room",
               },
            },
         },
         UpdateRoomInput: {
            type: "object",
            properties: {
               name: {
                  type: "string",
                  description: "name of a room",
                  example: "New room name",
               },
               description: {
                  type: "string",
                  description: "description of a room",
                  example: "Some room description",
               },
            },
         },
         ResetPasswordInput: {
            type: "object",
            properties: {
               email: {
                  type: "string",
                  description: "user email",
                  example: "email@email.com",
                  required: true,
               },
            },
         },
      },
      parameters: {
         idUser: {
            name: "idUser",
            in: "path",
            required: true,
            example: "641c4539379b28adf1bde74e"
         },
         UserId: {
            name: "userId",
            in: "path",
            required: true,
            example: "641c4539379b28adf1bde94e"
         },
         RoomId: {
            name: "roomId",
            in: "path",
            required: true,
            example: "6419959ba3598f2d7c507567"
         },
         idRoom: {
            name: "idRoom",
            in: "path",
            required: true,
            example: "6419959ba3598f2d7c507587"
         },
      },
      securitySchemes: {
         bearerAuth: {
            type: 'http',
            scheme: "bearer",
            bearerFormat: 'Bearer',
         },
         edition: {
            type: "apiKey",
            in: "header",
            name: "edition",
            scheme: "basic",
         }
      },
   },
};