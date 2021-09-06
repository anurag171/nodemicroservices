const express = require('express')
const { randomBytes } = require('crypto')
const bodyParser = require('body-parser')
const cors = require('cors')
const axios = require('axios')


const app = express()
app.use(bodyParser.json())
app.use(cors())
const LISTENING_PORT = 4000
const deploy = false

const posts = {}

app.get('/posts', (req, res) => {
    //console.log(req.headers)
    res.send(posts)
})

app.post('/posts', async (req, res) => {
    //console.log('Received request');
    const id = randomBytes(4).toString('hex')
    const { title } = req.body;
    posts[id] = {
        id, title
    }
    // console.log(posts[id]);
    if (deploy === true) {

        await axios.post('http://eventbus-service:4005/events', {
            type: 'PostCreated',
            data: {
                id,
                title
            }
        })

    } else {
        await axios.post('http://localhost:4005/events', {
            type: 'PostCreated',
            data: {
                id,
                title
            }
        })
    }

    res.send(posts[id]).status(201)
})

app.post('/events', async (req, res) => {
    console.log('Received request with type ' + req.body.type);
    console.log('Data ' + req.body.data)

    res.send()
})

app.listen(LISTENING_PORT, () => {
    console.log(`Listening on port ${LISTENING_PORT}`);
});