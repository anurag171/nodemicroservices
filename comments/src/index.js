const express = require('express')
const { randomBytes} = require('crypto')
const bodyParser = require('body-parser')
const cors = require('cors')
const axios = require('axios')



const app = express()
app.use(bodyParser.json())
app.use(cors())

const LISTENING_PORT = 4001

const commentsByPostId = {}

app.get('/posts/:id/comments',(req,res)=>{
    //console.log(commentsByPostId[req.params.id] || [])
    res.send(commentsByPostId[req.params.id] || [])
})

app.post('/posts/:id/comments',async (req,res)=>{
    const commentId = randomBytes(4).toString('hex')
    const {comment} = req.body;
    //console.log(comment);
   const comments =  commentsByPostId[req.params.id] || [];
   comments.push({id: commentId,comment,status: 'pending'});
   commentsByPostId[req.params.id] = comments;
   await axios.post('http://localhost:4005/events',{
        type: 'CommentCreated',
        data: {
            commentId,
            comment,
            postId: req.params.id,
            status: 'pending'
        }
    })    
    res.send(comments).status(201)
})

app.post('/events', async (req,res)=>{
    const {type,data} = req.body
    console.log('Received request with type ' +type);
    console.log('Data ' + JSON.stringify(data))
    if(type==='CommentModerated'){

        const{postId,commentId, status} = data;
        console.log('data ' + JSON.stringify(data))
        console.log('postId,commentId, status ' + postId + ' ' + commentId + ' ' + status)

        const comments = commentsByPostId[postId];

        console.log('found comments ' + JSON.stringify(comments))

        const comment = comments.find(comment=>{
            return comment.id === commentId;
        })

        comment.status = status;

        await axios.post('http://localhost:4005/events',{
            type:'CommentUpdated',
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