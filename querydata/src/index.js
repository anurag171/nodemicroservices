const express = require('express')
const { randomBytes} = require('crypto')
const bodyParser = require('body-parser')
const cors = require('cors')
const axios = require('axios')
const { title } = require('process')
const { type } = require('os')


const app = express()
app.use(bodyParser.json())
app.use(cors())
const LISTENING_PORT = 4002

const posts = {}

const handleEvents = (type,data)=>{
    if(type==="PostCreated"){
        console.log("recieved post data "  + JSON.stringify(data));
         const {id,title} =  data
         posts[id] = {id,title,comments:[]};
     }
 
     if(type==="CommentCreated"){
        console.log("recieved comment data " + JSON.stringify(data));
         const {commentId,comment,status ,postId} =  data;
        // console.log("commentId,comment,postId " + commentId+" " +comment + " " +postId);
         const post = posts[postId]
         //console.log("Got post " + JSON.stringify(post));
         //const {id,comment} = comments
         //console.log("id,comment " + id + " " +comment);
         post.comments.push({commentId,comment,status})
        // console.log("After push post " + JSON.stringify(post));
     }
 
     if(type==="CommentUpdated"){
         console.log("recieved comment data " + JSON.stringify(data));
          const {commentId,comment,status ,postId} =  data;
          console.log("commentId,comment,postId " + commentId+" " +comment + " " +postId);
          const post = posts[postId]
          const commentU = post.comments.find(comment=>{
              return comment.commentId === commentId;
          })
          commentU.status = status
          commentU.comment = comment
         console.log("Got post " + JSON.stringify(post));
         //const {id,comment} = comments
         console.log("id,comment " + commentId + " " +comment);
          //post.comments.push({commentId,comment,status})
          console.log("After push post " + JSON.stringify(post));
      }
}

app.get('/posts',(req,res)=>{  
    console.log(`sending posts ${JSON.stringify(posts)}`) 
    res.send(posts)
})

app.post('/events', async (req,res)=>{
    
    const {type,data} = req.body;

    handleEvents(type,data)

    res.send({})
})

app.post('/events', async (req,res)=>{
    console.log('Received request with type ' +req.body.type);
    console.log('Data ' + req.body.data)
    
    res.send()
})

app.listen(LISTENING_PORT, async ()=>{
    console.log(`Listening on port ${LISTENING_PORT}`);
    const res = await axios.get('http://localhost:4005/events')
    //const events = res.data
    for(let event of res.data){
        console.log(`Processing event ${event.type} and ${JSON.stringify(event.data)}`);

        handleEvents(event.type,event.data)
    }
})