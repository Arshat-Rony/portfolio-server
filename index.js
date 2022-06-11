const express = require('express')
const cors = require('cors')
require('dotenv').config()
const app = express()


const port = process.env.PORT || 5000;



// middleware 
app.use(cors())
app.use(express.json())




const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.pu0vp.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    try {
        await client.connect()

        const database = client.db("arshat-rony");
        const projectCollection = database.collection("projects");
        const skillsCollection = database.collection("skills");



        // get all the projects
        app.get("/projects", async (req, res) => {
            const result = await projectCollection.find({}).toArray()
            res.send(result)
        })




        // get all the skills
        app.get("/skills", async (req, res) => {
            const result = await skillsCollection.find({}).toArray()
            res.send(result)
        })


        // get a single project
        app.get("/project/:id", async (req, res) => {
            const id = req.params.id;
            const filter = { _id: ObjectId(id) }
            const result = await projectCollection.findOne(filter)
            res.send(result)
        })




    }
    finally { }
}

run().catch(console.dir)




app.get('/', (req, res) => {
    res.send('my portfolio')
})

app.listen(port, () => {
    console.log("portfoio listening")
})
