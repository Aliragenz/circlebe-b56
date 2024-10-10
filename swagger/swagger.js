const swaggerAutogen = require ('swagger-autogen') ({
    openapi: "3.0.0",
    autoHeaders: false,
});

const doc = {
  info: {
    title: 'Circle API',
    description: 'Documentation',
  },
  servers:[
    {
    url: "http://localhost:5000"
  },
    {
    url: "https://circle.vercel.app"
  },
    {
    url: "http://localhost:5173"
  },
    {
    url: "https://circle-staging.vercel.app"
  },
],
  components: {
    securitySchemes:{
        bearerAuth: {
            type: 'http',
            scheme: 'bearer'
        }
    },
    "@schemas": {
      CreateThreadDTO: {
        type: "object",
        properties: {
          content: {
            type: "string",
          },
          image: {
            type: "string",
            format: "binary"
          },
          userId: {
            type: "integer"
          },
        },
        required: ["content", "image", "userId"],
      },

      UpdateThreadDTO: {
        type: "object",
        properties: {
          content: {
            type: "string",
          },
          image: {
            type: "string",
          },
        },
        required: ["content", "image"],
      },

      LoginDTO: {
        type: "object",
        properties: {
          email: {
            type: "string",
            format: "email",
          },
          password: {
            type: "string",
            format: "password",
          },
        },
        required: ["email", "password"],
      },

        RegisterDTO:{
            type: "object",
            properties: {
                fullName:{
                    type: "string",
                },
                email:{
                    type: "string",
                    format: "email",
                    
                },
                password:{
                    type: "string",
                    format: "password",
                },
            }
        }
    },
  },
  host: 'localhost:5000',
};

const outputFile = './swagger-output.json';
const routes = ['../src/index.ts'];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen (outputFile, routes, doc);
