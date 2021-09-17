const express = require('express');
const db = require('./config/db');
const cors = require('cors');
const config = require('./config/config');
const isAuth = require('./middleware/is-auth');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(isAuth);
app.use(require('./src/routes/index.js'));

if (config.development.node_env === "production") {
  app.use(express.static(path.join(__dirname,'/client/build')))
  app.get('*',(req,res)=>{
      res.sendFile(__dirname,'client','build','index.html')
  })
}else{
  app.get('/',(req,res)=>{
      res.send("API are up and running!!")
  })  
}

app.listen(config.development.port, () => {
  console.log("Server is up and running at Port", config.development.port)
})

