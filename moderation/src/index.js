const express = require('express')
const { randomBytes} = require('crypto')
const bodyParser = require('body-parser')
const cors = require('cors')
const axios = require('axios')


const app = express()
app.use(bodyParser.json())
app.use(cors())
const LISTENING_PORT = 4003

app.post('/events', async (req,res)=>{
    const {type,data} = req.body
    //console.log('Received request with type ' +type);
   

    if(type==='CommentCreated'){
        console.log('Data ' + JSON.stringify(data))
        console.log('Receievd comment created event');

        const status = data.comment.includes('orange')?'rejected':'approved';

        await axios.post('http://localhost:4005/events',{
            type:'CommentModerated',
            data:{
                commentId: data.commentId,
                postId: data.postId,
                status,
                comment: data.comment
            }
        })
    }
    
    res.send({})
})




app.listen(LISTENING_PORT,()=>{
    console.log(`Listening on port ${LISTENING_PORT}`);
})