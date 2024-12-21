const express = require("express")
const app = express()
const dotenv = require("dotenv")
dotenv.config()
const port = process.env.port
const {connexion}=require("./connexion");
const {userRouter}=require("./routes/userRoutes")
const cors = require('cors');
app.use(cors());
app.use(express.json())
connexion();

app.use(userRouter)

app.listen(port,()=>{console.log(`listening to http://localhost:${port}`)})