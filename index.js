const express = require('express')
const {MongoClient} = require('mongodb');
const app = express();
const port = process.env.PORT || 3000; 

const uri = "mongodb+srv://books-user:books-user111@myfirstcluster.xi3rgwx.mongodb.net/?retryWrites=true&w=majority"

const client = new MongoClient(uri);
const database = client.db('BooksStore');
const booksCollection = database.collection('books');

const bodyParser = express.json()

app.use(bodyParser);

app.get('/books', async (req, res) => {
    const books = await booksCollection.find().toArray()

    res.send(books)
})

app.post('/books', async (req, res) => {
    await booksCollection.up(req.body)

    res.send(req.body)
})


const start = async () => {
    await client.connect();

    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })
}

start()