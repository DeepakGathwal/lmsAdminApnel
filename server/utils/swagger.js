const swaggerUi =  require('swagger-ui-express')
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'JTC ADMIN Project Api Controller',
        description: "All Modules Api's Details",
        contact:{
          email: 'rickygathwal@gmail.com',
          url: "https://github.com/deepakgathwal"
        },
        license:{
        name: "Project :- Jtc Admin",
        url: 'https://github.com/DeepakGathwal/jtcAdmin'
      },
      version: '1.0.0',
    },
    externalDocs:{
      description: "Meet Developer",
      url: "https://www.linkedin.com/in/deepak-gathwal-82aa9a220/"
    },
      components : {
        securitySchemas:{
          bearerAuth : {
            type : 'http',
            schema : 'bearer',
            bearerFormat : 'JWT'
          }
        }
      } ,
      security : [
        {
          bearerAuth : []
        }
      ],
    },
    apis: ["./routes/*.js"], // files containing annotations as above
  };

  const openapiSpecification = swaggerJsdoc(options);

  exports.createDocs = async(app) =>{
    app.use('/jtc/apis', swaggerUi.serve, swaggerUi.setup(openapiSpecification))
    app.get('jtc.json', (req,res) =>{
    return  res.setHeader("Content-Type", "application/json").send(openapiSpecification)
    })
   }

  