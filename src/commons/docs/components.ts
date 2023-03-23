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
         GetUsersResponse: {
            type: "object",
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
      },
      parameters: {
         UserId: {
            name: "userId",
            in: "path",
            required: true,
            example: "6413483602876e558e440431"
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