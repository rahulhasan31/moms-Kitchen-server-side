const express= require('express')
const app= express()
const cors= require('cors')
const { MongoClient, ServerApiVersion } = require('mongodb')
const port= process.env.PORT || 5000
require('dotenv').config()

// middel wares
app.use(cors())
app.use(express.json())


console.log(process.env.USER_DB);



const uri = `mongodb+srv://${process.env.USER_DB}:${process.env.PASSWORD_DB}@cluster0.sayatpw.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });



app.get('/services', (req, res)=>{

})








app.get('/', (req, res)=>{
    res.send('hello ')
})


app.listen(port, ()=>{console.log(`server running${port}`)})