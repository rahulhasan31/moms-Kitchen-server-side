const express= require('express')
const app= express()
const cors= require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb')
const port= process.env.PORT || 5000
require('dotenv').config()

// middel wares
app.use(cors())
app.use(express.json())


console.log(process.env.USER_DB);



const uri = `mongodb+srv://${process.env.USER_DB}:${process.env.PASSWORD_DB}@cluster0.sayatpw.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
        const serviceCollection=client.db('photographer').collection('services')
        const reviewCollection= client.db('photographer').collection('review')
        app.get('/services', async (req, res)=>{
            const query= {}
            const cursor= serviceCollection.find(query)
            const services= await cursor.toArray()
            res.send(services)
        })
        app.get('/', async (req, res)=>{
            const query= {}
            const cursor= serviceCollection.find(query)
            const services= await cursor.limit(3).toArray()
            res.send(services)
        })
        
        app.get('/services/:id', async (req, res)=>{
            const id= req.params.id
            const query= {_id : ObjectId(id)}
            const  service= await serviceCollection.findOne(query)
            res.send(service)
        })
        
        app.post('/services', async(req, res)=>{
            const addServices= req.body
            const result= await serviceCollection.insertOne(addServices)
            res.send(result)
        })

        // review api????
        app.get('/reviews', async (req, res)=>{
            console.log(req.query.email);
            let query= {}
            if(req.query.email){
                query ={
                email: req.query.email,
                
                }
            }
            const cursor= reviewCollection.find(query)
            const review= await cursor.toArray()
            res.send(review)
        })
        app.get('/reviews/:id', async (req, res)=>{
            const id= req.params.id
           const query= {service : id}
            const cursor= reviewCollection.find(query)
            const review= await cursor.toArray()
            res.send(review)
        })


        app.post('/reviews', async(req, res)=>{
            const review= req.body
            const result= await reviewCollection.insertOne(review)
            res.send(result)
        })
        

        app.delete( '/reviews/:id', async (req, res)=>{
            const id= req.params.id
            const query= {_id : ObjectId(id)}
            const result= await reviewCollection.deleteOne(query)
            res.send(result)
        })

        app.get('/reviews/:id', async(req, res)=>{
            const id= req.params.id
            const query= {_id : ObjectId(id)}
            const review= await reviewCollection.findOne(query)
            console.log(review);
            res.send(review)

        })
        app.put('/reviews/:id', async (req, res)=>{
            const id = req.params.id
            const query= {_id : ObjectId(id)}
            const options = { upsert: true };
            const editReview= req.body
            const updateReview= {
                $set: {
                    name: editReview.serviceName, 
                    message:editReview.message
                }
            }
           const result= await reviewCollection.updateOne(query, updateReview, options)
           res.send(result)
        })
        
        
    }

    finally{

    }
}

run().catch(e=>{console.error(e)})












app.listen(port, ()=>{console.log(`server running${port}`)})