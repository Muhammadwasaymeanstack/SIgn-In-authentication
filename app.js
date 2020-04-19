const express = require('express')
const bodyParser = require('body-parser')
const mongoose= require('mongoose')
const app = express()
const PORT = 3000
const mongooseURL = 'mongodb://127.0.0.1:27017/autherization-api'


//routes
require('./models/user')  
 

const authRoutes = require('./routes/authRoutes')
const reqToken= require('./middlewear/reqToken')
app.use(bodyParser.json())
app.use(authRoutes)

mongoose.connect(mongooseURL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
   useCreateIndex:true
})
mongoose.connection.on('connected',()=>{
    console.log("connected to mongooo")
})
mongoose.connection.on('error',(error)=>{
    console.log("connection error",error)
})

app.get('/check',reqToken,(req,res)=>{
     res.send("Your email is "+ req.user.email)
})

app.listen(PORT,()=>{
    console.log("server is running on "+ PORT)
})