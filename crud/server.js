const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./models')
const swaggerDocument = require('./swagger.json')
const swaggerUi = require('swagger-ui-express')

app.use(cors());
// const swaggerOptions = {
//   swaggerDefinition :{
//     info:{
//       title:"Library API",
//       version:'1.0.0'
//     }
//   },
//   apis:['server.js']
// }
app.use(
  '/api-docs',
  swaggerUi.serve, 
  swaggerUi.setup(swaggerDocument)
);
app.use(express.json())
app.use(express.urlencoded( { extended:true } ))

db.sequelize.sync().then(() => {
    app.listen(3000, () => {
        console.log(`Server is running on port 3000.`);
});
});
require("./routes/student.routes")(app);