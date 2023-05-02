export const user = {
   "/users/register": {
      post: {
         tags: ["User"],
         description: "Registration of a user",
         summary: "Register here",
         operationId: "registerUser",
         requestBody: {
            content: {
               "application/json": {
                  schema: {
                     $ref: "#/components/schemas/UserRegistrationInput",
                  },
               },
            },
         },
         responses: {
            200: {
               description: "User registered",
               content: {
                  "application/json": {
                     schema: {
                        $ref: "#/components/schemas/UserRegistrationResponse",
                     },
                  },
               },
            },
            409: {
               description: "User already exist",
            },
         },
      },
   },
   "/users/login": {
      post: {
         tags: ["User"],
         description: "Login of a user",
         summary: "Login here",
         operationId: "loginUser",
         requestBody: {
            content: {
               "application/json": {
                  schema: {
                     $ref: "#/components/schemas/UserLoginInput",
                  },
               },
            },
         },
         responses: {
            200: {
               description: "User logged",
               content: {
                  "application/json": {
                     schema: {
                        $ref: "#/components/schemas/UserLoginResponse",
                     },
                  },
               },
            },
            404: {
               description: "User is not registered",
            },
         }
      }
   },
   "/users": {
      get: {
         tags: ["User"],
         description: "Get users",
         summary: "Get all users here",
         operationId: "getUsers",
         security: [
            {
               "bearerAuth": [],
            }
         ],
         responses: {
            200: {
               description: "All users",
            },
            403: {
               description: "User is not authenticated",
            },
         }
      }
   },
   "/users/{idUser}": {
      get: {
         tags: ["User"],
         description: "Get user by Id",
         summary: "Get user info here",
         operationId: "getUser",
         security: [
            {
               "bearerAuth": [],
            }
         ],
         parameters: [
            {
               $ref: "#/components/parameters/idUser",
            },
         ],
         responses: {
            200: {
               description: "User information",
            },
            403: {
               description: "User is not authenticated",
            },
         }
      }
   },
   "/users/{userId}": {
      patch: {
         tags: ["User"],
         description: "Update user profile",
         summary: "Update user profile here",
         operationId: "updateUserProfile",
         security: [
            {
               "bearerAuth": [],
            }
         ],
         parameters: [
            {
               $ref: "#/components/parameters/UserId",
            },
         ],
         requestBody: {
            content: {
               "application/json": {
                  schema: {
                     $ref: "#/components/schemas/UpdateUserProfileInput",
                  }
               }
            }
         },
         responses: {
            200: {
               description: "User profile successfully updated",
               content: {
                  "application/json": {
                     schema: {
                        $ref: "#/components/schemas/UpdateUserProfileResponse",
                     },
                  },
               },
            },
            403: {
               description: "User does not own this profile",
            },
         }
      }
   },
   "/users/{userId}/": {
      delete: {
         tags: ["User"],
         description: "Delete user profile",
         summary: "Delete user profile here",
         operationId: "deleteUserProfile",
         security: [
            {
               "bearerAuth": [],
            }
         ],
         parameters: [
            {
               $ref: "#/components/parameters/UserId",
            },
         ],
         responses: {
            200: {
               description: "User profile successfully deleted",
            },
            403: {
               description: "User does not own this profile",
            },
         }
      }
   },
   "/users/password-reset": {
      post: {
         tags: ["User"],
         description: "Forget password",
         summary: "Send new password to user email here",
         operationId: "resetPassword",
         requestBody: {
            content: {
               "application/json": {
                  schema: {
                     $ref: "#/components/schemas/ResetPasswordInput",
                  }
               }
            }
         },
         responses: {
            200: {
               description: "New password sent to email account",
            },
            404: {
               description: "User with this email not register in system",
            },
         }
      }
   }
};